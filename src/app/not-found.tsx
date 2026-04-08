'use client'
import React from 'react';
import { PageCover } from "@/components/general";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <PageCover showHeader={true}>
      <div className="min-h-screen bg-black flex flex-col justify-center items-center relative overflow-hidden px-6">
        
        {/* Cinematic Backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[60vh] bg-gradient-to-b from-blue-900/10 via-purple-900/5 to-transparent blur-[120px] pointer-events-none" />
        
        {/* Floating grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: 'spring' }}
          >
            <h1 className="text-[12rem] md:text-[18rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 tracking-tighter leading-none mix-blend-plus-lighter font-(family-name:--Canva-Sans-Display) drop-shadow-2xl">
              404
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 md:mt-0"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-widest mb-4">
              Signal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Lost</span>
            </h2>
            <p className="text-gray-400 font-light max-w-md mx-auto text-sm md:text-base leading-relaxed mb-10">
              The construct you are searching for does not exist in this architecture. It may have been relocated, or it was just an illusion.
            </p>

            <Link href="/" className="group inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 hover:border-white/30 rounded-full transition-all duration-300 backdrop-blur-md">
              <ChevronLeft className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:-translate-x-1 transition-all duration-300" />
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-white">Return to Origin</span>
            </Link>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 left-12 hidden md:block">
          <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-mono">Status: Offline // Error Code 404</p>
        </div>
        <div className="absolute top-32 right-12 hidden md:block">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-mono">Connection Severed</p>
          </div>
        </div>
      </div>
    </PageCover>
  );
}
