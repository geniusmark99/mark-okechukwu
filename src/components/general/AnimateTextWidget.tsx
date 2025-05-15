"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
    text: string;
    tag?: keyof React.JSX.IntrinsicElements;
    className?: string;
}

const AnimatedTextWidget = ({ text, tag = "p", className = "" }: AnimatedTextProps) => {
    const containerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const targets = containerRef.current.querySelectorAll(".char");

        gsap.fromTo(
            targets,
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                ease: "power2.out",
                duration: 1.4,
                stagger: 0.05,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reset",
                },
            }
        );
    }, []);

    const chars = text.split("").map((char, i) => (
        <span
            key={i}
            className="inline-block char"
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
            {char}
        </span>
    ));

    switch (tag) {
        case "h1":
            return (
                <h1 className={className} ref={containerRef as React.RefObject<HTMLHeadingElement>}>
                    {chars}
                </h1>
            );
        case "h2":
            return (
                <h2 className={className} ref={containerRef as React.RefObject<HTMLHeadingElement>}>
                    {chars}
                </h2>
            );
        case "h3":
            return (
                <h3 className={className} ref={containerRef as React.RefObject<HTMLHeadingElement>}>
                    {chars}
                </h3>
            );
        case "p":
            return (
                <p className={className} ref={containerRef as React.RefObject<HTMLParagraphElement>}>
                    {chars}
                </p>
            );
        case "div":
            return (
                <div className={className} ref={containerRef as React.RefObject<HTMLDivElement>}>
                    {chars}
                </div>
            );
        default:
            return (
                <span className={className} ref={containerRef}>
                    {chars}
                </span>
            );
    }
};

export default AnimatedTextWidget;
