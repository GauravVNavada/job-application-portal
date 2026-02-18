import express from 'express';
import { getAllUsers, deleteUser } from '../controllers/userController';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = express.Router();

// All routes require ADMIN role
router.use(authenticateToken, requireRole(['ADMIN']));

router.get('/', getAllUsers);
router.delete('/:id', deleteUser);

export default router;
