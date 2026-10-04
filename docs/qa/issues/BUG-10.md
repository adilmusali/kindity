# BUG-10: Unawaited CMS saves, no login rate limit, misleading login errors

**Severity:** Low  
**Component:** `donationRoute.ts` / `contactRoute.ts` (`save()` not awaited); `/login`; `Login.jsx` catch  
**Environment:** All  
**Labels:** `bug`, `severity:low`, `area:various`

## Steps to reproduce

1. **Unawaited save:** `POST /kindity/donation` — response may return before Mongo write finishes; failures are silent.
2. **Rate limit:** Script rapid `POST /login` attempts — no throttling.
3. **Misleading errors:** Force `/login` to return 500 (or disconnect API); UI toast says “Invalid credentials”.

## Expected

- `await donation.save()` / `contact.save()` with error handling.
- Rate limiting on `/login`.
- Distinct messages for 401 vs 5xx/network.

## Actual

Fire-and-forget saves; unlimited login attempts; all Axios failures show invalid credentials.

## Evidence

- Original E2E-LOGIN-ERRORS regression reproduced BUG-10; now covered by passing browser tests.
- Code review of donation/contact routes

## Suggested fix

Await saves; add express-rate-limit on auth routes; branch toast on `error.response?.status`.

## Resolution

Implemented on `fix-bugs`:

- Donation/contact creation waits for MongoDB persistence before returning the existing 200 success response. Required-field validation failures return 400; unexpected save failures return controlled 500 responses without database details. Only header and desc are accepted for creation.
- POST /login limits each client IP to 20 failed attempts within 15 minutes. Successful requests do not consume the allowance. Further attempts return 429 JSON, standard rate-limit headers, and Retry-After.
- Login displays distinct messages for invalid credentials (401), throttling (429), server failures (5xx), and network failures. Submission is re-enabled after errors.

The limiter uses an in-memory store per server process. Multiple replicas need a shared store for a combined allowance. Deployments behind a reverse proxy must configure Express trust proxy for the actual trusted proxy topology; forwarded client headers are not blindly trusted by default.

Validation: all 128 backend tests pass, including delayed CMS persistence, validation/save failures, route-level throttling, and successful-login exclusion. All 11 focused browser tests for BUG-09/BUG-10 pass with mocked API responses. Backend TypeScript checking and the frontend production build pass. No database migration is required.
