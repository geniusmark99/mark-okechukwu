'use client'
import React from 'react';
import { PageCover } from "@/components/general";
import { motion } from 'framer-motion';

export default function TermsPage() {
    return (
        <PageCover showHeader={true}>
            <div className="min-h-screen bg-black pt-32 pb-20 px-6 overflow-hidden relative">
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-16"
                    >
                        <span className="text-blue-500 tracking-[0.3em] text-xs font-bold uppercase mb-6 block">Legal</span>
                        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none font-(family-name:--Canva-Sans-Display)">
                            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Service</span>
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
                                <span className="text-blue-500">01.</span> Agreement to Terms
                            </h2>
                            <p className="mb-4">
                                By accessing or using this platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                            </p>
                            <p>
                                The materials contained in this website are protected by applicable copyright and trademark law. This portfolio is the intellectual property of Mark Okechukwu and is provided for demonstration and professional consideration purposes.
                            </p>
                        </section>

                        <section className="p-8 md:p-10 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-xl hover:bg-white/[0.03] transition-colors">
                            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-4">
                                <span className="text-blue-500">02.</span> Intellectual Property
                            </h2>
                            <p className="mb-4">
                                The code, design, content, and structure of this portfolio, unless otherwise stated or sourced via open-source licenses, are the exclusive property of Mark Okechukwu. 
                            </p>
                            <p>
                                You may not reproduce, distribute, or create derivative works from the bespoke design elements, 3D assets, or specific architectural patterns showcased here without explicit written permission. Respect the craft.
                            </p>
                        </section>

                        <section className="p-8 md:p-10 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-xl hover:bg-white/[0.03] transition-colors">
                            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-4">
                                <span className="text-blue-500">03.</span> Interactive Features
                            </h2>
                            <p>
                                This platform features interactive elements including, but not limited to, the System Playground (mini-games). These are provided &quot;as is&quot; for entertainment purposes. We make no warranties, expressed or implied, and hereby disclaim all other warranties, including without limitation, implied warranties of fitness for a particular purpose. Local scoring data is stored in your device&apos;s local storage and is not transmitted remotely.
                            </p>
                        </section>

                        <section className="p-8 md:p-10 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-xl hover:bg-white/[0.03] transition-colors">
                            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-4">
                                <span className="text-blue-500">04.</span> Limitation of Liability
                            </h2>
                            <p>
                                In no event shall Mark Okechukwu be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website, even if notified orally or in writing of the possibility of such damage.
                            </p>
                        </section>
                    </motion.div>
                </div>
            </div>
        </PageCover>
    );
}
