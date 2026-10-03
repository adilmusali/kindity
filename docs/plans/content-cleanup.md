# Kindity content cleanup plan

## Goal and scope

Replace unrelated template copy and misleading claims with coherent charity content. Clearly identify fictional stories, testimonials, and illustrative figures. Render dates from content records and remove engagement features that have no supporting data.

This plan covers public content, sample data, and the small model/API additions needed to display them. It assumes that newly supplied stories are fictional examples because no verified organization content has been provided. Real donor records must never be relabeled as demo content.

Existing layout and technology can support this work. No new service, package, or deployment infrastructure is required. Payment behavior, broad visual redesign, and the existing auth/CRUD defects are separate work.

## Findings that affect implementation

- Home copy mentions blank cassettes; section introductions mention the French Revolution, astronomy, and Las Vegas hotels.
- The blog hero, sidebar, related posts, and article body contain unrelated template material. `BlogDetail.jsx` duplicates sidebar markup and repeats `data.desc` several times.
- Contact details include `support@colorlib.com`, a sample phone number, and an unverified address. The contact form has no submission integration.
- Home and event listings show February 2017. Event detail has a different fixed date, venue, and city. The event model has no event-date or location fields.
- Blog listing forces the month to June; article detail uses December 2017. Both display fabricated views/comments, and article detail includes fictional reader comments.
- Seeded stories, testimonials, and impact figures are not identified as samples. Currency displays append `M` or `k` regardless of stored units; cause progress always shows 75%.
- `seedIfEmpty` does not update existing records. The same seed script also resets seeded user credentials, making it unsuitable as a general content migration.

## Ordered implementation tasks

### 1. Define replacement copy and demo-label rules

- **Objective:** Establish one consistent editorial direction before changing rendering or data.
- **Files:** New `front/src/content/siteCopy.js`; copy inventory in this plan; sample definitions used by `back/scripts/seed.ts`.
- **Implementation:** Use food support, education, and community volunteering as story themes. Describe example activities without asserting actual beneficiaries, completed projects, or donations. Use a reusable “Demo story” / “Sample figures” label with the explanation “Illustrative content for this demonstration.” Keep static page copy separate from database story content.
- **Dependencies:** None.
- **Tests:** Editorial review; no automated tests for individual prose strings.
- **Completion:** Every replacement has an agreed location, source, and disclosure label. Unverified contact details and unsupported impact claims have no replacements that imply they are real.

Suggested copy:

| Location | Replacement |
|---|---|
| Home headline | “Small acts of kindness. Stronger communities.” (`front/src/content/siteCopy.js`; static copy) |
| Home introduction | “Explore example projects supporting food access, education, and community care.” (`front/src/content/siteCopy.js`; static copy) |
| Blog hero and introduction | “Stories of community and care” and “Illustrative stories about volunteering, sharing resources, and supporting neighbors.” (`front/src/content/siteCopy.js`; static copy) |
| Example story | “Inside a community food drive”; an example team sorts supplies and prepares food parcels. Stored in `back/scripts/data/demoContent.ts` with `isDemo: true`; it does not assert a completed project or verified beneficiaries. |
| Contact notice | “This demonstration does not provide a monitored contact channel.” (`front/src/content/siteCopy.js`; static copy) |
| Sample figures and testimonials | Illustrative zero-value figures and an example volunteer testimonial, stored in `back/scripts/data/demoContent.ts` with `isDemo: true`. |

Reusable label and disclosure strings are exported as `siteCopy.demoLabel`, `siteCopy.sampleFiguresLabel`, and `siteCopy.demoExplanation`. Missing database metadata means unreviewed. These approved strings are the copy inventory for rendering work in later tasks.

The shared fresh-install fixtures live in `back/scripts/data/demoContent.ts`. To inspect a migration, run `npm run migrate:demo-content --prefix back`; apply after reviewing the printed changes with `npm run migrate:demo-content --prefix back -- --apply`. Original content is stored in the `contentMigrationBackups` collection. The output prints a rollback ID; inspect its rollback dry run with `npm run migrate:demo-content --prefix back -- --rollback=<id>`, then restore with `npm run migrate:demo-content --prefix back -- --rollback=<id> --apply`. The migration only accesses the listed content collections and does not modify users or donation history.

