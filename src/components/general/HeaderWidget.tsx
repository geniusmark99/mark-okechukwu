"use client";
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

// Scribble blob SVG path (reused)
const SCRIBBLE_PATH = "M8.787 12.436c0 .895 0-1.79 0-2.685 0-1.452 2.097-2.801 3.751-3.176 2.25-.51 3.812.52 5.172 1.834.568.55 1.097 1.181 1.559 1.79.024.032.373.711.494.491.4-.724.614-1.526 1.034-2.269 1.115-1.97 2.636-3.627 4.446-5.208.85-.743 1.812-1.797 3.103-2.051.303-.06.829-.252 1.142-.112.513.23 1.155.999 1.521 1.368.605.609 1.387 1.049 1.968 1.684.265.289.659.569.957.839.274.248.264.28.447 0 .319-.487 1.45-.901 1.991-1.175 1.003-.507 2.147-.872 3.257-1.199.612-.181 1.35-.311 2.007-.311.794 0 1.457.679 2.022 1.063 1.382.939 2.587 2.045 2.949 3.499.07.281.159.588.255.857.098.276.576-.932.617-1.017.991-2.024 3.092-3.917 5.997-3.965.484-.008 1.401-.133 1.845.068.664.301 1.271 1.161 1.667 1.66.48.604 1.289 1.561 1.397 2.299.016.112.921-.797 1.119-.952 1.32-1.032 2.582-2.13 4.083-3.002.803-.466 3.359-1.689 4.399-.944 1.038.743 1.341 2.07 1.621 3.114.3 1.12.7 2.381.726 3.53.003.13-.013.939.077.814.829-1.145 2.105-2.07 3.389-2.884 1.071-.68 2.188-1.571 3.589-1.771.436-.063 1.351-.342 1.59.102.865 1.647 1.156 3.38.911 5.184-.069.502-.26.964-.394 1.448-.055.2-.143.076-.123-.068.061-.445.556-.691.965-.938.877-.53 2.874-1.79 3.998-.926 1.631 1.254 3.098 2.68 4.191 4.276.846 1.235.7 2.401-.555 3.412-.105.085-.855.414-.795.342.325-.393 2.633-.224 3.134-.224 2.31 0 3.37.613 4.762 2.033 1.226 1.25 2.406 4.007 1.736 5.624-.352.851-1.274 1.452-2.084 2.014-.435.302-.876.62-1.389.833-.201.083-.624.143-.772.292-.307.31-.435-1.587-.416-1.846.03-.413.687.869.695.889.463 1.171.555 2.536.555 3.76 0 1.509-.048 2.651-1.142 3.94-1.298 1.529-2.928 2.77-4.693 3.94-1.506 1-3.03 1.629-4.909 2.058-1.293.295-2.753.213-4.09.18-1.893-.046-3.365-2.075-3.365-3.462 0-.122-.11-.677.137-.677.26 0 .41.601.417.758.061 1.326-.276 2.65-2.083 3.095-2.645.651-5.586-.13-7.85-1.224-2.264-1.094-3.685-2.268-4.762-4.195-.14-.252.063-.47.178-.043.157.578.209 1.235.209 1.827 0 1.233-1.96 1.227-3.18 1.324-1.685.134-4.245.357-5.711-.423-.297-.158-1.872-1.358-1.953-1.063-.063.228-.77.427-.996.504-1 .339-2 .663-3 1.007-2.105.726-4.37.783-6.622.783-1.131 0-2.596-1.026-2.825-1.927-.03-.114-.15-.93.047-.976.188-.043.54.262.54.386 0 .338-.062.459-.386.702-.81.606-2.275 1.108-3.257 1.479-3.633 1.374-7.716 1.902-11.701 1.902-.678 0-1.345.15-1.744-.36-.276-.354-.35-.812-.486-1.206-.052-.15-.358-.724-.177-.87.162-.13-.364.241-.586.286-3.089.622-6.488.224-9.355-.797-1.108-.395-2.508-.808-3.396-1.498-.588-.457-.456-1.533-.444-2.126.016-.801.617-1.389 1.243-1.968.18-.167.676-.614.98-.628.529-.023-.459-.018-.633-.068-1.619-.47-2.71-2.374-3.457-3.462-2.054-2.989-3.134-6.8-3.134-10.23 0-.437-.12-1.119.625-1.119 1.383 0 2.73-.056 3.96.361.288.098 1.094.501.964.032-.088-.322-.412-.58-.544-.889-.308-.716-.462-1.453-.673-2.187-.177-.618-.17-1.376-.17-2.013 0-.738.154-.837.803-1.256.487-.314 1.74-.006 2.254.201.819.33 1.219.932 1.528 1.616";

