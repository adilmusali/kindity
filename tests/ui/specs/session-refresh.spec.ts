import { test, expect } from '../../fixtures/pages';
import { seededUsers } from '../../fixtures/users';

test.describe('E2E-SESSION', () => {
  test.fail(
    'BUG-09: admin reload on /admin/dashboard should stay authenticated',
    async ({ page, loginPage, adminDashboardPage }) => {
      await loginPage.login(seededUsers.admin.email, seededUsers.admin.password);
      await adminDashboardPage.open();
      await adminDashboardPage.expectHeading();
      await page.reload();
      await expect(page).toHaveURL(/\/admin\/dashboard/);
      await adminDashboardPage.expectHeading();
    }
  );
});
