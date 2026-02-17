import { Request, Response } from 'express';
import prisma from '../utils/db';
import { z } from 'zod';


const createJobSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
});

export const createJob = async (req: Request, res: Response) => {
    try {
        const { title, description } = createJobSchema.parse(req.body);
        const recruiterId = req.user?.userId;

        if (!recruiterId) return res.status(401).json({ error: 'Unauthorized' });

        const job = await prisma.job.create({
            data: {
                title,
                description,
                recruiter_id: recruiterId,
            },
        });

        res.status(201).json(job);
    } catch (error: any) {
        if (error instanceof z.ZodError) return res.status(400).json({ error: error.issues });
        res.status(500).json({ error: 'Failed to create job' });
    }
};

export const getJobs = async (req: Request, res: Response) => {
    try {
        const jobs = await prisma.job.findMany({
            include: { recruiter: { select: { name: true, email: true } } },
            orderBy: { created_at: 'desc' }
        });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
};

export const getJobById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        const job = await prisma.job.findUnique({
            where: { id },
            include: { recruiter: { select: { name: true } } },
        });

        if (!job) return res.status(404).json({ error: 'Job not found' });
        res.json(job);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch job' });
    }
};

export const closeJob = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };

        // Check if job exists and belongs to recruiter (or is admin)
        // For simplicity, allowedRoles middleware handles role check, but ownership check is here.
        const job = await prisma.job.findUnique({ where: { id } });
        if (!job) return res.status(404).json({ error: 'Job not found' });

        if (req.user?.role !== 'ADMIN' && job.recruiter_id !== req.user?.userId) {
            return res.status(403).json({ error: 'Not authorized to close this job' });
        }

        const updatedJob = await prisma.job.update({
            where: { id },
            data: { status: 'CLOSED' },
        });

        res.json(updatedJob);
    } catch (error) {
        res.status(500).json({ error: 'Failed to close job' });
    }
};
