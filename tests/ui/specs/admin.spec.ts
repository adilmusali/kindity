import { test, expect } from '../../fixtures/pages';
import { seededUsers } from '../../fixtures/users';
import {
  buildPaymentIntentSucceededEvent,
  postSignedWebhook,
} from '../../fixtures/stripe';

test.describe('E2E-ADMIN', () => {
  test('admin dashboard lists donations for all donors', async ({
    page,
    loginPage,
    header,
    adminDashboardPage,
    asAnon,
  }) => {
    // Ensure at least one donation exists for seeded user
    const userLogin = await asAnon.post('/login', {
      data: { email: seededUsers.user.email, password: seededUsers.user.password },
    });
    expect(userLogin.status()).toBe(200);
    const profile = await asAnon.get('/profile');
    const user = await profile.json();
    const piId = `pi_admin_${Date.now()}`;
    await postSignedWebhook(
      asAnon,
      buildPaymentIntentSucceededEvent({
        paymentIntentId: piId,
        userId: user._id,
        amountCents: 1500,
      })
    );

    await loginPage.login(seededUsers.admin.email, seededUsers.admin.password);
    await expect(header.adminLink()).toBeVisible();
    await header.adminLink().click();
    await adminDashboardPage.expectHeading();
    await adminDashboardPage.expectDonorEmail(seededUsers.user.email);
  });

  test.fail('BUG-03 #3: AddEvent should create an event visible on /event', async ({
    page,
    loginPage,
    addEventPage,
  }) => {
    await loginPage.login(seededUsers.admin.email, seededUsers.admin.password);
    const headerText = `E2E Event ${Date.now()}`;
    await addEventPage.open();
    await addEventPage.submitEvent(
      'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600',
      headerText,
      'Created by E2E test'
    );
    await page.goto('/event');
    await expect(page.getByText(headerText)).toBeVisible({ timeout: 10_000 });
  });
});
