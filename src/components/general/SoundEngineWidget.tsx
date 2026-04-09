"use client";

import React, { createContext, useContext, useCallback, useRef } from 'react';

type SoundType = 'click' | 'hover' | 'whoosh' | 'success';

interface SoundContextType {
    play: (type: SoundType) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

// Base64 Mini Sounds (High-frequency synth blips)
const SOUNDS: Record<SoundType, string> = {
    click: 'data:audio/wav;base64,UklGRl9vT19XQVZFRm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YTdvT18AZmZmZmZtZWZlZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZm',
    hover: 'data:audio/wav;base64,UklGRl9vT19XQVZFRm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YTdvT18AZmZmZmZtZWZlZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZm',
    whoosh: 'data:audio/wav;base64,UklGRl9vT19XQVZFRm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YTdvT18AZmZmZmZtZWZlZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZm',
    success: 'data:audio/wav;base64,UklGRl9vT19XQVZFRm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YTdvT18AZmZmZmZtZWZlZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZm',
};

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
    const audioRefs = useRef<Partial<Record<SoundType, HTMLAudioElement>>>({});

    const play = useCallback((type: SoundType) => {
        if (typeof window === 'undefined') return;

        let audio = audioRefs.current[type];
        if (!audio) {
            audio = new Audio(SOUNDS[type]);
            audio.volume = 0.05; // Extremely subtle
            audioRefs.current[type] = audio;
        }

        audio.currentTime = 0;
        audio.play().catch(() => {}); // Handle auto-play restrictions
    }, []);

    return (
        <SoundContext.Provider value={{ play }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = () => {
    const context = useContext(SoundContext);
    if (!context) throw new Error('useSound must be used within SoundProvider');
    return context;
};
