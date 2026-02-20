'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import RouteGuard from '@/components/auth/RouteGuard';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { applicationService, Application } from '@/services/data';
import { FileText, Briefcase, Clock, CheckCircle } from 'lucide-react';

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

    const statusColor: Record<string, string> = {
        PENDING: 'bg-amber-100 text-amber-700',
        SHORTLISTED: 'bg-blue-100 text-blue-700',
        REJECTED: 'bg-red-100 text-red-700',
        ACCEPTED: 'bg-emerald-100 text-emerald-700',
    };

    return (
        <RouteGuard allowedRoles={['APPLICANT']}>
            <DashboardLayout>
                <div className="animate-fade-in">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Applicant Dashboard</h1>
                            <p className="text-sm text-gray-500 mt-1">Track your job applications</p>
                        </div>
                        <Link href="/applicant/jobs">
                            <Button>
                                <Briefcase className="h-4 w-4 mr-2" />
                                Find Jobs
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 stagger-children">
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                                    <FileText className="h-5 w-5 text-indigo-600" />
                                </div>
                                <h3 className="text-sm font-medium text-gray-500">Total Applied</h3>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{applications.length}</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center">
                                    <Clock className="h-5 w-5 text-amber-600" />
                                </div>
                                <h3 className="text-sm font-medium text-gray-500">Pending</h3>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{applications.filter(a => a.status === 'PENDING').length}</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                                </div>
                                <h3 className="text-sm font-medium text-gray-500">Accepted</h3>
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{applications.filter(a => a.status === 'ACCEPTED').length}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">Your Applications</h2>
                        </div>
                        <div className="p-6">
                            {isLoading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map(i => <div key={i} className="skeleton h-16 w-full" />)}
                                </div>
                            ) : applications.length > 0 ? (
                                <div className="space-y-3 stagger-children">
                                    {applications.map(app => (
                                        <div key={app.id} className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition-colors">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{app.job?.title || 'Unknown Job'}</h3>
                                                <p className="text-xs text-gray-500 mt-0.5">Applied {new Date(app.applied_at).toLocaleDateString()}</p>
                                            </div>
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor[app.status] || 'bg-gray-100 text-gray-600'}`}>
                                                {app.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10">
                                    <FileText className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500 mb-4">You haven't applied to any jobs yet.</p>
                                    <Link href="/applicant/jobs">
                                        <Button variant="secondary">Browse Jobs</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </RouteGuard>
    );
}
