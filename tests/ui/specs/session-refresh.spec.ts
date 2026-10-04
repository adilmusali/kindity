import { test, expect } from '@playwright/test';

const api = process.env.API_URL || 'http://localhost:3000';
const headers = {
  'access-control-allow-origin': new URL(process.env.FRONT_URL || 'http://localhost:5173').origin,
  'access-control-allow-credentials': 'true',
};
const user = { _id: 'session-user', name: 'Session User', email: 'session@example.com', role: 'user' };

test.beforeEach(async ({ page }) => {
  await page.route(`${api}/api/**`, route => route.fulfill({
    status: 200, headers, contentType: 'application/json',
    body: route.request().url().endsWith('/home-content') ? 'null' : '[]',
  }));
});

for (const scenario of [
  { path: '/admin/dashboard', role: 'admin', heading: 'All Donations' },
  { path: '/profile', role: 'user', heading: 'My Profile' },
]) {
  test(`BUG-09: delayed session keeps ${scenario.path} on navigation and reload`, async ({ page }) => {
    let release!: () => void;
    let pending = new Promise<void>(resolve => { release = resolve; });
    await page.route(`${api}/profile`, async route => {
      await pending;
      await route.fulfill({ status: 200, headers, contentType: 'application/json',
        body: JSON.stringify({ ...user, role: scenario.role }) });
    });
    try {
      await page.goto(scenario.path);
      await expect(page.getByRole('status')).toHaveText('Loading session...');
      await expect(page).toHaveURL(new RegExp(`${scenario.path}$`));
      release();
      await expect(page.getByRole('heading', { name: scenario.heading })).toBeVisible();
      pending = new Promise<void>(resolve => { release = resolve; });
      await page.reload();
      await expect(page.getByRole('status')).toHaveText('Loading session...');
      await expect(page).toHaveURL(new RegExp(`${scenario.path}$`));
      release();
      await expect(page.getByRole('heading', { name: scenario.heading })).toBeVisible();
    } finally { release(); }
  });
}

for (const outcome of ['anonymous', 'network failure', 'ordinary user']) {
  test(`BUG-09: admin guard rejects ${outcome} after session resolves`, async ({ page }) => {
    await page.route(`${api}/profile`, route => outcome === 'network failure'
      ? route.abort()
      : route.fulfill({ status: outcome === 'anonymous' ? 401 : 200, headers,
          contentType: 'application/json', body: JSON.stringify(outcome === 'anonymous' ? {} : user) }));
    await page.goto('/admin/dashboard');
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole('heading', { name: 'All Donations' })).toHaveCount(0);
  });
}

test('BUG-09: anonymous profile navigation redirects to login after session resolves', async ({ page }) => {
  await page.route(`${api}/profile`, route => route.fulfill({ status: 401, headers,
    contentType: 'application/json', body: '{}' }));
  await page.goto('/profile');
  await expect(page).toHaveURL(/\/login$/);
});

test('BUG-09: a delayed bootstrap response cannot overwrite a newer login', async ({ page }) => {
  let release!: () => void;
  let started!: () => void;
  const pending = new Promise<void>(resolve => { release = resolve; });
  const profileStarted = new Promise<void>(resolve => { started = resolve; });
  await page.route(`${api}/profile`, async route => {
    started();
    await pending;
    await route.fulfill({ status: 200, headers, contentType: 'application/json',
      body: JSON.stringify({ ...user, name: 'Stale Admin', role: 'admin' }) });
  });
  await page.route(`${api}/login`, route => route.fulfill({ status: 200, headers,
    contentType: 'application/json', body: JSON.stringify({ user }) }));
  try {
    await page.goto('/login');
    await profileStarted;
    await page.getByPlaceholder('Enter Email...').fill(user.email);
    await page.getByPlaceholder('Enter Password...').fill('abcdef');
    const cancelled = page.waitForEvent('requestfailed', request => request.url() === `${api}/profile`);
    await page.locator('form').getByRole('button', { name: 'Login', exact: true }).click();
    await cancelled;
    await expect(page.getByText('Welcome, Session User!', { exact: true })).toBeVisible();
    release();
    await page.getByRole('link', { name: 'Profile', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'My Profile' })).toBeVisible();
    await expect(page.getByText('Welcome, Session User!', { exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Admin', exact: true })).toHaveCount(0);
  } finally { release(); }
});
