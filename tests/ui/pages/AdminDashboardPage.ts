import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AdminDashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.goto('/admin/dashboard');
  }

  async expectDonorEmail(email: string) {
    await expect(this.page.getByText(email)).toBeVisible();
  }

  async expectHeading() {
    await expect(this.page.getByRole('heading', { name: 'All Donations' })).toBeVisible();
  }
}
