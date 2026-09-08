# BUG-04: Hardcoded `localhost:3000` breaks Azure frontend API calls

**Severity:** High  
**Component:** Login, Register, Logout (`FirstHeader`), AddEvent, AddNews, AdminDashboard, Home  
**Environment:** Azure Static Web Apps + Azure Web App API  
**Labels:** `bug`, `severity:high`, `area:frontend`

## Steps to reproduce

1. Deploy frontend to Azure SWA and API to Azure Web App.
2. Open the deployed site and attempt Login / Register.
3. Observe requests targeting `http://localhost:3000/...`.

## Expected

All API calls use `import.meta.env.VITE_API_URL` (as DonationHistory, Blog, Gallery already do).

## Actual

Auth and several pages call localhost; login/register fail in production.

## Evidence

Grep for `localhost:3000` under `front/src`. Traceability matrix cookie/frontend section.

## Suggested fix

Replace hardcoded URLs with `VITE_API_URL`; set the env var in SWA build settings.
