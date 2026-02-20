'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import RouteGuard from '@/components/auth/RouteGuard';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { applicationService, Application } from '@/services/data';

export default function ApplicantDashboard() {
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
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Applicant Dashboard</h1>
                    <Link href="/applicant/jobs">
                        <Button>Find Jobs</Button>
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="px-6 py-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-900">Your Applications</h2>
                    </div>
                    <div className="p-6">
                        {isLoading ? (
                            <p className="text-center text-gray-500">Loading...</p>
                        ) : applications.length > 0 ? (
                            <div className="space-y-4">
                                {applications.map(app => (
                                    <div key={app.id} className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{app.job?.title || 'Unknown Job'}</h3>
                                            <p className="text-xs text-gray-500">Applied on {new Date(app.applied_at).toLocaleDateString()}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium 
                                        ${app.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                                                app.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                                    app.status === 'SHORTLISTED' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-yellow-100 text-yellow-800'}`}>
                                            {app.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500 mb-4">You haven't applied to any jobs yet.</p>
                                <Link href="/applicant/jobs">
                                    <Button variant="secondary">Browse Jobs</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </DashboardLayout>
        </RouteGuard>
    );
}
