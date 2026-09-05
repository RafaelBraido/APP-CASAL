# Base44 Dev Environment

## Stack
- **Backend**: Express 5 (ESM) + Mongoose (MongoDB) + JWT + bcryptjs. Lives in `BACK/`.
- **Frontend**: Static HTML/CSS/JS served by Express from `FRONT/`. Single origin on port 3000.
- **Database**: MongoDB 7 (compose service `mongo`).

## Run
```
docker compose -f docker-compose.base44.yml up -d --build
```
App is served on host port 3000. The Express process (`node --watch server.js`) live-reloads on backend edits.

## Key details
- `server.js` serves `FRONT/` as static files and falls back to `FRONT/index.html` for unknown routes; API routes are `/auth`, `/User`, `/Tutorial`, `/Admin`.
- Working dir inside the container is `/app/BACK`; the whole repo is bind-mounted at `/app` so `../Front` resolves correctly.
- `node_modules` is kept in a named volume (`back_node_modules`) so host dirs stay clean.
- No external secrets required: MongoDB credentials are generated in compose; `JWT_SECRET` and `ADMIN_CODE` have dev defaults in `.env.base44-defaults` (overridable via the platform secrets file).

## Fixes applied to boot here
- `BACK/Services/Adminservices.js` imported a non-existent `Models/Tutorial.js`; switched to the real `Models/Devocional.js` model.
- `BACK/Services/DevocionalServices.js` imported the Devocional model under the wrong name (`Tutorial`); renamed to `Devocional` to match its usage.

## Verify
```
curl -sf http://localhost:3000/ | head   # serves FRONT/index.html
curl -sf http://localhost:3000/auth/login -X POST -H 'Content-Type: application/json' -d '{}'  # returns JSON error (route alive)
```
