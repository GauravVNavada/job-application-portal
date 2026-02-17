import express from 'express';
import { applyForJob, getApplicationsForJob, updateApplicationStatus, getMyApplications } from '../controllers/applicationController';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = express.Router();

router.post('/apply', authenticateToken, requireRole(['APPLICANT']), applyForJob);
router.get('/my-applications', authenticateToken, requireRole(['APPLICANT']), getMyApplications);
router.get('/job/:jobId', authenticateToken, requireRole(['RECRUITER', 'ADMIN']), getApplicationsForJob);
router.patch('/:id/status', authenticateToken, requireRole(['RECRUITER', 'ADMIN']), updateApplicationStatus);

export default router;
