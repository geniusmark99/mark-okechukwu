"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreenWidget = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[10000] bg-black flex items-center justify-center overflow-hidden"
                >
                    {/* Background Light Pulse */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-[80vw] h-[80vw] bg-blue-500/10 rounded-full blur-[120px]"
                    />

                    <div className="relative flex flex-col items-center">
                        {/* Logo Animation */}
                        <div className="overflow-hidden mb-8">
                            <motion.h1
                                initial={{ y: 100 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                                className="text-4xl md:text-5xl font-black text-white tracking-[0.4em] uppercase font-(family-name:--Canva-Sans-Display)"
                            >
                                MARK O.
                            </motion.h1>
                        </div>

                        {/* Loading Line */}
                        <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "0%" }}
                                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                            />
                        </div>

                        {/* Status Text */}
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            transition={{ duration: 0.5, delay: 1.2 }}
                            className="text-[10px] text-white/60 uppercase tracking-[0.5em] mt-6 font-bold"
                        >
                            Architecting Digital Excellence
                        </motion.span>
                    </div>

                    {/* Edge Cinematic Beams */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.1 }}
                            transition={{ duration: 1 }}
                            className="absolute top-0 left-[10%] w-[1px] h-full bg-gradient-to-b from-white/20 via-transparent to-transparent"
                        />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="absolute top-0 right-[15%] w-[1px] h-full bg-gradient-to-b from-white/20 via-transparent to-transparent"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SplashScreenWidget;
