# BUG-10: Una waited CMS saves, no login rate limit, misleading login errors

**Severity:** Low  
**Component:** `donationRoute.ts` / `contactRoute.ts` (`save()` not awaited); `/login`; `Login.jsx` catch  
**Environment:** All  
**Labels:** `bug`, `severity:low`, `area:various`

## Steps to reproduce

1. **Una waited save:** `POST /kindity/donation` — response may return before Mongo write finishes; failures are silent.
2. **Rate limit:** Script rapid `POST /login` attempts — no throttling.
3. **Misleading errors:** Force `/login` to return 500 (or disconnect API); UI toast says “Invalid credentials”.

## Expected

- `await donation.save()` / `contact.save()` with error handling.
- Rate limiting on `/login`.
- Distinct messages for 401 vs 5xx/network.

## Actual

Fire-and-forget saves; unlimited login attempts; all Axios failures show invalid credentials.

## Evidence

- E2E-LOGIN-ERRORS `test.fail` BUG-10
- Code review of donation/contact routes

## Suggested fix

Await saves; add express-rate-limit on auth routes; branch toast on `error.response?.status`.
