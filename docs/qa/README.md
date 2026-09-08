# Kindity QA Guide

## Quick start

### Backend unit and integration tests

```bash
cd back
npm ci
npm test
```

Uses `mongodb-memory-server` (no Docker required).

### Playwright API + UI

1. Start MongoDB (Docker Desktop or local):

```bash
docker run -d --name kindity-mongo -p 27017:27017 mongo:7
```

2. Copy env examples:

```bash
cp tests/.env.example tests/.env
cp back/.env.example back/.env
cp front/.env.example front/.env
```

Fill Stripe test keys in `tests/.env` for live payment E2E; leave placeholders to skip Stripe-dependent cases.

3. Install and run:

```bash
cd back && npm ci
cd ../front && npm ci
cd ../tests && npm ci
npx playwright install chromium
npx playwright test
```

Useful filters:

```bash
npx playwright test --project=api
npx playwright test --project=ui
npx playwright test --ui
npx playwright show-report
```

### Seed data

```bash
cd back
# DB_URL must point at your Mongo instance
npm run seed
```

Default seeded accounts:

| Role  | Email               | Password  |
|-------|---------------------|-----------|
| admin | admin@kindity.test  | admin123  |
| user  | user@kindity.test   | user123   |

## Known-bug policy

Tests that document open defects use:

- Jest: `it.failing('BUG-0X: ...')`
- Playwright: `test.fail('BUG-0X: ...')`

CI stays green while the bug exists. When the product is fixed, those tests start failing until the `failing`/`fail` marker is removed.

## Artifacts

- Jest coverage: `back/coverage`
- Playwright HTML report: `tests/playwright-report`
- Traces/videos on failure: `tests/test-results`

## Docs in this folder

- [test-plan.md](./test-plan.md)
- [traceability-matrix.md](./traceability-matrix.md)
- [issues/](./issues/) — BUG-01 … BUG-10
- [exploratory/](./exploratory/) — charters and session notes
