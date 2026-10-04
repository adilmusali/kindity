# BUG-07: Webhook swallows DB errors and still returns 200

**Severity:** Medium  
**Component:** `handleStripeWebhook` in `paymentController.ts`  
**Environment:** All  
**Labels:** `bug`, `severity:medium`, `area:payment`

## Steps to reproduce

1. Send a signed `payment_intent.succeeded` webhook whose `metadata.userId` cannot be saved (or force `save()` to throw).
2. Observe HTTP status and Stripe retry behavior.

## Expected

5xx so Stripe retries; donation eventually persisted.

## Original behavior

Error is logged; handler still `res.send()` (200). Stripe will not retry; donation is lost.

## Regression coverage

- UNIT-PAY: failed saves return 500 without acknowledging success; a retried event saves one donation.
- INT-PAY: local signed webhook payloads cover save failure, retry, repeated and concurrent deliveries, and unrelated duplicate-key errors.
- API-PAY: the invalid-user metadata case runs as a normal regression test.

Validation on 2026-10-04: five targeted payment/user suites passed (66 tests), and backend `tsc --noEmit` passed. Webhooks were signed locally; hosted Playwright and live Stripe delivery were not run.

## Resolution

Return 500 with a controlled JSON error when donation persistence fails so the sender can retry. A duplicate-key error is acknowledged with 200 only when its index and conflicting value identify the same `stripePaymentId`. Other database errors remain failures.

Successful and ignored events retain their existing 200 response; invalid signatures still return 400. The existing unique `stripePaymentId` index must remain enabled for concurrent delivery safety. No schema migration or frontend change is required.
