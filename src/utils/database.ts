import { Pool, QueryResult } from 'pg';

const createPool = () => {
    console.log('Creating new pool');

    return new Pool({
        user: process.env.user,
        host: process.env.host,
        database: process.env.database,
        password: process.env.password,
        port: 5432,
    });
}

let pool: Pool;

const globalForPool = global as unknown as { pool: Pool };

if (process.env.NODE_ENV === 'production') {
    pool = createPool();
} else {
    if (!globalForPool.pool) {
      globalForPool.pool = createPool();
    }
    pool = globalForPool.pool;
}
  
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