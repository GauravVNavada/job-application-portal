import express from 'express';
import { createJob, getJobs, getJobById, closeJob } from '../controllers/jobController';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = express.Router();

router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', authenticateToken, requireRole(['RECRUITER', 'ADMIN']), createJob);
router.patch('/:id/close', authenticateToken, requireRole(['RECRUITER', 'ADMIN']), closeJob);

export default router;
