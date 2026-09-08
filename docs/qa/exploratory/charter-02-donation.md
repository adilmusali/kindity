# Charter 02 — Donation and Stripe

## Mission

Explore the donation form, payment intent creation, Stripe Elements, webhook persistence, and donation history.

## Time box

45–60 minutes

## Charter questions

- What happens when amount is empty, zero, negative, fractional, or huge?
- Can an anonymous user start a donation? What does the UI show on 401?
- After a successful test-card payment, does history update (with webhook)?
- Does a duplicate webhook create duplicate history rows?

## Oracles

- Only authenticated users create payment intents
- History amounts match charged dollars
- Stripe payment IDs unique in DB

## Areas / notes

`DonationForm.jsx`, `paymentController.ts`, `DonationHistory.jsx`.
Optional local: `stripe listen --forward-to localhost:3000/api/payment/webhook`.
