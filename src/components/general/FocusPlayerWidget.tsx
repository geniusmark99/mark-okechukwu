"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, Volume1, VolumeX, SkipForward, Music, Waves, Coffee, Zap, Moon, Cloud, Cpu, Wind, Sunset, Code, Flame } from 'lucide-react';

const tracks = [
    { name: 'Deep Focus', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', icon: Zap },
    { name: 'Digital Rain', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', icon: Waves },
    { name: 'Code & Coffee', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', icon: Coffee },
    { name: 'Synthwave Sunset', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', icon: Sunset },
    { name: 'Midnight Coding', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', icon: Moon },
    { name: 'Pacific Chill', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', icon: Wind },
    { name: 'Mountain Atmosphere', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', icon: Cloud },
    { name: 'Cyberpunk Lab', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', icon: Cpu },
    { name: 'Abstract Architecture', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', icon: Code },
    { name: 'Organic Systems', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', icon: Flame },
    { name: 'The Deep End', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3', icon: Music },
];

const FocusPlayerWidget = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [volume, setVolume] = useState(0.2); // Low default for ambient
    const [isMuted, setIsMuted] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const currentTrack = tracks[currentTrackIndex];

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play().catch(() => {
                // Handle cases where browser blocks auto-play
            });
        }
        setIsPlaying(!isPlaying);
    };

    const nextTrack = () => {
        const nextIndex = (currentTrackIndex + 1) % tracks.length;
        setCurrentTrackIndex(nextIndex);
        setIsPlaying(true);
        // Small timeout to ensure URL is updated before playing
        setTimeout(() => audioRef.current?.play(), 100);
    };

    const adjustVolume = (delta: number) => {
        setVolume(prev => Math.min(1, Math.max(0, prev + delta)));
        setIsMuted(false);
    };

    return (
        <div className="fixed bottom-24 md:bottom-6 left-4 md:left-6 z-[100]">
            <AnimatePresence>
                {isExpanded ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-zinc-900/90 border border-white/10 backdrop-blur-2xl rounded-2xl p-4 w-64 shadow-2xl"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-blue-500/10 rounded-lg">
                                    <currentTrack.icon size={16} className="text-blue-500" />
                                </div>
                                <div>
                                    <div className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Focus Mode</div>
                                    <div className="text-sm font-bold text-white truncate w-32">{currentTrack.name}</div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="text-zinc-500 hover:text-white transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Progress Bar (Visual only) */}
                        <div className="w-full h-1 bg-white/5 rounded-full mb-6 relative overflow-hidden">
                            <motion.div
                                animate={{ x: isPlaying ? ['-100%', '100%'] : '0%' }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 bg-blue-500/40"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => adjustVolume(-0.1)}
                                    className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                >
                                    <Volume1 size={18} />
                                </button>
                                <button
                                    onClick={togglePlay}
                                    className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                >
                                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                                </button>
                                <button
                                    onClick={() => adjustVolume(0.1)}
                                    className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                >
                                    <Volume2 size={18} />
                                </button>
                            </div>
                            <button
                                onClick={nextTrack}
                                className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                            >
                                <SkipForward size={18} />
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.button
                        layoutId="focus-player"
                        onClick={() => setIsExpanded(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 px-4 py-3 bg-zinc-900/80 border border-white/10 backdrop-blur-xl rounded-full shadow-xl text-white group"
                    >
                        <div className="relative">
                            <div className={`w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center transition-all ${isPlaying ? 'animate-pulse' : ''}`}>
                                <Music size={14} className="text-white" />
                            </div>
                            {isPlaying && (
                                <motion.div
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 bg-blue-500 rounded-full"
                                />
                            )}
                        </div>
                        <div className="text-left pr-2">
                            <div className="text-[9px] text-zinc-500 uppercase font-black tracking-widest leading-none">Focus On</div>
                            <div className="text-xs font-bold leading-tight group-hover:text-blue-400 transition-colors">Digital Atelier</div>
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            <audio
                ref={audioRef}
                src={currentTrack.url}
                loop
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
        </div>
    );
};

const X = ({ size, className }: { size: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export default FocusPlayerWidget;
