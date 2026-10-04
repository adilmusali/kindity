# BUG-09: Auth race on refresh — ProtectedRoute / AdminRoute bounce while user is null

**Severity:** Medium  
**Component:** `front/src/components/ProtectedRoute.jsx`, `AdminRoute.jsx`, `front/context/userContext.jsx`  
**Environment:** All (most visible on reload)  
**Labels:** `bug`, `severity:medium`, `area:frontend`

## Steps to reproduce

1. Log in as admin.
2. Navigate to `/admin/dashboard`.
3. Reload the page.

## Expected

Stay on the dashboard once `/profile` resolves.

## Actual

Initial render has `user === null` while `/profile` is in flight; `AdminRoute` redirects to `/`.

## Evidence

- Original E2E-SESSION regression reproduced BUG-09; now covered by passing browser tests.

## Suggested fix

Add `loading` state to UserContext; routes should wait (spinner) until profile fetch settles.

## Resolution

Implemented on `fix-bugs`: UserContext exposes session loading state, and both route guards wait for the initial profile request to settle. Unauthorized or failed profile requests then redirect normally. Bootstrap requests are cancelled on unmount and when login, logout, or a profile update supplies newer session state.

Regression coverage: `tests/ui/specs/session-refresh.spec.ts` checks delayed admin and user sessions on navigation and reload, access denial, profile request failures, and cancellation of stale responses after login. These tests use mocked API responses and do not require a seeded database.
