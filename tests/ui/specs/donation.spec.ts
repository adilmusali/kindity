import { test, expect } from '../../fixtures/pages';
import {
  buildPaymentIntentSucceededEvent,
  hasRealStripeKey,
  postSignedWebhook,
} from '../../fixtures/stripe';
import { uniqueEmail } from '../../fixtures/users';

const API_URL = process.env.API_URL || 'http://localhost:3000';

test.describe('E2E-DONATION', () => {
  test('donate with Stripe test card and see history', async ({
    page,
    registerPage,
    loginPage,
    donationPage,
    donationHistoryPage,
    header,
  }) => {
    test.skip(!hasRealStripeKey(), 'Requires real Stripe test keys');
    test.skip(
      !(process.env.VITE_STRIPE_PUBLISHABLE_KEY || '').startsWith('pk_test_') ||
        (process.env.VITE_STRIPE_PUBLISHABLE_KEY || '').includes('replace'),
      'Requires real VITE_STRIPE_PUBLISHABLE_KEY'
    );

    const name = 'Donor E2E';
    const email = uniqueEmail('donor');
    const password = 'abcdef';

    await registerPage.register(name, email, password);
    await loginPage.login(email, password);
    await header.expectLoggedInAs(name);

    await donationPage.open();
    await donationPage.fillDonor(name, '25');
    await donationPage.stripe.fillTestCard();
    await donationPage.submit();
    await donationPage.expectSuccessToast();

    const profile = await page.request.get(`${API_URL}/profile`);
    const user = await profile.json();
    const piId = `pi_e2e_${Date.now()}`;
    await postSignedWebhook(page.request, buildPaymentIntentSucceededEvent({
      paymentIntentId: piId,
      userId: user._id,
      amountCents: 2500,
    }));

    await donationHistoryPage.open();
    await donationHistoryPage.expectAmount('$25.00 USD');
  });
});
