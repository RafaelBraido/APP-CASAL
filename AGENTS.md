# Base44 Dev Environment

## Stack
- **Backend**: Node.js (ESM) + Express 5 + MongoDB (Mongoose). Lives in `BACK/`.
- **Frontend**: Static HTML/CSS/JS served by Express from `FRONT/index.html` (single origin on port 3000).
- **DB**: MongoDB runs as a local compose service (`mongo:7`), no external DB.

## Run
```
docker compose -f docker-compose.base44.yml up -d
```
App on http://localhost:3000. The `app` service runs `node --watch server.js` for live reload of backend changes; static frontend files are read from disk each request, so `FRONT/` edits appear without restart.

## Env vars (all internal — no external secrets needed)
- `MONGO_URI` — local mongo connection (set in compose)
- `JWT_SECRET` — JWT signing secret (dev value in compose)
- `JWT_EXPIRES_IN` — defaults to `1d`
- `ADMIN_CODE` — admin login code, defaults to `1234`
- `PORT` — defaults to 3000

## Fixes applied to boot here (repo was authored on a case-insensitive OS + older Express)
1. **Case sensitivity**: the frontend dir is `FRONT/` (uppercase). `BACK/server.js` referenced `../Front`; changed both the `express.static` and catch-all `sendFile` paths to `../FRONT`.
2. **Express 5 catch-all**: bare `app.get("*", ...)` is invalid in Express 5; changed to `app.get("*all", ...)`.
3. **Bad model import**: `BACK/Services/Adminservices.js` imported `../Models/Tutorial.js` (file does not exist); the model is `Models/Devocional.js`, so the import path was corrected.

## Notes / known state
- `FRONT/index.html` is a standalone "Liquid Glass" menu demo — it does not call the API.
- `BACK/app.js` contains older frontend JS (login/devocional UI) that is **orphaned**: it is not served by Express and references API routes (`/devocional-diario/hoje`, `/pregacao`, etc.) that do not exist in the current backend. Treat it as stale.
- Current working API routes: `/auth/register`, `/auth/login`, `/User/*`, `/Tutorial/*` (devocional CRUD, admin-gated), `/Admin/*`.

## Verify
- `curl -sf http://localhost:3000/` → returns the HTML page (200).
- `curl -sf -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d '{"nome":"x","password":"123456"}'` → returns a JWT.
