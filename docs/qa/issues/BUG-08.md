# BUG-08: Unhandled async errors in profile update / donation history

**Severity:** Medium  
**Component:** `back/controllers/userController.ts`  
**Environment:** All  
**Labels:** `bug`, `severity:medium`, `area:users`

## Steps to reproduce

1. Create two users.
2. As user A, `PUT /api/users/profile` with user B’s email.
3. Observe the HTTP response.

## Expected

400/409 with a JSON error about duplicate email.

## Actual

Mongo duplicate-key error is uncaught (no try/catch); request can hang or yield a raw 500 without a controlled body. Same missing try/catch on `getDonationHistory`.

## Evidence

- UNIT-USER `it.failing` BUG-08

## Suggested fix

Wrap handlers in try/catch; map Mongo `11000` to 409.