### 2. Add compatible content metadata

- **Objective:** Make sample provenance and event dates explicit in stored data.
- **Files:** `back/models/Home/{events,causes,stat,welcome,testimonial}Model.ts`, `back/models/Blog/{news,options}Model.ts`; corresponding API schemas under `tests/api/schemas/`.
- **Implementation:** Add optional `isDemo` metadata to these content models. `true` means sample; `false` is assigned only to confirmed real content. Missing metadata means unreviewed, not verified. Add optional `eventDate` as a validated `YYYY-MM-DD` calendar date; preserve it as a date without timezone conversion. Missing dates remain unknown. Existing GET endpoints should return the additive fields through their current model serialization. Do not use `createdAt` as the event date. Hide the current hardcoded venue/city rather than inventing location data.
- **Dependencies:** Task 1.
- **Tests:** Model/API checks for optional fields, valid/invalid calendar dates, and legacy records without metadata. Extend contract schemas without adding new required fields.
- **Completion:** Existing records remain readable, metadata survives storage and retrieval, and no fabricated dates or locations are introduced.

### 3. Prepare sample content and a safe migration

- **Objective:** Make fresh installations and existing demo databases show the same approved content.
- **Files:** `back/scripts/seed.ts`; new content fixture module, such as `back/scripts/data/demoContent.ts`; new `back/scripts/migrateDemoContent.ts`; `back/package.json` for an explicit migration command.
- **Implementation:** Give new demo fixtures stable identifiers and `isDemo: true`. Replace unrelated seeded stories/categories and label illustrative statistics/testimonials. Remove relative promises such as “this weekend.” Leave sample event dates absent unless explicitly supplied. Build a content-only migration with dry-run output and an explicit apply option. Match old samples using a reviewed ID list or exact known fixture values; skip ambiguous and edited records. Save original values for rollback. Do not infer that an entire nonempty collection is demo content.
- **Dependencies:** Tasks 1–2.
- **Tests:** Migration dry run makes no writes; applying twice is safe; unrelated/edited records are unchanged; users and donation history remain untouched; saved originals restore changed content.
- **Completion:** Fresh seed data is labeled, and a reviewable migration updates only positively identified samples. Execution against a deployed database is a separate release action.

### 4. Replace public copy and contact information

- **Objective:** Remove unrelated text and unsupported contact promises across public pages.
- **Files:** `front/src/components/Home/{First,Causes,Features,Events,Testimonial}.jsx`, `front/src/components/Blog/Telescope.jsx`, `front/src/components/Footer.jsx`, `front/src/components/Contact/SendMessage.jsx`; new shared demo-label component.
- **Implementation:** Apply Task 1 copy. Replace the footer's agency description and irrelevant navigation labels with Kindity text and existing routes. Replace third-party contact details with the demo contact notice. Remove the inactive contact submission form while there is no delivery integration. Place demo labels adjacent to fictional testimonials and sample sections. Preserve any required template attribution; asset-host URLs are distinct from displayed contact details.
- **Dependencies:** Task 1; Task 2 for record-based labels.
- **Tests:** One focused Playwright public-content smoke check plus manual desktop/mobile review; no snapshots of every paragraph.
- **Completion:** Home, About, Blog, Contact, and footer contain coherent charity copy; no unrelated contact information or working-contact promise remains.

### 5. Render honest dates and figures consistently

- **Objective:** Ensure visible dates and amounts match their source records.
- **Files:** `front/src/components/Home/{Events,Causes,Welcome,Stat}.jsx`, `front/src/components/About/Welcome.jsx`, `front/src/components/Event/TopicEvents.jsx`, `front/src/pages/EventDetail.jsx`; new shared date/number formatters.
- **Implementation:** Display `eventDate` consistently on home cards, listing, and detail. Show “Date to be announced” when absent; handle malformed data without crashing. Use “Community events” instead of claiming all entries are upcoming. Format known monetary fields as USD amounts, removing unconditional `M`/`k` suffixes. Compute cause progress from `raised / need`, clamp the visual bar, and handle zero/missing targets. Mark illustrative figures; suppress unreviewed statistics/testimonials until their provenance is established.
- **Dependencies:** Tasks 2–3 and the demo-label component from Task 4.
- **Tests:** Focused checks for identical event dates across views, missing/invalid dates, leap-day validation, zero targets, goals exceeded, and accurate currency units. Reuse existing test tooling; do not add a new runner for formatters.
- **Completion:** No fixed event dates, made-up locations, unconditional 75% progress, or inflated currency units remain. Demo figures are visibly labeled.

