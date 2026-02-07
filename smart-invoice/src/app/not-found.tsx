"use client";

import { motion } from "framer-motion";
import { HomeIcon, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

// Animation variants (matching home page)
const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-emerald-500/30">
      {/* ─────────────── CSS (scoped & safe) ─────────────── */}
      <style>{`
        @keyframes grid-move {
          0% { background-position: 0 0; }
          100% { background-position: 64px 64px; }
        }
      `}</style>

      {/* ───────────────── Background Layers ───────────────── */}

      {/* 1. Moving Square Grid */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ backgroundPosition: "0px 0px" }}
        animate={{ backgroundPosition: ["0px 0px", "50px 50px"] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(16, 185, 129, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 185, 129, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* 2. Top Left Orb - Deep Emerald */}
      <motion.div
        className="absolute -top-20 sm:-top-32 lg:-top-40 -left-20 sm:-left-32 lg:-left-40 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] bg-emerald-600/40 rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px] z-0 pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 3. Top Right Green Glow Orb */}
      <motion.div
        className="absolute top-[-100px] sm:top-[-150px] lg:top-[-200px] right-[-100px] sm:right-[-150px] lg:right-[-200px] w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] lg:w-[700px] lg:h-[700px] rounded-full pointer-events-none z-[5]"
        style={{
          background: `
            radial-gradient(
              circle at center,
              rgba(52, 211, 153, 0.55) 0%,
              rgba(52, 211, 153, 0.35) 30%,
              rgba(52, 211, 153, 0.18) 50%,
              rgba(52, 211, 153, 0.08) 65%,
              rgba(52, 211, 153, 0.0) 80%
            )
          `,
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 4. Bottom Right Orb - Vivid Green */}
      <motion.div
        className="absolute bottom-[-10%] right-[-5%] w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-green-500/30 rounded-full blur-[100px] sm:blur-[120px] lg:blur-[140px] z-0 pointer-events-none"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          delay: 2,
          ease: "easeInOut",
        }}
      />

      {/* ─────────────── Main Content ─────────────── */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 flex flex-col items-center justify-center min-h-screen">
        {/* Hero Section */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center text-center max-w-2xl"
        >
          {/* 404 Number */}
          <motion.div variants={fadeInUp}>
            <div className="text-8xl sm:text-9xl lg:text-[120px] font-black tracking-tighter mb-6 sm:mb-8">
              <span className="bg-clip-text text-transparent bg-linear-to-r from-emerald-400 via-green-400 to-teal-500">
                404
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 sm:mb-6 leading-[1.1]"
          >
            Page Not Found
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-10 font-light leading-relaxed max-w-xl"
          >
            The page you're looking for doesn't exist. But your invoicing journey
            does. Let's get you back on track.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex gap-3 sm:gap-4 flex-wrap justify-center w-full"
          >
            <Link
              href="/"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full text-sm sm:text-base font-bold hover:bg-emerald-500 hover:text-white transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <HomeIcon size={18} className="sm:w-5 sm:h-5" />
              Back 2     Home
            </Link>
            <Link
              href="/chat"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-sm sm:text-base font-bold hover:bg-emerald-500/20 transition backdrop-blur-sm text-emerald-400"
            >
              Start Chatting <ArrowRight size={18} className="ml-2 inline" />
            </Link>
          </motion.div>
        </motion.section>

        {/* Footer Text */}
        <motion.div
          variants={fadeInUp}
          className="mt-16 sm:mt-20 text-center text-xs sm:text-sm text-gray-500 font-mono"
        >
          <p>Error Code: <span className="text-emerald-500">404_NOT_FOUND</span></p>
        </motion.div>
      </main>
    </div>
  );
}
