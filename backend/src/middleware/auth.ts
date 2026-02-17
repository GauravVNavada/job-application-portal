import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

// Extend Express Request type to include user
declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                role: string;
            };
        }
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    const payload = verifyToken(token);

    if (!payload) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }

    req.user = payload;
    next();
};

export const requireRole = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
        }

        next();
    };
};
