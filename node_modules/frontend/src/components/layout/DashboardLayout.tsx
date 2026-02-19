'use client';

import Sidebar from '@/components/layout/Sidebar';
import { useAuth } from '@/context/AuthContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();

    // If no user, just render children (likely login/register pages or loading)
    // In a real app, middleware would handle protection, but layout needs to be flexible.
    if (!user) {
        return <div className="min-h-screen bg-gray-50">{children}</div>;
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 p-8 ml-64 overflow-y-auto w-full"> {/* ml-64 to offset fixed sidebar if needed, but flex handles it */}
                {children}
            </main>
        </div>
    );
}
