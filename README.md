#TrailLedger – Offline Hiking Planner & Personal Hike Log

TrailLedger is an offline-first React Native project for browsing a bundled starter catalogue of hiking routes, planning a future hike, keeping a saved checkpoint reference while out, packing route-specific gear, and recording a personal log after the hike.

What works in this first version

•
Five navigation areas: Explore, Plans, Field, Hike log, and Gear.

•
Local route search by route name, region, or description, with difficulty filters.

•
Route details with estimated distance, duration, elevation, trailhead notes, highlights, and saved checkpoints.

•
Hike plans saved locally with an optional date.

•
An active-hike view with manually marked saved checkpoints. Completing the final checkpoint writes a completed hike record.

•
Per-hike gear checklists saved on the device.

•
Completed hike history with editable personal reflections and simple total distance.

•
A seeded route catalogue stored in SQLite on the device. Plans, progress, packing checks, and reflections also remain in local SQLite storage.

Offline behavior and safety boundaries

The app does not call public APIs, use an online database, or require an internet connection for its core screens and data. Android and iOS use local SQLite; the web build uses browser localStorage through a platform-specific adapter. The bundled route entries are starter/demo planning notes and their details may be approximate. Verify route information, trail access, permits, weather, hazards, and current conditions with trusted local sources before each hike.

Field Notes is a manual checkpoint checklist, not a map, GPS tracker, turn-by-turn navigation system, or emergency service. Do not rely on the app as a substitute for official/local guidance or appropriate preparation.

Run locally

Requirements: Node.js and pnpm. From the project directory:

Bash


pnpm install
pnpm start



Use Expo Go to open the project on a supported phone. Run pnpm check to verify Expo dependency compatibility and TypeScript. Both the Android bundle and Expo web export are validated. Android/iOS use SQLite, while the browser uses its own localStorage adapter so the web bundle does not import SQLite WASM.

Project structure

Plain Text


app/
  (tabs)/             Five primary tab screens and navigation
  route/[id].tsx      Route detail, planning, and start-hike actions
components/
  TrailUI.tsx         Shared design tokens and UI primitives
lib/
  database.ts         Native SQLite schema, queries, local writes, initialization
  database.web.ts     Browser localStorage adapter with the same data API
  sampleRoutes.ts     Bundled starter hiking route dataset
  types.ts            Route and hike types
assets/               App launcher and splash assets



Useful next steps

1.
Replace and verify the starter route catalogue with a personally curated, sourced dataset.

2.
Add data export/import so a user can back up or move their local records.

3.
Add a real native map/GPS mode only after choosing reliable offline map data, testing on devices, and defining the safety boundaries.

4.
Add optional sync or shared trips as a separate opt-in feature while preserving offline-first use.

5.
Add route photos and additional filters after the first core workflows are validated.

The current Git repository is initialized locally. Add your own GitHub remote and push after confirming the repository and account you want to use.

