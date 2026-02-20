'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface RouteGuardProps {
    children: React.ReactNode;
    allowedRoles: string[];
}

export default function RouteGuard({ children, allowedRoles }: RouteGuardProps) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;

        if (!user) {
            router.replace('/login');
            return;
        }

        if (!allowedRoles.includes(user.role)) {
            // Redirect to user's own dashboard
            const dashboardMap: Record<string, string> = {
                ADMIN: '/admin',
                RECRUITER: '/recruiter',
                APPLICANT: '/applicant',
            };
            router.replace(dashboardMap[user.role] || '/login');
        }
    }, [user, isLoading, allowedRoles, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!user || !allowedRoles.includes(user.role)) {
        return null;
    }

    return <>{children}</>;
}
