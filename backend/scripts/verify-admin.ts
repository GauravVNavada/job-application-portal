
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const generateRandomString = () => Math.random().toString(36).substring(7);
const generateEmail = () => `user_${generateRandomString()}@example.com`;

async function verifyAdminFlow() {
    try {
        console.log('≡ƒÜÇ Starting Admin Verification...');

        // 1. Register Admin
        const adminEmail = generateEmail();
        const adminmPassword = 'password123';
        const adminName = 'Admin User';

        console.log(`\n1. Registering ADMIN: ${adminEmail}`);
        // Note: Direct registration as ADMIN might be restricted in production, 
        // but for now our auth controller allows it if we send 'role: ADMIN'.
        // If not, we might need to seed it. checking authController...
        // Assuming public registration allows it for this MVP.
        const registerRes = await axios.post(`${API_URL}/auth/register`, {
            name: adminName,
            email: adminEmail,
            password: adminmPassword,
            role: 'ADMIN' // Critical
        });

        const adminToken = registerRes.data.token;
        console.log('✅ Admin Registered & Logged In');

        // 2. Fetch Users
        console.log('\n2. Fetching All Users (Admin Action)...');
        const usersRes = await axios.get(`${API_URL}/users`, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });

        if (Array.isArray(usersRes.data) && usersRes.data.length > 0) {
            console.log(`✅ Users fetched successfully (Count: ${usersRes.data.length})`);
        } else {
            throw new Error('❌ Failed to fetch users');
        }

        // 3. Create a Dummy User to Delete
        console.log('\n3. Creating Dummy User to Delete...');
        const dummyEmail = generateEmail();
        const dummyRes = await axios.post(`${API_URL}/auth/register`, {
            name: 'To Be Deleted',
            email: dummyEmail,
            password: 'password123',
            role: 'APPLICANT'
        });
        const dummyId = dummyRes.data.user.id;
        console.log(`   Dummy User Created: ${dummyId}`);

        // 4. Delete User
        console.log(`\n4. Deleting User: ${dummyId}...`);
        await axios.delete(`${API_URL}/users/${dummyId}`, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });

        // Verify Deletion
        try {
            // Re-fetch users and check if dummy is gone
            const usersAfter = await axios.get(`${API_URL}/users`, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            const found = usersAfter.data.find((u: any) => u.id === dummyId);
            if (!found) {
                console.log('✅ User Deleted Successfully');
            } else {
                throw new Error('❌ User still exists after deletion');
            }
        } catch (err) {
            throw new Error('❌ Failed to verify user deletion');
        }

        // 5. Test Job Deletion (Admin Action)
        console.log('\n5. Testing Admin Job Deletion...');

        // 5a. Create a Recruiter & Job
        const recruiterEmail = generateEmail();
        const recRes = await axios.post(`${API_URL}/auth/register`, {
            name: 'Job Poster',
            email: recruiterEmail,
            password: 'password123',
            role: 'RECRUITER'
        });
        const recruiterToken = recRes.data.token;

        const jobRes = await axios.post(`${API_URL}/jobs`, {
            title: 'Spam Job',
            description: 'This is a spam job that should be deleted by admin.'
        }, { headers: { Authorization: `Bearer ${recruiterToken}` } });

        const jobId = jobRes.data.id;
        console.log(`   Job Created: ${jobId} (Title: Spam Job)`);

        // 5b. Delete Job as Admin
        console.log(`   Deleting Job as Admin...`);
        await axios.delete(`${API_URL}/jobs/${jobId}`, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });

        // 5c. Verify Deletion
        try {
            await axios.get(`${API_URL}/jobs/${jobId}`);
            throw new Error('❌ Job still exists after deletion');
        } catch (err: any) {
            if (err.response && err.response.status === 404) {
                console.log('✅ Job Deleted Successfully');
            } else {
                throw err;
            }
        }

        console.log('\n🎉 ADMIN CHECKS PASSED SUCCESSFULLY!');

    } catch (error: any) {
        console.error('\n❌ ADMIN VERIFICATION FAILED');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error(error.message);
        }
        process.exit(1);
    }
}

verifyAdminFlow();
