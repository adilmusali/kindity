# BUG-03: AddEvent / AddNews post to unavailable routes

**Severity:** High  
**Component:** `front/src/pages/AddEvent.jsx`, `AddNews.jsx`; `back/routes/eventsRoutes.ts`, `newsRoutes.ts`
**Environment:** All  
**Labels:** `bug`, `severity:high`, `area:admin`

## Steps to reproduce

1. Log in as admin.
2. Open `/addEvent`, submit a valid form.
3. Submit a valid event and observe the request.
4. Repeat on `/addNews` with valid story details.

## Expected

2xx and new content appears on Events / Blog.

## Actual

The admin forms posted to API routes that were not mounted, returning 404 without useful feedback.

## Evidence

- INT-CONTENT authorization, validation, and persistence coverage
- RBAC-40…45 API authorization coverage
- E2E-ADMIN event and news creation flows

## Resolution

Add admin-protected creation handlers to `/api/events` and `/api/news`, connect both forms using `VITE_API_URL`, and show save success or failure.
