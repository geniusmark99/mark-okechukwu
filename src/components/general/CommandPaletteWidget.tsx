"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, X, ArrowRight, Home, LayoutGrid, Cpu, Gamepad2, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

const items = [
    { id: '1', title: 'Home', description: 'Go to overview', icon: Home, link: '/' },
    { id: '2', title: 'Projects', description: 'View selected work', icon: LayoutGrid, link: '/projects' },
    { id: '3', title: 'Blog', description: 'Articles & thoughts', icon: Cpu, link: '/blog' },
    { id: '4', title: 'Playground', description: 'Experimental games', icon: Gamepad2, link: '/games' },
    { id: '5', title: 'Contact', description: 'Start a conversation', icon: Mail, link: '/contact' },
    { id: '6', title: 'Research', description: 'Technical explorations', icon: Search, link: '/research' },
];

const CommandPaletteWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredItems = items.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.description.toLowerCase().includes(query.toLowerCase())
    );

    const toggle = useCallback(() => setIsOpen(prev => !prev), []);

    useEffect(() => {
        const handleToggleEvent = () => toggle();
        window.addEventListener('toggle-command-palette', handleToggleEvent);
        
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
                e.preventDefault();
                toggle();
            }
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('toggle-command-palette', handleToggleEvent);
        };
    }, [toggle]);

    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setSelectedIndex(0);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleAction = (item: typeof items[0]) => {
        router.push(item.link);
        setIsOpen(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[11000] flex items-start justify-center pt-[15vh] px-4">
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Palette Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="w-full max-w-2xl bg-zinc-900/90 border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-3xl"
                    >
                        {/* Search Input */}
                        <div className="flex items-center gap-4 px-6 py-4 border-b border-white/5">
                            <Search className="text-zinc-500" size={20} />
                            <input 
                                ref={inputRef}
                                type="text"
                                placeholder="Search everything..."
                                className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder:text-zinc-600 appearance-none"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'ArrowDown') {
                                        e.preventDefault();
                                        setSelectedIndex(i => (i + 1) % filteredItems.length);
                                    } else if (e.key === 'ArrowUp') {
                                        e.preventDefault();
                                        setSelectedIndex(i => (i - 1 + filteredItems.length) % filteredItems.length);
                                    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
                                        handleAction(filteredItems[selectedIndex]);
                                    }
                                }}
                            />
                            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-zinc-500 font-medium">
                                <Command size={10} /> K
                            </div>
                        </div>

                        {/* List Area */}
                        <div className="max-h-[350px] overflow-y-auto py-3 scrollbar-hide">
                            {filteredItems.length > 0 ? (
                                filteredItems.map((item, index) => {
                                    const Icon = item.icon;
                                    const isSelected = index === selectedIndex;
                                    return (
                                        <div 
                                            key={item.id}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                            onClick={() => handleAction(item)}
                                            className={`mx-3 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-200 flex items-center gap-4 ${isSelected ? 'bg-white/10' : 'bg-transparent'}`}
                                        >
                                            <div className={`p-2 rounded-lg transition-colors ${isSelected ? 'bg-blue-600 text-white' : 'bg-white/5 text-zinc-400'}`}>
                                                <Icon size={18} />
                                            </div>
                                            <div className="flex-1">
                                                <div className={`text-sm font-bold tracking-wide ${isSelected ? 'text-white' : 'text-zinc-300'}`}>{item.title}</div>
                                                <div className={`text-xs ${isSelected ? 'text-zinc-400' : 'text-zinc-500'}`}>{item.description}</div>
                                            </div>
                                            {isSelected && (
                                                <motion.div layoutId="arrow-nav">
                                                    <ArrowRight size={14} className="text-white/40" />
                                                </motion.div>
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="px-10 py-20 text-center">
                                    <div className="text-zinc-600 translate-x-1"><Search size={40} className="mx-auto opacity-20 mb-4" /></div>
                                    <h3 className="text-zinc-500 font-bold mb-1">No results found</h3>
                                    <p className="text-zinc-600 text-sm">Try searching for "Projects" or "Contact"</p>
                                </div>
                            )}
                        </div>

                        {/* Footer Help */}
                        <div className="px-6 py-3 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-600 font-black uppercase tracking-widest">
                            <div className="flex gap-4">
                                <span className="flex items-center gap-1"><span className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">ESC</span> Close</span>
                                <span className="flex items-center gap-1"><span className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">↑ ↓</span> Navigate</span>
                            </div>
                            <span className="flex items-center gap-1"><span className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">↵</span> Enter to select</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CommandPaletteWidget;
