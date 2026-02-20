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
    X,
    Shield,
    Search,
    FolderOpen,
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
        { name: 'My Posted Jobs', href: '/recruiter/my-jobs', icon: FolderOpen, roles: ['RECRUITER'] },
        { name: 'My Applications', href: '/applicant/applications', icon: FileText, roles: ['APPLICANT'] },
        { name: 'Find Jobs', href: '/applicant/jobs', icon: Search, roles: ['APPLICANT'] },
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

    const roleBadge = {
        ADMIN: { label: 'Admin', color: 'bg-red-100 text-red-700 border-red-200', icon: Shield },
        RECRUITER: { label: 'Recruiter', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: Briefcase },
        APPLICANT: { label: 'Seeker', color: 'bg-indigo-100 text-indigo-700 border-indigo-200', icon: Search },
    };

    const badge = roleBadge[user.role];
    const BadgeIcon = badge.icon;

    const sidebarContent = (
        <>
            <div className="px-4 py-6">
                {/* Logo */}
                <div className="flex items-center gap-2.5 mb-8 px-2">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-600/20">
                        <Briefcase className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900">JobPortal</span>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                    {filteredLinks.map((link) => {
                        const Icon = link.icon;
                        const active = isLinkActive(link.href);

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                    active
                                        ? "bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 shadow-sm border border-indigo-100"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                                )}
                            >
                                <Icon className={cn("h-4 w-4", active ? "text-indigo-600" : "")} />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* User section */}
            <div className="p-4 border-t border-gray-100">
                <div className="mb-3 px-2">
                    <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                    </div>
                    <div className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border", badge.color)}>
                        <BadgeIcon className="h-2.5 w-2.5" />
                        {badge.label}
                    </div>
                </div>
                <button
                    onClick={() => { setMobileOpen(false); logout(); }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer"
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
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-white shadow-lg border border-gray-100"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
            >
                {mobileOpen ? <X className="h-5 w-5 text-gray-700" /> : <Menu className="h-5 w-5 text-gray-700" />}
            </button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-30 transition-opacity"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={cn(
                "fixed md:static inset-y-0 left-0 z-40 flex h-screen flex-col justify-between bg-white border-r border-gray-100 w-64 transition-transform duration-300 ease-in-out",
                mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
            )}>
                {sidebarContent}
            </div>
        </>
    );
}
