'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Button from '@/components/ui/Button';
import { jobService, applicationService, Job } from '@/services/data';

export default function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [applying, setApplying] = useState<string | null>(null);

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        try {
            const data = await jobService.getJobs();
            setJobs(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleApply = async (jobId: string) => {
        setApplying(jobId);
        try {
            await applicationService.apply(jobId);
            alert('Application successful!');
        } catch (err) {
            alert('Failed to apply. You may have already applied.');
        } finally {
            setApplying(null);
        }
    };

    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Find Jobs</h1>

            {isLoading ? (
                <p>Loading jobs...</p>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {jobs.map((job) => (
                        <div key={job.id} className="bg-white p-6 rounded-xl shadow-sm border flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
                                <p className="text-sm text-gray-500 mt-1">Posted by {job.recruiter?.name || 'Unknown'}</p>
                                <p className="mt-4 text-gray-700 whitespace-pre-wrap">{job.description}</p>
                            </div>
                            <Button
                                onClick={() => handleApply(job.id)}
                                isLoading={applying === job.id}
                                disabled={job.status === 'CLOSED'}
                            >
                                {job.status === 'CLOSED' ? 'Closed' : 'Apply Now'}
                            </Button>
                        </div>
                    ))}
                    {jobs.length === 0 && <p className="text-gray-500">No jobs found.</p>}
                </div>
            )}
        </DashboardLayout>
    );
}
