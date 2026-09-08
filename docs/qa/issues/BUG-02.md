# BUG-02: Unauthenticated write endpoints on donation and contact CMS routes

**Severity:** Critical  
**Component:** `back/routes/Donation/donationRoute.ts`, `back/routes/Contact/contactRoute.ts`  
**Environment:** All  
**Labels:** `bug`, `severity:critical`, `area:rbac`

## Steps to reproduce

1. Without cookies, `POST /kindity/donation` with `{ "header": "x", "desc": "y" }`.
2. `DELETE /kindity/donation/:id` for an existing document.
3. Repeat for `/kindity/contact`.

## Expected

401 Unauthorized (writes require auth; destructive writes require admin).

## Actual

Anonymous callers can create, update, and delete site content.

## Evidence

- INT-RBAC `it.failing` BUG-02
- RBAC-30/31 `test.fail`

## Suggested fix

Apply `protect` (and `isAdmin` for PUT/DELETE) to write methods; keep public GET if intentional.
