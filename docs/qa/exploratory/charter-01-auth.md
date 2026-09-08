# Charter 01 — Authentication and session

## Mission

Explore registration, login, logout, cookie behavior, and route guards for anonymous, user, and admin personas.

## Time box

45–60 minutes

## Charter questions

- Can a new user register and reach a logged-in home state?
- Are invalid passwords, short passwords, and duplicate emails handled clearly?
- Does logout clear the session for subsequent `/profile` calls?
- Do protected and admin routes redirect correctly for each persona?
- What happens on hard refresh while on `/profile`, `/donations`, `/admin/dashboard`?

## Oracles

- HttpOnly cookie present after login
- No password in API JSON
- Admin-only pages unreachable for user/anon

## Areas / notes

Focus: `Login.jsx`, `Register.jsx`, `userContext.jsx`, `ProtectedRoute`, `AdminRoute`, auth controllers.
