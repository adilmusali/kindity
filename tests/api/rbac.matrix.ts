export type Role = 'anon' | 'user' | 'admin';

export type RbacCase = {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  role: Role;
  expectedStatus: number;
  body?: Record<string, unknown>;
  knownBug?: string;
};

/** Representative matrix: every mounted route family x role. */
export const rbacMatrix: RbacCase[] = [
  // Public reads
  { id: 'RBAC-01', method: 'GET', path: '/api/events', role: 'anon', expectedStatus: 200 },
  { id: 'RBAC-02', method: 'GET', path: '/api/home-content', role: 'anon', expectedStatus: 200 },
  { id: 'RBAC-03', method: 'GET', path: '/api/blog', role: 'anon', expectedStatus: 200 },
  { id: 'RBAC-04', method: 'GET', path: '/api/gallery', role: 'anon', expectedStatus: 200 },
  { id: 'RBAC-05', method: 'GET', path: '/api/about', role: 'anon', expectedStatus: 200 },
  { id: 'RBAC-06', method: 'GET', path: '/kindity/donation', role: 'anon', expectedStatus: 200 },
  { id: 'RBAC-07', method: 'GET', path: '/kindity/contact', role: 'anon', expectedStatus: 200 },

  // Auth-required
  { id: 'RBAC-10', method: 'GET', path: '/api/users/donations', role: 'anon', expectedStatus: 401 },
  { id: 'RBAC-11', method: 'GET', path: '/api/users/donations', role: 'user', expectedStatus: 200 },
  { id: 'RBAC-12', method: 'PUT', path: '/api/users/profile', role: 'anon', expectedStatus: 401, body: { name: 'X' } },
  { id: 'RBAC-13', method: 'PUT', path: '/api/users/profile', role: 'user', expectedStatus: 200, body: { name: 'Updated User' } },
  { id: 'RBAC-14', method: 'POST', path: '/api/payment/create-payment-intent', role: 'anon', expectedStatus: 401, body: { amount: 25 } },

  // Admin
  { id: 'RBAC-20', method: 'GET', path: '/api/admin/donations', role: 'anon', expectedStatus: 401 },
  { id: 'RBAC-21', method: 'GET', path: '/api/admin/donations', role: 'user', expectedStatus: 403 },
  { id: 'RBAC-22', method: 'GET', path: '/api/admin/donations', role: 'admin', expectedStatus: 200 },

  // BUG-02: writes without protect
  {
    id: 'RBAC-30',
    method: 'POST',
    path: '/kindity/donation',
    role: 'anon',
    expectedStatus: 401,
    body: { header: 'H', desc: 'D' },
    knownBug: 'BUG-02',
  },
  {
    id: 'RBAC-31',
    method: 'POST',
    path: '/kindity/contact',
    role: 'anon',
    expectedStatus: 401,
    body: { header: 'H', desc: 'D' },
    knownBug: 'BUG-02',
  },

  // BUG-03: commented-out write routes
  {
    id: 'RBAC-40',
    method: 'POST',
    path: '/kindity/home/events',
    role: 'admin',
    expectedStatus: 201,
    body: { img: 'https://example.com/e.jpg', header: 'E', desc: 'D' },
    knownBug: 'BUG-03',
  },
  {
    id: 'RBAC-41',
    method: 'POST',
    path: '/kindity/blog/news',
    role: 'admin',
    expectedStatus: 201,
    body: {
      header: 'N',
      desc: 'D',
      img: 'https://example.com/n.jpg',
      category1: 'a',
      category2: 'b',
      category3: 'c',
      category4: 'd',
      user: 'admin',
    },
    knownBug: 'BUG-03',
  },
];
