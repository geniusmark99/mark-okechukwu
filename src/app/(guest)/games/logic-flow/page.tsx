'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PageCover } from "@/components/general";
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Volume2, Trophy, HelpCircle, X, BrainCircuit, Music, Pause, Play, Heart, Settings } from 'lucide-react';
import Link from 'next/link';
import { useBackgroundMusic } from '@/components/general/useBackgroundMusic';

const NODE_COLORS = [
    { bg: 'bg-blue-500', glow: 'shadow-[0_0_50px_rgba(59,130,246,0.6)]', border: 'border-blue-300', label: 'Alpha' },
    { bg: 'bg-green-500', glow: 'shadow-[0_0_50px_rgba(34,197,94,0.6)]', border: 'border-green-300', label: 'Beta' },
    { bg: 'bg-yellow-500', glow: 'shadow-[0_0_50px_rgba(234,179,8,0.6)]', border: 'border-yellow-300', label: 'Gamma' },
    { bg: 'bg-pink-500', glow: 'shadow-[0_0_50px_rgba(236,72,153,0.6)]', border: 'border-pink-300', label: 'Delta' },
];

const SFX_URLS = {
    node1: 'https://cdn.pixabay.com/audio/2021/08/04/audio_3a9eb5332f.mp3',
    node2: 'https://cdn.pixabay.com/audio/2022/03/15/audio_2c416e001f.mp3',
    node3: 'https://cdn.pixabay.com/audio/2022/03/10/audio_5f71e6e44b.mp3',
    node4: 'https://cdn.pixabay.com/audio/2021/11/25/audio_91b1179579.mp3',
    success: 'https://cdn.pixabay.com/audio/2021/08/04/audio_514df0ed60.mp3',
    fail: 'https://cdn.pixabay.com/audio/2025/07/18/audio_3c549ff337.mp3',
    click: 'https://cdn.pixabay.com/audio/2022/03/15/audio_783abb5b77.mp3',
};

