'use client';

import { useEffect, useState, use } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import RouteGuard from '@/components/auth/RouteGuard';
import Button from '@/components/ui/Button';
import { applicationService, Application, jobService, Job } from '@/services/data';
import { useRouter } from 'next/navigation';

export default function JobApplicationsPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    // unwrapping params using React.use() or await in useEffect, but in Next.js 15+ params is a promise
    // To be safe with 'use client', we can unwrap it. 
    // However, since we can't use await at top level in client component easily without Suspense,
    // let's use the provided `use` hook from React if available or just handle it in effect if it was passed as prop (Next.js behavior varies by version).
    // Given Next.js 16 (canary/latest), params is a Promise.

    // Let's settle on handling the promise.
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

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex justify-center py-10">Loading...</div>
            </DashboardLayout>
        );
    }

    if (!job) {
        return (
            <DashboardLayout>
                <div className="text-center py-10">Job not found</div>
            </DashboardLayout>
        );
    }

    return (
        <RouteGuard allowedRoles={['RECRUITER']}>
            <DashboardLayout>
                <div className="mb-6">
                    <Button variant="secondary" onClick={() => router.back()} className="mb-4">
                        ← Back to Dashboard
                    </Button>
                    <h1 className="text-2xl font-bold text-gray-900">Applications for: {job.title}</h1>
                </div>

                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied At</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {applications.map((app) => (
                                    <tr key={app.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{app.applicant?.name}</div>
                                            <div className="text-sm text-gray-500">{app.applicant?.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(app.applied_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${app.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                                                    app.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                                        app.status === 'SHORTLISTED' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-blue-100 text-blue-800'}`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            {app.status === 'PENDING' && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusUpdate(app.id, 'SHORTLISTED')}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                                                    >
                                                        Shortlist
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(app.id, 'REJECTED')}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                            {app.status === 'SHORTLISTED' && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusUpdate(app.id, 'ACCEPTED')}
                                                        className="text-green-600 hover:text-green-900 mr-2"
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(app.id, 'REJECTED')}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {applications.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                                            No applications received yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </DashboardLayout>
        </RouteGuard>
    );
}
