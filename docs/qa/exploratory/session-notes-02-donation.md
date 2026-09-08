# Session notes — Donation (Charter 02)

**Date:** 2026-09-08  
**Tester:** QA suite implementation pass  
**Duration:** ~35 minutes (static + controller review)

## Findings

| ID | Severity | Note |
|----|----------|------|
| BUG-06 | Medium | `amount * 100` without integer/upper-bound checks |
| BUG-07 | Medium | Webhook catch logs DB errors then still `res.send()` |
| NEW | Medium | Anonymous donate: `DonationForm` posts without handling 401 — UI can stick in “Processing…” because `setIsProcessing(false)` is skipped when `axios.post` throws before the payment result branch |
| NEW | Low | Name/email collected in form are not sent to create-payment-intent (only used in `confirmCardPayment` billing_details) |

## Oracles exercised conceptually

- Idempotent unique index on `stripePaymentId` — duplicate webhook keeps one row (covered by INT-PAY / API-PAY).

## Follow-ups

- E2E donation skips without real Stripe keys; webhook injection path covers history without Elements when keys absent.
