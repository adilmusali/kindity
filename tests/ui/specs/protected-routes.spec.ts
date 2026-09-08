import { test, expect } from '../../fixtures/pages';
import { seededUsers } from '../../fixtures/users';

test.describe('E2E-PROTECTED', () => {
  test('anonymous /donations redirects to login', async ({ page }) => {
    await page.goto('/donations');
    await expect(page).toHaveURL(/\/login/);
  });

  test('anonymous /admin/dashboard redirects home', async ({ page }) => {
    await page.goto('/admin/dashboard');
    await expect(page).toHaveURL(/\/$/);
  });

  test('regular user /admin/dashboard redirects home', async ({ page, loginPage }) => {
    await loginPage.login(seededUsers.user.email, seededUsers.user.password);
    await page.goto('/admin/dashboard');
    await expect(page).toHaveURL(/\/$/);
  });
});
