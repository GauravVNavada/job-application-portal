'use client';

import Sidebar from '@/components/layout/Sidebar';
import { useAuth } from '@/context/AuthContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();

    if (!user) {
        return <div className="min-h-screen bg-gray-50">{children}</div>;
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full min-w-0">
                {children}
            </main>
        </div>
    );
}
