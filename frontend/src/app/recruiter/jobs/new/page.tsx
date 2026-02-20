'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import RouteGuard from '@/components/auth/RouteGuard';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { jobService } from '@/services/data';
import { useRouter } from 'next/navigation';
import { FileText, ArrowLeft } from 'lucide-react';

export default function PostJobPage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await jobService.createJob({ title, description });
            router.push('/recruiter');
        } catch (err) {
            setError('Failed to create job');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <RouteGuard allowedRoles={['RECRUITER']}>
            <DashboardLayout>
                <div className="animate-fade-in">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
                        <p className="text-sm text-gray-500 mt-1">Fill in the details to create a new job listing</p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm max-w-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Job Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                placeholder="e.g. Senior Backend Engineer"
                                icon={<FileText className="h-4 w-4" />}
                            />

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
                                <textarea
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 hover:border-gray-300 transition-all duration-200 min-h-[180px] resize-y"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    placeholder="Describe the role, requirements, and what makes this position great..."
                                />
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-100 animate-scale-in">
                                    {error}
                                </div>
                            )}

                            <div className="flex justify-end gap-3 pt-2">
                                <Button type="button" variant="secondary" onClick={() => router.back()}>
                                    <ArrowLeft className="h-4 w-4 mr-1.5" />
                                    Cancel
                                </Button>
                                <Button type="submit" isLoading={isLoading}>Post Job</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </DashboardLayout>
        </RouteGuard>
    );
}
