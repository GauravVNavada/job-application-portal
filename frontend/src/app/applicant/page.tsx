'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function ApplicantDashboard() {
    return (
        <DashboardLayout>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
                <Link href="/applicant/jobs">
                    <Button>Find Jobs</Button>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-900">Application Status</h2>
                </div>
                <div className="p-6">
                    <div className="flex space-x-4 mb-6">
                        {/* Progress Bar Mockup */}
                        <div className="flex-1 text-center">
                            <div className="w-8 h-8 bg-blue-600 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-sm">1</div>
                            <p className="text-xs text-gray-600">Applied</p>
                        </div>
                        <div className="flex-1 text-center">
                            <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center text-gray-500 text-sm">2</div>
                            <p className="text-xs text-gray-500">Shortlisted</p>
                        </div>
                        <div className="flex-1 text-center">
                            <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center text-gray-500 text-sm">3</div>
                            <p className="text-xs text-gray-500">Interview</p>
                        </div>
                        <div className="flex-1 text-center">
                            <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center text-gray-500 text-sm">4</div>
                            <p className="text-xs text-gray-500">Offer</p>
                        </div>
                    </div>

                    <p className="text-gray-500 text-center py-4">You haven't applied to any jobs yet.</p>
                </div>
            </div>
        </DashboardLayout>
    );
}
