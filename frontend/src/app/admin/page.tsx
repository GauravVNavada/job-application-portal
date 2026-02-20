'use client';

import { useEffect, useState, Suspense } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import RouteGuard from '@/components/auth/RouteGuard';
import Button from '@/components/ui/Button';
import { userService, jobService } from '@/services/data';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

function AdminContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const tabParam = searchParams.get('tab');
    const activeTab = (tabParam === 'users' || tabParam === 'jobs') ? tabParam : 'jobs';

    const [users, setUsers] = useState<any[]>([]);
    const [jobs, setJobs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, [activeTab]);

    const loadData = async () => {
        setIsLoading(true);
        try {
            if (activeTab === 'users') {
                const data = await userService.getAllUsers();
                setUsers(data);
            } else {
                const data = await jobService.getJobs();
                setJobs(data);
            }
        } catch (err) {
            console.error('Failed to load data', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteUser = async (id: string) => {
        if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
        try {
            await userService.deleteUser(id);
            setUsers(prev => prev.filter(u => u.id !== id));
        } catch (err) {
            alert('Failed to delete user');
        }
    };

    const handleDeleteJob = async (id: string) => {
        if (!confirm('Are you sure you want to delete this job?')) return;
        try {
            await jobService.deleteJob(id);
            setJobs(prev => prev.filter(j => j.id !== id));
        } catch (err) {
            alert('Failed to delete job');
        }
    };

    return (
        <RouteGuard allowedRoles={['ADMIN']}>
            <DashboardLayout>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {activeTab === 'users' ? 'User Management' : 'Job Management'}
                    </h1>
                </div>

                <div className="bg-white rounded-xl shadow-sm border overflow-hidden min-h-[500px]">
                    {/* Tabs removed as per user request */}

                    <div className="p-6">
                        {isLoading ? (
                            <p className="text-center text-gray-500">Loading...</p>
                        ) : (
                            <>
                                {activeTab === 'users' && (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead>
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stats</th>
                                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {users.map(user => (
                                                    <tr key={user.id}>
                                                        <td className="px-6 py-4">
                                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                            <div className="text-sm text-gray-500">{user.email}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                                                                user.role === 'RECRUITER' ? 'bg-blue-100 text-blue-800' :
                                                                    'bg-gray-100 text-gray-800'
                                                                }`}>
                                                                {user.role}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-500">
                                                            {user.role === 'RECRUITER' && `Jobs: ${user._count?.jobs_posted || 0}`}
                                                            {user.role === 'APPLICANT' && `Apps: ${user._count?.applications || 0}`}
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <Button
                                                                variant="secondary"
                                                                size="sm"
                                                                className="text-red-600 hover:bg-red-50"
                                                                onClick={() => handleDeleteUser(user.id)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {activeTab === 'jobs' && (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead>
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job Title</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recruiter</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {jobs.map(job => (
                                                    <tr key={job.id}>
                                                        <td className="px-6 py-4">
                                                            <div className="text-sm font-medium text-gray-900">{job.title}</div>
                                                            <div className="text-xs text-gray-500">Posted on {new Date(job.created_at).toLocaleDateString()}</div>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-500">
                                                            {job.recruiter?.name}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${job.status === 'OPEN' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                                {job.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <Button
                                                                variant="secondary"
                                                                size="sm"
                                                                className="text-red-600 hover:bg-red-50"
                                                                onClick={() => handleDeleteJob(job.id)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </DashboardLayout>
        </RouteGuard>
    );
}

export default function AdminDashboard() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AdminContent />
        </Suspense>
    );
}
