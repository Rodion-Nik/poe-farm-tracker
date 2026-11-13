import { EXCHANGE_TYPES, loadExchange, loadTablets } from './ninja.js';
import { saveSnapshot } from './db.js'

const LEAGUE = process.env.LEAGUE ?? 'Standard';
const INTERVAL_MIN = Number(process.env.INTERVAL_MIN ?? 60);
async function collectOnce() {
    const items = [];
    const prices = [];

    for (const type of EXCHANGE_TYPES) {
        const r = await loadExchange(LEAGUE, type);
        items.push(...r.items),
        prices.push(...r.prices)
    }
    const data = await loadTablets(LEAGUE) 
    items.push(...data.items)
    prices.push(...data.prices)

    const known = new Set(items.map(item => item.id));          
    const valid = prices.filter(price => known.has(price.id)); 


    const saved = await saveSnapshot(LEAGUE, items, valid);
    console.log(`[collector] ${LEAGUE}: предметов ${items.length}, сохранено цен ${saved}, пропущено ${prices.length - valid.length}`);
}
async function run() {
    try {
        await collectOnce();
    } catch (err) {
        console.error('[collector] error:', err.message);   
    }
}

await run();                                 
setInterval(run, INTERVAL_MIN * 60_000);
