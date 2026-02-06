"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Zap,
  MoveRight,
  Layout,
  FileText,
  Terminal,
  CheckCircle2,
  Receipt,
  Sparkles,
} from "lucide-react";
import { ApiKeyCheck } from "@/components/ApiKeyCheck";
import { SoundController } from "@/components/SoundController";

// ─────────────────────────────────────────────────────────────
// 1. Defined Animation Variants (These were missing previously)
// ─────────────────────────────────────────────────────────────
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


const KeyFilesSection = () => (
  <div className="bg-white px-8 py-4">
    <h2 className="text-xl font-semibold mb-4">How it works:</h2>
    <ul className="space-y-4 text-gray-600">
      <li className="flex items-start gap-2">
        <span>📄</span>
        <span>
          <code className="font-medium">src/app/layout.tsx</code> - Main layout
          with TamboProvider
        </span>
      </li>
      <li className="flex items-start gap-2">
        <span>📄</span>
        <span>
          <code className="font-medium font-mono">src/app/chat/page.tsx</code> -
          Chat page with TamboProvider and MCP integration
        </span>
      </li>
      <li className="flex items-start gap-2">
        <span>📄</span>
        <span>
          <code className="font-medium font-mono">
            src/app/interactables/page.tsx
          </code>{" "}
          - Interactive demo page with tools and components
        </span>
      </li>
      <li className="flex items-start gap-2">
        <span>📄</span>
        <span>
          <code className="font-medium font-mono">
            src/components/tambo/message-thread-full.tsx
          </code>{" "}
          - Chat UI
        </span>
      </li>
      <li className="flex items-start gap-2">
        <span>📄</span>
        <span>
          <code className="font-medium font-mono">
            src/components/tambo/graph.tsx
          </code>{" "}
          - A generative graph component
        </span>
      </li>
      <li className="flex items-start gap-2">
        <span>📄</span>
        <span>
          <code className="font-medium font-mono">
            src/services/population-stats.ts
          </code>{" "}
          - Example tool implementation with mock population data
        </span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-blue-500">📄</span>
        <span>
          <code className="font-medium font-mono">src/lib/tambo.ts</code> -
          Component and tool registration
        </span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-blue-500">📄</span>
        <span>
          <code className="font-medium font-mono">README.md</code> - For more
          details check out the README
        </span>
      </li>
    </ul>
    <div className="flex gap-4 flex-wrap mt-4">
      <a
        href="https://docs.tambo.co"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 rounded-md font-medium transition-colors text-lg mt-4 border border-gray-300 hover:bg-gray-50"
      >
        View Docs
      </a>
      <a
        href="https://tambo.co/dashboard"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 rounded-md font-medium transition-colors text-lg mt-4 border border-gray-300 hover:bg-gray-50"
      >
        Dashboard
      </a>
    </div>
  </div>
);



