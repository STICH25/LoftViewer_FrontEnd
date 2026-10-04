# LoftViewer Front End

Web front end for [Rey Family Loft](https://www.reyfamilyloft.com): browse the loft's pigeons and,
for admins, add, update and remove birds. React 19 + Vite.

API: [LoftViewer_API](https://github.com/STICH25/LoftViewer_API).

## Run locally

Requires Node 20.19+ (see `.nvmrc`).

```bash
npm install
npm run dev
```

The app expects the API at `VITE_API_URL` (`http://localhost:5053` in development, see `.env.example`).

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Dev server on http://localhost:5173 |
| `npm run lint` | ESLint |
| `npm test` | Unit tests (Vitest) |
| `npm run build` | Production build to `dist/` |
| `npm start` | Serve `dist/` with SPA fallback (Railway) |

## Deploy

Railway builds with `npm run build` and starts with `npm start` (`railway.json`).
`VITE_API_URL` for production comes from `.env.production`.
