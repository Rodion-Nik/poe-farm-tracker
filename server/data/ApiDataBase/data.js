
import fs from "fs";
import path from "path";
const DATA_DIR = import.meta.dirname;

const DATASET_NAMES = [
  'Abyss', 'Breach', 'Currency', 'Delirium', 'Essences', 'Expedition',
  'Fragments', 'Idols', 'LineageSupportGems', 'Ritual', 'Runes',
  'SoulCores', 'UncutGems', 'Verisium',
];

function loadJson(name) {
  const text = fs.readFileSync(path.join(DATA_DIR, `${name}.json`), 'utf8');
  return JSON.parse(text);
}

export function loadAllItems() {
  const datasets = DATASET_NAMES.map(loadJson);

  const priceById = new Map();
  for (const dataset of datasets) {
    for (const line of dataset.lines) {
      priceById.set(line.id, line.primaryValue);
    }
  }

  const normalTablets = loadJson('PrecursorTablets').lines
    .filter(line => line.variant === 'Normal');

  for (const tablet of normalTablets) {
    priceById.set(tablet.detailsId, tablet.primaryValue);
  }

  const tabletItems = normalTablets.map(line => ({
    id: line.itemId,
    name: line.name,
    image: line.icon.replace("https://web.poecdn.com", ""),
    category: "Tablets",
    detailsId: line.detailsId,
  }));

  const allItems = [...datasets.flatMap(d => d.items), ...tabletItems];
  return allItems.map(item => ({ ...item, price: priceById.get(item.id) ?? 0 }));
}


