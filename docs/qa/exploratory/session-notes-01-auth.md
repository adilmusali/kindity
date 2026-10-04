# Session notes — Auth (Charter 01)

**Date:** 2026-09-08  
**Tester:** QA suite implementation pass  
**Build:** local `main` after Jest/Playwright scaffolding  
**Duration:** ~40 minutes (code-backed exploration + spot checks)

## Environment

- Backend via `app.ts` / planned `start:test`
- Frontend Vite assumptions (`VITE_API_URL`)
- Seeded accounts from `scripts/seed.ts`

## Findings

| ID | Severity | Note |
|----|----------|------|
| BUG-01 | Critical | Confirmed in code: `role: role \|\| 'user'` |
| BUG-05 | High | Implemented: shared production cookie settings use `SameSite=None; Secure`; hosted browser verification pending |
| BUG-09 | Medium | Resolved: guards wait for session loading; E2E-SESSION covers slow reloads and denied access |
| BUG-04 | High | Login/Register/Logout hardcode `localhost:3000` while profile uses `VITE_API_URL` |
| NEW | Low | `userContext` swallows `/profile` errors with empty `.catch` — hard to diagnose session loss |

## Interesting observations

- Axios `withCredentials = true` is set globally in `main.jsx` — good for cookie auth when URL/CORS align.
- Register navigates to `/login` even though register already sets a cookie — extra step, not a defect.

## Follow-ups

- Automated coverage added under API-AUTH / E2E-AUTH / E2E-SESSION.
