import Link from 'next/link';
import { Briefcase, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <Link className="flex items-center justify-center" href="/">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mr-2">
                        <Briefcase className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-bold text-xl text-gray-900">JobPortal</span>
                </Link>
            </header>

            <main className="container mx-auto px-4 py-12 max-w-3xl animate-fade-in">
                <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6 text-gray-600 text-sm leading-relaxed">
                    <p className="text-gray-500 text-xs">Last updated: February 20, 2026</p>

                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                        <p>By accessing and using JobPortal, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our service.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">2. Description of Service</h2>
                        <p>JobPortal provides an online platform that connects job seekers with recruiters. Our services include job posting, application management, and candidate tracking features accessible through role-based dashboards.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">3. User Accounts</h2>
                        <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration and to update such information as necessary.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">4. User Conduct</h2>
                        <p>You agree not to use the service for any unlawful purpose or in any way that could damage, disable, or impair the service. Posting false, misleading, or fraudulent job listings or applications is strictly prohibited.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Intellectual Property</h2>
                        <p>All content, features, and functionality of the JobPortal platform, including but not limited to text, graphics, logos, and software, are the exclusive property of JobPortal and are protected by applicable intellectual property laws.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Limitation of Liability</h2>
                        <p>JobPortal shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service. We do not guarantee employment or hiring outcomes for any user.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">7. Modifications</h2>
                        <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the platform. Your continued use of the service after changes are posted constitutes your acceptance of the modified terms.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">8. Contact</h2>
                        <p>If you have any questions about these Terms of Service, please contact us at <a href="mailto:jobportal@portal.com" className="text-indigo-600 hover:underline">jobportal@portal.com</a>.</p>
                    </section>
                </div>
            </main>
        </div>
    );
}
