# BUG-03: AddEvent / AddNews post to commented-out routes (404)

**Severity:** High  
**Component:** `front/src/pages/AddEvent.jsx`, `AddNews.jsx`; `back/server.ts`  
**Environment:** All  
**Labels:** `bug`, `severity:high`, `area:admin`

## Steps to reproduce

1. Log in as admin.
2. Open `/addEvent`, submit a valid form.
3. Observe network call to `POST /kindity/home/events`.
4. Repeat with `/addNews` → `/kindity/blog/news`.

## Expected

2xx and new content appears on Events / Blog.

## Actual

Routes are commented out / removed in `server.ts`; API returns 404. Admin forms silently fail.

## Evidence

- INT-CONTENT `it.failing` BUG-03
- RBAC-40/41 `test.fail`
- E2E-ADMIN `test.fail` BUG-03

## Suggested fix

Restore admin-protected POST routes (or point UI at current `/api/events` / blog write APIs) and use `VITE_API_URL`.
