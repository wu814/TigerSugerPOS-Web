import { Pool, QueryResult } from 'pg';

const pool = new Pool({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password, // Replace with your actual password
    port: 5432,
});

export async function query(text: string, params?: any[]): Promise<QueryResult> {
    const start = Date.now();
    const client = await pool.connect();

    try {
        const res = await client.query(text, params);
        const duration = Date.now() - start;
        console.log('executed query', { text, duration });
        return res;
    } catch (err) {
        throw err;
    } finally {
        client.release();
    }
}