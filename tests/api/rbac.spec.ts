import { test, expect } from '../fixtures/pages';
import { rbacMatrix } from './rbac.matrix';
import type { APIRequestContext } from '@playwright/test';
import type { AuthSession } from '../fixtures/api';

async function contextFor(
  role: 'anon' | 'user' | 'admin',
  asAnon: APIRequestContext,
  asUser: AuthSession,
  asAdmin: AuthSession
): Promise<APIRequestContext> {
  if (role === 'anon') return asAnon;
  if (role === 'user') return asUser.context;
  return asAdmin.context;
}

for (const c of rbacMatrix) {
  const title = `${c.id} ${c.role} ${c.method} ${c.path} -> ${c.expectedStatus}${c.knownBug ? ` [${c.knownBug}]` : ''}`;
  const run = async ({
    asAnon,
    asUser,
    asAdmin,
  }: {
    asAnon: APIRequestContext;
    asUser: AuthSession;
    asAdmin: AuthSession;
  }) => {
    const ctx = await contextFor(c.role, asAnon, asUser, asAdmin);
    const res = await ctx.fetch(c.path, {
      method: c.method,
      data: c.body,
    });
    expect(res.status()).toBe(c.expectedStatus);
  };

  if (c.knownBug) {
    test.fail(title, run);
  } else {
    test(title, run);
  }
}
