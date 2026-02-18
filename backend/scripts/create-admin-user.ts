
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

async function createAdmin() {
    try {
        console.log('Creating Admin User...');

        const email = 'admin@portal.com';
        const password = 'admin123';
        const name = 'System Admin';

        try {
            await axios.post(`${API_URL}/auth/register`, {
                name,
                email,
                password,
                role: 'ADMIN'
            });
            console.log('✅ Admin Created Successfully!');
            console.log(`Email: ${email}`);
            console.log(`Password: ${password}`);
        } catch (err: any) {
            if (err.response?.status === 400 && err.response?.data?.error === 'User already exists') {
                console.log('ℹ️ Admin user already exists.');
                console.log(`Email: ${email}`);
                console.log(`Password: ${password} (if you haven't changed it)`);
            } else {
                throw err;
            }
        }

    } catch (error: any) {
        console.error('❌ Failed to create admin:', error.message);
    }
}

createAdmin();
