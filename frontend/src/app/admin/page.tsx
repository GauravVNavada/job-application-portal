'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';

export default function AdminDashboard() {
    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">User Management</h2>
                    <p className="text-gray-500">Manage all registered users and their roles.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
                    <p className="text-green-600 font-medium">All systems operational</p>
                </div>
            </div>
        </DashboardLayout>
    );
}
