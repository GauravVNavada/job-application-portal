import Link from "next/link";
import {
  Briefcase,
  Users,
  Shield,
  Search,
  FileText,
  CheckCircle,
  ArrowRight,
  Zap,
  TrendingUp,
  Globe,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="/">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mr-2">
            <Briefcase className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-xl text-gray-900">JobPortal</span>
        </Link>
        <nav className="ml-auto flex items-center gap-2 sm:gap-4">
          <Link
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
            href="/login"
          >
            Sign In
          </Link>
          <Link
            className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-lg shadow-sm"
            href="/register"
          >
            Get Started
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]" />

          <div className="relative container px-4 md:px-6 mx-auto py-20 md:py-32 lg:py-40">
            <div className="flex flex-col items-center space-y-6 text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium">
                <Zap className="h-3.5 w-3.5" />
                Trusted by 10,000+ professionals
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 leading-tight">
                Find Your{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Dream Job
                </span>{" "}
                Today
              </h1>

              <p className="mx-auto max-w-2xl text-lg md:text-xl text-gray-600 leading-relaxed">
                Connect with top employers, discover opportunities that match
                your skills, and take the next step in your career — all in one
                powerful platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Link
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-8 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5"
                  href="/register"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-gray-200 bg-white px-8 text-sm font-semibold text-gray-900 shadow-sm transition-all hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5"
                  href="/login"
                >
                  Sign In
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Free to use
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-blue-500" />
                  Secure & Private
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-purple-500" />
                  Role-based Access
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Built for Everyone in the Hiring Process
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Whether you're looking for your next opportunity or searching
                for the perfect candidate, we've got you covered.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Job Seekers */}
              <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center mb-6">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  For Job Seekers
                </h3>
                <ul className="space-y-2.5 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                    <span>Browse and discover open positions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                    <span>Apply with a single click</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                    <span>Track application status in real-time</span>
                  </li>
                </ul>
              </div>

              {/* Recruiters */}
              <div className="group relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-emerald-600 flex items-center justify-center mb-6">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  For Recruiters
                </h3>
                <ul className="space-y-2.5 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Post jobs and manage listings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Review and shortlist candidates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Streamline the hiring pipeline</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get started in three simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="h-14 w-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold mx-auto mb-5">
                  1
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Create Your Account
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Sign up as a Job Seeker or Recruiter. It takes less than a
                  minute.
                </p>
              </div>

              <div className="text-center">
                <div className="h-14 w-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-bold mx-auto mb-5">
                  2
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Explore Opportunities
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Browse jobs or post openings. Our dashboard makes it easy to
                  manage everything.
                </p>
              </div>

              <div className="text-center">
                <div className="h-14 w-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl font-bold mx-auto mb-5">
                  3
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Take Action
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Apply to jobs or review applicants. Track progress in
                  real-time from your dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  500+
                </div>
                <div className="text-blue-200 text-sm">Jobs Posted</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  2,000+
                </div>
                <div className="text-blue-200 text-sm">Applications</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  150+
                </div>
                <div className="text-blue-200 text-sm">Recruiters</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  98%
                </div>
                <div className="text-blue-200 text-sm">Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container px-4 md:px-6 mx-auto text-center">
            <div className="max-w-2xl mx-auto">
              <TrendingUp className="h-10 w-10 text-blue-600 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of professionals who are already using JobPortal
                to advance their careers and find top talent.
              </p>
              <Link
                className="inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-8 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5"
                href="/register"
              >
                Create Free Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <Briefcase className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="font-bold text-gray-900">JobPortal</span>
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} JobPortal. All rights reserved.
            </p>
            <nav className="flex gap-6">
              <Link
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                href="#"
              >
                Terms
              </Link>
              <Link
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                href="#"
              >
                Privacy
              </Link>
              <Link
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                href="#"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
