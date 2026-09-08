# Kindity Test Plan

## 1. Purpose

Provide automated and exploratory coverage for Kindity’s donation platform so regressions in authentication, authorization, payments, and content APIs are caught before Azure deploy.

## 2. Scope

### In scope

- Backend unit tests (controllers, middleware)
- Backend integration tests (Express routes + Mongo)
- Playwright API tests (auth, RBAC matrix, payments, JSON contracts)
- Playwright UI E2E (register/login/donate/admin/session)
- CI gating of Azure API and Static Web Apps deploys
- Defect documentation for known bugs BUG-01 … BUG-10

### Out of scope

- Fixing the 10 known bugs (documented only)
- Load/performance testing
- Mobile-native clients
- Production Stripe live-mode charges

## 3. Test pyramid

| Layer | Tooling | Location |
|-------|---------|----------|
| Unit | Jest + mocks | `back/tests/unit` |
| Integration | Jest + supertest + mongodb-memory-server | `back/tests/integration` |
| API | Playwright request | `tests/api` |
| UI E2E | Playwright Chromium + POM | `tests/ui` |
| Exploratory | Charters / session notes | `docs/qa/exploratory` |

## 4. Environments

| Env | Frontend | Backend | DB | Stripe |
|-----|----------|---------|----|--------|
| Local Jest | n/a | in-process `app.ts` | memory server | mocked / `whsec_test` |
| Local Playwright | Vite `:5173` | `start:test` `:3000` | Mongo `kindity_test` | test keys or skip |
| CI | Vite via webServer | `start:test` | `mongo:7` service | secrets or dummy + skip |

## 5. Entry criteria

- `back` and `front` install cleanly on Node 20
- Mongo available for Playwright (CI service or local Docker)
- JWT secret configured for test runs

## 6. Exit criteria

- All Jest suites green (including `it.failing` known bugs)
- All Playwright suites green (including `test.fail` known bugs)
- Deploy workflows only proceed after the reusable test workflow succeeds
- BUG-01…10 filed (or markdown ready) with severity and reproduction

## 7. Known-bug policy

Bug-revealing assertions use expected-failure markers linked to `BUG-0X`. An unexpected pass (bug fixed) fails CI until the marker is removed and the issue is closed.

## 8. Risks

| Risk | Mitigation |
|------|------------|
| No Stripe secrets in CI | Payment create-intent / card E2E skip; webhook uses self-signed events |
| Hardcoded `localhost:3000` in some UI pages | Local E2E still works; BUG-04 documents Azure breakage |
| Docker Desktop unavailable on some workstations | Jest still runs; Playwright documented as needing Mongo |
| `sameSite: strict` vs split Azure domains | BUG-05; local same-site localhost ports still send cookies |

## 9. Defect workflow

1. Failing new test without `fail`/`failing` marker → open issue, optional convert to known-bug marker if deferred
2. Known bug fixed in product → remove marker, close issue, keep assertion
3. File issues via `scripts/file-issues.ps1` from `docs/qa/issues/*.md`
