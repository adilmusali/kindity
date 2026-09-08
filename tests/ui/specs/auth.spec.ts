import { test, expect } from '../../fixtures/pages';
import { uniqueEmail } from '../../fixtures/users';

const API_URL = process.env.API_URL || 'http://localhost:3000';

test.describe('E2E-AUTH', () => {
  test('register -> login -> welcome -> logout clears session', async ({
    page,
    registerPage,
    loginPage,
    header,
  }) => {
    const name = 'E2E User';
    const email = uniqueEmail('ui');
    const password = 'abcdef';

    await registerPage.register(name, email, password);
    await expect(page).toHaveURL(/\/login/);

    await loginPage.login(email, password);
    await header.expectLoggedInAs(name);

    const cookies = await page.context().cookies(API_URL);
    const token = cookies.find((c) => c.name === 'token');
    expect(token).toBeTruthy();
    expect(token!.httpOnly).toBe(true);

    await header.logout();
    await header.expectLoggedOut();

    const profile = await page.request.get(`${API_URL}/profile`);
    expect(profile.status()).toBe(401);
  });
});
