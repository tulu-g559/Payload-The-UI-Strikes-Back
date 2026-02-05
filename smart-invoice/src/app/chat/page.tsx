"use client";

import { MessageThreadFull } from "@/components/tambo/message-thread-full";
import { useMcpServers } from "@/components/tambo/mcp-config-modal";
import { components, tools } from "@/lib/tambo";
import { TamboProvider } from "@tambo-ai/react";
import { motion } from "framer-motion";

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
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-emerald-500/30">

      {/* ─────────────── Static Background Layers ─────────────── */}

      {/* 1. Static Square Grid */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          // Linear gradients create lines (squares)
          backgroundImage: `
            linear-gradient(to right, rgba(16, 185, 129, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 185, 129, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* 2. Top Left Orb - Deep Emerald (Static) */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-600/40 rounded-full blur-[120px] z-0 pointer-events-none"
        style={{ opacity: 0.6 }} // Fixed opacity
      />

      {/* 3. Top Right Orb - Solid & Defined (Static) */}
      <div
        className="absolute -top-[120px] -right-[120px] w-[600px] h-[600px] rounded-full z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom left, rgba(52, 211, 153, 0.6), rgba(16, 185, 129, 0.3))",
          filter: "blur(50px)", 
          border: "1px solid rgba(52, 211, 153, 0.3)"
        }}
      />

      {/* 4. Right Center Orb - Glow (Static) */}
      <div
        className="absolute top-1/2 right-0 translate-x-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/40 rounded-full blur-[120px] z-[2] pointer-events-none mix-blend-screen"
        style={{ opacity: 0.45 }}
      />

      {/* 5. Bottom Right Orb - Vivid Green (Static) */}
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-green-500/30 rounded-full blur-[140px] z-0 pointer-events-none"
        style={{ opacity: 0.5 }}
      />


      {/* ─────────────── Main Chat Content ─────────────── */}
      <div className="relative z-10 h-screen flex flex-col">
        {/* Optional: Add a subtle header or leave full screen for chat */}
        
        <TamboProvider
          apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
          components={components}
          tools={tools}
          tamboUrl={process.env.NEXT_PUBLIC_TAMBO_URL}
          mcpServers={mcpServers}
        >
          <div className="flex-1 w-full h-full backdrop-blur-[2px]">
             {/* Tip: If MessageThreadFull has a white background, 
                you may need to add 'bg-transparent' or 'bg-[#0A0A0A]' 
                via global CSS or component props to see the green layers behind it. 
             */}
             <MessageThreadFull />
          </div>
        </TamboProvider>
      </div>
    </div>
  );
}