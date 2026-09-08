# Requirements Traceability Matrix

## GitHub Issues

BUG-01 … BUG-10 were filed as issues #1 … #10. See [filed-issues.json](./issues/filed-issues.json).

## API routes × roles × tests

Expected status is the **secure/correct** behavior. Rows marked with BUG-xx currently misbehave; covering tests use expected-failure markers.

| Route | Method | Anon | User | Admin | Tests | Bug |
|-------|--------|------|------|-------|-------|-----|
| `/register` | POST | 201/400 | — | — | UNIT-AUTH-CTRL, INT-AUTH, API-AUTH | BUG-01 (role) |
| `/login` | POST | 200/401 | — | — | UNIT-AUTH-CTRL, INT-AUTH, API-AUTH, E2E-AUTH | BUG-10 (rate limit / errors) |
| `/logout` | POST | 200 | 200 | 200 | UNIT-AUTH-CTRL, INT-AUTH, API-AUTH, E2E-AUTH | |
| `/profile` | GET | 401 | 200 | 200 | UNIT-AUTH-CTRL, UNIT-AUTH-MW, API-AUTH | |
| `/api/users/donations` | GET | 401 | 200 | 200 | INT-RBAC, RBAC-10/11, UNIT-USER | |
| `/api/users/profile` | PUT | 401 | 200 | 200 | INT-RBAC, RBAC-12/13, UNIT-USER | BUG-08 |
| `/api/payment/create-payment-intent` | POST | 401 | 200* | 200* | INT-RBAC, RBAC-14, UNIT-PAY, API-PAY | BUG-06 |
| `/api/payment/webhook` | POST | 200/400† | — | — | INT-PAY, API-PAY, UNIT-PAY | BUG-07 |
| `/api/admin/donations` | GET | 401 | 403 | 200 | INT-RBAC, RBAC-20/21/22, E2E-ADMIN | |
| `/api/events` | GET | 200 | 200 | 200 | INT-CONTENT, CON, RBAC-01 | |
| `/api/events/:id` | GET | 200/404 | 200/404 | 200/404 | CON | |
| `/api/home-content` | GET | 200 | 200 | 200 | INT-CONTENT, CON, RBAC-02 | |
| `/api/about` | GET | 200 | 200 | 200 | CON, RBAC-05 | |
| `/api/blog` | GET | 200 | 200 | 200 | INT-CONTENT, CON, RBAC-03 | |
| `/api/news/:id` | GET | 200/404 | 200/404 | 200/404 | CON | |
| `/api/gallery` | GET | 200 | 200 | 200 | INT-CONTENT, CON, RBAC-04 | |
| `/kindity/donation` | GET | 200 | 200 | 200 | RBAC-06 | |
| `/kindity/donation` | POST | **401** | 401‡ | 201‡ | INT-RBAC, RBAC-30 | BUG-02 |
| `/kindity/donation/:id` | PUT/DELETE | **401** | 401‡ | 200‡ | INT-RBAC | BUG-02 |
| `/kindity/contact` | GET | 200 | 200 | 200 | RBAC-07 | |
| `/kindity/contact` | POST | **401** | 401‡ | 201‡ | RBAC-31 | BUG-02 |
| `/kindity/contact/:id` | PUT/DELETE | **401** | 401‡ | 200‡ | INT-RBAC | BUG-02 |
| `/kindity/home/events` | POST | 401 | 401 | **2xx** | INT-CONTENT, RBAC-40, E2E-ADMIN | BUG-03 |
| `/kindity/blog/news` | POST | 401 | 401 | **2xx** | INT-CONTENT, RBAC-41 | BUG-03 |

\* Valid amount + Stripe key.  
† Signature verification.  
‡ Desired after protect/isAdmin is added (not yet implemented).

## UI flows

| Flow | Spec | Bug |
|------|------|-----|
| Register → login → logout | E2E-AUTH `ui/specs/auth.spec.ts` | BUG-04 (Azure URL), BUG-05 (prod cookie) |
| Anon protected redirect | E2E-PROTECTED | BUG-09 (refresh race) |
| Donate → history | E2E-DONATION | BUG-06/07 (payment) |
| Admin sees all donations | E2E-ADMIN | |
| AddEvent creates event | E2E-ADMIN `test.fail` | BUG-03 |
| Admin reload stays on dashboard | E2E-SESSION `test.fail` | BUG-09 |
| Login 500 messaging | E2E-LOGIN-ERRORS `test.fail` | BUG-10 |

## Cookie / frontend config defects

| Finding | Evidence | Bug |
|---------|----------|-----|
| Hardcoded `http://localhost:3000` in Login, Register, Logout, AddEvent, AddNews, AdminDashboard, Home | `front/src/pages/*`, `FirstHeader.jsx` | BUG-04 |
| `sameSite: 'strict'` on auth cookie | `authControllers.ts` | BUG-05 |
| `donation.save()` not awaited | `donationRoute.ts` / `contactRoute.ts` | BUG-10 |
