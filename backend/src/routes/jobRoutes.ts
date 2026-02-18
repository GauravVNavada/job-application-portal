import express from 'express';
import { createJob, getJobs, getJobById, closeJob, getMyJobs, deleteJob } from '../controllers/jobController';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = express.Router();

router.get('/', getJobs);
router.get('/my-jobs', authenticateToken, requireRole(['RECRUITER']), getMyJobs);
router.get('/:id', getJobById);
router.post('/', authenticateToken, requireRole(['RECRUITER', 'ADMIN']), createJob);
router.patch('/:id/close', authenticateToken, requireRole(['RECRUITER', 'ADMIN']), closeJob);
router.delete('/:id', authenticateToken, requireRole(['RECRUITER', 'ADMIN']), deleteJob);

export default router;
