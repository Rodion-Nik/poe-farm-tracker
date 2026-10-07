PoE2 Farm Tracker



A training project created using React to track farming sessions in Path of Exile 2.



The goal is to help players track loot, costs, and profitability of farming in one place.



Implemented features



\- Create and manage multiple farming sessions.

\- Select the dropped items and enter their number for each run.

\- Calculate the total loot value in Divine Orbs using price data from poe.ninja.

\- Save and delete individual runs.

\- Persist sessions and runs across page reloads using localStorage



Price data



The application currently uses local JSON snapshots downloaded from the poe.ninja API. These files are updated manually using a separate script.



Planned features



\- Tracking expenses on a waystone and tablet.

\- Calculation of net profit and estimated profit per hour.

\- Filtering of items by category.

\- Set custom item prices. 

\- Adding the remaining 9 api links that require custom logic. (Unique Weapons, Unique Armours, Unique Accessories, Unique Flasks, Unique Charms, Unique Jewels, Unique Relics

, Unique Tablets, Precursor Tablets)

\- Support resource-based farming metrics, such as loot value per Hive Blood spent.




The project is under active development.



\--------------------------------------------



Running locally



Requires Node.js and npm.



From the repository root, run:



cd my-react-app

npm install

npm run dev



Open the local URL shown in the terminal.



\------------------------------------------

Updating price data



On Windows, run `update-poe2-api.bat` from the `my-react-app/src` folder.



Avoid repeatedly running the update script. PoE 2 price data refreshes roughly hourly, and excessive API usage may result in blocked access.



See the \[poe.ninja API usage guidelines](https://poe.ninja/docs/api).

