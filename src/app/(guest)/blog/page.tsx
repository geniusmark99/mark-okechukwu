'use client';
import { PageCover, BlogPostWidget } from "@/components/general";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const Blog = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = BlogPostWidget.slice(0, 3); // First 3 posts for the hero slider

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <PageCover showHeader={true}>
            <main className="min-h-screen">

                {/* ─── HERO SLIDER ─── */}
                <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0"
                        >
                            {/* Background image */}
                            <Image
                                src={slides[currentSlide].image}
                                alt={slides[currentSlide].title}
                                fill
                                className="object-cover"
                                sizes="100vw"
                                priority
                            />
                            {/* Gradient overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
                        </motion.div>
                    </AnimatePresence>

                    {/* Slide content */}
                    <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-16 md:pb-20">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`content-${currentSlide}`}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6, delay: 0.15 }}
                                className="max-w-3xl"
                            >
                                {/* Badges */}
                                <div className="flex items-center gap-3 mb-5">
                                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-white/80 border border-white/[0.08]">
                                        Featured
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-purple-500/20 text-xs font-medium text-purple-300 border border-purple-500/20">
                                        {slides[currentSlide].category}
                                    </span>
                                    <span className="text-xs text-gray-400 hidden md:inline">{slides[currentSlide].date}</span>
                                </div>

                                {/* Title */}
                                <Link href={`/blog/${slides[currentSlide].slug}`}>
                                    <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] tracking-tight mb-4 hover:text-blue-100 transition-colors cursor-pointer">
                                        {slides[currentSlide].title}
                                    </h2>
                                </Link>

                                {/* Excerpt */}
                                <p className="text-gray-300/70 text-base md:text-lg max-w-xl line-clamp-2 leading-relaxed mb-6">
                                    {slides[currentSlide].content}
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3">
                                    <Image
                                        src="/images/mark-okechukwu-3d.png"
                                        alt={slides[currentSlide].author}
                                        width={40}
                                        height={40}
                                        className="rounded-full object-cover border-2 border-white/10"
                                    />
                                    <div>
                                        <p className="text-sm text-white font-medium">{slides[currentSlide].author}</p>
                                        <p className="text-xs text-gray-400">{slides[currentSlide].date}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Slider Controls */}
                        <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 flex items-center gap-4 z-20">
                            {/* Dots */}
                            <div className="flex items-center gap-2 mr-4">
                                {slides.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentSlide(i)}
                                        className="relative h-1 rounded-full overflow-hidden transition-all duration-300"
                                        style={{ width: i === currentSlide ? 32 : 12 }}
                                    >
                                        <div className="absolute inset-0 bg-white/20 rounded-full" />
                                        {i === currentSlide && (
                                            <motion.div
                                                className="absolute inset-0 bg-white rounded-full"
                                                initial={{ scaleX: 0, originX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{ duration: 6, ease: "linear" }}
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Arrows */}
                            <button onClick={prevSlide} className="w-10 h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-all">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button onClick={nextSlide} className="w-10 h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-all">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                    </div>
                </section>

                {/* ─── ALL POSTS ─── */}
                <section className="px-4 md:px-8 py-16 md:py-24">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center gap-3 mb-12">
                            <div className="h-px flex-1 bg-white/[0.06]" />
                            <span className="text-xs uppercase tracking-[0.25em] text-gray-500 font-medium">All Articles</span>
                            <div className="h-px flex-1 bg-white/[0.06]" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {BlogPostWidget.map((blog, idx) => (
                                <motion.div
                                    key={blog.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                                >
                                    <Link href={`/blog/${blog.slug}`} className="group block h-full">
                                        <article className="rounded-2xl border border-white/[0.04] hover:border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500 overflow-hidden h-full flex flex-col">
                                            <div className="relative aspect-[16/10] overflow-hidden">
                                                <Image
                                                    src={blog.image}
                                                    alt={blog.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-50" />
                                                <div className="absolute top-4 left-4">
                                                    <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-xs font-medium text-white/80 border border-white/[0.08]">
                                                        {blog.category}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-5 flex flex-col flex-1">
                                                <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                                                    <span>{blog.date}</span>
                                                    <span className="w-1 h-1 rounded-full bg-gray-600" />
                                                    <span>{blog.author}</span>
                                                </div>
                                                <h3 className="text-[1.05rem] font-semibold text-white mb-3 leading-snug group-hover:text-blue-100 transition-colors line-clamp-2">
                                                    {blog.title}
                                                </h3>
                                                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4 flex-1">
                                                    {blog.content}
                                                </p>
                                                <div className="flex items-center gap-2 text-sm font-medium text-gray-500 group-hover:text-blue-400 transition-colors pt-3 border-t border-white/[0.04]">
                                                    <span>Read article</span>
                                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </PageCover>
    );
};

export default Blog;