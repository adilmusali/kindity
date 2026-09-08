# BUG-01: Privilege escalation — `/register` accepts `role` from body

**Severity:** Critical  
**Component:** `back/controllers/authControllers.ts` (`registerUser`)  
**Environment:** All (local, Azure)  
**Labels:** `bug`, `severity:critical`, `area:auth`

## Steps to reproduce

1. `POST /register` with JSON body including `"role": "admin"`.
2. Log in as that user.
3. `GET /api/admin/donations`.

## Expected

Role is forced to `user`. Admin endpoints return 403.

## Actual

User is stored with `role: "admin"` and can access admin APIs.

## Evidence

- UNIT-AUTH-CTRL `it.failing` BUG-01
- API-AUTH `test.fail` BUG-01

## Suggested fix

Ignore `role` from the request body; always set `role: 'user'`. Promote admins only via seed/admin tooling.
