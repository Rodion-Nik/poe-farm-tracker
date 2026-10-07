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

export const API_DATASETS = {
  Abyss, Breach, Currency, Delirium, Essences, Expedition,
  Fragments, Idols, LineageSupportGems, Ritual, Runes,
  SoulCores, UncutGems, Verisium,
};

export const allItems = Object.values(API_DATASETS).flatMap(dataset => dataset.items);

const priceById = new Map();
for (const dataset of Object.values(API_DATASETS)) {
  for (const line of dataset.lines) {
    priceById.set(line.id, line.primaryValue);
  }
}

export function getItemPrice(itemId) {
  return priceById.get(itemId) ?? 0;
}
