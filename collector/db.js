import pg from 'pg';

export const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 10 });

pool.on('error', err => console.error('[db] connection error in the pool:', err.message));

export async function saveSnapshot(league, items, prices) {
    const fetchedAt = new Date();
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        for (const it of items) {
            await client.query(
                `INSERT INTO items (id, name, category, image) VALUES ($1, $2, $3, $4)
         ON CONFLICT (id) DO UPDATE
         SET name = EXCLUDED.name, category = EXCLUDED.category, image = EXCLUDED.image`,
                [it.id, it.name, it.category, it.image],
            );
        }

        for (const p of prices) {
            await client.query(
                'INSERT INTO prices (item_id, league, value, currency, fetched_at) VALUES ($1, $2, $3, $4, $5)',
                [p.id, league, p.primaryValue, p.currency, fetchedAt],
            );
        }

        await client.query('COMMIT');
        return prices.length;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}