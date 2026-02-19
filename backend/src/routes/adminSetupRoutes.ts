
import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

const SETUP_SECRET = 'temporary-admin-secret-123';

router.get('/promote', async (req, res) => {
    const { email, secret } = req.query;

    if (secret !== SETUP_SECRET) {
        return res.status(403).json({ error: 'Invalid setup secret' });
    }

    if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found. Please register first.' });
        }

        const updatedUser = await prisma.user.update({
            where: { email },
            data: { role: 'ADMIN' },
        });

        res.json({
            message: 'Success! User promoted to ADMIN.',
            user: { email: updatedUser.email, role: updatedUser.role }
        });
    } catch (error: any) {
        console.error('Promotion Error:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

export default router;
