'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PageCover } from "@/components/general";
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Volume2, VolumeX, Trophy, RotateCcw, HelpCircle, X, Zap, Keyboard, MousePointer, Music, Pause, Play, Heart, Settings, Shield, ZapOff, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useBackgroundMusic } from '@/components/general/useBackgroundMusic';

// ─── Constants ─────────────────────────────────────────
const GROUND_Y = 400;
const PLAYER_X = 80;
const PLAYER_SIZE = 40;
const INITIAL_SPEED = 5;
const GRAVITY = 0.8;
const JUMP_FORCE = -15;

const SFX_URLS = {
    jump: 'https://cdn.pixabay.com/audio/2026/01/08/audio_ed0e6af05c.mp3',
    crash: 'https://cdn.pixabay.com/audio/2025/07/18/audio_3c549ff337.mp3',
    collect: 'https://cdn.pixabay.com/audio/2021/08/04/audio_c89b88f349.mp3',
};

// ─── Game Engine ───────────────────────────────────────
export default function CyberDashPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameOver' | 'paused'>('idle');
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [highScore, setHighScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [showSettings, setShowSettings] = useState(false);
    const [showWizard, setShowWizard] = useState(false);

    // Audio Hooks
    const { bgmEnabled, setBgmEnabled, track, setTrack, volume, setVolume } = useBackgroundMusic('cyber');
    const [soundEnabled, setSoundEnabled] = useState(true);

    // Refs for Game Loop
    const requestRef = useRef<number | null>(null);
    const posRef = useRef({
        playerY: GROUND_Y - PLAYER_SIZE,
        playerVY: 0,
        isJumping: false,
        obstacles: [] as any[],
        particles: [] as any[],
        powerups: [] as any[],
        speed: INITIAL_SPEED,
        distance: 0,
        shakeFrames: 0,
        shieldActive: false,
        slowMoActive: 0,
        jumpCount: 0,
    });

    const sfxRef = useRef<{ [key: string]: HTMLAudioElement }>({});

    // ─── Initialization ─────────────────────────────────
    useEffect(() => {
        Object.entries(SFX_URLS).forEach(([key, url]) => {
            sfxRef.current[key] = new Audio(url);
        });

        const savedHighScore = localStorage.getItem('cyberDash_highScore');
        if (savedHighScore) setHighScore(parseInt(savedHighScore));

        const savedLives = localStorage.getItem('cyberDash_lives');
        const lastReset = localStorage.getItem('cyberDash_lastReset');

        if (savedLives !== null) {
            const currentLives = parseInt(savedLives);
            if (currentLives < 3 && lastReset) {
                const elapsed = Date.now() - parseInt(lastReset);
                const fiveMinutes = 5 * 60 * 1000;
                if (elapsed >= fiveMinutes) {
                    setLives(3);
                    localStorage.setItem('cyberDash_lives', '3');
                } else {
                    setLives(currentLives);
                    const remaining = Math.ceil((fiveMinutes - elapsed) / 1000);
                    if (remaining > 0) setTimeLeft(remaining);
                }
            } else {
                setLives(currentLives);
            }
        }
    }, []);

    useEffect(() => {
        if (timeLeft === null || timeLeft <= 0) {
            if (timeLeft === 0) {
                setLives(3);
                localStorage.setItem('cyberDash_lives', '3');
                setTimeLeft(null);
            }
            return;
        }
        const timer = setInterval(() => setTimeLeft(t => (t && t > 0 ? t - 1 : 0)), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const playSFX = useCallback((key: keyof typeof SFX_URLS) => {
        if (!soundEnabled) return;
        const audio = sfxRef.current[key];
        if (audio) {
            audio.currentTime = 0;
            audio.volume = 0.5;
            audio.play().catch(() => { });
        }
    }, [soundEnabled]);

    // ─── Game Loop ──────────────────────────────────────
    const update = useCallback((time: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const state = posRef.current;
        const speedMult = state.slowMoActive > 0 ? 0.5 : 1;
        const currentSpeed = state.speed * speedMult;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (state.shakeFrames > 0) {
            ctx.save();
            ctx.translate(Math.random() * 10 - 5, Math.random() * 10 - 5);
            state.shakeFrames--;
        }

        // Draw Background
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += 40) {
            const x = (i - (state.distance % 40));
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let i = 0; i < canvas.height; i += 40) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }

        if (gameState === 'playing') {
            state.distance += currentSpeed;
            if (time % 10 === 0) {
                setScore(s => {
                    const newScore = s + 1;
                    if (newScore > 0 && newScore % 1000 === 0) {
                        setLevel(l => l + 1);
                        state.speed += 0.5;
                        state.shakeFrames = 15;
                    }
                    return newScore;
                });
            }

            state.playerVY += GRAVITY * speedMult;
            state.playerY += state.playerVY * speedMult;

            if (state.playerY > GROUND_Y - PLAYER_SIZE) {
                state.playerY = GROUND_Y - PLAYER_SIZE;
                state.playerVY = 0;
                state.isJumping = false;
                state.jumpCount = 0;
            }

            if (state.distance % 800 < currentSpeed) {
                const type = Math.random() > 0.7 ? 'tall' : 'wide';
                state.obstacles.push({
                    x: canvas.width,
                    y: type === 'tall' ? GROUND_Y - 60 : GROUND_Y - 30,
                    w: type === 'tall' ? 30 : 60,
                    h: type === 'tall' ? 60 : 30,
                    type
                });
            }

            if (state.distance % 2500 < currentSpeed) {
                state.powerups.push({
                    x: canvas.width,
                    y: GROUND_Y - 100 - Math.random() * 100,
                    type: Math.random() > 0.5 ? 'shield' : 'slowmo'
                });
            }

            ctx.fillStyle = '#db2777';
            for (let i = state.obstacles.length - 1; i >= 0; i--) {
                const o = state.obstacles[i];
                o.x -= currentSpeed;
                const px = PLAYER_X + 5;
                const py = state.playerY + 5;
                const pw = PLAYER_SIZE - 10;
                const ph = PLAYER_SIZE - 10;

                if (px < o.x + o.w && px + pw > o.x && py < o.y + o.h && py + ph > o.y) {
                    if (state.shieldActive) {
                        state.shieldActive = false;
                        state.obstacles.splice(i, 1);
                        state.shakeFrames = 10;
                        continue;
                    }
                    setGameState('gameOver');
                    playSFX('crash');
                    state.shakeFrames = 20;
                    const newLives = Math.max(0, lives - 1);
                    setLives(newLives);
                    localStorage.setItem('cyberDash_lives', newLives.toString());
                    if (newLives === 0) {
                        localStorage.setItem('cyberDash_lastReset', Date.now().toString());
                        setTimeLeft(5 * 60);
                    }
                }
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#db2777';
                ctx.fillRect(o.x, o.y, o.w, o.h);
                ctx.shadowBlur = 0;
                if (o.x < -100) state.obstacles.splice(i, 1);
            }

            for (let i = state.powerups.length - 1; i >= 0; i--) {
                const p = state.powerups[i];
                p.x -= currentSpeed;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 15, 0, Math.PI * 2);
                ctx.fillStyle = p.type === 'shield' ? '#22d3ee' : '#facc15';
                ctx.shadowBlur = 10;
                ctx.shadowColor = ctx.fillStyle;
                ctx.fill();
                ctx.shadowBlur = 0;
                const dist = Math.hypot(PLAYER_X + PLAYER_SIZE / 2 - p.x, state.playerY + PLAYER_SIZE / 2 - p.y);
                if (dist < 30) {
                    playSFX('collect');
                    if (p.type === 'shield') state.shieldActive = true;
                    if (p.type === 'slowmo') state.slowMoActive = 300;
                    state.powerups.splice(i, 1);
                }
                if (p.x < -100) state.powerups.splice(i, 1);
            }
            if (state.slowMoActive > 0) state.slowMoActive--;
            state.speed = INITIAL_SPEED + (state.distance / 5000);
        }

        if (gameState === 'playing' && !state.isJumping) {
            if (Math.random() > 0.8) {
                state.particles.push({ x: PLAYER_X, y: GROUND_Y, vx: -Math.random() * 2, vy: -Math.random() * 2, life: 20 });
            }
        }
        for (let i = state.particles.length - 1; i >= 0; i--) {
            const p = state.particles[i];
            p.x += p.vx; p.y += p.vy; p.life--;
            ctx.fillStyle = `rgba(59, 130, 246, ${p.life / 20})`;
            ctx.fillRect(p.x, p.y, 2, 2);
            if (p.life <= 0) state.particles.splice(i, 1);
        }

        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, GROUND_Y, canvas.width, canvas.height - GROUND_Y);
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(0, GROUND_Y); ctx.lineTo(canvas.width, GROUND_Y); ctx.stroke();

        // Draw Player
        ctx.save();
        ctx.translate(PLAYER_X + PLAYER_SIZE / 2, state.playerY + PLAYER_SIZE / 2);

        // Flip Animation: Rotate 360 degrees when jumping
        if (state.isJumping) {
            // Speed of rotation tied to distance/time to ensure a smooth flip
            ctx.rotate(state.distance / 12);
        }

        // Draw Bicycle Character
        ctx.shadowBlur = state.shieldActive ? 30 : 15;
        ctx.shadowColor = state.shieldActive ? '#22d3ee' : '#3b82f6';

        // Wheels (Neon Blue)
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        // Back Wheel
        ctx.beginPath(); ctx.arc(-14, 10, 8, 0, Math.PI * 2); ctx.stroke();
        // Front Wheel
        ctx.beginPath(); ctx.arc(14, 10, 8, 0, Math.PI * 2); ctx.stroke();

        // Frame (White/Neon)
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-14, 10); // Back hub
        ctx.lineTo(-2, -5);   // Seat
        ctx.lineTo(14, 10);  // Front hub
        ctx.lineTo(8, -8);   // Handlebars
        ctx.stroke();

        // Rider (Stylized Boy)
        ctx.fillStyle = '#3b82f6';
        // Body (Torso)
        ctx.beginPath();
        ctx.ellipse(-2, -12, 10, 5, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
        // Head
        ctx.beginPath();
        ctx.arc(4, -22, 6, 0, Math.PI * 2);
        ctx.fill();

        // Shield Bubble
        if (state.shieldActive) {
            ctx.strokeStyle = '#22d3ee';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, PLAYER_SIZE * 0.9, 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.restore();
        if (state.shakeFrames > 0) ctx.restore();
        requestRef.current = requestAnimationFrame(update);
    }, [gameState, lives, playSFX]);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(update);
        return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
    }, [update]);

    const startGame = useCallback(() => {
        if (lives <= 0) return;
        posRef.current = {
            playerY: GROUND_Y - PLAYER_SIZE, playerVY: 0, isJumping: false, obstacles: [], particles: [], powerups: [],
            speed: INITIAL_SPEED, distance: 0, shakeFrames: 0, shieldActive: false, slowMoActive: 0, jumpCount: 0,
        };
        setScore(0); setLevel(1); setGameState('playing'); setBgmEnabled(true);
    }, [lives, setBgmEnabled]);

    const jump = useCallback(() => {
        const state = posRef.current;
        if (state.jumpCount >= 2 || gameState !== 'playing') return;
        state.isJumping = true; state.jumpCount++; state.playerVY = JUMP_FORCE; playSFX('jump');
        for (let i = 0; i < 10; i++) {
            state.particles.push({ x: PLAYER_X + PLAYER_SIZE / 2, y: GROUND_Y, vx: (Math.random() - 0.5) * 5, vy: (Math.random() - 0.5) * 5, life: 30 });
        }
    }, [gameState, playSFX]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                e.preventDefault();
                if (gameState === 'playing') jump();
                else if (gameState === 'idle' || gameState === 'gameOver') startGame();
            }
            if (e.code === 'KeyP' || e.code === 'Escape') {
                e.preventDefault();
                setGameState(prev => (prev === 'playing' ? 'paused' : prev === 'paused' ? 'playing' : prev));
            }
        };

        if (gameState === 'playing' || gameState === 'paused') {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
            document.body.style.position = 'static';
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
            document.body.style.position = 'static';
        };
    }, [gameState, jump, startGame]);

    const formatTime = (s: number) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <PageCover showHeader={false} showFooter={false}>
            <div className={`min-h-screen bg-black overflow-hidden transition-all duration-700 ${(gameState === 'playing' || gameState === 'paused') ? 'pt-0' : 'pt-16 md:pt-28 pb-10 md:pb-20 px-4 md:px-6'}`}>
                <div className={`transition-all duration-700 ${(gameState === 'playing' || gameState === 'paused') ? 'fixed inset-0 z-[100] bg-black overflow-hidden' : 'max-w-4xl mx-auto'}`}>

                    <AnimatePresence>
                        {(gameState !== 'playing' && gameState !== 'paused') && (
                            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex items-center justify-between mb-8 px-2 relative">
                                <div className="absolute left-1/2 -translate-x-1/2 top-4 md:top-6 z-10">
                                    <Link href="/">
                                        <svg className="fill-white w-12 md:w-24 h-auto" viewBox="0 0 1654 332" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1256 76.6406L1009.24 330.75H1204.54L1123 249.052L1178.58 192L1317 331H1207V331.25H1009V0H1185.12L1256 76.6406ZM539.41 329H453.072L452.939 328.75H346.277L346.41 329H279.338L279.471 328.75H193.133L193 329H0L173.205 2L269.705 184.186L193.397 328.25H279.735L312.873 265.686L346.013 328.25H452.675L366.205 165L312.873 265.686L269.705 184.186L366.205 2L539.41 329ZM947.41 329H601L774.205 2L947.41 329ZM1456 149.113L1554 2.58984H1654L1518.21 195.244L1650 327.59H1537.79L1471.64 261.309L1456 283.495V328.34H1641V328.84H1456V329H1378V2H1456V149.113ZM682.406 328.25H866.004L774.205 155L682.406 328.25ZM831.157 298.5H716.843L774 195L831.157 298.5ZM1097 160.5L1171 87L1133.5 47H1097V160.5Z" />
                                        </svg>
                                    </Link>
                                </div>
                                <Link href="/games" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                                    <ChevronLeft className="w-4 h-4" /> <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-blue-500">Back</span>
                                </Link>
                                <div className="flex items-center gap-2 md:gap-3">
                                    <div className="flex items-center gap-1 bg-white/5 px-2 md:px-3 py-1 rounded-full border border-white/10">
                                        {[...Array(3)].map((_, i) => <Heart key={i} className={`w-3.5 h-3.5 md:w-4 md:h-4 ${i < lives ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />)}
                                    </div>
                                    <button onClick={() => setShowSettings(!showSettings)} className="p-2 md:p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white"><Settings className="w-4 h-4" /></button>
                                    <button onClick={() => setShowWizard(true)} className="p-2 md:p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white"><HelpCircle className="w-4 h-4" /></button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {(gameState !== 'playing' && gameState !== 'paused') && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-8 px-4">
                                <h1 className="text-4xl md:text-8xl font-black text-white uppercase italic leading-none">Cyber <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Dash</span></h1>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-blue-500/60 text-[8px] md:text-[10px] font-black uppercase tracking-widest">Neural Link Established</p>
                                    <div className="text-right flex gap-4 md:gap-6">
                                        <div className="hidden xs:block"><p className="text-gray-500 text-[8px] md:text-[10px] font-black uppercase">Level</p><p className="text-xl md:text-2xl font-black text-blue-400">{level}</p></div>
                                        <div><p className="text-gray-500 text-[8px] md:text-[10px] font-black uppercase">Max Signal</p><p className="text-xl md:text-2xl font-black text-white">{highScore}</p></div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {(gameState !== 'playing' && gameState !== 'paused') && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 px-4">
                                <div className="p-4 bg-white/[0.02] rounded-3xl border border-white/5"><p className="text-[8px] md:text-[10px] uppercase text-gray-500 font-bold mb-1">Score</p><p className="text-2xl md:text-4xl font-black text-white tabular-nums">{score}</p></div>
                                <div className="p-4 bg-white/[0.02] rounded-3xl border border-white/5"><p className="text-[8px] md:text-[10px] uppercase text-gray-500 font-bold mb-1">Status</p><div className="flex items-center gap-2">{posRef.current.shieldActive ? <Shield className="w-4 h-4 text-cyan-400" /> : <ZapOff className="w-4 h-4 text-gray-600" />}<span className="font-black text-gray-400 uppercase text-xs md:text-base">{posRef.current.shieldActive ? 'Shielded' : 'Vulnerable'}</span></div></div>
                                <div className="p-4 bg-white/[0.02] rounded-3xl border border-white/5"><p className="text-[8px] md:text-[10px] uppercase text-gray-500 font-bold mb-1">Velocity</p><p className="text-base md:text-lg font-black text-blue-400">{((posRef.current.speed) * 20).toFixed(0)} km/h</p></div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div
                        className={`relative w-full overflow-hidden cursor-crosshair group transition-all duration-700 touch-none flex items-center justify-center bg-black
                            ${(gameState === 'playing' || gameState === 'paused') ? 'fixed inset-0 z-[100] h-screen w-screen rounded-none' : 'aspect-[16/9] rounded-[40px] border-2 border-white/10'}`}
                        onClick={gameState === 'playing' ? jump : undefined}
                        onTouchStart={(e) => {
                            if (gameState === 'playing') {
                                e.preventDefault();
                                jump();
                            }
                        }}
                    >
                        <canvas ref={canvasRef} width={800} height={450} className="max-w-full max-h-full object-contain" />

                        {(gameState === 'playing' || gameState === 'paused') && (
                            <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none z-50">
                                <div className="bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex items-center gap-4">
                                    <div><p className="text-[8px] font-black text-blue-500 uppercase">Lvl {level}</p><p className="text-xl font-black text-white">{score}</p></div>
                                    <div className="flex gap-1">{[...Array(3)].map((_, i) => <Heart key={i} className={`w-3 h-3 ${i < lives ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />)}</div>
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); setGameState(prev => prev === 'playing' ? 'paused' : 'playing'); }} className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white pointer-events-auto">
                                    {gameState === 'playing' ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                                </button>
                            </div>
                        )}

                        <AnimatePresence>
                            {gameState === 'idle' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-30 px-6">
                                    <Zap className="w-16 h-16 md:w-20 md:h-20 text-blue-500 mb-6" />
                                    <h3 className="text-2xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-8 text-center">Ready to <span className="text-blue-500">Sync?</span></h3>
                                    <button onClick={(e) => { e.stopPropagation(); startGame(); }} className="px-10 py-4 bg-blue-600 text-white rounded-full font-black text-sm md:text-lg uppercase tracking-widest hover:scale-110 transition-transform">Initiate Link</button>
                                </motion.div>
                            )}
                            {gameState === 'gameOver' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center bg-red-950/90 backdrop-blur-xl z-30 px-6 text-center">
                                    <Trophy className="w-16 h-16 text-yellow-500 mb-4" />
                                    <h3 className="text-3xl md:text-5xl font-black text-white uppercase italic">Signal Lost</h3>
                                    <p className="text-red-400 font-bold mb-8 uppercase tracking-widest">Data Recovered: {score}</p>
                                    <button onClick={(e) => { e.stopPropagation(); if (lives > 0) startGame(); }} disabled={lives <= 0} className={`px-10 py-4 rounded-full font-black uppercase tracking-widest transition-transform ${lives > 0 ? 'bg-white text-black hover:scale-110' : 'bg-gray-800 text-gray-500'}`}>{lives > 0 ? 'Retry Sync' : 'Recharging'}</button>
                                    {lives <= 0 && timeLeft && <div className="mt-8"><p className="text-3xl font-mono text-white">{formatTime(timeLeft)}</p><p className="text-[10px] text-gray-500 uppercase font-black uppercase">Neural Repair in Progress</p></div>}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="mt-8 flex justify-center gap-6 opacity-40">
                        <div className="flex items-center gap-2"><div className="w-2 h-2 bg-cyan-400 rounded-full" /><span className="text-[8px] font-black text-white uppercase">Shield</span></div>
                        <div className="flex items-center gap-2"><div className="w-2 h-2 bg-yellow-400 rounded-full" /><span className="text-[8px] font-black text-white uppercase">Buffer</span></div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showSettings && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-xl px-6" onClick={() => setShowSettings(false)}>
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-slate-900 border border-white/10 rounded-[32px] p-8 max-w-sm w-full" onClick={e => e.stopPropagation()}>
                            <h3 className="text-2xl font-black text-white uppercase italic mb-6">Settings</h3>
                            <div className="space-y-6">
                                <div><label className="text-[10px] uppercase text-gray-500 font-black mb-3 block">Neural Audio</label><div className="flex gap-2">{[1, 2, 3].map(t => <button key={t} onClick={() => setTrack(t as 1 | 2 | 3)} className={`flex-1 py-3 rounded-xl border transition-all ${track === t ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-gray-400'}`}>{t}</button>)}</div></div>
                                <div><div className="flex justify-between mb-2"><label className="text-[10px] uppercase text-gray-500 font-black">Volume</label><span className="text-blue-400 font-mono">{(volume * 100).toFixed(0)}%</span></div><input type="range" min="0" max="1" step="0.01" value={volume} onChange={e => setVolume(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-lg appearance-none accent-blue-600" /></div>
                                <div className="flex gap-3"><button onClick={() => setSoundEnabled(!soundEnabled)} className="flex-1 py-3 rounded-xl bg-white/5 text-[10px] font-black uppercase text-gray-400">{soundEnabled ? 'SFX ON' : 'SFX OFF'}</button><button onClick={() => setBgmEnabled(!bgmEnabled)} className="flex-1 py-3 rounded-xl bg-white/5 text-[10px] font-black uppercase text-gray-400">{bgmEnabled ? 'BGM ON' : 'BGM OFF'}</button></div>
                            </div>
                            <button onClick={() => setShowSettings(false)} className="w-full mt-8 py-4 bg-white text-black rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform">Apply</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <WizardModal isOpen={showWizard} onClose={() => setShowWizard(false)} />
        </PageCover>
    );
}

const WizardModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-3xl px-6" onClick={onClose}>
                <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-slate-900 border border-white/10 rounded-[40px] p-8 md:p-12 max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
                    <h3 className="text-3xl font-black text-white uppercase italic mb-8">How to Dash</h3>
                    <div className="space-y-6">
                        <div className="flex gap-4"><div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black">1</div><p className="text-gray-400 text-sm leading-relaxed"><span className="text-white font-bold">Space / Tap</span> to jump. Timing is critical.</p></div>
                        <div className="flex gap-4"><div className="w-10 h-10 rounded-2xl bg-cyan-500 flex items-center justify-center text-white font-black">2</div><p className="text-gray-400 text-sm leading-relaxed">Collect <span className="text-cyan-400 font-bold">Shields</span> to survive one firewall impact.</p></div>
                        <div className="flex gap-4"><div className="w-10 h-10 rounded-2xl bg-yellow-500 flex items-center justify-center text-white font-black">3</div><p className="text-gray-400 text-sm leading-relaxed">Collect <span className="text-yellow-400 font-bold">Time Buffers</span> to stabilize your velocity.</p></div>
                    </div>
                    <button onClick={onClose} className="w-full mt-10 py-5 bg-blue-600 rounded-full text-white font-black uppercase tracking-widest hover:scale-105 transition-transform">Initiate Link</button>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);
