export const seededUsers = {
  admin: {
    name: 'Seed Admin',
    email: process.env.SEED_ADMIN_EMAIL || 'admin@kindity.test',
    password: process.env.SEED_ADMIN_PASSWORD || 'admin123',
    role: 'admin' as const,
  },
  user: {
    name: 'Seed User',
    email: process.env.SEED_USER_EMAIL || 'user@kindity.test',
    password: process.env.SEED_USER_PASSWORD || 'user123',
    role: 'user' as const,
  },
};

export function uniqueEmail(prefix = 'e2e') {
  return `${prefix}.${Date.now()}.${Math.floor(Math.random() * 10000)}@kindity.test`;
}
