'use client';

import Link from 'next/link';
import { Briefcase, ArrowLeft, Mail, MapPin, Phone, Globe, Linkedin, Github } from 'lucide-react';

export default function ContactPage() {
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

            <main className="container mx-auto px-4 py-12 max-w-4xl animate-fade-in">
                <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
                <p className="text-gray-500 mb-10">We&apos;d love to hear from you. Reach out through any of the channels below.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Info Card */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Get in Touch</h2>

                        <div className="space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                                    <Mail className="h-5 w-5 text-indigo-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">Email</p>
                                    <a href="mailto:jobportal@portal.com" className="text-sm text-indigo-600 hover:underline">jobportal@portal.com</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                                    <Phone className="h-5 w-5 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">Phone</p>
                                    <p className="text-sm text-gray-600">+91 98765 43210</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                                    <MapPin className="h-5 w-5 text-amber-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">Address</p>
                                    <p className="text-sm text-gray-600">Ellipsonic Technologies Pvt. Ltd.<br />Bangalore, Karnataka, India 560001</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                                    <Globe className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">Website</p>
                                    <p className="text-sm text-gray-600">www.jobportal.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <p className="text-sm font-semibold text-gray-900 mb-3">Connect with the Developer</p>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                    GN
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">Gaurav V Navada</p>
                                    <p className="text-xs text-gray-500">Full Stack Developer</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <a href="#" className="h-9 w-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                                    <Linkedin className="h-4 w-4 text-gray-600" />
                                </a>
                                <a href="#" className="h-9 w-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                                    <Github className="h-4 w-4 text-gray-600" />
                                </a>
                                <a href="mailto:jobportal@portal.com" className="h-9 w-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                                    <Mail className="h-4 w-4 text-gray-600" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form (UI only) */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Send a Message</h2>
                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="flex h-11 w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 hover:border-gray-300"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="flex h-11 w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 hover:border-gray-300"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject</label>
                                <input
                                    type="text"
                                    placeholder="How can we help?"
                                    className="flex h-11 w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 hover:border-gray-300"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message</label>
                                <textarea
                                    rows={4}
                                    placeholder="Your message..."
                                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 hover:border-gray-300 resize-y"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full h-11 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-all duration-200 shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/30 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
