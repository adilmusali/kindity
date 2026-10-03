import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AddEventPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.page.locator('#header').getByRole('link', { name: 'Events', exact: true }).click();
    await this.page.locator('a[href="/addEvent"]').click();
  }

  async submitEvent(img: string, header: string, desc: string) {
    await this.page.getByPlaceholder('Enter Image Source').fill(img);
    await this.page.getByPlaceholder('Enter Header').fill(header);
    await this.page.getByPlaceholder('Enter Description').fill(desc);
    await this.page.getByRole('button', { name: 'Add' }).click();
  }
}
