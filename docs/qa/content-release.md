# Content cleanup release checklist

This checklist covers the illustrative content migration and public copy. Run it separately for each target database. Do not run the content migration against a deployed database until the dry-run output has been reviewed.

## Workspace verification, 3 October 2026

- Frontend and backend production builds passed.
- The isolated Playwright content suite passed all five checks; its API responses are mocked, so it does not verify a deployed database.
- Playwright test TypeScript checking passed. Desktop home and mobile story screenshots were reviewed; the dark feature section's text contrast was improved afterward.
- Offline content API schemas compiled with Ajv. Direct model validation accepted the 2024 leap day and rejected invalid event dates.
- Backend Jest and live API contracts remain unverified on this Windows host. The installed native Jest resolver cannot load, and `mongodb-memory-server` reports that the Visual C++ runtime is missing. No local MongoDB or Docker executable is available.
- No deployed database migration was run. Migration counts, skipped record IDs, and rollback ID must be filled in for the target database during release.

## Before deployment

- [ ] Review `front/src/content/siteCopy.js` and `back/scripts/data/demoContent.ts` with the organization. The current stories, testimonial, events, and figures are examples.
- [ ] Build the backend and frontend: `npm run build --prefix back` and `npm run build --prefix front`.
- [ ] Run backend checks: `npm test --prefix back`.
- [ ] With the test MongoDB and services available, run `npm run test:api --prefix tests`.
- [ ] Run the isolated public-content browser check without a database: set `CONTENT_MOCK_MODE=1`, then run `npm run test:ui --prefix tests -- content.spec.ts`.
- [ ] Inspect `/`, `/about`, `/blog`, `/contact`, `/event`, and direct `/blog/:id` and `/event/:id` URLs at desktop and mobile widths. Check an empty story list, missing or malformed dates, and mixed demo and confirmed real records.

## Migration review

1. Set `DB_URL` to the intended database and run `npm run migrate:demo-content --prefix back`. This is a dry run and makes no content changes.
2. Save the full JSON output and review each `from` and `to` pair. Only exact, unique matches to old seed fixtures should appear. Edited and ambiguous records stay unchanged.
3. Record the dry-run counts below. Keep a separate list of intentionally skipped records for later editorial review.
4. After review, run `npm run migrate:demo-content --prefix back -- --apply` and save the resulting `migrationId` and output. Repeating the apply command should report zero matches.
5. Confirm the updated public pages and compare user and donation counts before and after. Originals are stored in the `contentMigrationBackups` MongoDB collection under the printed `migrationId`.
6. To restore, preview with `npm run migrate:demo-content --prefix back -- --rollback=<migrationId>`; apply the restore by adding `--apply`.

| Release record | Value |
|---|---|
| Database/environment | _Record at release time_ |
| Dry-run date and reviewer | _Record at release time_ |
| Reviewed legacy patterns | _From dry-run JSON_ |
| Matched records | _From dry-run JSON_ |
| Ambiguous patterns skipped | _From dry-run JSON_ |
| Edited or unrelated records skipped | _List identifiers separately; the script does not infer their provenance_ |
| Applied records | _From apply JSON_ |
| Rollback ID | _From apply JSON_ |
| Rollback location | `contentMigrationBackups` collection in the target database |
| User and donation counts before/after | _Record at release time_ |
| Public-page review result | _Record at release time_ |

## Replacing examples with verified material

Obtain approved organization text, imagery rights, author attribution, dates, and figure sources before publishing. Set `isDemo: false` only for confirmed real content; leave it absent for unreviewed records. Store event dates as valid `YYYY-MM-DD` strings, and omit unknown dates. Replace the sample record in the relevant content collection with an approved record or use a future mounted publishing route. The current Add Event and Add News forms are not mounted write routes. Do not relabel donor records or run the seed script as a content migration; it also updates seeded user credentials.

Update public copy and contact details only when the organization provides verified wording and a monitored contact channel. Remove or replace illustrative figures and testimonials after verification, keeping the migration originals until the release is accepted.
