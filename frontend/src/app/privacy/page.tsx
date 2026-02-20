import Link from 'next/link';
import { Briefcase, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
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

                <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6 text-gray-600 text-sm leading-relaxed">
                    <p className="text-gray-500 text-xs">Last updated: February 20, 2026</p>

                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
                        <p>We collect information you provide directly to us, including your name, email address, and role selection (Job Seeker or Recruiter) during account registration. We also collect job listing details and application data as part of the platform's functionality.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
                        <p>We use the information we collect to provide, maintain, and improve our services, including processing job applications, managing user accounts, enabling recruiter-candidate interactions, and sending service-related notifications.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">3. Data Security</h2>
                        <p>We implement industry-standard security measures to protect your personal information, including encrypted passwords (using bcrypt hashing), secure JWT authentication tokens, and role-based access controls that ensure users only access data relevant to their role.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Data Sharing</h2>
                        <p>We do not sell, trade, or rent your personal information to third parties. Your application details are shared only with the recruiters whose jobs you apply to. Recruiter information is visible only to applicants for their posted positions.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Cookies and Tracking</h2>
                        <p>We use cookies to maintain your authentication session. These are essential cookies required for the platform to function properly and are not used for advertising or third-party tracking purposes.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Your Rights</h2>
                        <p>You have the right to access, update, or delete your personal information at any time through your account settings. You may request complete data deletion by contacting our support team.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">7. Changes to This Policy</h2>
                        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">8. Contact Us</h2>
                        <p>If you have questions about this Privacy Policy, please contact us at <a href="mailto:jobportal@portal.com" className="text-indigo-600 hover:underline">jobportal@portal.com</a>.</p>
                    </section>
                </div>
            </main>
        </div>
    );
}
