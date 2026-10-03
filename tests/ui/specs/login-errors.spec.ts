import { test, expect } from '../../fixtures/pages';

test.describe('E2E-LOGIN-ERRORS', () => {
  test.fail(
    'BUG-10 #10: server 500 should not show Invalid credentials',
    async ({ page, loginPage }) => {
      await page.route('**/login', async (route) => {
        if (route.request().method() === 'POST') {
          await route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({ error: 'Internal server error' }),
          });
          return;
        }
        await route.continue();
      });

      await loginPage.open();
      await loginPage.fillCredentials('anyone@kindity.test', 'abcdef');
      await Promise.all([
        page.waitForResponse((response) =>
          new URL(response.url()).pathname === '/login' &&
          response.request().method() === 'POST'
        ),
        loginPage.submit(),
      ]);
      await expect(
        page.getByText(/invalid credentials|unexpected error|try again|server error/i)
      ).toBeVisible();
      await expect(page.getByText('Invalid credentials. Please try again.')).toHaveCount(0);
      await expect(
        page.getByText(/unexpected error|try again|server error/i)
      ).toBeVisible();
    }
  );
});
