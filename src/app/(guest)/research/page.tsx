'use client';
import { PageCover } from "@/components/general";
import { motion } from "framer-motion";
import Link from "next/link";

const researchAreas = [
    {
        title: "AI-Assisted Frontend Engineering",
        category: "Artificial Intelligence",
        date: "2025",
        description: "Exploring how large language models can accelerate UI development, from automated accessibility audits to intelligent component generation and design-to-code pipelines.",
        tags: ["LLMs", "React", "Automation"],
        status: "Active",
    },
    {
        title: "Performance Optimization Patterns in Next.js",
        category: "Web Performance",
        date: "2025",
        description: "Deep-dive into Server Components, streaming SSR, partial prerendering, and advanced caching strategies that reduce Time to Interactive by up to 60% in production apps.",
        tags: ["Next.js", "SSR", "Core Web Vitals"],
        status: "Active",
    },
    {
        title: "Design Systems at Scale",
        category: "Design Engineering",
        date: "2024",
        description: "Building token-driven, themeable component libraries that maintain visual consistency across 50+ screens while enabling rapid iteration for product teams.",
        tags: ["Tokens", "Components", "Figma"],
        status: "Published",
    },
    {
        title: "Micro-Animations & Perceived Performance",
        category: "UX Research",
        date: "2024",
        description: "Investigating how strategic use of Framer Motion, GSAP, and CSS transitions can reduce perceived load times and increase user engagement by 35%.",
        tags: ["Framer Motion", "GSAP", "UX"],
        status: "Published",
    },
    {
        title: "Real-Time Collaboration Architecture",
        category: "Systems Design",
        date: "2024",
        description: "Architectural patterns for building Google Docs-style real-time collaboration using CRDTs, WebSockets, and operational transforms in distributed systems.",
        tags: ["WebSockets", "CRDTs", "Distributed"],
        status: "In Progress",
    },
    {
        title: "Serverless API Design for SaaS",
        category: "Backend Architecture",
        date: "2025",
        description: "Patterns for building cost-efficient, auto-scaling APIs using serverless functions, edge computing, and managed databases for multi-tenant SaaS platforms.",
        tags: ["Serverless", "Edge", "Multi-tenant"],
        status: "Active",
    },
];

const statusColors: Record<string, string> = {
    Active: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    Published: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    "In Progress": "text-amber-400 bg-amber-500/10 border-amber-500/20",
};

const Research = () => {
    return (
        <PageCover showHeader={true}>
            <main className="min-h-screen">
                {/* ─── HERO ─── */}
                <section className="relative py-20 md:py-28 px-4 md:px-8 overflow-hidden">
                    <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

                    <div className="max-w-6xl mx-auto relative z-10">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-6">
                            <div className="h-px w-12 bg-gradient-to-r from-cyan-500 to-transparent" />
                            <span className="text-xs uppercase tracking-[0.3em] text-gray-500 font-medium">Research & Exploration</span>
                        </motion.div>

                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight mb-5">
                            Thinking<br />
                            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">in public.</span>
                        </motion.h1>

                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-gray-400 text-lg max-w-xl leading-relaxed">
                            Ongoing explorations, experiments, and deep dives into the technologies shaping the future of digital product engineering.
                        </motion.p>
                    </div>
                </section>

                {/* ─── RESEARCH GRID ─── */}
                <section className="px-4 md:px-8 pb-20">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="h-px flex-1 bg-white/[0.06]" />
                            <span className="text-xs uppercase tracking-[0.25em] text-gray-500 font-medium">{researchAreas.length} Research Areas</span>
                            <div className="h-px flex-1 bg-white/[0.06]" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {researchAreas.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                                    className="group rounded-2xl border border-white/[0.04] hover:border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500 p-6 md:p-7 flex flex-col"
                                >
                                    {/* Top row */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs text-gray-500 font-medium">{item.category}</span>
                                        <span className={`text-[0.7rem] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${statusColors[item.status]}`}>
                                            {item.status}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg md:text-xl font-bold text-white mb-3 leading-snug group-hover:text-cyan-100 transition-colors">
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-gray-400 leading-relaxed mb-5 flex-1">
                                        {item.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {item.tags.map((tag) => (
                                            <span key={tag} className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-[0.7rem] text-gray-400 font-medium border border-white/[0.04]">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
                                        <span className="text-xs text-gray-500">{item.date}</span>
                                        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-500 group-hover:text-cyan-400 transition-colors">
                                            <span>Explore</span>
                                            <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── CTA ─── */}
                <section className="px-4 md:px-8 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="max-w-6xl mx-auto relative rounded-3xl overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.06] rounded-3xl" />
                        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/[0.04] rounded-full blur-[100px]" />

                        <div className="relative z-10 py-16 md:py-20 px-8 md:px-16 text-center">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Interested in collaborating?</h2>
                            <p className="text-gray-400 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
                                I&apos;m always open to discussions on emerging tech, research partnerships, and interesting problems.
                            </p>
                            <Link href="/contact">
                                <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-cyan-600 to-teal-500 text-white font-semibold tracking-wide shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-shadow">
                                    Get in Touch →
                                </motion.span>
                            </Link>
                        </div>
                    </motion.div>
                </section>
            </main>
        </PageCover>
    );
};

export default Research;