export default function LogicFlowPage() {
    const [gameState, setGameState] = useState<'idle' | 'showing' | 'playing' | 'gameOver' | 'paused'>('idle');
    const [sequence, setSequence] = useState<number[]>([]);
    const [userSequence, setUserSequence] = useState<number[]>([]);
    const [activeNode, setActiveNode] = useState<number | null>(null);
    const [level, setLevel] = useState(0);
    const [highLevel, setHighLevel] = useState(0);
    const [showWizard, setShowWizard] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [lives, setLives] = useState(3);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [soundEnabled, setSoundEnabled] = useState(true);

    const sfxRef = useRef<{ [key: string]: HTMLAudioElement }>({});
    const { bgmEnabled, setBgmEnabled, track, setTrack, volume, setVolume } = useBackgroundMusic('logic');

    useEffect(() => {
        Object.entries(SFX_URLS).forEach(([key, url]) => {
            const audio = new Audio(url);
            audio.preload = 'auto';
            audio.load();
            sfxRef.current[key] = audio;
        });

        const savedHighLevel = localStorage.getItem('logicFlow_highLevel');
        if (savedHighLevel) setHighLevel(parseInt(savedHighLevel));

        const savedLives = localStorage.getItem('logicFlow_lives');
        const lastReset = localStorage.getItem('logicFlow_lastReset');

        if (savedLives !== null) {
            const currentLives = parseInt(savedLives);
            if (currentLives < 3 && lastReset) {
                const elapsed = Date.now() - parseInt(lastReset);
                const fiveMinutes = 5 * 60 * 1000;
                if (elapsed >= fiveMinutes) {
                    setLives(3);
                    localStorage.setItem('logicFlow_lives', '3');
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
                localStorage.setItem('logicFlow_lives', '3');
                setTimeLeft(null);
            }
            return;
        }
        const timer = setInterval(() => setTimeLeft(t => (t && t > 0 ? t - 1 : 0)), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const playSFX = useCallback((key: string) => {
        if (!soundEnabled) return;
        const baseAudio = sfxRef.current[key];
        if (baseAudio) {
            const playInstance = baseAudio.cloneNode() as HTMLAudioElement;
            playInstance.volume = 0.6;
            playInstance.play().catch(() => { });
            playInstance.onended = () => playInstance.remove();
        }
    }, [soundEnabled]);

    const playSequence = useCallback((seq: number[]) => {
        setGameState('showing');
        setUserSequence([]);
        seq.forEach((node, i) => {
            setTimeout(() => {
                setActiveNode(node);
                playSFX(`node${node + 1}`);
                setTimeout(() => setActiveNode(null), 400);
            }, (i + 1) * 700);
        });
        setTimeout(() => setGameState('playing'), (seq.length + 1) * 700);
    }, [playSFX]);

    const startGame = useCallback(() => {
        if (lives <= 0) return;
        setLevel(1);
        const first = Math.floor(Math.random() * 4);
        const newSeq = [first];
        setSequence(newSeq);
        playSFX('click');
        setTimeout(() => playSequence(newSeq), 600);
    }, [lives, playSFX, playSequence]);

    const handleNodeClick = useCallback((id: number) => {
        if (gameState !== 'playing') return;

        const nextUserSeq = [...userSequence, id];
        setUserSequence(nextUserSeq);
        setActiveNode(id);
        playSFX('click');
        playSFX(`node${id + 1}`);
        setTimeout(() => setActiveNode(null), 200);

        if (id !== sequence[nextUserSeq.length - 1]) {
            playSFX('fail');
            setGameState('gameOver');
            const newLives = Math.max(0, lives - 1);
            setLives(newLives);
            localStorage.setItem('logicFlow_lives', newLives.toString());
            if (newLives === 0) {
                localStorage.setItem('logicFlow_lastReset', Date.now().toString());
                setTimeLeft(5 * 60);
            }
            setHighLevel(prev => {
                const newHigh = Math.max(prev, level);
                localStorage.setItem('logicFlow_highLevel', newHigh.toString());
                return newHigh;
            });
            return;
        }

        if (nextUserSeq.length === sequence.length) {
            playSFX('success');
            const nextLevel = level + 1;
            setLevel(nextLevel);
            const nextNode = Math.floor(Math.random() * 4);
            const nextSeq = [...sequence, nextNode];
            setSequence(nextSeq);
            setTimeout(() => playSequence(nextSeq), 1000);
        }
    }, [gameState, userSequence, sequence, level, playSFX, lives, playSequence]);

    useEffect(() => {
        if (gameState !== 'idle' && gameState !== 'gameOver') {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
            document.body.style.position = 'static';
        }
        return () => {
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
            document.body.style.position = 'static';
        };
    }, [gameState]);

    const formatTime = (s: number) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <PageCover showHeader={false} showFooter={false}>
            <div className={`min-h-screen bg-black overflow-hidden transition-all duration-700 ${(gameState !== 'idle' && gameState !== 'gameOver') ? 'pt-0' : ' pb-10 md:pb-20 px-4 md:px-6'}`}>
                <div className={`transition-all duration-700 ${(gameState !== 'idle' && gameState !== 'gameOver') ? 'fixed inset-0 z-[100] bg-black flex items-center justify-center p-4 md:p-8' : 'max-w-3xl mx-auto'}`}>
                    <div className="w-full relative max-w-lg mx-auto">

                        <AnimatePresence>
                            {(gameState === 'idle' || gameState === 'gameOver') && (
                                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-12 px-2">
                                    <div className="flex justify-center mb-6">
                                        <Link href="/">
                                            <svg className="fill-white w-20 md:w-32 h-auto" viewBox="0 0 1654 332" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1256 76.6406L1009.24 330.75H1204.54L1123 249.052L1178.58 192L1317 331H1207V331.25H1009V0H1185.12L1256 76.6406ZM539.41 329H453.072L452.939 328.75H346.277L346.41 329H279.338L279.471 328.75H193.133L193 329H0L173.205 2L269.705 184.186L193.397 328.25H279.735L312.873 265.686L346.013 328.25H452.675L366.205 165L312.873 265.686L269.705 184.186L366.205 2L539.41 329ZM947.41 329H601L774.205 2L947.41 329ZM1456 149.113L1554 2.58984H1654L1518.21 195.244L1650 327.59H1537.79L1471.64 261.309L1456 283.495V328.34H1641V328.84H1456V329H1378V2H1456V149.113ZM682.406 328.25H866.004L774.205 155L682.406 328.25ZM831.157 298.5H716.843L774 195L831.157 298.5ZM1097 160.5L1171 87L1133.5 47H1097V160.5Z" />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Link href="/games" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                                            <ChevronLeft className="w-4 h-4" /> <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-purple-500">Back</span>
                                        </Link>
                                        <div className="flex items-center gap-2 md:gap-3">
                                            <div className="flex items-center gap-1 bg-white/5 px-2 md:px-3 py-1 rounded-full border border-white/10">
                                                {[...Array(3)].map((_, i) => <Heart key={i} className={`w-3.5 h-3.5 md:w-4 md:h-4 ${i < lives ? 'text-purple-500 fill-purple-500' : 'text-gray-600'}`} />)}
                                            </div>
                                            <button onClick={() => setShowSettings(!showSettings)} className="p-2 md:p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors" title="Settings"><Settings className="w-4 h-4" /></button>
                                            <button onClick={() => setShowWizard(true)} className="p-2 md:p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors" title="Tutorial"><HelpCircle className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="w-full relative">
                            <AnimatePresence>
                                {(gameState !== 'idle' && gameState !== 'gameOver') && (
                                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute -top-24 left-0 right-0 flex justify-between items-center z-50 px-4 md:px-0 pointer-events-none">
                                        <div className="bg-slate-900/60 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex items-center gap-4 pointer-events-auto shadow-2xl">
                                            <div><p className="text-[8px] font-black text-purple-500 uppercase">Level</p><p className="text-xl font-black text-white">{level}</p></div>
                                            <div className="flex gap-1">{[...Array(3)].map((_, i) => <Heart key={i} className={`w-3 h-3 ${i < lives ? 'text-purple-500 fill-purple-500' : 'text-zinc-600'}`} />)}</div>
                                        </div>
                                        <button onClick={() => setGameState(prev => prev === 'playing' ? 'paused' : 'playing')} className="p-3 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/10 text-white pointer-events-auto hover:bg-purple-500/20 transition-all">
                                            {gameState === 'paused' ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <AnimatePresence>
                                {(gameState === 'idle' || gameState === 'gameOver') && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 md:mb-12 px-4">
                                        <h1 className="text-4xl md:text-8xl font-black text-white uppercase italic leading-none">Logic <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-400">Flow</span></h1>
                                        <div className="flex items-center justify-between mt-2">
                                            <p className="text-purple-500/60 text-[8px] md:text-[10px] font-black uppercase tracking-widest italic">Neural Synchronization Suite</p>
                                            <div className="text-right"><p className="text-zinc-500 text-[8px] md:text-[10px] font-black uppercase">Max Stack</p><p className="text-xl md:text-2xl font-black text-white">{highLevel}</p></div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className={`relative w-full aspect-square max-w-[500px] mx-auto bg-slate-950 border-2 border-white/10 rounded-[40px] overflow-hidden p-4 md:p-6 transition-all duration-700 ${gameState !== 'idle' && gameState !== 'gameOver' ? 'shadow-[0_0_100px_rgba(168,85,247,0.2)] mt-12 md:mt-0' : ''}`}>
                                <div className="grid grid-cols-2 gap-3 md:gap-4 h-full">
                                    {[0, 1, 2, 3].map(i => {
                                        const isActive = activeNode === i;
                                        const color = NODE_COLORS[i];
                                        return (
                                            <motion.button
                                                key={i}
                                                whileTap={gameState === 'playing' ? { scale: 0.95 } : {}}
                                                onClick={() => handleNodeClick(i)}
                                                className={`relative rounded-[32px] border-2 transition-all duration-200 overflow-hidden ${isActive
                                                    ? `${color.bg} ${color.glow} ${color.border} scale-[1.02]`
                                                    : `bg-slate-900/40 border-white/5 ${gameState === 'playing' ? 'hover:border-white/20 cursor-pointer shadow-xl' : 'cursor-default'}`
                                                    }`}
                                            >
                                                <div className={`absolute inset-3 rounded-[24px] ${color.bg} transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-10'}`} />

                                                <AnimatePresence>
                                                    {isActive && (
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.5 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 1.5 }}
                                                            className="absolute inset-0 flex items-center justify-center text-6xl font-black text-white/40 italic z-10"
                                                        >
                                                            {i + 1}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                <span className={`absolute bottom-4 left-5 text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-white' : 'text-zinc-500'}`}>{color.label}</span>
                                            </motion.button>
                                        );
                                    })}
                                </div>

                                <AnimatePresence>
                                    {gameState === 'idle' && (
                                        <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-30 px-6">
                                            <BrainCircuit className="w-16 h-16 md:w-20 md:h-20 text-purple-500 mb-6 drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]" />
                                            <h3 className="text-2xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-6 text-center">Ready to <span className="text-purple-500">Flux?</span></h3>
                                            <button onClick={startGame} className="px-10 py-4 bg-purple-600 text-white rounded-full font-black text-sm md:text-lg uppercase tracking-widest hover:scale-110 transition-transform shadow-[0_0_30px_rgba(168,85,247,0.4)] mb-4">Initiate Link</button>
                                        </motion.div>
                                    )}
                                    {gameState === 'gameOver' && (
                                        <motion.div key="gameOver" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center bg-purple-950/90 backdrop-blur-xl z-30 px-6 text-center">
                                            <Trophy className="w-16 h-16 text-yellow-500 mb-4" />
                                            <h3 className="text-3xl md:text-5xl font-black text-white uppercase italic mb-2">Sync Error</h3>
                                            <p className="text-purple-300 font-bold mb-8 uppercase tracking-widest text-[10px]">Stack Cleared: Level {level}</p>
                                            <button onClick={() => { if (lives > 0) startGame(); }} disabled={lives <= 0} className={`px-10 py-4 rounded-full font-black uppercase tracking-widest transition-transform ${lives > 0 ? 'bg-white text-black hover:scale-110' : 'bg-zinc-800 text-zinc-500'}`}>{lives > 0 ? 'Re-Sync' : 'Low Charge'}</button>
                                            {lives <= 0 && timeLeft && <div className="mt-8"><p className="text-3xl font-mono text-white">{formatTime(timeLeft)}</p><p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mt-1">Recovery Active</p></div>}
                                        </motion.div>
                                    )}
                                    {gameState === 'paused' && (
                                        <motion.div key="paused" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md z-30 px-6">
                                            <div className="bg-zinc-900 border border-white/10 rounded-[40px] p-8 max-w-sm w-full shadow-2xl">
                                                <h3 className="text-3xl font-black text-white italic uppercase mb-8 text-center italic tracking-tighter">Link <span className="text-purple-500">Paused</span></h3>
                                                <div className="space-y-4 mb-8">
                                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                                        <div className="flex items-center gap-3">
                                                            <Volume2 className="w-5 h-5 text-purple-400" />
                                                            <span className="text-[10px] font-black text-white uppercase tracking-widest">SFX</span>
                                                        </div>
                                                        <button onClick={() => setSoundEnabled(!soundEnabled)} className={`w-12 h-6 rounded-full transition-all relative ${soundEnabled ? 'bg-purple-600' : 'bg-zinc-700'}`}>
                                                            <motion.div animate={{ x: soundEnabled ? 24 : 4 }} className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full" />
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                                        <div className="flex items-center gap-3">
                                                            <Music className="w-5 h-5 text-pink-400" />
                                                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Music</span>
                                                        </div>
                                                        <button onClick={() => setBgmEnabled(!bgmEnabled)} className={`w-12 h-6 rounded-full transition-all relative ${bgmEnabled ? 'bg-pink-600' : 'bg-zinc-700'}`}>
                                                            <motion.div animate={{ x: bgmEnabled ? 24 : 4 }} className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <button onClick={() => setGameState('playing')} className="w-full py-4 bg-purple-600 text-white rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_30px_rgba(168,85,247,0.3)]">Resume Sync</button>
                                            </div>
                                        </motion.div>
                                    )}
                                    {gameState === 'showing' && (
                                        <div key="showing" className="absolute inset-0 pointer-events-none flex items-center justify-center z-40 bg-black/10 backdrop-blur-[2px]">
                                            <div className="p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-purple-500/20 animate-pulse uppercase text-[10px] font-black tracking-[0.3em] text-purple-400">Observing Pattern...</div>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showSettings && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-xl px-6" onClick={() => setShowSettings(false)}>
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-zinc-900 border border-white/10 rounded-[40px] p-8 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
                            <h3 className="text-2xl font-black text-white uppercase italic mb-6">Settings</h3>
                            <div className="space-y-6">
                                <div><label className="text-[10px] uppercase text-zinc-500 font-black mb-3 block">Neural Audio</label><div className="flex gap-2">{[1, 2, 3].map(t => <button key={t} onClick={() => setTrack(t as 1 | 2 | 3)} className={`flex-1 py-3 rounded-xl border transition-all ${track === t ? 'bg-purple-600 border-purple-500 text-white' : 'bg-white/5 border-white/10 text-zinc-500'}`}>{t}</button>)}</div></div>
                                <div><div className="flex justify-between mb-2"><label className="text-[10px] uppercase text-zinc-500 font-black">Volume</label><span className="text-purple-400 font-mono text-xs">{(volume * 100).toFixed(0)}%</span></div><input type="range" min="0" max="1" step="0.01" value={volume} onChange={e => setVolume(parseFloat(e.target.value))} className="w-full h-1 bg-white/10 rounded-lg appearance-none accent-purple-600" /></div>
                                <div className="flex gap-3"><button onClick={() => setSoundEnabled(!soundEnabled)} className="flex-1 py-3 rounded-xl bg-white/5 text-[10px] font-black uppercase text-zinc-500 border border-white/5">{soundEnabled ? 'SFX ON' : 'SFX OFF'}</button><button onClick={() => setBgmEnabled(!bgmEnabled)} className="flex-1 py-3 rounded-xl bg-white/5 text-[10px] font-black uppercase text-zinc-500 border border-white/5">{bgmEnabled ? 'BGM ON' : 'BGM OFF'}</button></div>
                            </div>
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 backdrop-blur-3xl px-6" onClick={onClose}>
                <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-zinc-900 border border-white/10 rounded-[40px] p-8 md:p-12 max-w-lg w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
                    <button onClick={onClose} className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
                    <h3 className="text-3xl font-black text-white uppercase italic mb-8 italic tracking-tighter">Logic <span className="text-purple-500">Manual</span></h3>
                    <div className="space-y-8">
                        <div className="flex gap-5"><div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center text-white font-black text-xl shadow-[0_0_20px_rgba(168,85,247,0.4)]">1</div><p className="text-zinc-400 text-sm md:text-base leading-relaxed"><span className="text-white font-bold">Memorize</span> the sequence as the nodes pulse in the neural flux.</p></div>
                        <div className="flex gap-5"><div className="w-12 h-12 rounded-2xl bg-pink-500 flex items-center justify-center text-white font-black text-xl shadow-[0_0_20px_rgba(236,72,153,0.4)]">2</div><p className="text-zinc-400 text-sm md:text-base leading-relaxed"><span className="text-white font-bold">Repeat</span> the synchronization pattern exactly to clear the stack.</p></div>
                        <div className="flex gap-5"><div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center text-white font-black text-xl shadow-[0_0_20px_rgba(59,130,246,0.4)]">3</div><p className="text-zinc-400 text-sm md:text-base leading-relaxed">Each level adds a node. Expand your <span className="text-purple-400 font-bold uppercase italic tracking-widest">Cognitive Buffer</span>.</p></div>
                    </div>
                    <button onClick={onClose} className="w-full mt-10 py-5 bg-purple-600 rounded-full text-white font-black uppercase tracking-widest transition-transform hover:scale-105 shadow-[0_0_40px_rgba(168,85,247,0.4)]">Initiate Sync</button>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);
