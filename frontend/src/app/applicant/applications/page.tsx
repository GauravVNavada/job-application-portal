'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import RouteGuard from '@/components/auth/RouteGuard';
import { applicationService, Application } from '@/services/data';
import { FileText } from 'lucide-react';

const StatusBadge = ({ status }: { status: Application['status'] }) => {
    const styles: Record<string, string> = {
        PENDING: 'bg-amber-100 text-amber-700',
        SHORTLISTED: 'bg-blue-100 text-blue-700',
        REJECTED: 'bg-red-100 text-red-700',
        ACCEPTED: 'bg-emerald-100 text-emerald-700',
    };
    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
            {status}
        </span>
    );
};

export default function MyApplicationsPage() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await applicationService.getMyApplications();
                setApplications(data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    return (
        <RouteGuard allowedRoles={['APPLICANT']}>
            <DashboardLayout>
                <div className="animate-fade-in">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
                        <p className="text-sm text-gray-500 mt-1">Track all your job applications</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/50">
                                        <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Job Title</th>
                                        <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Applied On</th>
                                        <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {isLoading ? (
                                        [1, 2, 3].map(i => (
                                            <tr key={i}>
                                                <td className="px-6 py-4"><div className="skeleton h-4 w-40" /></td>
                                                <td className="px-6 py-4"><div className="skeleton h-4 w-24" /></td>
                                                <td className="px-6 py-4"><div className="skeleton h-6 w-20 rounded-full" /></td>
                                            </tr>
                                        ))
                                    ) : (
                                        <>
                                            {applications.map((app) => (
                                                <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{app.job?.title || 'Unknown Job'}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">{new Date(app.applied_at).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4"><StatusBadge status={app.status} /></td>
                                                </tr>
                                            ))}
                                            {applications.length === 0 && (
                                                <tr>
                                                    <td colSpan={3} className="px-6 py-12 text-center">
                                                        <FileText className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                                                        <p className="text-sm text-gray-500">You haven't applied to any jobs yet.</p>
                                                    </td>
                                                </tr>
                                            )}
                                        </>
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
