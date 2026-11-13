// server/prices.js
import { pool } from './db.js';

const LATEST_SQL = `
  SELECT DISTINCT ON (p.item_id)
         i.id, i.name, i.category, i.image,
         p.value::float8 AS price,      -- ::float8 — см. ниже, почему
         p.currency, p.fetched_at
  FROM prices p
  JOIN items i ON i.id = p.item_id
  WHERE p.league = $1
  ORDER BY p.item_id, p.fetched_at DESC`;

export async function getLatestPrices(league) {
    const { rows } = await pool.query(LATEST_SQL, [league]);
    return rows;
}