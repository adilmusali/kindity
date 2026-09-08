# Session notes — Admin (Charter 03)

**Date:** 2026-09-08  
**Tester:** QA suite implementation pass  
**Duration:** ~30 minutes

## Findings

| ID | Severity | Note |
|----|----------|------|
| BUG-02 | Critical | `/kindity/donation` and `/kindity/contact` writes have no `protect` |
| BUG-03 | High | AddEvent/AddNews post to `/kindity/home/events` and `/kindity/blog/news` which are not mounted |
| BUG-04 | High | AdminDashboard and Add* pages use localhost |
| NEW | High | Admin Delete on events calls `DELETE /api/events/:id` but `eventsRoutes.ts` only defines GET — deletes 404 |
| NEW | High | Blog delete calls `DELETE /api/news/:id` but `newsRoutes.ts` only has GET `/:id` |
| NEW | Low | `Home.jsx` catch references undeclared `error` (`console.error(..., error)`), risking a secondary ReferenceError |

## Follow-ups

- File NEW items as separate issues after BUG-01…10 are created, or extend exploratory backlog.
- E2E-ADMIN covers dashboard listing via injected webhook donation.
