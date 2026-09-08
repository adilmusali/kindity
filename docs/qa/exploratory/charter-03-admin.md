# Charter 03 — Admin content and dashboard

## Mission

Explore admin dashboard donations list and content-management flows (Add Event / Add News / deletes).

## Time box

45–60 minutes

## Charter questions

- Does Admin link appear only for admins?
- Does the dashboard list donations from multiple users?
- Do Add Event / Add News succeed end-to-end?
- Do Delete buttons on events/news work against current APIs?

## Oracles

- Non-admins never see other users’ PII on admin dashboard
- Create flows return success and update listings
- Delete either succeeds or fails with a clear error (not silent)

## Areas / notes

`AdminDashboard.jsx`, `AddEvent.jsx`, `AddNews.jsx`, `TopicEvents.jsx`, `MainBlog.jsx`.
