import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const applySchema = z.object({
    jobId: z.string(),
});

const updateStatusSchema = z.object({
    status: z.enum(['PENDING', 'SHORTLISTED', 'REJECTED', 'ACCEPTED']),
});

export const applyForJob = async (req: Request, res: Response) => {
    try {
        const { jobId } = applySchema.parse(req.body);
        const applicantId = req.user?.userId;

        if (!applicantId) return res.status(401).json({ error: 'Unauthorized' });

        // Check if already applied
        const existing = await prisma.application.findUnique({
            where: {
                job_id_applicant_id: {
                    job_id: jobId,
                    applicant_id: applicantId,
                },
            },
        });

        if (existing) return res.status(400).json({ error: 'Already applied to this job' });

        const application = await prisma.application.create({
            data: {
                job_id: jobId,
                applicant_id: applicantId,
            },
        });

        res.status(201).json(application);
    } catch (error) {
        if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
        res.status(500).json({ error: 'Failed to apply' });
    }
};

export const getApplicationsForJob = async (req: Request, res: Response) => {
    try {
        const { jobId } = req.params;

        // Authorization: Only Recruiter who posted it or Admin
        const job = await prisma.job.findUnique({ where: { id: jobId } });
        if (!job) return res.status(404).json({ error: 'Job not found' });

        if (req.user?.role !== 'ADMIN' && job.recruiter_id !== req.user?.userId) {
            return res.status(403).json({ error: 'Unauthorized to view applications for this job' });
        }

        const applications = await prisma.application.findMany({
            where: { job_id: jobId },
            include: { applicant: { select: { id: true, name: true, email: true } } },
        });

        res.json(applications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
};

export const getMyApplications = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ error: 'Unauthorized' });

        const applications = await prisma.application.findMany({
            where: { applicant_id: userId },
            include: { job: true }
        });

        res.json(applications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
}

export const updateApplicationStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = updateStatusSchema.parse(req.body);

        const application = await prisma.application.findUnique({
            where: { id },
            include: { job: true },
        });

        if (!application) return res.status(404).json({ error: 'Application not found' });

        // Auth check
        if (req.user?.role !== 'ADMIN' && application.job.recruiter_id !== req.user?.userId) {
            return res.status(403).json({ error: 'Unauthorized to update this application' });
        }

        // Logic enforcement: Cannot accept without being shortlisted first
        if (status === 'ACCEPTED' && application.status !== 'SHORTLISTED') {
            return res.status(400).json({ error: 'Candidate must be shortlisted before acceptance' });
        }

        const updated = await prisma.application.update({
            where: { id },
            data: { status: status as any },
        });

        res.json(updated);
    } catch (error) {
        if (error instanceof z.ZodError) return res.status(400).json({ error: error.errors });
        res.status(500).json({ error: 'Failed to update status' });
    }
};
