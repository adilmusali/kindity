import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.goto('/login');
  }

  async fillCredentials(email: string, password: string) {
    await this.page.getByPlaceholder('Enter Email...').fill(email);
    await this.page.getByPlaceholder('Enter Password...').fill(password);
  }

  async submit() {
    await this.page.getByRole('button', { name: /Login|Logging in/i }).click();
  }

  async login(email: string, password: string) {
    await this.open();
    await this.fillCredentials(email, password);
    await this.submit();
  }
}
