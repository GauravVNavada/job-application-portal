'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import RouteGuard from '@/components/auth/RouteGuard';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { jobService, Job } from '@/services/data';
import { Briefcase, PlusCircle, Eye, XCircle } from 'lucide-react';

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
                <div className="animate-fade-in">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">My Posted Jobs</h1>
                            <p className="text-sm text-gray-500 mt-1">Manage and track your job listings</p>
                        </div>
                        <Link href="/recruiter/jobs/new">
                            <Button>
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Post New Job
                            </Button>
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6">
                            {isLoading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map(i => <div key={i} className="skeleton h-20 w-full" />)}
                                </div>
                            ) : (
                                <div className="space-y-3 stagger-children">
                                    {jobs.map(job => (
                                        <div key={job.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 hover:bg-gray-100 p-5 rounded-xl gap-4 transition-colors">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 text-base">{job.title}</h3>
                                                <p className="text-xs text-gray-500 mt-1">Posted {new Date(job.created_at).toLocaleDateString()}</p>
                                                <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold ${job.status === 'OPEN' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-600'}`}>
                                                    {job.status}
                                                </span>
                                            </div>
                                            <div className="flex gap-2 w-full sm:w-auto">
                                                <Link href={`/recruiter/jobs/${job.id}/applications`} className="flex-1 sm:flex-none">
                                                    <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                                                        <Eye className="h-3.5 w-3.5 mr-1.5" />
                                                        Applications
                                                    </Button>
                                                </Link>
                                                {job.status === 'OPEN' && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleCloseJob(job.id)}
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-1 sm:flex-none"
                                                    >
                                                        <XCircle className="h-3.5 w-3.5 mr-1.5" />
                                                        Close
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {jobs.length === 0 && (
                                        <div className="text-center py-12">
                                            <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
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
                </div>
            </DashboardLayout>
        </RouteGuard>
    );
}