const HeaderWidget = () => {
    const pathname = usePathname();
    const [isMobileBarOpen, setIsMobileBarOpen] = useState(false);

    const handleClick = () => {
        const phoneNumber = '+2348141625004';
        const message = 'Hi! Mark, I need your Professional Services';
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(url, '_blank');
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsMobileBarOpen(false);
        };
        if (isMobileBarOpen) window.addEventListener("keydown", handleKeyDown);
        else window.removeEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isMobileBarOpen]);

    const navLinks = [
        { href: '/projects', label: 'Projects' },
        { href: '/blog', label: 'Blog' },
        { href: '/games', label: 'Games' },
        { href: '/research', label: 'Research' },
    ];

    return (
        <div className='border-b border-white/[0.06] py-3 lg:py-3.5 bg-black/80 backdrop-blur-sm'
            style={{
                backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
            }}
        >
            {/* ─── Desktop 3-Column Grid ─── */}
            <div className='flex items-center justify-between px-3 md:px-8 lg:px-12'>

                {/* LEFT: Logo */}
                <div className='flex items-center'>
                    <button className='font-semibold rounded-md px-2 py-1.5 md:hidden mr-2'
                        onClick={() => setIsMobileBarOpen(!isMobileBarOpen)}
                    >
                        {isMobileBarOpen ? (
                            <svg className='size-5 fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                <path d="M39.486 6.978A1.5 1.5 0 0038.44 7.44L24 21.879 9.56 7.44A1.5 1.5 0 007.44 9.56L21.879 24 7.44 38.44a1.5 1.5 0 102.121 2.121L24 26.121l14.44 14.44a1.5 1.5 0 102.121-2.121L26.121 24l14.44-14.44A1.5 1.5 0 0039.486 6.978z" />
                            </svg>
                        ) : (
                            <svg className='size-5 fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                <path d="M5.5 9A1.5 1.5 0 105.5 12h37a1.5 1.5 0 100-3h-37zm0 13.5A1.5 1.5 0 105.5 25.5h37a1.5 1.5 0 100-3h-37zm0 13.5A1.5 1.5 0 105.5 39h37a1.5 1.5 0 100-3h-37z" />
                            </svg>
                        )}
                    </button>

                    <Link href='/' className="flex items-center gap-1.5 group">
                        <svg className="fill-white w-14 min-[320px]:w-[72px] h-auto group-hover:opacity-90 transition-opacity" width="1654" height="332" viewBox="0 0 1654 332" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1256 76.6406L1009.24 330.75H1204.54L1123 249.052L1178.58 192L1317 331H1207V331.25H1009V0H1185.12L1256 76.6406ZM539.41 329H453.072L452.939 328.75H346.277L346.41 329H279.338L279.471 328.75H193.133L193 329H0L173.205 2L269.705 184.186L193.397 328.25H279.735L312.873 265.686L346.013 328.25H452.675L366.205 165L312.873 265.686L269.705 184.186L366.205 2L539.41 329ZM947.41 329H601L774.205 2L947.41 329ZM1456 149.113L1554 2.58984H1654L1518.21 195.244L1650 327.59H1537.79L1471.64 261.309L1456 283.495V328.34H1641V328.84H1456V329H1378V2H1456V149.113ZM682.406 328.25H866.004L774.205 155L682.406 328.25ZM831.157 298.5H716.843L774 195L831.157 298.5ZM1097 160.5L1171 87L1133.5 47H1097V160.5Z" />
                        </svg>
                    </Link>
                </div>

                {/* CENTER: Nav Links */}
                <nav className='hidden md:flex items-center justify-center gap-x-14 lg:gap-x-20'>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-[0.95rem] font-medium tracking-wide transition-all duration-300 relative
                                ${pathname === link.href
                                    ? 'text-white'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {link.label}
                            {pathname === link.href && (
                                <motion.div
                                    layoutId="nav-indicator"
                                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* RIGHT: Contact CTA with scribble */}
                <div className='flex items-center'>
                    <div className="relative group cursor-pointer" onClick={handleClick}>
                        <svg width="110" height="44" viewBox="0 0 98 42" fill="none" xmlns="http://www.w3.org/2000/svg"
                            className="absolute -top-[14px] -left-[14px] min-[320px]:-left-[18px] w-[90px] min-[320px]:w-[110px] h-auto fill-blue-500 group-hover:fill-blue-400 transition-colors duration-300 group-hover:scale-105 origin-center"
                        >
                            <path d={SCRIBBLE_PATH} strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span className='relative z-10 text-white text-[0.85rem] min-[320px]:text-[0.95rem] font-medium tracking-wide px-2 min-[320px]:px-3 py-1'>
                            Contact
                        </span>
                    </div>
                </div>
            </div>

            {/* ─── Mobile Sidebar ─── */}
            <AnimatePresence>
                {isMobileBarOpen && (
                    <>
                        <motion.div
                            initial={{ x: "-100%", opacity: 0 }}
                            animate={{ x: "0%", opacity: 1 }}
                            exit={{ x: "-100%", opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed top-0 left-0 z-[4000] w-72 h-screen bg-black/95 backdrop-blur-xl border-r border-white/[0.06] text-white flex flex-col"
                        >
                            {/* Mobile Logo */}
                            <div className="border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
                                <Link href="/" onClick={() => setIsMobileBarOpen(false)}>
                                    <svg className="fill-white w-16 h-8" width="1654" height="332" viewBox="0 0 1654 332" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1256 76.6406L1009.24 330.75H1204.54L1123 249.052L1178.58 192L1317 331H1207V331.25H1009V0H1185.12L1256 76.6406ZM539.41 329H453.072L452.939 328.75H346.277L346.41 329H279.338L279.471 328.75H193.133L193 329H0L173.205 2L269.705 184.186L193.397 328.25H279.735L312.873 265.686L346.013 328.25H452.675L366.205 165L312.873 265.686L269.705 184.186L366.205 2L539.41 329ZM947.41 329H601L774.205 2L947.41 329ZM1456 149.113L1554 2.58984H1654L1518.21 195.244L1650 327.59H1537.79L1471.64 261.309L1456 283.495V328.34H1641V328.84H1456V329H1378V2H1456V149.113ZM682.406 328.25H866.004L774.205 155L682.406 328.25ZM831.157 298.5H716.843L774 195L831.157 298.5ZM1097 160.5L1171 87L1133.5 47H1097V160.5Z" />
                                    </svg>
                                </Link>
                                <button onClick={() => setIsMobileBarOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                    <svg className='size-5 fill-current' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                        <path d="M39.486 6.978A1.5 1.5 0 0038.44 7.44L24 21.879 9.56 7.44A1.5 1.5 0 007.44 9.56L21.879 24 7.44 38.44a1.5 1.5 0 102.121 2.121L24 26.121l14.44 14.44a1.5 1.5 0 102.121-2.121L26.121 24l14.44-14.44A1.5 1.5 0 0039.486 6.978z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Mobile Nav */}
                            <nav className="flex flex-col py-6 px-6 gap-1">
                                {[...navLinks, { href: '/contact', label: 'Contact' }].map((link, i) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.08, duration: 0.3 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMobileBarOpen(false)}
                                            className={`block py-3 px-4 rounded-xl text-[1rem] font-medium transition-all duration-200
                                                ${pathname === link.href
                                                    ? 'text-white bg-white/[0.06]'
                                                    : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* Mobile CTA */}
                            <div className="mt-auto px-6 pb-8">
                                <button
                                    onClick={() => { handleClick(); setIsMobileBarOpen(false); }}
                                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity"
                                >
                                    Let&apos;s Talk →
                                </button>
                            </div>
                        </motion.div>

                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsMobileBarOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[3999]"
                        />
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default HeaderWidget;