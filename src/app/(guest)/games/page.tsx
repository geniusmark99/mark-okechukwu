'use client'
import React from 'react';
import { PageCover } from "@/components/general";
import { motion } from 'framer-motion';
import { Gamepad2, ChevronLeft, Zap, BrainCircuit, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const games = [
    {
        slug: 'cyber-dash',
        title: 'Cyber Dash',
        subtitle: 'Reflex Optimization Protocol',
        description: 'Navigate a cyber runner through an endless stream of system obstacles. Tap to jump, hold your nerve, beat your high score.',
        color: 'blue',
        icon: <Zap className="w-8 h-8" />,
        gradient: 'from-blue-600 to-cyan-500',
        bgGlow: 'bg-blue-600/20',
        difficulty: 'Easy',
    },
    {
        slug: 'logic-flow',
        title: 'Logic Flow',
        subtitle: 'Memory Synchronization Engine',
        description: 'Watch the pattern light up, then repeat it. Each round adds complexity. How deep can your memory stack go?',
        color: 'purple',
        icon: <BrainCircuit className="w-8 h-8" />,
        gradient: 'from-purple-600 to-pink-500',
        bgGlow: 'bg-purple-600/20',
        difficulty: 'Medium',
    },
];

export default function GamesHub() {
    return (
        <PageCover showHeader={true}>
            <div className="min-h-screen bg-black pt-28 min-[320px]:pt-32 pb-10 min-[320px]:pb-20 px-4 min-[320px]:px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Back Navigation */}
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-10 group">
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-widest">Back to Workspace</span>
                    </Link>

                    {/* Page Header */}
                    <div className="relative mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                                    <Gamepad2 className="w-8 h-8 text-white" />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">Interactive Experiences</span>
                            </div>
                            <h1 className="text-[2.5rem] min-[320px]:text-4xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[1.1] min-[320px]:leading-[1]">
                                System<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Playground</span>
                            </h1>
                            <p className="text-gray-400 mt-8 text-lg max-w-lg font-light leading-relaxed">
                                Take a break between deployments. Test your reflexes and memory in the Architect&apos;s sandbox.
                            </p>
                        </motion.div>

                        {/* Decorative glow */}
                        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
                    </div>

                    {/* Games Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {games.map((game, index) => (
                            <motion.div
                                key={game.slug}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <Link href={`/games/${game.slug}`} className="group block">
                                    <div className="relative overflow-hidden rounded-[32px] bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-500 h-[380px] min-[320px]:h-[420px] flex flex-col justify-end p-6 min-[320px]:p-10">
                                        {/* Animated Background Glow */}
                                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] ${game.bgGlow} blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                                        {/* Floating Grid Pattern */}
                                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />

                                        {/* Large Background Icon */}
                                        <div className="absolute top-8 right-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 scale-[3] group-hover:scale-[3.5] transition-transform">
                                            {game.icon}
                                        </div>

                                        {/* Content */}
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border bg-gradient-to-r ${game.gradient} text-white border-transparent`}>
                                                    {game.difficulty}
                                                </span>
                                            </div>
                                            <h2 className="text-3xl min-[320px]:text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-2 min-[320px]:mb-3 group-hover:translate-x-2 transition-transform duration-500">
                                                {game.title}
                                            </h2>
                                            <p className="text-[10px] min-[320px]:text-sm text-gray-500 uppercase tracking-widest font-bold mb-3 min-[320px]:mb-4">{game.subtitle}</p>
                                            <p className="text-sm text-gray-400 font-light leading-relaxed max-w-sm">{game.description}</p>

                                            <div className="flex items-center gap-2 mt-8 text-white/50 group-hover:text-white transition-colors duration-300">
                                                <span className="text-xs font-bold uppercase tracking-widest">Launch Game</span>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-14 min-[320px]:mt-20 p-8 min-[320px]:p-10 md:p-14 bg-white/[0.02] border border-white/5 rounded-[40px] text-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[100px] pointer-events-none" />
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 italic uppercase">Built with React</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                            These micro-games are engineered purely with React, Framer Motion, and Canvas — proving that engagement can be woven into any digital experience. Your scores are cached locally.
                        </p>
                    </motion.div>
                </div>
            </div>
        </PageCover>
    );
}
