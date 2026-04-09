"use client";

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Props {
    children: React.ReactNode;
    className?: string;
}

const HolographicCardWidget = ({ children, className = "" }: Props) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
    const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);
    const glareOpacity = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXRelative = e.clientX - rect.left;
        const mouseYRelative = e.clientY - rect.top;

        x.set(mouseXRelative / width - 0.5);
        y.set(mouseYRelative / height - 0.5);
        glareOpacity.set(0.4);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        glareOpacity.set(0);
    };

    return (
        <motion.div
            style={{
                perspective: 1200,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative rounded-[32px] ${className}`}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="w-full h-full relative"
            >
                {/* Glare Effect */}
                <motion.div
                    style={{
                        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
                        opacity: glareOpacity,
                    }}
                    className="absolute inset-0 z-10 pointer-events-none rounded-[32px] transition-opacity duration-300"
                />

                {children}
            </motion.div>
        </motion.div>
    );
};

export default HolographicCardWidget;
