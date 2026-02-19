import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

async function runTest() {
    console.log('🚀 Starting Automated API Verification...');

    try {
        // 1. Register Recruiter
        const recruiterEmail = `recruiter_${Date.now()}@test.com`;
        console.log(`\n1. Registering Recruiter (${recruiterEmail})...`);
        const recruiterReg = await axios.post(`${API_URL}/auth/register`, {
            name: 'Recruiter Test',
            email: recruiterEmail,
            password: 'password123',
            role: 'RECRUITER'
        });
        console.log('✅ Recruiter Registered');

        // 2. Login Recruiter
        console.log('\n2. Logging in Recruiter...');
        const recruiterLogin = await axios.post(`${API_URL}/auth/login`, {
            email: recruiterEmail,
            password: 'password123'
        });
        const recruiterToken = recruiterLogin.data.token;
        console.log('✅ Recruiter Logged In');

        // 3. Post a Job
        console.log('\n3. Posting a Job...');
        const jobRes = await axios.post(`${API_URL}/jobs`, {
            title: 'Test Job Engineer',
            description: 'Automated test job description'
        }, {
            headers: { Authorization: `Bearer ${recruiterToken}` }
        });
        const jobId = jobRes.data.id;
        console.log(`✅ Job Posted (ID: ${jobId})`);

        // 4. Register Applicant
        const applicantEmail = `applicant_${Date.now()}@test.com`;
        console.log(`\n4. Registering Applicant (${applicantEmail})...`);
        await axios.post(`${API_URL}/auth/register`, {
            name: 'Applicant Test',
            email: applicantEmail,
            password: 'password123',
            role: 'APPLICANT' // Mapped to JOB SEEKER in frontend, technically APPLICANT in DB? Checking schema...
        });
        console.log('✅ Applicant Registered');

        // 5. Login Applicant
        console.log('\n5. Logging in Applicant...');
        const applicantLogin = await axios.post(`${API_URL}/auth/login`, {
            email: applicantEmail,
            password: 'password123'
        });
        const applicantToken = applicantLogin.data.token;
        console.log('✅ Applicant Logged In');

        // 6. Apply for Job
        console.log('\n6. Applying for Job...');
        await axios.post(`${API_URL}/applications/apply`, {
            jobId: jobId
        }, {
            headers: { Authorization: `Bearer ${applicantToken}` }
        });
        console.log('✅ Applied Successfully');

        // 7. Verify Application in Recruiter View
        console.log('\n7. Verifying Application (Recruiter View)...');
        const appsRes = await axios.get(`${API_URL}/applications/job/${jobId}`, {
            headers: { Authorization: `Bearer ${recruiterToken}` }
        });

        if (appsRes.data.length > 0 && appsRes.data[0].applicant.email === applicantEmail) {
            console.log('✅ Application verified in Recruiter Dashboard');
        } else {
            throw new Error('Application not found in recruiter view');
        }

        console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY! The backend logic is solid.');

    } catch (error: any) {
        console.error('❌ TEST FAILED');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error(error.message);
        }
        process.exit(1);
    }
}

runTest();
