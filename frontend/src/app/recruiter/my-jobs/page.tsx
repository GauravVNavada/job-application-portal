'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import RouteGuard from '@/components/auth/RouteGuard';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { jobService, Job } from '@/services/data';

export default function MyJobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await jobService.getMyJobs();
            setJobs(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseJob = async (jobId: string) => {
        if (!confirm('Are you sure you want to close this job? Applicants will no longer be able to apply.')) return;

        try {
            await jobService.closeJob(jobId);
            setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: 'CLOSED' } : j));
        } catch (err) {
            alert('Failed to close job');
        }
    };

    return (
        <RouteGuard allowedRoles={['RECRUITER']}>
            <DashboardLayout>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Posted Jobs</h1>
                    <Link href="/recruiter/jobs/new">
                        <Button>Post New Job</Button>
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="p-6">
                        {isLoading ? (
                            <p className="text-gray-500 text-center py-8">Loading jobs...</p>
                        ) : (
                            <div className="space-y-4">
                                {jobs.map(job => (
                                    <div key={job.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-4 rounded-lg gap-4">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 text-lg">{job.title}</h3>
                                            <p className="text-sm text-gray-500">Posted on {new Date(job.created_at).toLocaleDateString()}</p>
                                            <div className="mt-2">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${job.status === 'OPEN' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    {job.status}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <Link href={`/recruiter/jobs/${job.id}/applications`}>
                                                <Button variant="secondary" size="sm">
                                                    View Applications
                                                </Button>
                                            </Link>

                                            {job.status === 'OPEN' && (
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => handleCloseJob(job.id)}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    Close Job
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {jobs.length === 0 && (
                                    <div className="text-center py-10">
                                        <p className="text-gray-500 mb-4">You haven't posted any jobs yet.</p>
                                        <Link href="/recruiter/jobs/new">
                                            <Button>Post Your First Job</Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </DashboardLayout>
        </RouteGuard>
    );
}
