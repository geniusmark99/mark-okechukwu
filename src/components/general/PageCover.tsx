'use client'
import React, { ReactNode, useState, MouseEvent, useContext, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import HeaderWidget from './HeaderWidget';
import FooterWidget from './FooterWidget';
import ContextMenuWidget from './ContextMenuWidget';
import { GradientContext } from './GradientContextWidget';
import { FaJava, FaBookOpen, FaBrain, FaCode, FaTerminal, FaLaptopCode, FaHeart } from 'react-icons/fa';
import { SiJavascript, SiPhp, SiLaravel, SiReact, SiNextdotjs } from 'react-icons/si';


interface PageCoverProps {
    children: ReactNode;
    showHeader: boolean;
    showFooter?: boolean;
}



const PageCover: React.FC<PageCoverProps> = ({ children, showHeader = true, showFooter = true }) => {


    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const controls = useAnimation();
    const lastScrollY = useRef(0);
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);

    const contextMenuItems = [
        {
            label: 'My Skills',
            icon: <FaLaptopCode />,
            children: [
                { label: 'Javascript', icon: <SiJavascript className="text-yellow-400" />, description: 'Expert-level JavaScript development — ES6+, async patterns, closures, prototypal inheritance, and building performant, scalable frontend & backend systems.' },
                { label: 'Php', icon: <SiPhp className="text-indigo-400" />, description: 'Seasoned PHP developer with deep experience in server-side rendering, RESTful APIs, and enterprise-grade web application architecture.' },
                { label: 'Laravel', icon: <SiLaravel className="text-red-500" />, description: 'Full-stack Laravel craftsman — Eloquent ORM, Blade templating, Horizon queues, Sanctum auth, and building robust SaaS platforms from scratch.' },
                { label: 'React (Next.js)', icon: <SiNextdotjs className="text-white" />, description: 'Advanced React & Next.js engineer — Server Components, App Router, ISR/SSR, Framer Motion animations, and pixel-perfect responsive interfaces.' },
                { label: 'Java', icon: <FaJava className="text-orange-500" />, description: 'Strong Java fundamentals — OOP design patterns, Spring Boot microservices, multithreading, and building high-throughput backend systems.' },
            ],
        },
        {
            label: 'My Hobbies',
            icon: <FaHeart />,
            children: [
                { label: 'Reading & Studying', icon: <FaBookOpen className="text-green-400" />, description: 'Constantly learning through books, research papers, and online courses — staying at the bleeding edge of technology and design thinking.' },
                { label: 'Thinking & Creating', icon: <FaBrain className="text-pink-400" />, description: 'Deep-thinking creative — ideating product concepts, sketching system architectures, and turning abstract ideas into tangible digital experiences.' },
                { label: 'Coding & Building', icon: <FaCode className="text-blue-400" />, description: 'Passionate builder — shipping production apps, open-source contributions, and turning complex problems into elegant, maintainable solutions.' },
            ],
        }
    ];


    const handleContextMenu = (event: MouseEvent) => {
        event.preventDefault();
        setContextMenuPosition({ x: event.pageX, y: event.pageY });
        setContextMenuVisible(true);
    };

    const handleClick = () => {
        setContextMenuVisible(false);
    };


    const context = useContext(GradientContext);
    if (!context) {
        throw new Error("GradientContext must be used within a GradientProvider");
    }


    // 🧭 Scroll direction detection
    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;

            if (currentY > lastScrollY.current && currentY > 80) {
                setScrollDirection('down');
            } else if (currentY < lastScrollY.current) {
                setScrollDirection('up');
            }

            lastScrollY.current = currentY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    // 🎬 Animate Header based on scroll
    useEffect(() => {
        if (scrollDirection === 'down') {
            controls.start({
                y: -100,
                opacity: 0,
                transition: { duration: 0.4, ease: 'easeInOut' },
            });
        } else if (scrollDirection === 'up') {
            controls.start({
                y: 0,
                opacity: 1,
                transition: { duration: 0.4, ease: 'easeInOut' },
            });
        }
    }, [scrollDirection, controls]);


    useEffect(() => {
        const handleKeyPress = () => {

            // const isCtrlShiftI = event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'i';
            // const isF11 = event.key === 'F11';
            // const isF12 = event.key === 'F12';
            // const isCtrlS = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's';


            // if (isCtrlShiftI || isF11 || isCtrlS || isF12) {
            //     event.preventDefault();

            //     const syntheticEvent = {
            //         preventDefault: () => { },
            //         pageX: "40%",
            //         pageY: "25%"
            //     } as unknown as MouseEvent;

            //     handleContextMenu(syntheticEvent);
            // }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);




    return <>
        <main

            onContextMenu={handleContextMenu}
            onClick={handleClick}
            className="bg-black h-auto overflow-x-hidden overflow-y-auto  font-(family-name:--Canva-Sans)">
            <div
                style={{
                    bottom: "calc(100% - min(var(--framer-viewport-height, 100%), 100%) - .5px)",
                    flex: "none",
                    left: 0,
                    order: 1008,
                    pointerEvents: "none",
                    position: "fixed",
                    right: 0,
                    top: 0,
                    zIndex: 10,
                }}
            >

                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundSize: "128px",
                        backgroundRepeat: "repeat",
                        backgroundImage: "url('/images/grainy-noise.png')",
                        opacity: 0.06,
                        borderRadius: 0,
                    }}
                ></div>
            </div>

            {/* {
                showHeader ? <HeaderWidget /> : ''
            } */}

            {showHeader && (
                <motion.div
                    animate={controls}
                    initial={{ y: 0, opacity: 1 }}
                    className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md"
                >
                    <HeaderWidget />
                </motion.div>
            )}
            <section className="h-auto text-white bg-black bg-cover bg-no-repeat relative z-10" >
                {/* <div className="hidden lg:flex absolute top-4 left-30 overflow-hidden pointer-events-none">
                    <svg width="1400" className='stroke-gray-100' height="900" viewBox="0 0 1400 900" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 0V696" strokeOpacity="0.5" strokeWidth="0.5" strokeDasharray="6 6" />
                        <path d="M601 0V696" strokeOpacity="0.5" strokeWidth="0.5" strokeDasharray="6 6" />
                        <path d="M301 0V696" strokeOpacity="0.5" strokeWidth="0.5" strokeDasharray="6 6" />
                        <path d="M901 0V696" strokeOpacity="0.5" strokeWidth="0.5" strokeDasharray="6 6" />
                        <path d="M1201 0V696" strokeOpacity="0.5" strokeWidth="0.5" strokeDasharray="6 6" />
                    </svg>
                </div> */}

                <div className="flex justify-center ">
                    <div className="
         border-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] 
         bg-[size:10px_10px] bg-fixed top-0 [--pattern-fg:var(--color-black)]/5  max-lg:border-t lg:border-l 
         dark:[--pattern-fg:var(--color-white)]/10 w-[30px] left-0 h-auto">
                    </div>

                    <div className="w-full mt-3 h-auto pt-[50px]">
                        {children}
                    </div>

                    <div className="
         border-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] 
         bg-[size:10px_10px] bg-fixed top-0 [--pattern-fg:var(--color-black)]/5  max-lg:border-t lg:border-l 
         dark:[--pattern-fg:var(--color-white)]/10 w-[30px] left-0 h-auto">
                    </div>
                </div>

                {showFooter && <FooterWidget />}

            </section>
        </main>

        <ContextMenuWidget
            items={contextMenuItems}
            visible={contextMenuVisible}
            position={contextMenuPosition}
        />
    </>
}


export default PageCover;