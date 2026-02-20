'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import RouteGuard from '@/components/auth/RouteGuard';
import Button from '@/components/ui/Button';
import { jobService, applicationService, Job } from '@/services/data';
import { Briefcase, CheckCircle, Search } from 'lucide-react';

export default function FindJobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [applyingId, setApplyingId] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [jobsData, appsData] = await Promise.all([
                    jobService.getJobs(),
                    applicationService.getMyApplications()
                ]);
                setJobs(jobsData.filter((j: Job) => j.status === 'OPEN'));
                setAppliedJobIds(new Set(appsData.map((a: any) => a.job_id)));
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const handleApply = async (jobId: string) => {
        setApplyingId(jobId);
        try {
            await applicationService.apply(jobId);
            setAppliedJobIds(prev => new Set([...prev, jobId]));
        } catch (err: any) {
            alert(err.response?.data?.error || 'Failed to apply');
        } finally {
            setApplyingId(null);
        }
    };

    return (
        <RouteGuard allowedRoles={['APPLICANT']}>
            <DashboardLayout>
                <div className="animate-fade-in">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Find Jobs</h1>
                        <p className="text-sm text-gray-500 mt-1">Discover opportunities that match your skills</p>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map(i => <div key={i} className="skeleton h-48 w-full rounded-2xl" />)}
                        </div>
                    ) : jobs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-children">
                            {jobs.map(job => {
                                const applied = appliedJobIds.has(job.id);
                                return (
                                    <div key={job.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                                                <Briefcase className="h-5 w-5 text-indigo-600" />
                                            </div>
                                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                                                OPEN
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{job.title}</h3>
                                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{job.description}</p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs text-gray-400">Posted {new Date(job.created_at).toLocaleDateString()}</p>
                                            {applied ? (
                                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                                                    <CheckCircle className="h-3.5 w-3.5" />
                                                    Applied
                                                </span>
                                            ) : (
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleApply(job.id)}
                                                    isLoading={applyingId === job.id}
                                                >
                                                    Apply Now
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">No open jobs available right now.</p>
                            <p className="text-gray-400 text-sm mt-1">Check back later for new opportunities.</p>
                        </div>
                    )}
                </div>
            </DashboardLayout>
        </RouteGuard>
    );
}
