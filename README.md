# TrailLedger – Offline Hiking Planner & Personal Hike Log

**Name:S.A.M.S.Samaraweera**
**Index number: 2022/ICT/23**
**Module:** IT3133 - ICA 03 – React Native Project

---

## Project Description

TrailLedger is an offline-first mobile app built with React Native (Expo). It helps hikers browse a bundled catalogue of hiking routes, plan a future hike with a route-specific packing list, and keep a personal log of the hikes they have completed.

The app works **without an internet connection**. The route dataset is created by the author and bundled inside the app, and everything the user creates (planned hikes, packing progress, hike logs and the light/dark theme choice) is stored locally on the device. No public APIs or online databases are used.

## Features

- **Home dashboard** – hero photo, summary cards (routes, planned hikes, logged hikes, km hiked), quick-action buttons and a light/dark mode switch
- **Routes** – browse the local route dataset, search by name or region, and filter by difficulty (Easy / Moderate / Hard)
- **Route details** – distance, estimated time, elevation gain, description and the list of checkpoints with elevations
- **Plan a hike** – type your own hike name or choose one from the offline route list, set a date, add notes and tick a packing checklist (basic gear plus route-specific gear)
- **Planner** – all planned hikes sorted by date, with a date badge, packing progress bar, "Plan more" to edit a plan, and delete with confirmation
- **Hike log** – record any hike (a listed route or your own typed name) with date, time taken, star rating and notes; search the log and delete entries
- **Light and dark mode** – forest green theme, saved on the device
- **Fully offline** – all data is local

## Screens (7)

| # | Screen        | Navigation |

| 1 | Home          | Bottom tab |
| 2 | Routes        | Bottom tab |
| 3 | Planner       | Bottom tab |
| 4 | Hike Log      | Bottom tab |
| 5 | Route Details | Stack |
| 6 | Plan Hike     | Stack |
| 7 | Add Log       | Stack |

## Technologies Used

| React Native - Building the mobile interface 
| Expo - Development tooling and running the app on a device 
| React Navigation (bottom tabs + native stack) - Navigation between screens 
| AsyncStorage - Storing user data locally on the device 
| `react-native-screens`, `react-native-safe-area-context` - Navigation support libraries 
| JavaScript (ES6) and React Hooks - Application logic 
| Git and GitHub - Version control, using `development`, `testing` and `main` branches 

## Local Data Storage

- **Dataset:** `src/data/routes.js` holds 6 hiking routes created for this project, each with distance, duration, elevation gain, description, checkpoints and extra gear.
- **User data:** saved with AsyncStorage through `src/storage.js` 

## Project Structure

```
TrailLedger/
├── App.js                  # Navigation (tabs + stack) and theme setup
├── app.json                # Expo configuration and app icon
├── assets/                 # Photos, logo, app icons and tab icons
└── src/
    ├── components.js       # Reusable buttons, chips, badges, cards
    ├── ThemeContext.js     # Light / dark mode state
    ├── theme.js            # Colour palettes and shared styles
    ├── storage.js          # AsyncStorage helpers and storage keys
    ├── helpers.js          # Date helper functions
    ├── data/
    │   └── routes.js       # Local hiking routes dataset
    └── screens/
        ├── HomeScreen.js
        ├── RoutesScreen.js
        ├── RouteDetailScreen.js
        ├── PlannerScreen.js
        ├── PlanHikeScreen.js
        ├── LogScreen.js
        └── AddLogScreen.js
```

## Setup Instructions

### Requirements

- [Node.js](https://nodejs.org/) (LTS version) and npm
- [Git](https://git-scm.com/)
- A phone with the **Expo Go** app (Android or iOS), or an Android emulator
- The phone and the computer on the same Wi-Fi network

### Steps

1. **Clone the repository**
   ```
   git clone https://github.com/Maheli10/TrailLedger.git
   cd TrailLedger-Hiking-Planner-Gear-Log
   ```

2. **Install the dependencies**
   ```
   npm install
   ```

3. **Start the app**
   ```
   npx expo start -c
   ```

4. **Open it on your device**
   - Scan the QR code shown in the terminal with the Expo Go app (Android) or the Camera app (iOS).
   - For an Android emulator, press `a` in the terminal.

### Troubleshooting

- **Phone cannot connect:** make sure both devices use the same Wi-Fi, or run `npx expo start --tunnel`.
- **Old screens or icons appear:** run `npx expo start -c` to clear the cache.
- **"Unable to resolve module" error:** run `npm install` again, then restart with `npx expo start -c`.

## How to Use

1. Open **Routes**, search or filter, and tap a route to see its details.
2. Tap **Plan this hike** (or **+ Plan your hike** in the Planner) to set a date, add notes and tick the packing list.
3. Open the **Planner** to review upcoming hikes, tap **Plan more** to keep packing, or use the bin icon to delete a plan.
4. After a hike, tap **Add to Log** on Home (or **+ New log entry** in Hike Log) to record how it went.
5. Use the sun/moon button on Home to switch between light and dark mode.
