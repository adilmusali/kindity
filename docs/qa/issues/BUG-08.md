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

409 with a JSON error about duplicate email; other database failures return controlled 500 responses.

## Original behavior

Mongo duplicate-key error is uncaught (no try/catch); request can hang or yield a raw 500 without a controlled body. Same missing try/catch on `getDonationHistory`.

## Regression coverage

- UNIT-USER: duplicate email returns 409 and leaves the stored email unchanged; lookup and history query failures return controlled 500 responses.
- INT-USER: duplicate email preserves both stored profiles; invalid data returns 400; valid updates still succeed without exposing passwords; save/history failures return 500 and later requests can succeed.

Validation on 2026-10-04: five targeted payment/user suites passed (66 tests), and backend `tsc --noEmit` passed. HTTP tests use in-process Express and temporary MongoDB databases.

## Resolution

Both handlers catch query and save failures. Profile updates map Mongo duplicate-key errors (`11000`) to 409, model validation errors to 400, and unexpected failures to a generic JSON 500 response. Donation history failures return a generic JSON 500 response. Database details are logged server-side rather than sent to the client.

Successful responses, donation filtering/sorting, and the existing missing-user 400 response are preserved. No schema migration, API route change, or infrastructure change is required.
