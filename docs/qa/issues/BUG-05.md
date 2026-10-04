# BUG-05: Auth cookie `sameSite: 'strict'` blocks cross-site sessions

**Severity:** High  
**Component:** `back/controllers/authControllers.ts`  
**Environment:** Production (frontend and API on different sites)
**Labels:** `bug`, `severity:high`, `area:auth`

## Steps to reproduce

1. Host the frontend and API on different sites (e.g. `app.example.org` and `api.example.net`).
2. Log in successfully (API sets `Set-Cookie`).
3. SPA calls `/profile` or `/api/users/donations` with `credentials: 'include'`.

## Expected

Session cookie is sent on cross-site XHR (`SameSite=None; Secure`).

## Original behavior

Cookie uses `sameSite: 'strict'`, so the browser withholds it on cross-site requests; user appears logged out.

## Regression coverage

- UNIT-AUTH-CTRL: production registration uses `SameSite=None; Secure` (normal passing test).
- INT-AUTH: registration, login, and logout serialize matching cookie flags in production and local test mode; `/profile` accepts a supplied session cookie and rejects the cleared cookie.
- INT-AUTH: credentialed CORS responses use the configured frontend origin.

Validation on 2026-10-04: both auth suites passed (23 tests), and `tsc --noEmit` passed.

## Resolution

Registration, login, and logout share cookie settings in `authControllers.ts`. Production uses `SameSite=None; Secure; HttpOnly; Path=/`. Local development and tests use `SameSite=Strict; HttpOnly; Path=/` without `Secure`. Registration and login keep the one-day lifetime; logout expires the cookie immediately without a positive `Max-Age`.

## Deployment requirements

- Set backend `NODE_ENV=production` and serve both frontend and API over HTTPS.
- Build the frontend with `VITE_API_URL` pointing to the HTTPS API origin.
- Set backend `CLIENT_URL` to the exact frontend origin (scheme, hostname, and optional port, without a trailing slash). Credentialed CORS requires an explicit origin rather than `*`.
- Axios already uses `withCredentials=true` globally. Other clients must use `credentials: 'include'` or the equivalent.

## Browser verification on separate HTTPS sites

1. Register or log in from the hosted frontend; confirm the API sets `token` with `SameSite=None`, `Secure`, `HttpOnly`, and `Path=/`.
2. Call `/profile` and `/api/users/donations`; confirm the browser sends the cookie and the API returns 200.
3. Log out; confirm the cookie expires and subsequent `/profile` requests return 401.

This hosted browser check is pending. The HTTP regression tests verify headers and server behavior but do not simulate browser cookie policy. Browsers that block third-party cookies may still block sessions across separate sites.
