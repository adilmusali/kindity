import { test, expect } from '@playwright/test';

const api = process.env.API_URL || 'http://localhost:3000';
const headers = {
  'access-control-allow-origin': new URL(process.env.FRONT_URL || 'http://localhost:5173').origin,
  'access-control-allow-credentials': 'true',
};

for (const scenario of [
  { status: 401, message: 'Invalid credentials. Please try again.' },
  { status: 429, message: 'Too many login attempts. Please try again later.' },
  { status: 500, message: 'Server error. Please try again later.' },
  { status: 0, message: 'Unable to reach the server. Please check your connection.' },
]) {
  test(`BUG-10: login displays the correct error for ${scenario.status || 'network failure'}`, async ({ page }) => {
    await page.route(`${api}/profile`, route => route.fulfill({ status: 401, headers,
      contentType: 'application/json', body: '{}' }));
    await page.route(`${api}/login`, route => {
      if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: {
        ...headers, 'access-control-allow-methods': 'POST', 'access-control-allow-headers': 'content-type',
      } });
      return scenario.status === 0 ? route.abort() : route.fulfill({ status: scenario.status,
        headers, contentType: 'application/json', body: JSON.stringify({ error: 'API error' }) });
    });
    await page.goto('/login');
    await page.getByPlaceholder('Enter Email...').fill('someone@example.com');
    await page.getByPlaceholder('Enter Password...').fill('abcdef');
    await page.locator('form').getByRole('button', { name: 'Login', exact: true }).click();
    await expect(page.getByText(scenario.message, { exact: true })).toBeVisible();
    await expect(page.locator('form').getByRole('button', { name: 'Login', exact: true })).toBeEnabled();
    if (scenario.status !== 401) {
      await expect(page.getByText('Invalid credentials. Please try again.', { exact: true })).toHaveCount(0);
    }
  });
}
