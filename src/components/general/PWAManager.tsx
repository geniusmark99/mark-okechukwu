"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, Zap, Globe, LayoutGrid, Cpu, Gamepad2, Mail, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import confetti from 'canvas-confetti';

const PWAManager = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showInstallBanner, setShowInstallBanner] = useState(false);
    const [isPWA, setIsPWA] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY < 10) setIsVisible(true);
            else if (currentScrollY > lastScrollY && currentScrollY > 80) setIsVisible(false);
            else if (currentScrollY < lastScrollY) setIsVisible(true);
            setLastScrollY(currentScrollY);
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll, { passive: true });

            // --- Register Service Worker ---
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed:', err));
            }

            // --- Detect Sidebar State ---
            const checkSidebar = () => setIsSidebarOpen(document.body.classList.contains('sidebar-open'));
            const observer = new MutationObserver(checkSidebar);
            observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

            return () => {
                window.removeEventListener('scroll', handleScroll);
                observer.disconnect();
            };
        }
    }, [lastScrollY]);

    const navLinks = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/projects', label: 'Projects', icon: LayoutGrid },
        { href: '/blog', label: 'Blog', icon: Cpu },
        { href: '/games', label: 'Play', icon: Gamepad2 },
        { href: '/contact', label: 'Contact', icon: Mail },
    ];

    const motivations = [
        "Focus on the architecture, the beauty is in the structure.",
        "Precision is the soul of engineering.",
        "Your vision is unique. Write code that proves it.",
        "Simplicity is the ultimate sophistication.",
        "The best way to predict the future is to build it.",
        "First, solve the problem. Then, write the code.",
        "Code is poetry. Make every line rhyme.",
        "Architecture starts where engineering ends.",
        "Stay hungry, stay foolish, stay focused.",
        "Elegance is not a luxury, it's a necessity.",
        "Quality is a habit, not an act.",
        "Dream big, architect bigger.",
        "Clean code is the signature of a professional.",
        "Innovation distinguishes a leader from a follower.",
        "The source is in your mind, not just the file.",
        "Every master was once a beginner. Keep building.",
        "Complexity is the enemy of execution.",
        "Building the future, one node at a time.",
        "Your potential is infinite. Your code is the manifestation.",
        "Success is 1% inspiration, 99% optimization.",
        "Great systems are grown, not built.",
        "Code with passion, live with purpose.",
        "The expert in anything was once a student.",
        "Make it work, make it right, make it fast.",
        "Software is a combination of artistry and logic.",
        "One line at a time. One mountain at a time.",
        "The best error message is the one that never exists.",
        "A architect's dream is a world made of logic.",
        "Crafting digital excellence from thin air.",
        "Believe in your logic. It's your superpower."
    ];

    const [activeMotivation, setActiveMotivation] = useState("");
    const [showMotivation, setShowMotivation] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
            setIsPWA(isStandalone);
            if (isStandalone) {
                document.body.classList.add('is-pwa');
            }

            // --- AIR-TIGHT SECURITY ---
            const triggerMotivation = () => {
                const random = motivations[Math.floor(Math.random() * motivations.length)];
                setActiveMotivation(random);
                setShowMotivation(true);

                // --- Cinematic Confetti Explosion ---
                const duration = 3 * 1000;
                const animationEnd = Date.now() + duration;
                const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 20000, colors: ['#3b82f6', '#8b5cf6', '#ffffff'] };

                const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

                const interval: any = setInterval(function () {
                    const timeLeft = animationEnd - Date.now();

                    if (timeLeft <= 0) {
                        return clearInterval(interval);
                    }

                    const particleCount = 50 * (timeLeft / duration);
                    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
                }, 250);

                setTimeout(() => setShowMotivation(false), 4000);
            };

            const handleSecurityEvents = (e: KeyboardEvent) => {
                let triggered = false;
                // Disable F12
                if (e.key === "F12") {
                    e.preventDefault();
                    triggered = true;
                }

                if (e.ctrlKey && (e.key === "S" || e.key === "s")) {
                    e.preventDefault();
                    triggered = true;
                }
                // Disable Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
                if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "i" || e.key === "j")) {
                    e.preventDefault();
                    triggered = true;
                }
                if (e.ctrlKey && (e.key === "U" || e.key === "u")) {
                    e.preventDefault();
                    triggered = true;
                }

                if (triggered) triggerMotivation();
            };

            const handleContextMenu = (e: MouseEvent) => {
                e.preventDefault();
                return false;
            };

            window.addEventListener("keydown", handleSecurityEvents);
            window.addEventListener("contextmenu", handleContextMenu);

            const handleBeforeInstallPrompt = (e: any) => {
                e.preventDefault();
                setDeferredPrompt(e);

                const hasSeenBanner = sessionStorage.getItem('pwa_banner_seen');
                if (!hasSeenBanner) {
                    setTimeout(() => setShowInstallBanner(true), 3000);
                }
            };

            window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

            return () => {
                window.removeEventListener("keydown", handleSecurityEvents);
                window.removeEventListener("contextmenu", handleContextMenu);
                window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            };
        }
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setDeferredPrompt(null);
            setShowInstallBanner(false);
        }
        sessionStorage.setItem('pwa_banner_seen', 'true');
    };

    const closeBanner = () => {
        setShowInstallBanner(false);
        sessionStorage.setItem('pwa_banner_seen', 'true');
    };

    const isGamePage = pathname.includes('/games') || pathname.includes('/playground');

    return (
        <>
            {/* Security Motivation Popup */}
            <AnimatePresence>
                {showMotivation && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed top-10 left-1/2 -translate-x-1/2 z-[15000] w-[90vw] max-w-lg bg-zinc-900/90 backdrop-blur-3xl border border-white/20 rounded-2xl p-6 shadow-[0_0_50px_rgba(59,130,246,0.3)] overflow-hidden"
                    >
                        {/* Background Pulse */}
                        <motion.div
                            animate={{ opacity: [0.1, 0.3, 0.1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-blue-500/10 pointer-events-none"
                        />

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="p-3 bg-blue-500/20 rounded-full mb-4">
                                <Zap className="text-blue-400" size={24} />
                            </div>
                            <h4 className="text-[10px] text-blue-400 uppercase font-black tracking-[0.4em] mb-3">Architect's Wisdom</h4>
                            <p className="text-white text-lg font-medium leading-relaxed italic">
                                "{activeMotivation}"
                            </p>
                        </div>

                        {/* Animated Timer Bar */}
                        <motion.div
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: 4, ease: "linear" }}
                            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Install Banner */}
            <AnimatePresence>
                {showInstallBanner && !isPWA && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-24 left-4 right-4 md:bottom-8 md:left-auto md:right-8 md:w-96 z-[100] bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl"
                    >
                        <button
                            onClick={closeBanner}
                            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                        >
                            <X size={18} />
                        </button>

                        <div className="flex gap-4 items-start mb-6">
                            <div className="bg-blue-600/20 p-3 rounded-xl">
                                <Smartphone className="text-blue-500" size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg leading-tight">Install Web App</h3>
                                <p className="text-zinc-400 text-sm mt-1">
                                    Get the full native experience on your device.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase font-black tracking-widest bg-white/5 py-2 px-3 rounded-lg">
                                <Zap size={12} className="text-yellow-500" /> Instant
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase font-black tracking-widest bg-white/5 py-2 px-3 rounded-lg">
                                <Globe size={12} className="text-green-500" /> Offline
                            </div>
                        </div>

                        <button
                            onClick={handleInstall}
                            className="w-full py-3.5 bg-white text-black rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-zinc-200 active:scale-95 transition-all"
                        >
                            <Download size={18} />
                            Add to Home Screen
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Native Mobile Feel: Bottom Nav Bar */}
            {!isGamePage && (
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: (isVisible && !isSidebarOpen) ? 0 : '100%' }}
                    transition={{ type: "spring", stiffness: 260, damping: 32 }}
                    className="fixed bottom-0 left-0 right-0 h-20 bg-black/40 backdrop-blur-3xl border-t border-white/5 flex items-center justify-around z-[90] md:hidden pb-safe px-2 select-none"
                >
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative flex flex-col items-center justify-center min-w-[64px] h-full gap-1 group"
                            >
                                <motion.div
                                    animate={isActive ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    className={`${isActive ? 'text-white' : 'text-zinc-500'}`}
                                >
                                    <Icon size={24} strokeWidth={isActive ? 1.5 : 1} className={isActive ? "drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" : ""} />
                                </motion.div>
                                <span className={`text-[8px] font-bold uppercase tracking-[0.05em] transition-colors ${isActive ? 'text-white' : 'text-zinc-700'}`}>
                                    {link.label}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="bottom-nav-active"
                                        className="absolute -top-[1px] w-8 h-[2px] bg-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)] rounded-full"
                                    />
                                )}
                            </Link>
                        )
                    })}
                </motion.div>
            )}
        </>
    );
};

export default PWAManager;