export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-emerald-500/30">
      {/* ─────────────── CSS (scoped & safe) ─────────────── */}
      <style>{`
        @keyframes grid-move {
          0% { background-position: 0 0; }
          100% { background-position: 64px 64px; }
        }
      `}</style>
      <SoundController />

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
          // Linear gradients create lines (squares), not dots
          backgroundImage: `
            linear-gradient(to right, rgba(16, 185, 129, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 185, 129, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* 2. Top Left Orb - Deep Emerald (Responsive) */}
      <motion.div
        className="absolute -top-20 sm:-top-32 lg:-top-40 -left-20 sm:-left-32 lg:-left-40 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] bg-emerald-600/40 rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px] z-0 pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ▶▶▶ FULL GREEN GLOW ORB (Responsive) ◀◀◀ */}
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

      {/* 3. Bottom Right Orb - Vivid Green (Responsive) */}
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
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Nav */}
        <nav className="flex justify-between items-center mb-12 sm:mb-16 lg:mb-20">
          <div className="flex items-center gap-2 font-bold text-lg sm:text-xl tracking-tight">
            <Image
              src="/Plogo.png"
              alt="Payload Logo"
              width={128}
              height={128}
              // className="w-20 h-20 sm:w-24 sm:h-24"
              className="
              w-20 h-20 sm:w-24 sm:h-24
              drop-shadow-[0_0_12px_rgba(16,185,129,0.45)]
  "
            />

            <span className="text-sm sm:text-base lg:text-xl">Payload</span>
          </div>
          <div className="hidden md:flex gap-4 lg:gap-6 text-xs lg:text-sm text-gray-400">
            <span className="hover:text-white transition cursor-pointer">Features</span>
            <span className="hover:text-white transition cursor-pointer">Docs</span>
          </div>
        </nav>

        {/* ─────────────── Hero (Left Aligned) ─────────────── */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col items-start text-left mb-16 sm:mb-20 lg:mb-28 max-w-5xl"
        >
          {/* Tag */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] sm:text-xs font-bold text-emerald-400 mb-6 sm:mb-8 uppercase tracking-widest"
          >
            <Sparkles size={10} className="sm:w-3 sm:h-3" /> 
            <span className="whitespace-nowrap">Powered by Tambo AI</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-6 sm:mb-8 leading-[0.9]"
          >
            INVOICING
            <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-emerald-400 via-green-400 to-teal-500">
              REIMAGINED.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mb-8 sm:mb-10 lg:mb-12 font-poppins leading-relaxed"
          >
            In a Hurry? Chat your billing intent in plain English.
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            Watch the UI assemble itself.
          </motion.p>

          {/* Buttons (Left Aligned) */}
          <motion.div
            variants={fadeInUp}
            className="flex gap-3 sm:gap-4 flex-wrap justify-start w-full sm:w-auto"
          >
            <ApiKeyCheck>
              <a
                href="/chat"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full text-sm sm:text-base font-bold hover:bg-emerald-500 hover:text-white transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-emerald-500/20 w-full sm:w-auto justify-center sm:justify-start"
              >
                Get Invoice <MoveRight size={18} className="sm:w-5 sm:h-5" />
              </a>
            </ApiKeyCheck>
            <a
              href="/interactables"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-full text-sm sm:text-base font-bold hover:bg-white/10 transition backdrop-blur-sm w-full sm:w-auto text-center"
            >
              Explore Components
            </a>
          </motion.div>
        </motion.section>

        {/* ─────────────── Feature Cards ─────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-16 sm:mb-20 lg:mb-28">
          {/* Card 1: Main Action */}
          <motion.div
            whileHover={{ y: -6 }}
            className="group relative p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-[2rem] lg:rounded-[2.5rem] bg-linear-to-b from-emerald-800 to-emerald-950 border border-emerald-500/20 shadow-2xl overflow-hidden"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <Zap className="mb-4 sm:mb-6 text-white w-8 h-8 sm:w-10 sm:h-10" />
              <h2 className="text-2xl sm:text-3xl mb-3 sm:mb-4 text-white poppins-regular">
                AI Invoice Engine
              </h2>
              <p className="text-emerald-100/80 mb-6 sm:mb-8 text-base sm:text-lg font-light leading-relaxed">
                "Create an invoice for 20 hours of consulting at $150/hr…"
              </p>
              <ul className="space-y-3 sm:space-y-4">
                {["Natural language", "Generative UI", "Instant export"].map(
                  (item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-white"
                    >
                      <CheckCircle2 size={16} className="sm:w-[18px] sm:h-[18px] text-emerald-400 shrink-0" />{" "}
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          </motion.div>

          {/* Card 2: Stats/Info */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-[2rem] lg:rounded-[2.5rem] bg-[#0A0A0A] border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/5 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 border border-white/5">
                <Layout className="text-white w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h2 className="text-2xl sm:text-3xl mb-3 sm:mb-4 poppins-regular">Smart Components</h2>
              <p className="text-gray-400 mb-6 sm:mb-8 lg:mb-10 leading-relaxed text-sm sm:text-base poppins-light">
                Interactive charts, dynamic line items, and automated tax
                calculations that respond to your conversation.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/5 text-center hover:bg-white/10 transition-colors">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-500 mb-1">
                  99%
                </div>
                <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                  Accuracy
                </div>
              </div>
              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/5 text-center hover:bg-white/10 transition-colors">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-500 mb-1">
                  &lt; 2s
                </div>
                <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                  Generation
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ─────────────── Tech Strip ─────────────── */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 opacity-40 hover:opacity-70 transition">
          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-xs sm:text-sm">
            <Terminal size={14} className="sm:w-4 sm:h-4" /> Fast
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-xs sm:text-sm">
            <Layout size={14} className="sm:w-4 sm:h-4" /> Effective
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-xs sm:text-sm">
            <FileText size={14} className="sm:w-4 sm:h-4" /> Calm
          </div>
        </div>
      </main>
    </div>
  );
}