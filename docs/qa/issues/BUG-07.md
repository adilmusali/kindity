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

## Actual

Error is logged; handler still `res.send()` (200). Stripe will not retry; donation is lost.

## Evidence

- UNIT-PAY / API-PAY `it.failing` / `test.fail` BUG-07

## Suggested fix

On DB failure return 500; treat duplicate `stripePaymentId` as success (idempotent 200).
