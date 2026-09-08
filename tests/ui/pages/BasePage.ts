import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path: string) {
    await this.page.goto(path);
  }

  async expectUrlContains(part: string) {
    await expect(this.page).toHaveURL(new RegExp(part));
  }
}
