'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PageCover } from "@/components/general";
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Volume2, VolumeX, Trophy, RotateCcw, HelpCircle, X, Zap, Keyboard, MousePointer } from 'lucide-react';
import Link from 'next/link';

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

    const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'square') => {
        if (!soundEnabled) return;
        try {
            const ctx = getContext();
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            oscillator.type = type;
            oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
            gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + duration);
        } catch { /* ignore audio errors */ }
    }, [soundEnabled, getContext]);

    const playJump = useCallback(() => {
        playTone(520, 0.15, 'sine');
        setTimeout(() => playTone(780, 0.1, 'sine'), 50);
    }, [playTone]);

    const playScore = useCallback(() => {
        playTone(660, 0.1, 'square');
        setTimeout(() => playTone(880, 0.15, 'square'), 80);
    }, [playTone]);

    const playHit = useCallback(() => {
        playTone(150, 0.3, 'sawtooth');
        setTimeout(() => playTone(100, 0.4, 'sawtooth'), 100);
    }, [playTone]);

    const playStart = useCallback(() => {
        [440, 554, 659, 880].forEach((f, i) => {
            setTimeout(() => playTone(f, 0.15, 'square'), i * 100);
        });
    }, [playTone]);

    return { soundEnabled, setSoundEnabled, playJump, playScore, playHit, playStart };
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
                        <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                            <Zap className="w-6 h-6 text-blue-500" />
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-tight">How to Play</h3>
                    </div>

                    <div className="space-y-6">
                        {/* Step 1 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-black text-sm">1</div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Launch the Mission</h4>
                                <p className="text-gray-400 text-sm font-light leading-relaxed">Click &quot;Start Mission&quot; to begin. Your cyber runner will start moving through the data stream.</p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-black text-sm">2</div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Jump Over Obstacles</h4>
                                <p className="text-gray-400 text-sm font-light leading-relaxed">Tap anywhere on the game area, press <kbd className="px-2 py-0.5 bg-white/10 rounded text-xs text-white font-mono">Space</kbd>, or press <kbd className="px-2 py-0.5 bg-white/10 rounded text-xs text-white font-mono">↑</kbd> to jump over incoming obstacles.</p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-black text-sm">3</div>
                            <div>
                                <h4 className="text-white font-bold mb-1">Survive &amp; Score</h4>
                                <p className="text-gray-400 text-sm font-light leading-relaxed">Every obstacle cleared earns you data points. Obstacles get faster over time. How long can you survive?</p>
                            </div>
                        </div>
                    </div>

                    {/* Controls Reference */}
                    <div className="mt-8 p-4 bg-white/[0.03] rounded-2xl border border-white/5">
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3">Controls</p>
                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <MousePointer className="w-4 h-4 text-blue-400" /> <span>Tap / Click</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <Keyboard className="w-4 h-4 text-blue-400" /> <span>Space / Arrow Up</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full mt-8 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 rounded-full font-bold transition-all text-sm uppercase tracking-widest"
                    >
                        Got it, let&apos;s go!
                    </button>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

