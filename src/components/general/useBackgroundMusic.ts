'use client'
import { useRef, useState, useCallback, useEffect } from 'react';

// ─── Background Music Engine ───────────────────────────
// Pixabay Synthwave/Cyberpunk Tracks
const TRACK_URLS = {
    cyber: {
        1: 'https://cdn.pixabay.com/audio/2026/04/08/audio_dc63b1b6d9.mp3',
        2: 'https://cdn.pixabay.com/audio/2025/05/29/audio_7292c86bf3.mp3',
        3: 'https://cdn.pixabay.com/audio/2025/08/29/audio_ac6ae00edf.mp3'
    },
    logic: {
        1: 'https://cdn.pixabay.com/audio/2025/08/29/audio_ac6ae00edf.mp3',
        2: 'https://cdn.pixabay.com/audio/2025/05/29/audio_7292c86bf3.mp3',
        3: 'https://cdn.pixabay.com/audio/2026/04/08/audio_dc63b1b6d9.mp3'
    }
};

export const useBackgroundMusic = (theme: 'cyber' | 'logic' = 'cyber') => {
    const audioContextRef = useRef<AudioContext | null>(null);
    const masterGainRef = useRef<GainNode | null>(null);
    const audioElemsRef = useRef<{ [key: string]: HTMLAudioElement }>({});
    const sourcesRef = useRef<{ [key: string]: MediaElementAudioSourceNode }>({});

    const [bgmEnabled, setBgmEnabled] = useState(false);
    const [track, setTrack] = useState<1 | 2 | 3>(1);
    const [volume, setVolume] = useState(0.5);

    const getContext = useCallback(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        }
        return audioContextRef.current;
    }, []);

    // Live volume updater
    useEffect(() => {
        if (masterGainRef.current && audioContextRef.current) {
            const ctx = audioContextRef.current;
            const targetGain = bgmEnabled ? volume * 0.4 : 0;
            masterGainRef.current.gain.linearRampToValueAtTime(targetGain, ctx.currentTime + 0.1);
        }
    }, [volume, bgmEnabled]);

    // Track state management
    useEffect(() => {
        const ctx = getContext();
        if (!masterGainRef.current) {
            masterGainRef.current = ctx.createGain();
            masterGainRef.current.connect(ctx.destination);
        }

        const currentUrl = TRACK_URLS[theme][track];

        // Pause all other tracks
        Object.values(audioElemsRef.current).forEach(el => {
            el.pause();
        });

        if (bgmEnabled) {
            if (ctx.state === 'suspended') ctx.resume();

            if (!audioElemsRef.current[currentUrl]) {
                const audio = new Audio(currentUrl);
                audio.loop = true;
                audio.crossOrigin = "anonymous";
                audioElemsRef.current[currentUrl] = audio;

                const source = ctx.createMediaElementSource(audio);
                source.connect(masterGainRef.current);
                sourcesRef.current[currentUrl] = source;
            }

            const audio = audioElemsRef.current[currentUrl];
            audio.play().catch(e => console.log("Music play blocked:", e));
        }

        return () => {
            // Track changes handled by re-execution
        };
    }, [bgmEnabled, theme, track, getContext]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            Object.values(audioElemsRef.current).forEach(el => {
                el.pause();
                el.src = "";
            });
        };
    }, []);

    return { bgmEnabled, setBgmEnabled, track, setTrack, volume, setVolume };
};
