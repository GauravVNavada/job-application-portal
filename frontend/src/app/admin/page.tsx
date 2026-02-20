'use client';

import { useEffect, useState, Suspense } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import RouteGuard from '@/components/auth/RouteGuard';
import Button from '@/components/ui/Button';
import { userService, jobService } from '@/services/data';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Users, Briefcase, Trash2 } from 'lucide-react';

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

    const roleBadge: Record<string, string> = {
        ADMIN: 'bg-red-100 text-red-700',
        RECRUITER: 'bg-emerald-100 text-emerald-700',
        APPLICANT: 'bg-indigo-100 text-indigo-700',
    };

    return (
        <RouteGuard allowedRoles={['ADMIN']}>
            <DashboardLayout>
                <div className="animate-fade-in">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {activeTab === 'users' ? 'User Management' : 'Job Management'}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {activeTab === 'users' ? 'View and manage all registered users' : 'View and manage all job postings'}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                {activeTab === 'users' ? (
                                    <>
                                        <thead>
                                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stats</th>
                                                <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {isLoading ? (
                                                [1, 2, 3].map(i => (
                                                    <tr key={i}>
                                                        <td className="px-6 py-4"><div className="skeleton h-8 w-48" /></td>
                                                        <td className="px-6 py-4"><div className="skeleton h-6 w-20 rounded-full" /></td>
                                                        <td className="px-6 py-4"><div className="skeleton h-4 w-16" /></td>
                                                        <td className="px-6 py-4"><div className="skeleton h-8 w-16 ml-auto" /></td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <>
                                                    {users.map(user => (
                                                        <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                                            <td className="px-6 py-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                                                                        {user.name?.charAt(0)?.toUpperCase() || '?'}
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                                                                        <div className="text-xs text-gray-500">{user.email}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${roleBadge[user.role] || 'bg-gray-100 text-gray-600'}`}>
                                                                    {user.role}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                                {user.role === 'RECRUITER' && `${user._count?.jobs_posted || 0} jobs`}
                                                                {user.role === 'APPLICANT' && `${user._count?.applications || 0} apps`}
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                                    onClick={() => handleDeleteUser(user.id)}
                                                                >
                                                                    <Trash2 className="h-3.5 w-3.5" />
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {users.length === 0 && (
                                                        <tr><td colSpan={4} className="px-6 py-12 text-center">
                                                            <Users className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                                                            <p className="text-sm text-gray-500">No users found.</p>
                                                        </td></tr>
                                                    )}
                                                </>
                                            )}
                                        </tbody>
                                    </>
                                ) : (
                                    <>
                                        <thead>
                                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Job</th>
                                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Recruiter</th>
                                                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {isLoading ? (
                                                [1, 2, 3].map(i => (
                                                    <tr key={i}>
                                                        <td className="px-6 py-4"><div className="skeleton h-8 w-48" /></td>
                                                        <td className="px-6 py-4"><div className="skeleton h-4 w-28" /></td>
                                                        <td className="px-6 py-4"><div className="skeleton h-6 w-16 rounded-full" /></td>
                                                        <td className="px-6 py-4"><div className="skeleton h-8 w-16 ml-auto" /></td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <>
                                                    {jobs.map(job => (
                                                        <tr key={job.id} className="hover:bg-gray-50/50 transition-colors">
                                                            <td className="px-6 py-4">
                                                                <div className="text-sm font-semibold text-gray-900">{job.title}</div>
                                                                <div className="text-xs text-gray-500">Posted {new Date(job.created_at).toLocaleDateString()}</div>
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-500">{job.recruiter?.name}</td>
                                                            <td className="px-6 py-4">
                                                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${job.status === 'OPEN' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-600'}`}>
                                                                    {job.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-right">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                                    onClick={() => handleDeleteJob(job.id)}
                                                                >
                                                                    <Trash2 className="h-3.5 w-3.5" />
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    {jobs.length === 0 && (
                                                        <tr><td colSpan={4} className="px-6 py-12 text-center">
                                                            <Briefcase className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                                                            <p className="text-sm text-gray-500">No jobs found.</p>
                                                        </td></tr>
                                                    )}
                                                </>
                                            )}
                                        </tbody>
                                    </>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </RouteGuard>
    );
}

export default function AdminDashboard() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>}>
            <AdminContent />
        </Suspense>
    );
}
