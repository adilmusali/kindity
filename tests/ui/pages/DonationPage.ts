import { FrameLocator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class StripeCardFrame {
  constructor(private readonly page: Page) {}

  private frame(): FrameLocator {
    return this.page.frameLocator('iframe[name^="__privateStripeFrame"]').first();
  }

  async fillTestCard() {
    const frame = this.frame();
    // Stripe Elements fields vary; try common placeholders
    const card = frame.locator('input[name="cardnumber"], input[placeholder*="Card number"], input[autocomplete="cc-number"]').first();
    await card.waitFor({ state: 'visible', timeout: 30_000 });
    await card.fill('4242424242424242');

    const exp = frame.locator('input[name="exp-date"], input[placeholder*="MM"], input[autocomplete="cc-exp"]').first();
    await exp.fill('1234');

    const cvc = frame.locator('input[name="cvc"], input[placeholder*="CVC"], input[autocomplete="cc-csc"]').first();
    await cvc.fill('123');

    const zip = frame.locator('input[name="postal"], input[placeholder*="ZIP"], input[autocomplete="postal-code"]');
    if (await zip.count()) {
      await zip.first().fill('12345');
    }
  }
}

export class DonationPage extends BasePage {
  readonly stripe: StripeCardFrame;

  constructor(page: Page) {
    super(page);
    this.stripe = new StripeCardFrame(page);
  }

  async open() {
    await this.goto('/donation');
  }

  async fillDonor(name: string, amount: string) {
    await this.page.getByPlaceholder('Name').fill(name);
    await this.page.getByPlaceholder('Donation amount (USD)').fill(amount);
  }

  async submit() {
    await this.page.getByRole('button', { name: /Donate/i }).click();
  }

  async expectSuccessToast() {
    await expect(this.page.getByText(/Donation successful/i)).toBeVisible({ timeout: 60_000 });
  }
}
