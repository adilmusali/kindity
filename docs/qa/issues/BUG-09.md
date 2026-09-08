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

- E2E-SESSION `test.fail` BUG-09

## Suggested fix

Add `loading` state to UserContext; routes should wait (spinner) until profile fetch settles.
