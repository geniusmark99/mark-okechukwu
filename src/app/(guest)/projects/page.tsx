"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PageCover, HolographicCardWidget, useSound } from "@/components/general";

const industries = [
  {
    name: "AI",
    emoji: "🧠",
    projects: [
      { logo: "SmartTech", valuation: "Targetted Valuation of $7.2B on", description: "Founded by one of Rubrik's founders, Glean is one of the biggest AI companies in the world. I worked on their modern website experience — blending design precision with next-gen web performance.", link: "/project/smarttech-project-review", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop" },
    ],
  },
  {
    name: "FinTech",
    emoji: "💳",
    projects: [
      { logo: "AkauntMe", valuation: "Targetted Valuation of $900M", description: "Developed the new ApexPay dashboard — a digital-first FinTech platform empowering global payments and real-time transaction analytics.", link: "/project/akauntme-project-review", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop" },
    ],
  },
  {
    name: "Healthcare",
    emoji: "🏥",
    projects: [
      { logo: "PharmacyPaddi", valuation: "Targetted Valuation of $2.1B", description: "Engineered a telemedicine system optimizing patient-doctor interaction with secure APIs, data visualization, and a seamless appointment workflow.", link: "/project/pharmacypaddi-project-review", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop" },
    ],
  },
  {
    name: "Education",
    emoji: "📚",
    projects: [
      { logo: "VersityLearn", valuation: "Targetted Valuation of $7.2B", description: "An immersive learning platform empowering students with gamified experiences and real-time progress analytics.", link: "/project/versitylearn-project-review", image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&h=800&fit=crop" },
      { logo: "DevBattleground", valuation: "Targetted Valuation of $1B", description: "Frontend competition arena where developers battle in design accuracy, precision, and creativity under time pressure.", link: "/project/devbattleground-project-review", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop" },
    ],
  },
  {
    name: "Ecommerce",
    emoji: "🛒",
    projects: [
      { logo: "MarketMe", valuation: "Targeted Valuation of $500M", description: "Built a performance-driven e-commerce UI for personalized shopping experiences, intelligent product recommendations, and conversion-focused design.", link: "/project/marketme-project-review", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop" },
    ],
  },
  {
    name: "Welfare",
    emoji: "🏠",
    projects: [
      { logo: "LundruMan", valuation: "Targeted Valuation of $800M", description: "Led frontend development for LundruMan — streamlining global laundry service workflows with intuitive dashboards and automation.", link: "/project/lundruman-project-review", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=800&fit=crop" },
      { logo: "HausFinda", valuation: "Targeted Valuation of $800M", description: "Real estate discovery platform with immersive property galleries and smart search filters.", link: "/project/lundruman-project-review", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop" },
    ],
  },
];

const Projects = () => {
  const [active, setActive] = useState(0);
  const router = useRouter();

  return (
    <PageCover showHeader={true}>
      <main className="min-h-screen">
        {/* ─── HERO ─── */}
        <section className="relative py-20 md:py-28 px-4 md:px-8 overflow-hidden">
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-transparent" />
              <span className="text-xs uppercase tracking-[0.3em] text-gray-500 font-medium">Selected Work</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight mb-5">
              Crafting digital<br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">experiences.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-gray-400 text-lg max-w-xl leading-relaxed">
              From AI to FinTech — building products that redefine how industries connect, grow, and innovate.
            </motion.p>
          </div>
        </section>

        {/* ─── FILTER TABS ─── */}
        <section className="px-4 md:px-8 pb-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-2">
              {industries.map((ind, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActive(i)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border ${i === active
                    ? "bg-white text-black border-white"
                    : "border-white/[0.06] text-gray-400 hover:text-white hover:border-white/[0.12] bg-white/[0.02]"
                    }`}
                >
                  <span className="mr-1.5">{ind.emoji}</span>
                  {ind.name}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PROJECT CARDS ─── */}
        <section className="px-4 md:px-8 pb-20">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {industries[active].projects.map((project, idx) => {
                  const { play } = useSound();
                  return (
                    <HolographicCardWidget key={idx} className="h-full">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        onMouseEnter={() => play('hover')}
                        onClick={() => { play('click'); router.push(project.link); }}
                        className="group cursor-pointer h-full rounded-2xl border border-white/[0.04] hover:border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500 overflow-hidden flex flex-col"
                      >
                        {/* Image */}
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <Image src={project.image} alt={project.logo} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 768px) 100vw, 50vw" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-xs font-medium text-white/80 border border-white/[0.08]">
                              {industries[active].name}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-100 transition-colors">{project.logo}</h3>
                            <span className="text-xs text-gray-500 font-medium">✴ {project.valuation}</span>
                          </div>
                          <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 mb-5 flex-1">{project.description}</p>
                          <div className="flex items-center gap-2 text-sm font-medium text-gray-500 group-hover:text-blue-400 transition-colors pt-4 border-t border-white/[0.04]">
                            <span>View project</span>
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                        </div>
                      </motion.div>
                    </HolographicCardWidget>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="relative px-4 md:px-8 pb-20">
          <div className="max-w-6xl mx-auto relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.06] rounded-3xl" />
            <div className="absolute top-0 left-0 w-80 h-80 bg-purple-500/[0.04] rounded-full blur-[100px]" />
            <div className="relative z-10 py-20 px-8 md:px-16 text-center">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">Have an idea?</h2>
              <p className="text-gray-400 text-lg max-w-md mx-auto mb-10">Let&apos;s turn your vision into a stunning digital product together.</p>
              <Link href="/contact">
                <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-500 text-white font-semibold tracking-wide shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-shadow">
                  Let&apos;s Talk →
                </motion.span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PageCover>
  );
};

export default Projects;