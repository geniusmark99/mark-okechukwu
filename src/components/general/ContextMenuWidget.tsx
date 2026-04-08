'use client';
import { FC, ReactNode, useContext, useState } from 'react';
import { LogoIcon } from '@/components/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { GradientContext } from './GradientContextWidget';


interface ContextMenuItem {
    label: string;
    icon?: ReactNode;
    onClick?: () => void;
    description?: string;
    children?: Array<{ label: string; onClick?: () => void; icon?: ReactNode; description?: string }>;
}

interface ContextMenuWidgetProps {
    items: ContextMenuItem[];
    visible: boolean;
    position: { x: number; y: number };
}

// ─── Cinematic Detail Popup ───
const DetailPopup: FC<{
    item: { label: string; icon?: ReactNode; description?: string };
    onClose: () => void;
}> = ({ item, onClose }) => {
    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            {/* Backdrop */}
            <motion.div
                className="absolute inset-0 bg-black/70 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />

            {/* Card */}
            <motion.div
                className="relative z-10 w-[90vw] max-w-md mx-4"
                initial={{ scale: 0.7, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.85, y: 20, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Glow ring */}
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-blue-500/40 via-purple-500/20 to-cyan-500/40 blur-sm" />

                <div className="relative rounded-2xl bg-[#0a0a0a] border border-white/[0.08] overflow-hidden">
                    {/* Top gradient bar */}
                    <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400" />

                    {/* Content */}
                    <div className="p-8">
                        {/* Icon */}
                        <motion.div
                            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/10 border border-white/[0.06] flex items-center justify-center text-3xl mb-6"
                            initial={{ rotate: -10, scale: 0.8 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                        >
                            {item.icon || '✦'}
                        </motion.div>

                        {/* Title */}
                        <motion.h3
                            className="text-2xl font-bold text-white mb-3 tracking-tight"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.12 }}
                        >
                            {item.label}
                        </motion.h3>

                        {/* Description */}
                        <motion.p
                            className="text-gray-400 text-[0.95rem] leading-relaxed mb-6"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.18 }}
                        >
                            {item.description || `Deep expertise in ${item.label}. Building production-grade systems with modern best practices, performance optimization, and scalable architecture patterns.`}
                        </motion.p>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                        {/* Meta */}
                        <motion.div
                            className="flex items-center justify-between"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.25 }}
                        >
                            <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">Mark Okechukwu</span>
                            <button
                                onClick={onClose}
                                className="text-xs text-gray-400 hover:text-white border border-white/[0.08] rounded-lg px-4 py-2 transition-all hover:bg-white/[0.04] hover:border-white/[0.15]"
                            >
                                Close ✕
                            </button>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};


const ContextMenuWidget: FC<ContextMenuWidgetProps> = ({ items, visible, position }) => {
    const [activeDetail, setActiveDetail] = useState<{ label: string; icon?: ReactNode; description?: string } | null>(null);

    const context = useContext(GradientContext);
    if (!context) throw new Error("GradientContext must be used within a GradientProvider");
    const { activeWord, gradients } = context;

    if (!visible && !activeDetail) return null;

    return (
        <>
            {/* Context Menu */}
            <AnimatePresence>
                {visible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: -8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -4 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        className="absolute z-[5000] bg-[#0c0c0c]/95 backdrop-blur-2xl border border-white/[0.06] min-w-[280px] rounded-xl shadow-2xl shadow-black/40 overflow-hidden"
                        style={{ top: position.y, left: position.x }}
                    >
                        {/* Header gradient */}
                        <div className={`${gradients[activeWord % gradients.length]} py-2.5 flex items-center justify-center gap-x-2`}>
                            <LogoIcon />
                        </div>

                        <ul className="py-2 px-2">
                            {items.map((item, index) => (
                                <li key={index}>
                                    {/* Category header */}
                                    <div className="text-[0.7rem] uppercase tracking-[0.15em] text-gray-500 font-semibold px-3 pt-3 pb-1.5">
                                        {item.label}
                                    </div>

                                    {/* Children items */}
                                    {item.children && (
                                        <ul className="space-y-0.5">
                                            {item.children.map((child, idx) => (
                                                <motion.li
                                                    key={idx}
                                                    whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.04)' }}
                                                    className="flex items-center text-white/90 text-sm px-3 py-2 cursor-pointer rounded-lg transition-colors group"
                                                    onClick={() => {
                                                        setActiveDetail({ label: child.label, icon: child.icon, description: child.onClick ? undefined : undefined });
                                                    }}
                                                >
                                                    <span className="mr-3 text-lg opacity-60 group-hover:opacity-100 transition-opacity">
                                                        {child.icon}
                                                    </span>
                                                    <span className="font-medium">{child.label}</span>
                                                    <svg className="ml-auto w-3.5 h-3.5 text-gray-600 group-hover:text-gray-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* Divider between categories */}
                                    {index < items.length - 1 && (
                                        <div className="h-px bg-white/[0.04] mx-3 my-1.5" />
                                    )}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Detail Popup */}
            <AnimatePresence>
                {activeDetail && (
                    <DetailPopup
                        item={activeDetail}
                        onClose={() => setActiveDetail(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default ContextMenuWidget;