// ─── Main Game Component ───────────────────────────────
export default function CyberDashPage() {
    const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameOver'>('idle');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [showWizard, setShowWizard] = useState(false);
    const [obstacleSpeed, setObstacleSpeed] = useState(2);
    const jumpTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const scoreIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const gameAreaRef = useRef<HTMLDivElement>(null);

    const { soundEnabled, setSoundEnabled, playJump, playScore, playHit, playStart } = useSoundEngine();

    // Load high score from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('cyberDash_highScore');
        if (saved) setHighScore(parseInt(saved));
    }, []);

    const startGame = useCallback(() => {
        setGameState('playing');
        setScore(0);
        setObstacleSpeed(2);
        playStart();

        // Progressive score counter
        if (scoreIntervalRef.current) clearInterval(scoreIntervalRef.current);
        scoreIntervalRef.current = setInterval(() => {
            setScore(s => {
                const newScore = s + 1;
                // Increase speed every 50 points
                if (newScore % 50 === 0) {
                    setObstacleSpeed(spd => Math.max(0.6, spd - 0.2));
                    playScore();
                }
                return newScore;
            });
        }, 100);
    }, [playStart, playScore]);

    const endGame = useCallback(() => {
        setGameState('gameOver');
        playHit();
        if (scoreIntervalRef.current) clearInterval(scoreIntervalRef.current);
        setHighScore(prev => {
            const newHigh = Math.max(prev, score);
            localStorage.setItem('cyberDash_highScore', newHigh.toString());
            return newHigh;
        });
    }, [score, playHit]);

    const jump = useCallback(() => {
        if (isJumping || gameState !== 'playing') return;
        setIsJumping(true);
        playJump();
        if (jumpTimeoutRef.current) clearTimeout(jumpTimeoutRef.current);
        jumpTimeoutRef.current = setTimeout(() => setIsJumping(false), 550);
    }, [isJumping, gameState, playJump]);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                e.preventDefault();
                if (gameState === 'playing') jump();
                else if (gameState === 'idle' || gameState === 'gameOver') startGame();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState, jump, startGame]);

    // Cleanup
    useEffect(() => {
        return () => {
            if (scoreIntervalRef.current) clearInterval(scoreIntervalRef.current);
            if (jumpTimeoutRef.current) clearTimeout(jumpTimeoutRef.current);
        };
    }, []);

    return (
        <PageCover showHeader={true}>
            <div className="min-h-screen bg-black pt-28 pb-20 px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
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
                                    ? <Volume2 className="w-4 h-4 text-blue-400" />
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
                            Cyber <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Dash</span>
                        </h1>
                        <p className="text-gray-500 text-sm mt-3 font-light">Reflex Optimization Protocol v1.0</p>
                    </motion.div>

                    {/* Score Bar */}
                    <div className="flex items-center justify-between mb-6 p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                        <div className="flex items-center gap-6">
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Score</p>
                                <p className="text-3xl font-black text-white tabular-nums">{score}</p>
                            </div>
                            <div className="w-px h-10 bg-white/10" />
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Best</p>
                                <p className="text-3xl font-black text-yellow-500 tabular-nums">{highScore}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Speed</p>
                            <p className="text-lg font-black text-blue-400">{((2 / obstacleSpeed) * 100).toFixed(0)}%</p>
                        </div>
                    </div>

                    {/* Game Canvas */}
                    <div
                        ref={gameAreaRef}
                        className="relative w-full h-[350px] md:h-[420px] bg-slate-950 border-2 border-white/10 rounded-[28px] overflow-hidden cursor-pointer select-none focus:outline-none"
                        onClick={gameState === 'playing' ? jump : undefined}
                        tabIndex={0}
                    >
                        {/* Animated Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,41,59,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,41,59,0.5)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />

                        {/* Scanline effect */}
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)] pointer-events-none z-[5]" />

                        {/* Stars / particles */}
                        {gameState === 'playing' && (
                            <>
                                {[...Array(12)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-[2px] h-[2px] bg-white/30 rounded-full"
                                        style={{ top: `${10 + Math.random() * 70}%` }}
                                        initial={{ x: '100%' }}
                                        animate={{ x: '-10%' }}
                                        transition={{ duration: 1.5 + Math.random() * 2, repeat: Infinity, ease: 'linear', delay: Math.random() * 2 }}
                                    />
                                ))}
                            </>
                        )}

                        {/* ── Idle Screen ── */}
                        <AnimatePresence>
                            {gameState === 'idle' && (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm z-30"
                                >
                                    <motion.div
                                        animate={{ y: [0, -8, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                    >
                                        <Zap className="w-20 h-20 text-blue-500 mb-6" />
                                    </motion.div>
                                    <h3 className="text-3xl md:text-4xl font-black mb-2 uppercase tracking-tight">Cyber Dash</h3>
                                    <p className="text-gray-400 mb-8 text-sm">Tap to jump. Survive the data stream.</p>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); startGame(); }}
                                        className="px-10 py-3.5 bg-blue-600 hover:bg-blue-500 rounded-full font-bold transition-all transform hover:scale-105 uppercase tracking-widest text-sm"
                                    >
                                        Start Mission
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* ── Game Over Screen ── */}
                        <AnimatePresence>
                            {gameState === 'gameOver' && (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center bg-red-950/80 backdrop-blur-xl z-30"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                                        transition={{ type: 'spring', damping: 12 }}
                                    >
                                        <Trophy className="w-16 h-16 text-yellow-500 mb-4" />
                                    </motion.div>
                                    <h3 className="text-4xl font-black mb-1 uppercase tracking-tighter">System Crash</h3>
                                    <p className="text-gray-300 text-xl mb-2">Score: <span className="font-black text-white">{score}</span></p>
                                    {score >= highScore && score > 0 && (
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-4"
                                        >
                                            🏆 New High Score!
                                        </motion.p>
                                    )}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); startGame(); }}
                                        className="flex items-center gap-2 px-10 py-3.5 bg-white text-black rounded-full font-bold transition-all hover:scale-105 uppercase tracking-widest text-sm mt-4"
                                    >
                                        <RotateCcw className="w-4 h-4" /> Reboot
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* ── Character ── */}
                        <motion.div
                            animate={{
                                y: isJumping ? -130 : 0,
                                rotate: isJumping ? 360 : 0,
                                scale: isJumping ? 1.1 : 1,
                            }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="absolute bottom-12 left-16 md:left-24 w-10 h-10 md:w-12 md:h-12 bg-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.8)] rounded-lg z-10 border-2 border-blue-300 flex items-center justify-center"
                        >
                            <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </motion.div>

                        {/* ── Ground ── */}
                        <div className="absolute bottom-0 w-full h-12 bg-slate-900 border-t-2 border-blue-500/20">
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:20px_100%]" />
                        </div>

                        {/* ── Obstacles ── */}
                        {gameState === 'playing' && (
                            <>
                                <motion.div
                                    initial={{ x: '100vw' }}
                                    animate={{ x: '-80px' }}
                                    transition={{ duration: obstacleSpeed, repeat: Infinity, ease: 'linear' }}
                                    onAnimationComplete={() => {
                                        // Each complete pass without collision: survived
                                    }}
                                    className="absolute bottom-12 w-6 h-10 md:w-8 md:h-12 bg-pink-600 rounded-md shadow-[0_0_20px_rgba(236,72,153,0.6)] border-2 border-pink-300 z-[6]"
                                />
                                <motion.div
                                    initial={{ x: '100vw' }}
                                    animate={{ x: '-80px' }}
                                    transition={{ duration: obstacleSpeed * 1.5, repeat: Infinity, ease: 'linear', delay: obstacleSpeed * 0.6 }}
                                    className="absolute bottom-12 w-5 h-8 md:w-7 md:h-10 bg-red-500 rounded-md shadow-[0_0_15px_rgba(239,68,68,0.5)] border-2 border-red-300 z-[6]"
                                />
                            </>
                        )}
                    </div>

                    {/* Hint */}
                    <p className="text-center text-gray-600 text-xs mt-4 font-light">
                        Press <kbd className="px-1.5 py-0.5 bg-white/5 rounded text-gray-400 font-mono text-[10px]">Space</kbd> or tap the game area to jump
                    </p>
                </div>
            </div>

            <WizardModal isOpen={showWizard} onClose={() => setShowWizard(false)} />
        </PageCover>
    );
}
