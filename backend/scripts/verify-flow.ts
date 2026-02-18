
const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function runVerification() {
    console.log('🚀 Starting Automated Verification...');

    try {
        // 1. Register Recruiter
        console.log('\nPlease wait... Registering Recruiter...');
        const recruiterEmail = `recruiter_${Date.now()}@test.com`;
        await axios.post(`${API_URL}/auth/register`, {
            name: 'Auto Recruiter',
            email: recruiterEmail,
            password: 'password123',
            role: 'RECRUITER'
        });
        console.log('✅ Recruiter Registered');

        // 2. Login Recruiter
        console.log('Login Recruiter...');
        const recruiterLogin = await axios.post(`${API_URL}/auth/login`, {
            email: recruiterEmail,
            password: 'password123'
        });
        const recruiterToken = recruiterLogin.data.token;
        console.log('✅ Recruiter Logged In');

        // 3. Post a Job
        console.log('Posting Job...');
        const job = await axios.post(`${API_URL}/jobs`, {
            title: 'Automated Test Engineer',
            description: 'Testing the system via script'
        }, {
            headers: { Authorization: `Bearer ${recruiterToken}` }
        });
        const jobId = job.data.id;
        console.log(`✅ Job Posted (ID: ${jobId})`);

        // 4. Register Applicant
        console.log('\nRegistering Applicant...');
        const applicantEmail = `applicant_${Date.now()}@test.com`;
        await axios.post(`${API_URL}/auth/register`, {
            name: 'Auto Applicant',
            email: applicantEmail,
            password: 'password123',
            role: 'APPLICANT'
        });
        console.log('✅ Applicant Registered');

        // 5. Login Applicant
        console.log('Login Applicant...');
        const applicantLogin = await axios.post(`${API_URL}/auth/login`, {
            email: applicantEmail,
            password: 'password123'
        });
        const applicantToken = applicantLogin.data.token;
        console.log('✅ Applicant Logged In');

        // 6. View Jobs
        console.log('Fetching Jobs...');
        const jobs = await axios.get(`${API_URL}/jobs`);
        const foundJob = jobs.data.find((j: any) => j.id === jobId);
        if (foundJob) console.log('✅ Job found in listing');
        else throw new Error('❌ Job not found in listing!');

        // 7. Apply for Job
        console.log('Applying for Job...');
        await axios.post(`${API_URL}/applications/apply`, {
            jobId: jobId
        }, {
            headers: { Authorization: `Bearer ${applicantToken}` }
        });
        console.log('✅ Application Submitted');

        // 8. Verify Application Status
        console.log('Verifying Application Status...');
        const applications = await axios.get(`${API_URL}/applications/my-applications`, {
            headers: { Authorization: `Bearer ${applicantToken}` }
        });

        const myApp = applications.data.find((a: any) => a.job_id === jobId);
        if (myApp && myApp.status === 'PENDING') {
            console.log('✅ Application Verified (Status: PENDING)');
        } else {
            throw new Error('❌ Application not found or incorrect status');
        }

        console.log('Verifying Recruiter "My Jobs"...');
        const myJobs = await axios.get(`${API_URL}/jobs/my-jobs`, {
            headers: { Authorization: `Bearer ${recruiterToken}` }
        });
        if (myJobs.data.length > 0 && myJobs.data.some((j: any) => j.id === jobId)) {
            console.log(`✅ Recruiter "My Jobs" verified (${myJobs.data.length} jobs found)`);
        } else {
            throw new Error('❌ Job not found in recruiter list');
        }

        console.log('\n🎉 ALL CHECKS PASSED SUCCESSFULLY!');

    } catch (error: any) {
        console.error('\n❌ VERIFICATION FAILED');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error(error.message);
        }
        process.exit(1);
    }
}

runVerification();
