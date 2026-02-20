'use client';

import { useState } from 'react';
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
    PlusCircle,
    Menu,
    X
} from 'lucide-react';

export default function Sidebar() {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [mobileOpen, setMobileOpen] = useState(false);

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

    const isLinkActive = (linkHref: string) => {
        if (linkHref.includes('?')) {
            const [path, query] = linkHref.split('?');
            const tab = query.split('=')[1];
            const currentTab = searchParams.get('tab');
            if (path === pathname) {
                if (tab === 'jobs') return currentTab === 'jobs' || !currentTab;
                return currentTab === tab;
            }
            return false;
        }
        return pathname === linkHref;
    };

    const sidebarContent = (
        <>
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
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    active
                                        ? "bg-blue-50 text-blue-700"
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
                    <p className="text-xs text-gray-500 capitalize">{user.role.toLowerCase()}</p>
                </div>
                <button
                    onClick={() => { setMobileOpen(false); logout(); }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile hamburger button */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md border"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
            >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar - desktop: static, mobile: slide-in */}
            <div className={cn(
                "fixed md:static inset-y-0 left-0 z-40 flex h-screen flex-col justify-between border-r bg-white w-64 transition-transform duration-200 ease-in-out",
                mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}>
                {sidebarContent}
            </div>
        </>
    );
}
