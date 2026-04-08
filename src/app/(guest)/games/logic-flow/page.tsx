'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PageCover } from "@/components/general";
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Volume2, VolumeX, Trophy, RotateCcw, HelpCircle, X, BrainCircuit, Keyboard, MousePointer } from 'lucide-react';
import Link from 'next/link';

const NODE_COLORS = [
    { bg: 'bg-blue-500', glow: 'shadow-[0_0_40px_rgba(59,130,246,0.6)]', border: 'border-blue-300', label: 'Alpha' },
    { bg: 'bg-green-500', glow: 'shadow-[0_0_40px_rgba(34,197,94,0.6)]', border: 'border-green-300', label: 'Beta' },
    { bg: 'bg-yellow-500', glow: 'shadow-[0_0_40px_rgba(234,179,8,0.6)]', border: 'border-yellow-300', label: 'Gamma' },
    { bg: 'bg-pink-500', glow: 'shadow-[0_0_40px_rgba(236,72,153,0.6)]', border: 'border-pink-300', label: 'Delta' },
];

const NODE_FREQUENCIES = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5

// ─── Sound Engine ──────────────────────────────────────
const useSoundEngine = () => {
    const audioContextRef = useRef<AudioContext | null>(null);
    const [soundEnabled, setSoundEnabled] = useState(true);

    const getContext = useCallback(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        }
        return audioContextRef.current;
    }, []);

    const playTone = useCallback((frequency: number, duration: number = 0.25) => {
        if (!soundEnabled) return;
        try {
            const ctx = getContext();
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
            gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + duration);
        } catch { /* ignore */ }
    }, [soundEnabled, getContext]);

    const playNode = useCallback((nodeIndex: number) => {
        playTone(NODE_FREQUENCIES[nodeIndex], 0.3);
    }, [playTone]);

    const playSuccess = useCallback(() => {
        [523, 659, 784].forEach((f, i) => {
            setTimeout(() => playTone(f, 0.15), i * 100);
        });
    }, [playTone]);

    const playFail = useCallback(() => {
        playTone(200, 0.4);
        setTimeout(() => playTone(150, 0.5), 150);
    }, [playTone]);

    const playStart = useCallback(() => {
        NODE_FREQUENCIES.forEach((f, i) => {
            setTimeout(() => playTone(f, 0.2), i * 120);
        });
    }, [playTone]);

    return { soundEnabled, setSoundEnabled, playNode, playSuccess, playFail, playStart };
};

