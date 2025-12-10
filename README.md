# React + TypeScript + Vite

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
