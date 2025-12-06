# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # BioMap Leyte Frontend

  React + TypeScript + Vite app for mapping biodiversity sightings across Leyte. It provides an authenticated experience for contributors and admins, an interactive Leaflet map, and an admin dashboard for reviewing submissions and managing users.

  ## Stack
  - React 19, Vite 7, TypeScript
  - React Router 7 for routing and nested layouts
  - React Query for server state and caching
  - Redux Toolkit + redux-persist for app state
  - Firebase Authentication (email/password) for auth and token management
  - Leaflet / react-leaflet for the interactive map and protected areas overlay
  - Tailwind CSS 4 for styling; Radix UI primitives and lucide-react icons

  ## Features
  - Authenticated user flow with protected and admin-only routes
  - Sightings submission with form data upload and backend verification
  - Interactive map with species filters, protected area overlays, and cluster rendering
  - Species explorer and detail pages
  - Admin dashboard with stats and user management
  - Toast notifications and skeleton loaders for better UX

  ## Getting started
  1) Install dependencies
  ```bash
  npm install
  ```

  2) Create an `.env` (or `.env.local`) in the project root
  ```bash
  VITE_API_URL=http://localhost:3000/api
  VITE_FIREBASE_API_KEY=your_firebase_api_key
  VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
  VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
  VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
  VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
  VITE_FIREBASE_APP_ID=your_firebase_app_id
  VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
  ```

  3) Run the dev server
  ```bash
  npm run dev
  ```

  ## Scripts
  - `npm run dev` — start Vite in dev mode
  - `npm run build` — type-check and build for production
  - `npm run preview` — preview the production build locally
  - `npm run lint` — run ESLint

  ## Project structure (high level)
  - `src/main.tsx` — app entry, router, providers (Redux, React Query, Auth)
  - `src/pages` — route pages (`Home`, `Map`, `SpeciesExplorer`, `LogSighting`, `Admin/*`)
  - `src/components` — UI pieces, map UI, admin layout, auth components
  - `src/api` — axios clients for auth, sightings, species, users, analytics (uses `VITE_API_URL`)
  - `src/config/firebase.js` and `src/lib/firebase.js` — Firebase initialization and auth helpers
  - `src/store` — Redux store, slices, and persistence setup

  ## Notes
  - Protected routes: `ProtectedRoute` guards user-only pages; `AdminRoute` restricts admin dashboard access.
  - API calls include the Firebase ID token in the `Authorization: Bearer <token>` header when available.
  - Map data is pulled from the backend GeoJSON endpoint (`/sightings/geojson`) and transformed for clustering and filtering.

  ## Building for production
  ```bash
  npm run build
  npm run preview  # optional: serve the built assets locally
  ```
