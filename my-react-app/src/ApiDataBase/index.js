import Abyss from "./Abyss.json";
import Breach from "./Breach.json";
import Currency from "./Currency.json";
import Delirium from "./Delirium.json";
import Essences from "./Essences.json";
import Expedition from "./Expedition.json";
import Fragments from "./Fragments.json";
import Idols from "./Idols.json";
import LineageSupportGems from "./LineageSupportGems.json";
import Ritual from "./Ritual.json";
import Runes from "./Runes.json";
import SoulCores from "./SoulCores.json";
import UncutGems from "./UncutGems.json";
import Verisium from "./Verisium.json";
import PrecursorTablets from "./PrecursorTablets.json";

export const API_DATASETS = {
  Abyss, Breach, Currency, Delirium, Essences, Expedition,
  Fragments, Idols, LineageSupportGems, Ritual, Runes,
  SoulCores, UncutGems, Verisium,
};

const normalTablets = PrecursorTablets.lines.filter(line => line.variant === "Normal");

const tabletItems = normalTablets.map(line => ({
  id: line.detailsId,
  name: line.name,
  image: line.icon.replace("https://web.poecdn.com", ""),
  category: "Tablets",
  detailsId: line.detailsId,
}));

export const allItems = [
  ...Object.values(API_DATASETS).flatMap(dataset => dataset.items),
  ...tabletItems,
];

const priceById = new Map();
for (const dataset of Object.values(API_DATASETS)) {
  for (const line of dataset.lines) {
    priceById.set(line.id, line.primaryValue);
  }
}
for (const tablet of normalTablets) {
  priceById.set(tablet.detailsId, tablet.primaryValue);
}

export function getItemPrice(itemId) {
  return priceById.get(itemId) ?? 0;
}


