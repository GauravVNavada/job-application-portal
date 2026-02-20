'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth';
import { Briefcase, Mail, Lock, User, ArrowRight, Search, FileText } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('APPLICANT');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await authService.register({ name, email, password, role });
            router.push('/login');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left panel — gradient branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.15),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(79,70,229,0.15),transparent_50%)]" />

                <div className="relative z-10 flex flex-col justify-center px-16 text-white">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Briefcase className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-2xl font-bold">JobPortal</span>
                    </div>

                    <h1 className="text-4xl font-bold leading-tight mb-4">
                        Join us today!
                    </h1>
                    <p className="text-lg text-emerald-200 leading-relaxed max-w-md">
                        Create your account and start your journey — whether you're looking for talent or your dream job.
                    </p>

                    <div className="mt-12 space-y-4">
                        <div className="flex items-center gap-3 text-emerald-200">
                            <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center text-sm">🚀</div>
                            <span>Get started in under a minute</span>
                        </div>
                        <div className="flex items-center gap-3 text-emerald-200">
                            <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center text-sm">🔒</div>
                            <span>Your data is secure</span>
                        </div>
                        <div className="flex items-center gap-3 text-emerald-200">
                            <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center text-sm">🎯</div>
                            <span>Personalized dashboard</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right panel — form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-gray-50">
                <div className="w-full max-w-md animate-fade-in">
                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
                            <Briefcase className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">JobPortal</span>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">Create account</h2>
                            <p className="mt-2 text-sm text-gray-500">
                                Already have an account?{' '}
                                <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                                    Sign in
                                </Link>
                            </p>
                        </div>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <Input
                                label="Full Name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                icon={<User className="h-4 w-4" />}
                            />
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
                                placeholder="Min 6 characters"
                                icon={<Lock className="h-4 w-4" />}
                            />

                            {/* Role selection cards */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">I am a...</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setRole('APPLICANT')}
                                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${role === 'APPLICANT'
                                                ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm'
                                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Search className={`h-5 w-5 ${role === 'APPLICANT' ? 'text-indigo-600' : 'text-gray-400'}`} />
                                        <span className="text-sm font-medium">Job Seeker</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setRole('RECRUITER')}
                                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${role === 'RECRUITER'
                                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm'
                                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        <FileText className={`h-5 w-5 ${role === 'RECRUITER' ? 'text-emerald-600' : 'text-gray-400'}`} />
                                        <span className="text-sm font-medium">Recruiter</span>
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg border border-red-100 animate-scale-in">
                                    {error}
                                </div>
                            )}

                            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                                Create account
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </div>

                    <p className="text-center text-xs text-gray-400 mt-6">
                        By creating an account, you agree to our{' '}
                        <Link href="/terms" className="text-gray-500 hover:text-gray-700 underline">Terms</Link>
                        {' '}and{' '}
                        <Link href="/privacy" className="text-gray-500 hover:text-gray-700 underline">Privacy Policy</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
