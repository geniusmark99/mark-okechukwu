"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const PageTransitionWidget = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)', scale: 0.98 }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)', scale: 1.02 }}
                transition={{ 
                    duration: 0.6, 
                    ease: [0.22, 1, 0.36, 1] 
                }}
                className="w-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransitionWidget;
