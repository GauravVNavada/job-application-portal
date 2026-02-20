'use client';

import { useEffect, useState, use } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import RouteGuard from '@/components/auth/RouteGuard';
import Button from '@/components/ui/Button';
import { applicationService, Application, jobService, Job } from '@/services/data';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Users, CheckCircle, XCircle, Clock, Star } from 'lucide-react';

export default function JobApplicationsPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);
    const [applications, setApplications] = useState<Application[]>([]);
    const [job, setJob] = useState<Job | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        params.then(setResolvedParams);
    }, [params]);

    useEffect(() => {
        if (!resolvedParams) return;

        const loadData = async () => {
            try {
                const [jobData, appsData] = await Promise.all([
                    jobService.getJobById(resolvedParams.id),
                    applicationService.getJobApplications(resolvedParams.id)
                ]);
                setJob(jobData);
                setApplications(appsData);
            } catch (err) {
                console.error('Failed to load data', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [resolvedParams]);

    const handleStatusUpdate = async (applicationId: string, newStatus: Application['status']) => {
        try {
            const updated = await applicationService.updateStatus(applicationId, newStatus);
            setApplications(prev => prev.map(app => app.id === applicationId ? { ...app, status: updated.status } : app));
        } catch (err: any) {
            alert(err.response?.data?.error || 'Failed to update status');
        }
    };

    const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
        PENDING: { color: 'bg-amber-100 text-amber-700', icon: <Clock className="h-3 w-3" /> },
        SHORTLISTED: { color: 'bg-blue-100 text-blue-700', icon: <Star className="h-3 w-3" /> },
        ACCEPTED: { color: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle className="h-3 w-3" /> },
        REJECTED: { color: 'bg-red-100 text-red-700', icon: <XCircle className="h-3 w-3" /> },
    };

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="animate-fade-in space-y-4">
                    <div className="skeleton h-8 w-40" />
                    <div className="skeleton h-6 w-64" />
                    <div className="skeleton h-64 w-full rounded-2xl" />
                </div>
            </DashboardLayout>
        );
    }

    if (!job) {
        return (
            <DashboardLayout>
                <div className="text-center py-16 animate-fade-in">
                    <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Job not found</p>
                    <Button variant="secondary" onClick={() => router.back()} className="mt-4">
                        <ArrowLeft className="h-4 w-4 mr-1.5" />
                        Go Back
                    </Button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <RouteGuard allowedRoles={['RECRUITER']}>
            <DashboardLayout>
                <div className="animate-fade-in">
                    <div className="mb-6">
                        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-4">
                            <ArrowLeft className="h-4 w-4 mr-1.5" />
                            Back
                        </Button>
                        <h1 className="text-2xl font-bold text-gray-900">Applications for: {job.title}</h1>
                        <p className="text-sm text-gray-500 mt-1">{applications.length} applicant{applications.length !== 1 ? 's' : ''}</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/50">
                                        <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Applicant</th>
                                        <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Applied</th>
                                        <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {applications.map((app) => {
                                        const status = statusConfig[app.status] || statusConfig.PENDING;
                                        return (
                                            <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                                                            {app.applicant?.name?.charAt(0)?.toUpperCase() || '?'}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-semibold text-gray-900">{app.applicant?.name}</div>
                                                            <div className="text-xs text-gray-500">{app.applicant?.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {new Date(app.applied_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                                                        {status.icon}
                                                        {app.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        {app.status === 'PENDING' && (
                                                            <>
                                                                <Button size="sm" variant="secondary" onClick={() => handleStatusUpdate(app.id, 'SHORTLISTED')}>
                                                                    <Star className="h-3 w-3 mr-1" />
                                                                    Shortlist
                                                                </Button>
                                                                <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => handleStatusUpdate(app.id, 'REJECTED')}>
                                                                    Reject
                                                                </Button>
                                                            </>
                                                        )}
                                                        {app.status === 'SHORTLISTED' && (
                                                            <>
                                                                <Button size="sm" onClick={() => handleStatusUpdate(app.id, 'ACCEPTED')}>
                                                                    <CheckCircle className="h-3 w-3 mr-1" />
                                                                    Accept
                                                                </Button>
                                                                <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => handleStatusUpdate(app.id, 'REJECTED')}>
                                                                    Reject
                                                                </Button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {applications.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-16 text-center">
                                                <Users className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                                                <p className="text-sm text-gray-500">No applications received yet.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </RouteGuard>
    );
}
