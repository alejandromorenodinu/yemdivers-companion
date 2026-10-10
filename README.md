# Helldivers 2 Companion

An unofficial, fan-made companion web app for Helldivers 2. It shows the current state of the galactic war, the active Major Order, the history of Super Earth's dispatches and an interactive galactic map.

> **Not affiliated.** This project is not affiliated with, endorsed by, or connected to Arrowhead Game Studios or Sony Interactive Entertainment. Helldivers and all related names, characters and assets are the property of their respective owners. This is a non-commercial, unmonetized, fan-made learning project.

![Screenshot of the home page](docs/screenshot-home.png)

## Features

- **Galactic war overview:** player count, casualties and kills per faction.
- **Major Order:** the active order with its briefing, tasks, progress and time left.
- **Dispatches:** the latest message from Super Earth on the home page and a full history page.
- **Galactic map:** every planet placed on its coordinates, colored by the faction that controls it. Zoom with the mouse wheel or the buttons, drag to pan, and click a planet to see its sector, owner, liberation progress, biome and hazards.
- **Themed UI:** a global stylesheet inspired by the game's look, with no UI library.

![Screenshot of the galactic map](docs/screenshot-map.png)

## Tech stack

- Angular (standalone components) and TypeScript
- Signals for state and RxJS for HTTP requests
- Plain SVG for the map, with zoom and pan written from scratch
- Plain CSS with custom properties

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (current LTS recommended)
- npm

### Run it locally

```bash
git clone https://github.com/YOUR-USERNAME/helldivers-companion.git
cd helldivers-companion
npm install
npm start
```

Then open `http://localhost:4200`. If `npm start` is not configured in your copy, `npx ng serve` does the same.

### Build for production

```bash
npx ng build
```

The output goes to the `dist/` folder.

## Configuration

The app talks to the community-run Helldivers 2 API, which asks every client to identify itself with two headers. They are set in the `ConnectBD` service:

```typescript
headers: {
  'X-Super-Client': 'your-app-name',
  'X-Super-Contact': 'your-contact@example.com'
}
```

If you fork this project, replace both values with your own. The contact lets the API maintainers reach you if your client causes problems.

## Data source

All game data comes from the [Helldivers 2 community API](https://helldivers-2.github.io/api/) (`api.helldivers2.dev`), which in turn reads Arrowhead's public war endpoints. The data may be delayed, incomplete or inaccurate and should not be treated as official. Please be considerate with the number of requests you send.

## License

The source code is released under the [MIT License](LICENSE). Helldivers and all related names, characters and assets are the property of their respective owners.

## Acknowledgements

- The maintainers and contributors of the Helldivers 2 community API, for making the data available.
- Arrowhead Game Studios, for making the game this app is about.