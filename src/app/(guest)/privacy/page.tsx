'use client'
import React from 'react';
import { PageCover } from "@/components/general";
import { motion } from 'framer-motion';

export default function PrivacyPage() {
    return (
        <PageCover showHeader={true}>
            <div className="min-h-screen bg-black pt-32 pb-20 px-6 overflow-hidden relative">
                {/* Background glow */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-900/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-16"
                    >
                        <span className="text-purple-500 tracking-[0.3em] text-xs font-bold uppercase mb-6 block">Legal</span>
                        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none font-(family-name:--Canva-Sans-Display)">
                            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-400">Policy</span>
                        </h1>
                        <p className="text-gray-500 text-sm mt-6 font-light uppercase tracking-widest border-l-2 border-white/20 pl-4">Last Updated: April 2026</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="space-y-12 text-gray-300 font-light leading-relaxed"
                    >
                        <section className="p-8 md:p-10 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-xl hover:bg-white/[0.03] transition-colors">
                            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-4">
                                <span className="text-purple-500">01.</span> Data Collection
                            </h2>
                            <p className="mb-4">
                                Your privacy is fundamentally respected within this digital environment. As a professional portfolio, this site collects minimal personal data. We only collect information that you explicitly provide, such as your name, email address, and message content when utilizing the secure contact form or interactive communication channels.
                            </p>
                            <p>
                                Anonymous analytics may be gathered to interpret traffic flows and optimize the architectural performance of the platform, but this data is stripped of personally identifiable markers.
                            </p>
                        </section>

                        <section className="p-8 md:p-10 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-xl hover:bg-white/[0.03] transition-colors">
                            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-4">
                                <span className="text-purple-500">02.</span> Local Storage
                            </h2>
                            <p>
                                The System Playground (mini-games) and certain UI preferences (e.g., sound engine toggles) utilize your browser&apos;s local storage. This mechanism ensures your high scores and preferences persist across sessions without sending this data to an external server. You maintain full control over this data and can clear it at any time via your browser settings.
                            </p>
                        </section>

                        <section className="p-8 md:p-10 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-xl hover:bg-white/[0.03] transition-colors">
                            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-4">
                                <span className="text-purple-500">03.</span> External Links
                            </h2>
                            <p>
                                This platform may contain links to external sites (such as ventures, social media profiles, or featured projects) that are not operated by us. Please be aware that we have no control over the content, algorithms, and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
                            </p>
                        </section>

                        <section className="p-8 md:p-10 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-xl hover:bg-white/[0.03] transition-colors">
                            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-4">
                                <span className="text-purple-500">04.</span> Consent
                            </h2>
                            <p>
                                By continuing to navigate this portfolio, engaging with the interactive elements, or utilizing the contact mechanisms, you hereby consent to this Privacy Policy and agree to its terms. If any changes are made to this architectural document, they will be reflected prominently on this page.
                            </p>
                        </section>
                    </motion.div>
                </div>
            </div>
        </PageCover>
    );
}
