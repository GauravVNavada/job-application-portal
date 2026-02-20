'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import RouteGuard from '@/components/auth/RouteGuard';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { jobService, Job } from '@/services/data';

export default function RecruiterDashboard() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await jobService.getJobs();
                setJobs(data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    return (
        <RouteGuard allowedRoles={['RECRUITER']}>
            <DashboardLayout>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Recruiter Dashboard</h1>
                    <Link href="/recruiter/jobs/new">
                        <Button>Post New Job</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <h3 className="text-gray-500 text-sm font-medium">Active Jobs</h3>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{jobs.filter(j => j.status === 'OPEN').length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <h3 className="text-gray-500 text-sm font-medium">Total Jobs Posted</h3>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{jobs.length}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Job Postings</h2>
                    </div>
                    <div className="p-6">
                        {isLoading ? (
                            <p className="text-gray-500 text-center py-8">Loading jobs...</p>
                        ) : (
                            <div className="space-y-4">
                                {jobs.slice(0, 5).map(job => (
                                    <div key={job.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{job.title}</h3>
                                            <p className="text-sm text-gray-500">Posted on {new Date(job.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${job.status === 'OPEN' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {job.status}
                                        </span>
                                    </div>
                                ))}
                                {jobs.length === 0 && <p className="text-gray-500 text-center">No jobs posted yet.</p>}
                            </div>
                        )}
                    </div>
                </div>
            </DashboardLayout>
        </RouteGuard>
    );
}
