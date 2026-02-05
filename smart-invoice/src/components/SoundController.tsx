"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const SoundController = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Toggle Function
  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      // Fade out logic could go here, but simple pause for now
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Play
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Audio play blocked by browser:", error);
          });
      }
    }
  };

  // Optional: Attempt to play on mount (usually blocked, but works if user navigated here from another page)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4; // Set volume to 40% (not too loud)
    }
  }, []);

  return (
    <div className="fixed top-8 right-8 z-50">
      <audio ref={audioRef} loop src="/ambient.mp3" />

      <motion.button
        onClick={toggleSound}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`
          relative flex items-center justify-center w-12 h-12 rounded-full 
          backdrop-blur-md border transition-all duration-300 shadow-lg
          ${isPlaying 
            ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-emerald-500/20" 
            : "bg-black/40 border-white/10 text-gray-400 hover:text-white"
          }
        `}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <Volume2 size={20} />
              {/* Animated Rings for visual feedback */}
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20 animate-ping inset-0"></span>
            </motion.div>
          ) : (
            <motion.div
              key="muted"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <VolumeX size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};