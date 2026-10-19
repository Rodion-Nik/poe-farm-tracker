# PoE2 Farm Tracker

A learning project built with React for tracking farming runs in Path of Exile 2.

Track loot, record run durations, and compare farming results. The project is under active development.

## Live demo

[Open PoE2 Farm Tracker](https://lysar.poe2tracker.workers.dev/)

No account is required. Farming data is stored locally in your browser.

## Preview





Screenshots show sample data and may differ from the latest version.

## Implemented features

- Create, select, and delete farming sessions.
- Browse items by category and search by name.
- Select tracked items and enter their quantities for each run.
- Support negative quantities for item losses or adjustments.
- Enter run durations manually.
- Calculate total loot value in Divine Orbs using price data from poe.ninja.
- Display total run time, loot value per hour, and maps per hour.
- Save and delete individual runs.
- Browse collapsible run groups with aggregated loot summaries.
- Keep saved sessions and runs between page reloads using localStorage.
- Load a sample farming session with the **Demo data** button.

**The current `Profit` and `Profit per hour` summaries represent loot value before expenses. Expense tracking and net profit calculations are not implemented yet.**

## Price data

The application uses 14 local JSON snapshots downloaded from the poe.ninja economy API. Prices are bundled with the website and updated manually using a separate script.

The hosted application does not automatically fetch fresh prices.

Saved runs store item quantities. Their displayed value is calculated using the price data bundled with the application, so updating prices can change the displayed value of earlier runs.

## Data storage

Sessions and saved runs are stored in localStorage for the current browser and site address.

- Data is not shared with other visitors.
- Data does not automatically sync between browsers or devices.
- Clearing site data removes saved sessions.
- Opening the application on another domain starts with separate local storage.

There are currently no user accounts or cloud backups.

## Running locally

Requires Node.js 22.12 or later and npm.

Clone or download the repository, then open a terminal in the application directory containing `package.json` and run:

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

Click **Demo data** to explore a sample farming session, or create and select your own session to start recording runs.

## Production build

From the application directory, run:

```bash
npm run build
```

The generated `dist` directory contains the files needed for static hosting.

To preview the production build locally:

```bash
npm run preview
```

The live demo is hosted on Cloudflare Workers using static assets. To publish an update, rebuild the application and upload the contents of the new `dist` directory.

## Updating price data

On Windows, run `update-poe2-api.bat` from the application's `src` directory.

The script requires `curl.exe` and saves the downloaded JSON files to `src/ApiDataBase`.

Before updating:

1. Check the `LEAGUE` setting in the script.
2. Run the script and check its success and failure summary.
3. Rebuild and redeploy the application to publish the updated prices.

PoE 2 economy data refreshes roughly hourly. Avoid unnecessary repeated downloads and follow the [poe.ninja API usage guidelines](https://poe.ninja/docs/api).

## Planned features

- Track waystone and tablet expenses.
- Calculate net profit and net profit per hour.
- Set custom item prices.
- Add support for more item categories:
  - Unique Weapons
  - Unique Armours
  - Unique Accessories
  - Unique Flasks
  - Unique Charms
  - Unique Jewels
  - Unique Relics
  - Unique Tablets
  - Precursor Tablets
- Support resource-based farming metrics, such as loot value per Hive Blood spent.

## Built with

- React
- Vite
- CSS
- Browser localStorage
- poe.ninja economy data
