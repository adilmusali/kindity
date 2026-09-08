import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const API_URL = process.env.API_URL || 'http://localhost:3000';
const FRONT_URL = process.env.FRONT_URL || 'http://localhost:5173';
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: '.',
  fullyParallel: false,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: 1,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ...(isCI ? [['github'] as const] : []),
  ],
  globalSetup: require.resolve('./global-setup.ts'),
  use: {
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'api',
      testMatch: /api\/.*\.spec\.ts/,
      use: {
        baseURL: API_URL,
        extraHTTPHeaders: { Accept: 'application/json' },
      },
    },
    {
      name: 'ui',
      testMatch: /ui\/specs\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: FRONT_URL,
        storageState: undefined,
      },
    },
  ],
  webServer: [
    {
      command: 'npm run start:test',
      cwd: path.resolve(__dirname, '../back'),
      url: `${API_URL}/api/events`,
      reuseExistingServer: !isCI,
      timeout: 120_000,
      env: {
        ...process.env,
        PORT: '3000',
        DB_URL: process.env.DB_URL || 'mongodb://127.0.0.1:27017/kindity_test',
        JWT_SECRET: process.env.JWT_SECRET || 'test-jwt-secret-kindity-qa',
        CLIENT_URL: FRONT_URL,
        NODE_ENV: 'test',
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || 'sk_test_dummy',
        STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test',
      },
    },
    {
      command: 'npx vite --port 5173 --strictPort',
      cwd: path.resolve(__dirname, '../front'),
      url: FRONT_URL,
      reuseExistingServer: !isCI,
      timeout: 120_000,
      env: {
        ...process.env,
        VITE_API_URL: API_URL,
        VITE_STRIPE_PUBLISHABLE_KEY:
          process.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_dummy',
      },
    },
  ],
});
