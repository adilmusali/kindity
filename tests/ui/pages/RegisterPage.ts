import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.goto('/register');
  }

  async register(name: string, email: string, password: string) {
    await this.open();
    await this.page.getByPlaceholder('Enter Name...').fill(name);
    await this.page.getByPlaceholder('Enter Email...').fill(email);
    await this.page.getByPlaceholder('Enter Password...').fill(password);
    await this.page.getByRole('button', { name: /Create Account|Creating/i }).click();
  }
}
