import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DonationHistoryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.goto('/donations');
  }

  async expectAmount(amountLabel: string) {
    await expect(this.page.getByText(amountLabel)).toBeVisible();
  }
}
