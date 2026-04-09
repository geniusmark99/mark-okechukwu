"use client";

import { useEffect, useRef } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css";

type Props = {
    children: React.ReactNode;
};

const LocoSrollWrapperWidget = ({ children }: Props) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let scrollInstance: any;

        const initScroll = async () => {
            const LocomotiveScroll = (await import("locomotive-scroll")).default;
            scrollInstance = new LocomotiveScroll({
                lenisOptions: {
                    lerp: 0.1,
                    duration: 1.2,
                    smoothWheel: true,
                    wheelMultiplier: 1,
                    touchMultiplier: 2,
                    infinite: false,
                },
            });
        };

        if (typeof window !== "undefined") {
            initScroll();
        }

        const handleResize = () => scrollInstance?.resize();
        window.addEventListener("resize", handleResize);

        return () => {
            if (scrollInstance) scrollInstance.destroy();
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <main ref={scrollRef} data-scroll-container>
            {children}
        </main>
    );
};

export default LocoSrollWrapperWidget;
