'use client';
import { PageCover } from "@/components/general";
import { motion } from "framer-motion";
import { useState } from "react";

const contactMethods = [
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
        ),
        label: 'Email',
        value: 'hello@markokechukwu.com',
        href: 'mailto:hello@markokechukwu.com',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
        ),
        label: 'WhatsApp',
        value: '+234 814 162 5004',
        href: 'https://wa.me/2348141625004?text=Hi%20Mark!',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
        ),
        label: 'Location',
        value: 'Lagos, Nigeria',
        href: '#',
    },
];

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSent(true);
        setTimeout(() => setIsSent(false), 3000);
    };

    return (
        <PageCover showHeader={true}>
            <main className="min-h-screen">
                {/* ─── HERO ─── */}
                <section className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
                    {/* Ambient glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

                    <div className="max-w-6xl mx-auto relative z-10">
                        {/* Overline */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-3 mb-8"
                        >
                            <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-transparent" />
                            <span className="text-xs uppercase tracking-[0.3em] text-gray-500 font-medium">Get in Touch</span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-[0.95] tracking-tight mb-6"
                        >
                            Let&apos;s build<br />
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                something great.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.25 }}
                            className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed"
                        >
                            Have a project in mind, or just want to say hello? I&apos;d love to hear from you. 
                            Drop a message and I&apos;ll get back to you within 24 hours.
                        </motion.p>
                    </div>
                </section>

                {/* ─── MAIN CONTENT ─── */}
                <section className="px-4 md:px-8 pb-20 md:pb-32">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">

                        {/* LEFT: Contact Methods */}
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            {contactMethods.map((method, i) => (
                                <motion.a
                                    key={method.label}
                                    href={method.href}
                                    target={method.href.startsWith('http') ? '_blank' : undefined}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                                    whileHover={{ x: 6 }}
                                    className="group flex items-start gap-5 p-5 rounded-2xl border border-white/[0.04] hover:border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/5 border border-white/[0.06] flex items-center justify-center text-blue-400 group-hover:text-blue-300 transition-colors shrink-0">
                                        {method.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-1 font-medium">{method.label}</p>
                                        <p className="text-white/90 text-[0.95rem] font-medium group-hover:text-white transition-colors">{method.value}</p>
                                    </div>
                                </motion.a>
                            ))}

                            {/* Social links */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                                className="mt-4"
                            >
                                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4 font-medium">Follow me</p>
                                <div className="flex gap-3">
                                    {['GitHub', 'Twitter', 'LinkedIn'].map((social) => (
                                        <a key={social} href="#" className="px-4 py-2 rounded-xl border border-white/[0.06] text-sm text-gray-400 hover:text-white hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-300">
                                            {social}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* RIGHT: Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="lg:col-span-3"
                        >
                            <div className="relative">
                                {/* Glow */}
                                <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 blur-sm opacity-60" />

                                <form
                                    onSubmit={handleSubmit}
                                    className="relative rounded-3xl border border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-xl p-8 md:p-10 space-y-7"
                                >
                                    {/* Form heading */}
                                    <div className="mb-2">
                                        <h2 className="text-xl font-semibold text-white mb-1">Send a message</h2>
                                        <p className="text-sm text-gray-500">Fill in the details below and I&apos;ll reach out.</p>
                                    </div>

                                    {/* Name */}
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-[0.15em] text-gray-500 font-medium">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formState.name}
                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                            placeholder="John Doe"
                                            className="w-full px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/40 focus:bg-white/[0.06] transition-all duration-300 text-[0.95rem]"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-[0.15em] text-gray-500 font-medium">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={formState.email}
                                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                            placeholder="john@example.com"
                                            className="w-full px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/40 focus:bg-white/[0.06] transition-all duration-300 text-[0.95rem]"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-[0.15em] text-gray-500 font-medium">Your Message</label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={formState.message}
                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                            placeholder="Tell me about your project or idea..."
                                            className="w-full px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/40 focus:bg-white/[0.06] transition-all duration-300 resize-none text-[0.95rem]"
                                        />
                                    </div>

                                    {/* Submit */}
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-[0.95rem] tracking-wide shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-shadow duration-300 relative overflow-hidden group"
                                    >
                                        <span className="relative z-10">
                                            {isSent ? '✓ Message Sent!' : 'Send Message →'}
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ─── NEWSLETTER ─── */}
                <section className="px-4 md:px-8 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="max-w-6xl mx-auto relative rounded-3xl overflow-hidden"
                    >
                        {/* Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.06] rounded-3xl" />
                        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/[0.04] rounded-full blur-[100px]" />

                        <div className="relative z-10 py-16 md:py-20 px-8 md:px-16 text-center">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                                Read from me
                            </h2>
                            <p className="text-gray-400 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
                                Subscribe to my newsletter for actionable advice, insights, and mentorship in the tech space.
                            </p>
                            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="flex-1 px-5 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/40 transition-all text-sm"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    type="submit"
                                    className="px-7 py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-gray-100 transition-colors shrink-0"
                                >
                                    Subscribe
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </section>
            </main>
        </PageCover>
    );
};

export default Contact;