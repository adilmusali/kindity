import { test as base, expect, APIRequestContext } from '@playwright/test';
import {
  AuthSession,
  createAdminSession,
  createAnonContext,
  createUserSession,
  registerFreshUser,
} from './api';
import { LoginPage } from '../ui/pages/LoginPage';
import { RegisterPage } from '../ui/pages/RegisterPage';
import { DonationPage } from '../ui/pages/DonationPage';
import { DonationHistoryPage } from '../ui/pages/DonationHistoryPage';
import { AdminDashboardPage } from '../ui/pages/AdminDashboardPage';
import { HeaderComponent } from '../ui/pages/HeaderComponent';
import { AddEventPage } from '../ui/pages/AddEventPage';

type Fixtures = {
  asAnon: APIRequestContext;
  asUser: AuthSession;
  asAdmin: AuthSession;
  freshUser: AuthSession;
  header: HeaderComponent;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  donationPage: DonationPage;
  donationHistoryPage: DonationHistoryPage;
  adminDashboardPage: AdminDashboardPage;
  addEventPage: AddEventPage;
};

export const test = base.extend<Fixtures>({
  asAnon: async ({}, use) => {
    const ctx = await createAnonContext();
    await use(ctx);
    await ctx.dispose();
  },
  asUser: async ({}, use) => {
    const session = await createUserSession();
    await use(session);
    await session.context.dispose();
  },
  asAdmin: async ({}, use) => {
    const session = await createAdminSession();
    await use(session);
    await session.context.dispose();
  },
  freshUser: async ({}, use) => {
    const session = await registerFreshUser();
    await use(session);
    await session.context.dispose();
  },
  header: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  donationPage: async ({ page }, use) => {
    await use(new DonationPage(page));
  },
  donationHistoryPage: async ({ page }, use) => {
    await use(new DonationHistoryPage(page));
  },
  adminDashboardPage: async ({ page }, use) => {
    await use(new AdminDashboardPage(page));
  },
  addEventPage: async ({ page }, use) => {
    await use(new AddEventPage(page));
  },
});

export { expect };
