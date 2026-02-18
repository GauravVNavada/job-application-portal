
import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function check() {
    try {
        const client = await pool.connect();
        const res = await client.query('SELECT NOW()');
        console.log('✅ DB Connected:', res.rows[0]);
        client.release();
        process.exit(0);
    } catch (err) {
        console.error('❌ DB Connection Failed:', err);
        process.exit(1);
    }
}

check();
