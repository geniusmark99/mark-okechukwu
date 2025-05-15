"use client";

import { useEffect } from "react";
import MouseFollower from "mouse-follower";
import gsap from "gsap";


MouseFollower.registerGSAP(gsap);

const CursorProviderWidget = () => {
    useEffect(() => {
        if (typeof window === "undefined") return;
        const timeout = setTimeout(() => {
            const cursor = new MouseFollower({
                el: null,
                container: document.body,
                speed: 0.4,
                ease: "expo.out",
                visible: true,
                visibleOnState: false,
                skewing: 3,
                skewingText: 2,
                skewingIcon: 2,
                skewingMedia: 2,
                skewingDelta: 0.001,
                stickDelta: 0.15,
                showTimeout: 0,
                hideOnLeave: true,
            });

            // Clean up
            return () => {
                cursor.destroy();
            };
        }, 300);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return null;
};

export default CursorProviderWidget;
