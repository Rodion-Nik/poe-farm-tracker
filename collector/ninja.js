import fs from 'fs';
import path from 'path';

const BASE = 'https://poe.ninja/poe2/api/economy';
const FILES_DIR = path.join(import.meta.dirname, '..', 'server', 'data', 'ApiDataBase');
const USER_AGENT = process.env.USER_AGENT;

export const EXCHANGE_TYPES = [
    'Abyss', 'Breach', 'Currency', 'Delirium', 'Essences', 'Expedition',
    'Fragments', 'Idols', 'LineageSupportGems', 'Ritual', 'Runes',
    'SoulCores', 'UncutGems', 'Verisium',
];

// откуда берём сырой ответ — пока только из файла
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
async function getRaw(url,fileName) {
    if (process.env.SOURCE === 'files') {
        const text = fs.readFileSync(path.join(FILES_DIR, `${fileName}.json`), 'utf8');
        return JSON.parse(text);
    }
    if (!USER_AGENT) {
        throw new Error('USER_AGENT is not set in .env — poe.ninja asks you to specify your contact information in it.');
    }
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (!res.ok) throw new Error(`poe.ninja answered ${res.status} on ${url}`);
    await sleep(1000);                      //kd
    return res.json();
}


export async function loadExchange(league, type) {
    const url = `${BASE}/exchange/current/overview?league=${encodeURIComponent(league)}&type=${type}`;
    const raw = await getRaw(url, type)
   
    const currency = raw.core?.primary ?? 'unknown'
    return {
        items: raw.items.map(i => ({
            id: i.id, name: i.name, image: i.image, category: i.category
        })),

        prices: raw.lines.map(l => ({
            id: l.id, primaryValue: l.primaryValue, currency
        })),
    };
}

export async function loadTablets(league) {
    const url = `${BASE}/stash/current/item/overview?league=${encodeURIComponent(league)}&type=PrecursorTablets`;
    const raw = await getRaw(url, 'PrecursorTablets');
    const normal = raw.lines.filter(line => line.variant === "Normal") ;
    const currency = raw.core?.primary ?? 'unknown'
    return {
        items: normal.map(l => ({ id: l.detailsId, name: l.name, image: l.icon.replace('https://web.poecdn.com', ''), category: l.category})),
        prices: normal.map(l => ({ id: l.detailsId, primaryValue: l.primaryValue, currency })),
    };
}