### 6. Simplify story pages and remove invented engagement

- **Objective:** Present readable charity stories with only supported metadata.
- **Files:** `front/src/components/Blog/MainBlog.jsx`, `front/src/components/BlogInfo.jsx`, `front/src/pages/BlogDetail.jsx`, `front/src/pages/Blog.jsx` as needed for shared sidebar data.
- **Implementation:** Remove fabricated view/comment counts, fake comment threads, and inactive reply controls. Render each story description once, preserving paragraph breaks. Remove the MCSE quotation, unrelated article images, and fictitious previous/next posts. Replace the fake author/profile/popular-post sidebar with a shared charity-focused introduction and demo explanation, using `BlogInfo` on both listing and detail. Use actual `createdAt` consistently with an “Added” label, not an invented publication date; omit it if invalid. Show sample provenance beside each demo story, including direct detail visits.
- **Dependencies:** Tasks 1–3 and the shared label from Task 4.
- **Tests:** Browser checks for a labeled demo story on list/detail, correct record-derived dates, a single article body, and absence of engagement widgets. Manual readability check with longer sample copy.
- **Completion:** List and detail agree on title, author, date, and demo status. No unsupported popularity or reader participation is represented.

### 7. Verify and document the release

- **Objective:** Confirm the cleanup is complete and can be rolled out without replacing legitimate content.
- **Files:** New `tests/ui/specs/content.spec.ts`; relevant API/integration tests; `docs/qa/README.md`; this plan's migration checklist.
- **Implementation:** Run affected backend tests, API contracts, focused browser checks, and frontend/backend builds. Search source and reviewed fixture data for the removed copy. Inspect direct story/event URLs, empty datasets, missing dates, and mixed demo/real content. Record migration counts, skipped records, and rollback location. Add instructions for replacing sample content with verified organization material.
- **Dependencies:** Tasks 3–6.
- **Tests:** The checks above are the required verification; broaden only if failures reveal another affected path.
- **Completion:** Relevant checks pass; content is consistent across fresh seed and migrated demo data; the release checklist records any deliberately skipped content.

## Rollout order and risks

1. Review replacement text and the migration dry run.
2. Deploy compatible model additions, then UI changes. The UI must tolerate absent metadata and dates throughout rollout.
3. Apply the reviewed content migration to the intended database and confirm changed records.
4. Verify public pages and preserve migration originals for rollback.

### Migration checklist

- [ ] Save and review the dry-run JSON for the intended database. Record `matched`, `ambiguousPatternsSkipped`, and the identifiers of any deliberately skipped edited records.
- [ ] Apply only the reviewed exact matches. Save `migrationId` and confirm a second apply reports zero matches.
- [ ] Check user and donation counts before and after; these collections are outside the migration.
- [ ] Review home, about, story, event, and contact pages after deployment, including direct detail URLs and records without metadata or dates.
- [ ] Keep the originals in the target database's `contentMigrationBackups` collection until release acceptance. Record the rollback ID and review result in `docs/qa/content-release.md`.

The existing Add Event/Add News routes are not mounted, so publishing through those forms remains a separate prerequisite for ongoing administration. This cleanup supplies content through the seed/migration path and existing read APIs.

Node/npm are now available. Frontend/backend builds and isolated browser checks pass in this workspace. Backend Jest and live API contracts still need a host with a working Visual C++ runtime and MongoDB test prerequisite; the current Windows host cannot load its native Jest resolver or start `mongodb-memory-server`.

No factual organization identity, real contact channel, event schedule, or beneficiary story has been supplied. Until supplied, use the explicit demo wording above. Demo-content labels must not claim that payments are simulated or that no charges can occur; Stripe configuration is outside this content plan.
