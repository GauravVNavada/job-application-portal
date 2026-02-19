'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { jobService } from '@/services/data';
import { useRouter } from 'next/navigation';

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
        <DashboardLayout>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Post a New Job</h1>
            <div className="bg-white p-6 rounded-xl shadow-sm border max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Job Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="e.g. Senior Backend Engineer"
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder="Job requirements and details..."
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="secondary" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit" isLoading={isLoading}>Post Job</Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
