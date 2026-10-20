# PoE2 Farm Tracker

A learning project built with React for tracking farming runs in Path of Exile 2.

Track loot, record run durations, and compare farming results. The project is under active development.

## Live demo

[Open PoE2 Farm Tracker](https://lysar.poe2tracker.workers.dev/)

No account is required. Farming data is stored locally in your browser.

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

## Running locally

Requires Node.js 22.12 or later and npm.

Open a terminal in the `my-react-app` directory containing `package.json`, then run:

```bash
npm install
npm run dev
```

If your terminal is in the parent `react` directory, enter the application directory first:

```bash
cd my-react-app
```

Open the local URL shown in the terminal.

Click **Demo data** to explore a sample farming session, or create and select your own session to start recording runs.

## Data storage

Sessions and saved runs are stored in localStorage for the current browser and site address.

- Data does not automatically sync between browsers or devices.
- Clearing site data removes saved sessions.
- Opening the application on another address starts with separate local storage.

There are currently no user accounts or cloud backups.

## Price data

The application uses 14 local JSON snapshots downloaded from the poe.ninja economy API. These files are updated manually using a separate script.

The application does not automatically fetch fresh prices.

Saved runs store item quantities. Their displayed value is calculated using the loaded price data, so updating prices can change the displayed value of earlier runs.

## Updating price data

On Windows, run `update-poe2-api.bat` from the application's `src` directory.

The script requires `curl.exe` and saves the downloaded JSON files to `src/ApiDataBase`.

Before updating, check the `LEAGUE` setting in the script. After running it, check the success and failure summary.

PoE 2 economy data refreshes roughly hourly. Avoid unnecessary repeated downloads and follow the [poe.ninja API usage guidelines](https://poe.ninja/docs/api).

## Planned features

- Track waystone and tablet expenses.
- Calculate net profit and net profit per hour.
- Set custom item prices.
- Add support for Unique Weapons, Unique Armours, Unique Accessories, Unique Flasks, Unique Charms, Unique Jewels, Unique Relics, Unique Tablets, and Precursor Tablets.
- Support resource-based farming metrics, such as loot value per Hive Blood spent.

## Built with

- React
- Vite
- CSS
- Browser localStorage
- poe.ninja economy data
