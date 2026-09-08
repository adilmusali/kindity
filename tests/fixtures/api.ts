import { APIRequestContext, request as playwrightRequest } from '@playwright/test';
import { seededUsers, uniqueEmail } from './users';

const API_URL = process.env.API_URL || 'http://localhost:3000';

export type AuthSession = {
  email: string;
  password: string;
  name: string;
  role: string;
  context: APIRequestContext;
};

async function loginContext(email: string, password: string): Promise<APIRequestContext> {
  const context = await playwrightRequest.newContext({
    baseURL: API_URL,
    extraHTTPHeaders: { Accept: 'application/json' },
  });
  const res = await context.post('/login', { data: { email, password } });
  if (!res.ok()) {
    throw new Error(`Login failed for ${email}: ${res.status()} ${await res.text()}`);
  }
  return context;
}

export async function createAnonContext(): Promise<APIRequestContext> {
  return playwrightRequest.newContext({
    baseURL: API_URL,
    extraHTTPHeaders: { Accept: 'application/json' },
  });
}

export async function createAdminSession(): Promise<AuthSession> {
  const { email, password, name, role } = seededUsers.admin;
  return {
    email,
    password,
    name,
    role,
    context: await loginContext(email, password),
  };
}

export async function createUserSession(): Promise<AuthSession> {
  const { email, password, name, role } = seededUsers.user;
  return {
    email,
    password,
    name,
    role,
    context: await loginContext(email, password),
  };
}

export async function registerFreshUser(
  overrides?: Partial<{ name: string; email: string; password: string; role: string }>
): Promise<AuthSession> {
  const anon = await createAnonContext();
  const name = overrides?.name || 'Fresh User';
  const email = overrides?.email || uniqueEmail('fresh');
  const password = overrides?.password || 'abcdef';
  const data: Record<string, string> = { name, email, password };
  if (overrides?.role) {
    data.role = overrides.role;
  }
  const res = await anon.post('/register', { data });
  if (!res.ok() && res.status() !== 201) {
    throw new Error(`Register failed: ${res.status()} ${await res.text()}`);
  }
  await anon.dispose();
  return {
    email,
    password,
    name,
    role: overrides?.role || 'user',
    context: await loginContext(email, password),
  };
}
