
import { Client } from 'pg';

const connectionString = 'postgresql://neondb_owner:npg_3Lxc7HRIXMlP@ep-misty-fire-a1w9tgur-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function testConnection() {
    console.log('Testing connection to Neon DB...');
    const client = new Client({
        connectionString,
    });

    try {
        await client.connect();
        const res = await client.query('SELECT NOW()');
        console.log('✅ Connected successfully!', res.rows[0]);
        await client.end();
    } catch (err) {
        console.error('❌ Connection failed:', err);
    }
}

testConnection();
