"use client";

import { useEffect, useRef } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css";

type Props = {
    children: React.ReactNode;
};

const LocoSrollWrapperWidget = ({ children }: Props) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (typeof window === "undefined" || !scrollRef.current) return;

        // ✅ Dynamically import LocomotiveScroll ONLY on client
        import("locomotive-scroll").then((LocomotiveScrollModule) => {
            const LocomotiveScroll = LocomotiveScrollModule.default;

            const scroll = new LocomotiveScroll({
                lenisOptions: {
                    lerp: 0.1,
                    smoothWheel: true,
                },
            });

            const handleResize = () => scroll.resize();
            window.addEventListener("resize", handleResize);

            return () => {
                scroll.destroy();
                window.removeEventListener("resize", handleResize);
            };
        });
    }, []);

    return (
        <main ref={scrollRef} data-scroll-container>
            {children}
        </main>
    );
};

export default LocoSrollWrapperWidget;
