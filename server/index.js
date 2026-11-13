import express from 'express';
import { pool } from './db.js';
import { getLatestPrices } from './prices.js';

const app = express();
const PORT = process.env.PORT || 3000;
const DEFAULT_LEAGUE = process.env.DEFAULT_LEAGUE;


app.get('/health', async (req, res) => {
    try {
        await pool.query('SELECT 1'); 
        res.json({ ok: true, db: 'up' });
    } catch {
        res.status(503).json({ ok: false, db: 'down' });   
    }
});

app.get('/api/prices', async (req, res) => {
    const league = req.query.league ?? DEFAULT_LEAGUE; // req.query.league  не понял 
    if (typeof league !== 'string' || league.length === 0 || league.length > 100) {
        return res.status(400).json({ error: 'incorrect league' });
    }
    const items = await getLatestPrices(league);
    res.json({ league, updatedAt: items[0]?.fetched_at ?? null, items });
});

// общий обработчик ошибок — всегда последним
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
});

app.listen(PORT, () => console.log(`The server is running.: http://localhost:${PORT}`));