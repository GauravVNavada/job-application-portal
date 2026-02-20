'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import RouteGuard from '@/components/auth/RouteGuard';
import { applicationService, Application } from '@/services/data';

const StatusBadge = ({ status }: { status: Application['status'] }) => {
    const styles = {
        PENDING: 'bg-yellow-100 text-yellow-800',
        SHORTLISTED: 'bg-blue-100 text-blue-800',
        REJECTED: 'bg-red-100 text-red-800',
        ACCEPTED: 'bg-green-100 text-green-800',
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
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
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Applications</h1>

                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied On</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {applications.map((app) => (
                                    <tr key={app.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.job?.title || 'Unknown Job'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(app.applied_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge status={app.status} />
                                        </td>
                                    </tr>
                                ))}
                                {applications.length === 0 && !isLoading && (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                                            You haven't applied to any jobs yet.
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
