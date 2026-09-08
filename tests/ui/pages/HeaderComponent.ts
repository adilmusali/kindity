import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HeaderComponent extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  welcomeText(name: string) {
    return this.page.getByText(`Welcome, ${name}!`);
  }

  loginButton() {
    return this.page.getByRole('button', { name: 'Login' });
  }

  logoutButton() {
    return this.page.getByRole('button', { name: 'Logout' });
  }

  adminLink() {
    return this.page.getByRole('link', { name: 'Admin' });
  }

  historyLink() {
    return this.page.getByRole('link', { name: 'History' });
  }

  async logout() {
    await this.logoutButton().click();
  }

  async expectLoggedInAs(name: string) {
    await expect(this.welcomeText(name)).toBeVisible();
  }

  async expectLoggedOut() {
    await expect(this.loginButton()).toBeVisible();
  }
}
