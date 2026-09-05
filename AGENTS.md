# Base44 Dev Environment

## Stack
- **Backend**: Node.js (ESM) + Express 5 + MongoDB (Mongoose). Lives in `BACK/`.
- **Frontend**: Full static SPA (HTML/CSS/JS, PWA) served by Express from `FRONT/index.html` — single origin on port 3000, client-side route navigation.
- **DB**: MongoDB 7 (compose service `mongo`, auth enabled).

## Run
```
docker compose -f docker-compose.base44.yml up -d
```
App on port 3000. The `app` service runs `node --watch server.js` for live reload of backend changes; `FRONT/` static files are read from disk per request. MongoDB is authenticated (`facilitatech`/`facilitatechpass` in compose) and the healthcheck logs in with those creds to avoid auth-noise in logs.

## Env vars (all internal — no external secrets needed)
- `MONGO_URI` — local mongo connection (set in compose)
- `JWT_SECRET` — JWT signing secret (dev default in `.env.base44-defaults`)
- `JWT_EXPIRES_IN` — defaults to `1d`
- `ADMIN_CODE` — admin login code, defaults to `1234`
- `PORT` — 3000

## API routes (current)
- `/auth/register`, `/auth/login` — public, rate-limited (10 req/15min per IP)
- `/devocional` — public GET list; admin POST/PUT/DELETE
- `/pregacao` — public GET list; admin POST/DELETE
- `/resultado` — POST (auth), GET `/me` (auth), GET `/estatisticas` (admin)
- `/User/me` — PUT/DELETE (auth); `/User/all` (admin)
- `/Admin/codigo` — admin login by code; other `/Admin/*` admin-gated

## Notes
- Error handler logs only 5xx errors; expected 4xx validation errors are returned to the client without stack-trace noise.
- `BACK/node_modules` is committed in the repo (inherited from history); the compose setup shadows it with the `back_node_modules` volume and runs `npm install` on boot.

## Verify
- `curl -sf http://localhost:3000/` → the app HTML page (200).
- `curl -sf http://localhost:3000/pregacao` → JSON array.
- `curl -sf -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d '{"nome":"x","password":"123456"}'` → returns a JWT.
