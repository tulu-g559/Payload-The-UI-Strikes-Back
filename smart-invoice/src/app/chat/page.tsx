"use client";

import { MessageThreadFull } from "@/components/tambo/message-thread-full";
import { useMcpServers } from "@/components/tambo/mcp-config-modal";
import { components, tools } from "@/lib/tambo";
import { TamboProvider } from "@tambo-ai/react";
import { X, Sparkles } from "lucide-react"; // Import icons for the header
import Link from "next/link";
import { Footer } from "@/components/Footer";

/**
 * Chat page component that renders the Tambo chat interface with a dark theme.
 *
 * @remarks
 * The `NEXT_PUBLIC_TAMBO_URL` environment variable specifies the URL of the Tambo server.
 * You do not need to set it if you are using the default Tambo server.
 * It is only required if you are running the API server locally.
 *
 * @see {@link https://github.com/tambo-ai/tambo/blob/main/CONTRIBUTING.md} for instructions on running the API server locally.
 */
export default function ChatPage() {
  // Load MCP server configurations
  const mcpServers = useMcpServers();


  return (
    // 1. Root Container: Dark background, Green selection color
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-emerald-500/30 font-sans">

      {/* ─────────────── Static Background Layers ─────────────── */}

      {/* 1. Static Square Grid */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          maskImage: "radial-gradient(circle at center, black 60%, transparent 100%)",
        }}
      />

      {/* 2. Top Left Orb (Static) */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-600/30 rounded-full blur-[120px] z-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* 3. Top Right Orb (Static) */}
      <div
        className="absolute -top-[120px] -right-[120px] w-[600px] h-[600px] rounded-full z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom left, rgba(52, 211, 153, 0.5), rgba(16, 185, 129, 0.2))",
          filter: "blur(60px)", 
        }}
      />

      {/* 4. Right Center Glow (Static) */}
      <div
        className="absolute top-1/2 right-0 translate-x-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/30 rounded-full blur-[120px] z-[0] pointer-events-none mix-blend-screen"
      />

      {/* 5. Bottom Right Orb (Static) */}
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[140px] z-0 pointer-events-none"
      />


      {/* ─────────────── Main Chat Interface ─────────────── */}
      <div className="relative z-10 min-h-screen w-full flex items-center justify-center p-4 md:p-6 lg:p-8">
        
        <TamboProvider
          apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
          components={components}
          tools={tools}
          tamboUrl={process.env.NEXT_PUBLIC_TAMBO_URL}
          mcpServers={mcpServers}
        >
          {/* THE CHAT WINDOW CARD */}
<div className="w-full max-w-5xl h-[85vh] flex flex-col bg-[#0A0A0A]/90 backdrop-blur-2xl border border-emerald-500/20 rounded-2xl sm:rounded-[2rem] shadow-[0_0_80px_-20px_rgba(16,185,129,0.15)] overflow-hidden relative">
    
    {/* Custom Header - Fixed Alignment */}
    <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-white/0 z-20 shrink-0">
    
    {/* Left Side: Title & Status */}
    <div className="flex items-center gap-3 overflow-hidden">
        {/* Pulsing Status Dot */}
        <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
        </span>
        
        <h1 className="text-sm sm:text-base font-bold tracking-tight text-white/90 truncate">
        Payload Chat <span className="hidden sm:inline text-emerald-500/50 mx-2">|</span> <span className="font-normal text-white/50 text-xs sm:text-sm">Build invoices in a hurry</span>
        </h1>
    </div>

    {/* Right Side: Close Button */}
    <Link 
        href="/" 
        className="text-white/40 hover:text-white hover:bg-white/5 transition-all p-2 rounded-full shrink-0 ml-2"
    >
        <X size={20} />
    </Link>
    </div>

             {/* Message Thread Container */}
             <div className="flex-1 relative w-full overflow-hidden">
               {/* Render thread normally so it respects parent height on small screens */}
               <MessageThreadFull className="h-full w-full" />
             </div>

          </div>
        </TamboProvider>
      </div>
      <Footer />
    </div>
  );
}