// ─── Wizard / How-To-Play Modal ────────────────────────
const WizardModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl px-6"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 30 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 30 }}
                    transition={{ type: 'spring', damping: 25 }}
                    className="bg-slate-900 border border-white/10 rounded-[32px] p-8 md:p-10 max-w-lg w-full relative shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                        <X className="w-5 h-5 text-gray-400" />
                    </button>

                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20">
                            <BrainCircuit className="w-6 h-6 text-purple-500" />
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-tight">How to Play</h3>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-black text-sm">1</div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Watch the Pattern</h4>
                                <p className="text-gray-400 text-sm font-light leading-relaxed">The system will flash a sequence of colored nodes. Pay close attention to the order.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-black text-sm">2</div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Repeat the Sequence</h4>
                                <p className="text-gray-400 text-sm font-light leading-relaxed">After the system finishes, click the nodes in the exact same order. Each node has a unique color and tone.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-black text-sm">3</div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Level Up</h4>
                                <p className="text-gray-400 text-sm font-light leading-relaxed">Each round adds one more node to the sequence. How deep can your memory stack go?</p>
                            </div>
                        </div>
                    </div>

                    {/* Node Preview */}
                    <div className="mt-8 p-4 bg-white/[0.03] rounded-2xl border border-white/5">
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3">The Four Nodes</p>
                        <div className="grid grid-cols-4 gap-2">
                            {NODE_COLORS.map((n, i) => (
                                <div key={i} className={`h-10 rounded-xl ${n.bg} opacity-60 flex items-center justify-center`}>
                                    <span className="text-white text-[10px] font-bold uppercase tracking-wider">{n.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full mt-8 px-8 py-3.5 bg-purple-600 hover:bg-purple-500 rounded-full font-bold transition-all text-sm uppercase tracking-widest"
                    >
                        Ready to Sync!
                    </button>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

// ─── Main Game Component ───────────────────────────────
export default function LogicFlowPage() {
    const [gameState, setGameState] = useState<'idle' | 'showing' | 'playing' | 'gameOver'>('idle');
    const [sequence, setSequence] = useState<number[]>([]);
    const [userSequence, setUserSequence] = useState<number[]>([]);
    const [activeNode, setActiveNode] = useState<number | null>(null);
    const [level, setLevel] = useState(0);
    const [highLevel, setHighLevel] = useState(0);
    const [showWizard, setShowWizard] = useState(false);
    const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);

    const { soundEnabled, setSoundEnabled, playNode, playSuccess, playFail, playStart } = useSoundEngine();

    useEffect(() => {
        const saved = localStorage.getItem('logicFlow_highLevel');
        if (saved) setHighLevel(parseInt(saved));
    }, []);

    const playSequence = useCallback((seq: number[]) => {
        setGameState('showing');
        setUserSequence([]);
        seq.forEach((node, i) => {
            setTimeout(() => {
                setActiveNode(node);
                playNode(node);
                setTimeout(() => setActiveNode(null), 400);
            }, (i + 1) * 700);
        });
        setTimeout(() => {
            setGameState('playing');
        }, (seq.length + 1) * 700);
    }, [playNode]);

    const startGame = useCallback(() => {
        setLevel(1);
        setLastCorrect(null);
        const first = Math.floor(Math.random() * 4);
        const newSeq = [first];
        setSequence(newSeq);
        playStart();
        setTimeout(() => playSequence(newSeq), 600);
    }, [playStart, playSequence]);

    const handleNodeClick = useCallback((id: number) => {
        if (gameState !== 'playing') return;

        const nextUserSeq = [...userSequence, id];
        setUserSequence(nextUserSeq);
        setActiveNode(id);
        playNode(id);
        setTimeout(() => setActiveNode(null), 200);

        // Wrong answer
        if (id !== sequence[nextUserSeq.length - 1]) {
            setLastCorrect(false);
            playFail();
            setGameState('gameOver');
            setHighLevel(prev => {
                const newHigh = Math.max(prev, level);
                localStorage.setItem('logicFlow_highLevel', newHigh.toString());
                return newHigh;
            });
            return;
        }

        setLastCorrect(true);

        // Completed sequence
        if (nextUserSeq.length === sequence.length) {
            playSuccess();
            const nextLevel = level + 1;
            setLevel(nextLevel);
            const nextNode = Math.floor(Math.random() * 4);
            const nextSeq = [...sequence, nextNode];
            setSequence(nextSeq);
            setTimeout(() => playSequence(nextSeq), 1000);
        }
    }, [gameState, userSequence, sequence, level, playNode, playFail, playSuccess, playSequence]);

    return (
        <PageCover showHeader={true}>
            <div className="min-h-screen bg-black pt-28 pb-20 px-4 md:px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between mb-8">
                        <Link href="/games" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xs font-bold uppercase tracking-widest">Playground</span>
                        </Link>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowWizard(true)}
                                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                                title="How to play"
                            >
                                <HelpCircle className="w-4 h-4 text-gray-400" />
                            </button>
                            <button
                                onClick={() => setSoundEnabled(!soundEnabled)}
                                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                                title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
                            >
                                {soundEnabled
                                    ? <Volume2 className="w-4 h-4 text-purple-400" />
                                    : <VolumeX className="w-4 h-4 text-gray-500" />
                                }
                            </button>
                        </div>
                    </div>

                    {/* Game Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                            Logic <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-400">Flow</span>
                        </h1>
                        <p className="text-gray-500 text-sm mt-3 font-light">Memory Synchronization Engine v2.0</p>
                    </motion.div>

                    {/* Score Bar */}
                    <div className="flex items-center justify-between mb-6 p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                        <div className="flex items-center gap-6">
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Level</p>
                                <p className="text-3xl font-black text-white tabular-nums">{level}</p>
                            </div>
                            <div className="w-px h-10 bg-white/10" />
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Best</p>
                                <p className="text-3xl font-black text-yellow-500 tabular-nums">{highLevel}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Status</p>
                            <p className={`text-sm font-black uppercase tracking-widest ${
                                gameState === 'showing' ? 'text-yellow-400' :
                                gameState === 'playing' ? 'text-green-400' :
                                'text-gray-500'
                            }`}>
                                {gameState === 'showing' ? 'Observe' :
                                 gameState === 'playing' ? 'Your Turn' :
                                 gameState === 'gameOver' ? 'Failed' : 'Ready'}
                            </p>
                        </div>
                    </div>

                    {/* Game Board */}
                    <div className="relative w-full aspect-square max-h-[500px] bg-slate-950 border-2 border-white/10 rounded-[28px] overflow-hidden p-4 md:p-6">
                        {/* Decorative center glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/10 blur-[60px] rounded-full pointer-events-none" />

                        {/* Progress indicator in center */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                            <div className="text-center">
                                <p className="text-[10px] uppercase tracking-widest text-gray-600 font-bold">
                                    {gameState === 'showing' ? 'Memorize' : gameState === 'playing' ? `${userSequence.length} / ${sequence.length}` : ''}
                                </p>
                            </div>
                        </div>

                        {/* 4 Nodes Grid */}
                        <div className="grid grid-cols-2 gap-3 md:gap-4 h-full relative z-[2]">
                            {[0, 1, 2, 3].map(i => {
                                const isActive = activeNode === i;
                                const color = NODE_COLORS[i];
                                return (
                                    <motion.button
                                        key={i}
                                        whileTap={gameState === 'playing' ? { scale: 0.95 } : {}}
                                        onClick={() => handleNodeClick(i)}
                                        disabled={gameState !== 'playing'}
                                        className={`relative rounded-[20px] md:rounded-3xl border-2 transition-all duration-200 ${
                                            isActive
                                                ? `${color.bg} ${color.glow} ${color.border} scale-[1.02]`
                                                : `bg-slate-800/80 border-white/5 ${gameState === 'playing' ? 'hover:border-white/20 hover:bg-slate-700/80 cursor-pointer' : 'cursor-default'}`
                                        }`}
                                    >
                                        {/* Resting color indicator */}
                                        <div className={`absolute inset-2 md:inset-3 rounded-[14px] md:rounded-2xl ${color.bg} transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-10'}`} />
                                        {/* Label */}
                                        <span className={`absolute bottom-3 left-4 text-[10px] font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-white' : 'text-gray-600'}`}>
                                            {color.label}
                                        </span>
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Overlay screens */}
                        <AnimatePresence>
                            {(gameState === 'idle' || gameState === 'gameOver') && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-xl z-30 p-8 text-center"
                                >
                                    {gameState === 'gameOver' ? (
                                        <>
                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }}>
                                                <Trophy className="w-16 h-16 text-yellow-500 mb-4" />
                                            </motion.div>
                                            <h4 className="text-3xl md:text-4xl font-black mb-1 uppercase tracking-tighter">Desync Error</h4>
                                            <p className="text-gray-300 text-lg mb-1">Reached Level <span className="font-black text-white">{level}</span></p>
                                            {level >= highLevel && level > 0 && (
                                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-6">
                                                    🏆 New Record!
                                                </motion.p>
                                            )}
                                            <button
                                                onClick={startGame}
                                                className="flex items-center gap-2 px-10 py-3.5 bg-white text-black rounded-full font-bold transition-all hover:scale-105 uppercase tracking-widest text-sm mt-2"
                                            >
                                                <RotateCcw className="w-4 h-4" /> Retry Sync
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <motion.div
                                                animate={{ rotate: [0, 10, -10, 0] }}
                                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                            >
                                                <BrainCircuit className="w-20 h-20 text-purple-500 mb-6" />
                                            </motion.div>
                                            <h4 className="text-3xl md:text-4xl font-black mb-2 uppercase tracking-tighter">Logic Flow</h4>
                                            <p className="text-gray-400 mb-8 text-sm max-w-xs">Watch the pattern. Repeat the sequence. Expand your memory buffer.</p>
                                            <button
                                                onClick={startGame}
                                                className="px-10 py-3.5 bg-purple-600 hover:bg-purple-500 rounded-full font-bold transition-all transform hover:scale-105 uppercase tracking-widest text-sm"
                                            >
                                                Initiate Sync
                                            </button>
                                        </>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Hint */}
                    <p className="text-center text-gray-600 text-xs mt-4 font-light">
                        Watch the lights, then tap them in the same order
                    </p>
                </div>
            </div>

            <WizardModal isOpen={showWizard} onClose={() => setShowWizard(false)} />
        </PageCover>
    );
}
