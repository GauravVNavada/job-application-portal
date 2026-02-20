'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/auth';
import { Briefcase, Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const data = await authService.login({ email, password });
            login(data.token, data.user);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left panel — gradient branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.15),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.2),transparent_50%)]" />

                <div className="relative z-10 flex flex-col justify-center px-16 text-white">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Briefcase className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-2xl font-bold">JobPortal</span>
                    </div>

                    <h1 className="text-4xl font-bold leading-tight mb-4">
                        Welcome back!
                    </h1>
                    <p className="text-lg text-indigo-200 leading-relaxed max-w-md">
                        Sign in to access your dashboard, manage applications, and stay on top of your hiring pipeline.
                    </p>

                    <div className="mt-12 space-y-4">
                        <div className="flex items-center gap-3 text-indigo-200">
                            <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center text-sm">✓</div>
                            <span>Track applications in real-time</span>
                        </div>
                        <div className="flex items-center gap-3 text-indigo-200">
                            <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center text-sm">✓</div>
                            <span>Role-based access control</span>
                        </div>
                        <div className="flex items-center gap-3 text-indigo-200">
                            <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center text-sm">✓</div>
                            <span>Secure & trusted platform</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right panel — form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-gray-50">
                <div className="w-full max-w-md animate-fade-in">
                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                            <Briefcase className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">JobPortal</span>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">Sign in</h2>
                            <p className="mt-2 text-sm text-gray-500">
                                Don't have an account?{' '}
                                <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                                    Create one free
                                </Link>
                            </p>
                        </div>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <Input
                                label="Email address"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                icon={<Mail className="h-4 w-4" />}
                            />
                            <Input
                                label="Password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                icon={<Lock className="h-4 w-4" />}
                            />

                            {error && (
                                <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-100 animate-scale-in">
                                    {error}
                                </div>
                            )}

                            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                                Sign in
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </div>

                    <p className="text-center text-xs text-gray-400 mt-6">
                        By signing in, you agree to our{' '}
                        <Link href="/terms" className="text-gray-500 hover:text-gray-700 underline">Terms</Link>
                        {' '}and{' '}
                        <Link href="/privacy" className="text-gray-500 hover:text-gray-700 underline">Privacy Policy</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
