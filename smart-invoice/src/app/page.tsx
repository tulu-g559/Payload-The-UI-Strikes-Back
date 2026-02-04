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

      {/* 2. Top Left Orb - Deep Emerald */}
      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-600/40 rounded-full blur-[120px] z-0"
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.4, 0.8, 0.4] // Increased opacity for depth
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 3. Bottom Right Orb - Vivid Green */}
      <motion.div
        className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-green-500/30 rounded-full blur-[140px] z-0"
        animate={{ 
          scale: [1, 1.15, 1], 
          opacity: [0.3, 0.7, 0.3] 
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2, ease: "easeInOut" }}
      />

      {/* ─────────────── Main Content ─────────────── */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-20">

        {/* Nav */}
        <nav className="flex justify-between items-center mb-20">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Receipt size={18} className="text-black" />
            </div>
            SMART INVOICE
          </div>
          <div className="hidden md:flex gap-6 text-sm text-gray-400">
            <span className="hover:text-white transition">Features</span>
            <span className="hover:text-white transition">Docs</span>
          </div>
        </nav>

        {/* ─────────────── Hero ─────────────── */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center text-center mb-28"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-emerald-400 mb-6 uppercase tracking-widest"
          >
            <Sparkles size={12} /> Powered by Tambo AI
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9]"
          >
            INVOICING
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-400 to-teal-500">
              REIMAGINED.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 poppins-regular"
          >
            Describe your billing intent in plain English.
            <br />
            Watch the UI assemble itself.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex gap-4 flex-wrap justify-center">
            <ApiKeyCheck>
              <a
                href="/chat"
                className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-emerald-500 hover:text-white transition-all transform hover:scale-105 flex items-center gap-2"
              >
                Get Started <MoveRight size={20} />
              </a>
            </ApiKeyCheck>
            <a
              href="/interactables"
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold hover:bg-white/10 transition"
            >
              Explore Components
            </a>
          </motion.div>
        </motion.section>

        {/* ─────────────── Feature Cards ─────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-28">
          <motion.div
            whileHover={{ y: -6 }}
            className="relative p-8 rounded-4xl bg-linear-to-b from-emerald-600 to-emerald-800 shadow-2xl overflow-hidden"
          >
            <Zap className="mb-6" />
            <h2 className="text-3xl font-bold mb-3 poppins-regular">
                    AI Invoice Engine
                  </h2>
            <p className="text-emerald-100 mb-6">
              “Create an invoice for 20 hours of consulting at $150/hr…”
            </p>
            <ul className="space-y-3">
              {["Natural language", "Generative UI", "Instant export"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 size={16} /> {item}
                  </li>
                )
              )}
            </ul>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 rounded-4xl bg-[#111] border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
                <Layout className="text-emerald-500" size={24} />
              </div>
              <h2 className="text-3xl font-bold mb-3">Smart Components</h2>
              <p className="text-gray-400 mb-8">
                Interactive charts, dynamic line items, and automated tax calculations 
                that respond to your conversation.
              </p>
            </div> 
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                <div className="text-2xl font-bold text-emerald-500">99%</div>
                <div className="text-[10px] uppercase text-gray-500 font-bold">Accuracy</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                <div className="text-2xl font-bold text-emerald-500">&lt; 2s</div>
                <div className="text-[10px] uppercase text-gray-500 font-bold">Generation</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ─────────────── Tech Strip ─────────────── */}
        <div className="flex flex-wrap justify-center gap-8 opacity-40 hover:opacity-70 transition">
          <div className="flex items-center gap-2 font-mono text-sm">
            <Terminal size={16} /> Fast
          </div>
          <div className="flex items-center gap-2 font-mono text-sm">
            <Layout size={16} /> Effective
          </div>
          <div className="flex items-center gap-2 font-mono text-sm">
            <FileText size={16} /> Calm
          </div>
        </div>
      </main>
    </div>
  );
}