# Canopy Website

Express/Mongoose API and Vite/React/Tailwind frontend. Content is read from the repository's `content` directory; `content/claims.md` governs published product claims.

## Development

Install dependencies with `npm ci` in both `server` and `client`. Copy `server/.env.example` to `server/.env`, configure MongoDB and the exact allowed browser origins, then run `npm run dev` in each directory. On Windows PowerShell with script execution disabled, use `npm.cmd`.

Vite runs on port 5173 and proxies `/api` to port 5000. Form submissions require MongoDB: unavailable storage returns HTTP 503 and never reports a successful signup. The server retries its initial MongoDB connection five times before serving read-only content; restart after restoring MongoDB if initial retries were exhausted.

## Production

Run `npm run build` in `client` and `server`. Set `NODE_ENV=production`, `MONGODB_URI`, and `CORS_ORIGIN` to the deployed website's exact origin. Run `npm start` in `server`; Express serves the bundled client and SPA routes from `client/dist` alongside `/api`. Terminate HTTPS at your deployment proxy. Rate limits use an in-process store; multiple API instances require a shared store before deployment.

## Verification

Build the client first, then run `npm test` in `server` and `npm run test:smoke` in `client`. The suite verifies static content, strict CORS, validation, security headers, missing routes, and honest storage-unavailable responses without needing a running database. Successful writes against a live MongoDB deployment require a separate integration check.
