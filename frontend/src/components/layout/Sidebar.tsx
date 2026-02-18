'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    Briefcase,
    Users,
    FileText,
    LogOut,
    LayoutDashboard,
    PlusCircle
} from 'lucide-react';

export default function Sidebar() {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    if (!user) return null;

    const links = [
        { name: 'Dashboard', href: `/${user.role.toLowerCase()}`, icon: LayoutDashboard, roles: ['RECRUITER', 'APPLICANT'] },
        { name: 'Manage Jobs', href: '/admin?tab=jobs', icon: Briefcase, roles: ['ADMIN'] },
        { name: 'Manage Users', href: '/admin?tab=users', icon: Users, roles: ['ADMIN'] },
        { name: 'Post Job', href: '/recruiter/jobs/new', icon: PlusCircle, roles: ['RECRUITER'] },
        { name: 'My Posted Jobs', href: '/recruiter/my-jobs', icon: Briefcase, roles: ['RECRUITER'] },
        { name: 'My Applications', href: '/applicant/applications', icon: FileText, roles: ['APPLICANT'] },
        { name: 'Find Jobs', href: '/applicant/jobs', icon: Briefcase, roles: ['APPLICANT'] },
    ];

    const filteredLinks = links.filter(link => link.roles.includes(user.role));

    // Helper to determine if a link is active
    const isLinkActive = (linkHref: string) => {
        if (linkHref.includes('?')) {
            const [path, query] = linkHref.split('?');
            const tab = query.split('=')[1];
            const currentTab = searchParams.get('tab');
            // Default to 'jobs' if no tab param is present for admin
            if (path === pathname) {
                if (tab === 'jobs') return currentTab === 'jobs' || !currentTab;
                return currentTab === tab;
            }
            return false;
        }
        return pathname === linkHref;
    };

    return (
        <div className="flex h-screen flex-col justify-between border-r bg-white w-64">
            <div className="px-4 py-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">JobPortal</h1>
                <nav className="space-y-2">
                    {filteredLinks.map((link) => {
                        const Icon = link.icon;
                        const active = isLinkActive(link.href);

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="p-4 border-t">
                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
                <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
