# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

The React front end of **Rey Family Loft** (https://www.reyfamilyloft.com), a site for cataloguing
racing pigeons. React 19 + React Router 7, built with Vite, served on Railway by `serve -s dist`.
The API is a separate repo (`STICH25/LoftViewer_API`, usually cloned at `C:\repos\LoftViewer_API`).
**Before changing anything in `src/api/`, read that repo's `CLAUDE.md` "API surface" table and the
matching controller**. The two are deployed independently, so a mismatch only shows up in production.

## Commands

```bash
npm install
npm run dev        # http://localhost:5173 (strict port: the API's dev CORS policy allows exactly this origin)
npm run lint       # ESLint 9 flat config, includes the React Compiler-era react-hooks rules
npm test           # Vitest + Testing Library (jsdom)
npm run build      # production bundle in dist/
npm start          # serve dist with SPA fallback (what Railway runs)
```

For local work against a local API, start the API first
(`dotnet run --project src/LoftViewer --launch-profile http` in the API repo, port 5053).
`.env.development` already points `VITE_API_URL` there. Put personal overrides in `.env.local` (git-ignored).

## Layout

```
src/
  api/          client.js (shared axios instance), birds.js, auth.js: the only code that calls the API
  auth/         token.js: JWT storage, base64url decoding, expiry, getAuthHeader()
  hooks/        useBirds (birds + photo object URLs), useIdleTimeout
  components/   presentational pieces + ProtectedRoute + ErrorBoundary
  pages/        one component per route
  assets/css/   plain CSS imported by components (there is no Tailwind)
public/assets/images/   images referenced by plain string URLs at runtime; must stay in public/
```

## Conventions and traps

- **All HTTP goes through `apiClient`** in `src/api/client.js`. Never `axios.get(\`${API_URL}...\`)` directly.
- **Object URLs must be revoked.** `getBirdImage` returns `URL.createObjectURL(blob)`; `useBirds` owns and
  revokes them. Anything else that calls `getBirdImage` takes on that responsibility.
- **Images in `public/` are referenced by string path** (`/assets/images/tempImage.jpg`). Moving them into
  `src/` breaks those references silently; import them instead if you move them.
- **The API returns ProblemDetails** (`{ title, status, detail }`) for errors; read `error.response.data.detail`.
- **Login response** is `{ token, userName, role, expiresAt }`. The token carries `name` and `role` claims.
- **Lint must stay clean.** `eslint-plugin-react-hooks` v7 flags reading refs during render and calling
  `setState` synchronously inside effects; fix the pattern rather than disabling the rule.
- The repo uses **LF line endings** (`.gitattributes`). Some older files were CRLF; a find-and-replace
  that includes `\n` will silently not match a CRLF file, so check that each replacement applied.
- Non-secret config only: `VITE_*` variables are inlined into the public bundle.

## Mobile and tablet (iPhone, iPad, Android)

The site must work on touch devices. Rules that every new page and component follows:

- **No hover-only interactions.** Touch screens have no hover. The header menu opens on tap
  (`Header.jsx` toggles `.is-open`); the `:hover` rule is limited to
  `@media (hover: hover) and (pointer: fine)` so a tap's sticky hover cannot fight the toggle.
- **Never `100vw` or `100vh` for a page.** `100vw` includes the scrollbar and `100vh` ignores Safari's
  collapsing address bar. Use `width: 100%` and `min-height: 100vh; min-height: 100dvh`.
- **Fluid, not fixed, widths.** Use `min(500px, 100%)`, `clamp()` for type (see `.shadows`), `flex-wrap`,
  and `aspect-ratio`. A fixed `px` width over ~340px will overflow an iPhone SE.
- **Inputs are at least 16px on touch screens** (`@media (pointer: coarse)` in `addPage.css`), or iPhone
  Safari zooms the page when one is focused. Buttons and tappable rows are at least 44px tall.
- **Safe areas.** `index.html` sets `viewport-fit=cover`; pad edge-to-edge bars with
  `env(safe-area-inset-*)` (see the header) so the notch does not cover them.
- **Safari prefixes.** `backdrop-filter` needs `-webkit-backdrop-filter`. Form controls do not inherit
  the page font in WebKit, so set `font-family` on buttons.
- **Breakpoint:** `max-width: 768px` is "phone and small tablet". Do not add others without a reason.

**Testing without a Mac or an iPhone:** Playwright's WebKit engine is the same engine as Safari. In a
scratch folder (not this repo): `npm i playwright && npx playwright install webkit`, then launch
`webkit` with `devices["iPhone 15"]`, `devices["iPhone SE"]` (320px, the narrowest realistic phone) and
`devices["iPad (gen 7)"]`, and assert `document.documentElement.scrollWidth <= clientWidth` on every route.
It is not a substitute for a final check on a real device.

## Known bugs (deferred to the UI bug pass, October 2026)

Found during modernization and **left unfixed on purpose** so behaviour did not change while the
tooling moved. Remove entries from this list as they are fixed.

1. **Add/update/delete call the wrong URL.** `addBird`, `updateBird` and `deleteBird` in `src/api/birds.js`
   call `/addBird` and `/{id}` instead of `/api/birds/addBird` and `/api/birds/{id}`, so all three fail
   in production. They are marked `KNOWN BUG`.
2. ~~**Logged-in name is hard-coded.**~~ Fixed: the header shows the API's `userName` (from the token's
   `name` claim for sessions stored before the fix).
3. **Logout leaves the user in localStorage.** `LogOut` and the idle timeout clear `token` but not `user`;
   after a refresh the header shows the user as signed in again.
4. ~~**Login navigates twice.**~~ Fixed: only `App.handleLoginSuccess` stores the user and navigates.
5. **`ProtectedRoute` gets the wrong prop.** `App` passes `user={user?.token}` (a string) but the
   component reads `user?.token`; it only works because of the localStorage fallback. It also does not
   check the `Admin` role, so non-admins reach admin pages and get 403s.
6. **Drag-and-drop image is never uploaded.** `BirdsPage.handleDrop` sets the preview, but submit reads
   `fileInputRef.current.files[0]`, which is empty for a dropped file.
7. **Success and error messages on the Add page are never rendered.**
8. **Update page champion checkbox.** It only renders when `champion === "N/A"` and disappears once
   ticked, so it cannot be unticked. Delete does not refresh the list. The delete button reads
   "Deleting Bird".
9. **Update form can send the string "undefined"** when a field is null (`FormData.append` stringifies it).
10. **Fragile image paths.** `card-logo` and several pages use relative paths such as
    `../assets/images/tempImage.jpg`, which only resolve because every route is one level deep. The
    update page's fallback `../assets/tempImage.jpg` does not exist (rarely hit: the API serves a placeholder).
11. **"Contact Info" links to `/other`**, which has no route. There is no 404 route.
12. **Session expiry uses `alert()`** from inside `getAuthHeader` and the idle timer.
13. **Idle timer runs for logged-out visitors.** `useIdleTimeout` is always active, so anyone who leaves the
    site open for an hour gets "Session expired" even if they never signed in.
14. **Update page photo overlaps the bird name.** The card image is `position: absolute` in
    `UpdateRemoveComponent`.
15. **Page CSS leaks across the whole site.** Every stylesheet is bundled globally, and `addPage.css`
    and `UpdatePage.css` style bare `input[type="text"]` (addPage with `margin-bottom: 15px !important`),
    so those rules hit text inputs on every page. The login page has to override them. Scope these rules
    to their page's container, or move to CSS Modules.
16. ~~**Phone layout of the home page.**~~ Fixed in the mobile pass: compact 54px header, scaling title.
