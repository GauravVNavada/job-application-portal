'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import RouteGuard from '@/components/auth/RouteGuard';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { jobService, Job } from '@/services/data';
import { Briefcase, PlusCircle, TrendingUp, Clock } from 'lucide-react';

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

    const activeJobs = jobs.filter(j => j.status === 'OPEN').length;

    return (
        <RouteGuard allowedRoles={['RECRUITER']}>
            <DashboardLayout>
                <div className="animate-fade-in">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Recruiter Dashboard</h1>
                            <p className="text-sm text-gray-500 mt-1">Manage your job postings and candidates</p>
                        </div>
                        <Link href="/recruiter/jobs/new">
                            <Button>
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Post New Job
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 stagger-children">
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                                </div>
                                <h3 className="text-sm font-medium text-gray-500">Active Jobs</h3>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{activeJobs}</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                                    <Briefcase className="h-5 w-5 text-indigo-600" />
                                </div>
                                <h3 className="text-sm font-medium text-gray-500">Total Posted</h3>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{jobs.length}</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center">
                                    <Clock className="h-5 w-5 text-amber-600" />
                                </div>
                                <h3 className="text-sm font-medium text-gray-500">Closed</h3>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{jobs.length - activeJobs}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">Recent Job Postings</h2>
                        </div>
                        <div className="p-6">
                            {isLoading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map(i => <div key={i} className="skeleton h-16 w-full" />)}
                                </div>
                            ) : (
                                <div className="space-y-3 stagger-children">
                                    {jobs.slice(0, 5).map(job => (
                                        <div key={job.id} className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition-colors">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{job.title}</h3>
                                                <p className="text-xs text-gray-500 mt-0.5">Posted {new Date(job.created_at).toLocaleDateString()}</p>
                                            </div>
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${job.status === 'OPEN' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-600'}`}>
                                                {job.status}
                                            </span>
                                        </div>
                                    ))}
                                    {jobs.length === 0 && (
                                        <div className="text-center py-10">
                                            <Briefcase className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                                            <p className="text-gray-500">No jobs posted yet.</p>
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
