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

## Actual

- Non-numeric / fractional values reach Stripe as non-integer cents and fail unpredictably (often 500).
- No upper bound.

## Evidence

- UNIT-PAY / API-PAY `it.failing` / `test.fail` BUG-06

## Suggested fix

Validate `Number.isFinite`, `amount > 0`, `(amount * 100) % 1 === 0` (or round explicitly), and max (e.g. $10,000).
