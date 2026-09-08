# BUG-05: Auth cookie `sameSite: 'strict'` blocks cross-site Azure domains

**Severity:** High  
**Component:** `back/controllers/authControllers.ts`  
**Environment:** Production (frontend and API on different Azure hostnames)  
**Labels:** `bug`, `severity:high`, `area:auth`

## Steps to reproduce

1. Host SPA and API on different sites (e.g. `*.azurestaticapps.net` vs `*.azurewebsites.net`).
2. Log in successfully (API sets `Set-Cookie`).
3. SPA calls `/profile` or `/api/users/donations` with `credentials: 'include'`.

## Expected

Session cookie is sent on cross-site XHR (`SameSite=None; Secure`).

## Actual

Cookie uses `sameSite: 'strict'`, so the browser withholds it on cross-site requests; user appears logged out.

## Evidence

- UNIT-AUTH-CTRL `it.failing` BUG-05

## Suggested fix

In production: `sameSite: 'none', secure: true`. Keep stricter settings for same-origin local dev if desired.
