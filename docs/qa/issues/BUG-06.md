# BUG-06: Payment amount validation gaps (`amount * 100`)

**Severity:** Medium  
**Component:** `back/controllers/paymentController.ts`  
**Environment:** All  
**Labels:** `bug`, `severity:medium`, `area:payment`

## Steps to reproduce

1. Authenticate.
2. `POST /api/payment/create-payment-intent` with amounts: `"abc"`, `0.001`, `10.555`, `1e10`.

## Expected

400 with clear validation error; only positive amounts with at most 2 decimal places and a sane upper bound.

## Original behavior

- Non-numeric / fractional values reach Stripe as non-integer cents and fail unpredictably (often 500).
- No upper bound.

## Regression coverage

- UNIT-PAY: invalid types, non-finite values, excess precision, and amount bounds are rejected before calling Stripe; valid decimals become exact integer cents.
- INT-PAY: authenticated HTTP requests exercise invalid JSON values and valid amounts with Stripe mocked.
- API-PAY: BUG-06 cases run as normal tests instead of expected failures.

Validation on 2026-10-04: payment unit and HTTP integration suites passed (48 tests, Stripe mocked), backend `tsc --noEmit` passed, and the frontend production build passed. Playwright API cases were updated but were not run against a hosted API.

## Resolution

Require a finite JSON number greater than zero and at most $10,000 USD. Numeric strings are rejected. Round to integer cents, then require that converting those cents back to dollars matches the original amount. This rejects excess precision while correctly accepting ordinary decimals such as `0.29` whose multiplication by 100 can contain floating-point noise.

Invalid amounts return 400 with a validation error before Stripe is initialized or called. Valid requests keep the existing `clientSecret` response. Stripe may apply its own payment minimums or other restrictions after validation.

The donation form uses `min=0.01`, `max=10000`, and `step=0.01` to match these amount rules. No schema, migration, or infrastructure changes are required.
