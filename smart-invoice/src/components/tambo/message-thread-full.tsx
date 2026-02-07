"use client";

import type { messageVariants } from "@/components/tambo/message";
import {
  MessageInput,
  MessageInputError,
  MessageInputFileButton,
  MessageInputMcpPromptButton,
  MessageInputMcpResourceButton,
  MessageInputSubmitButton,
  MessageInputTextarea,
  MessageInputToolbar,
} from "@/components/tambo/message-input";
import {
  MessageSuggestions,
  MessageSuggestionsList,
  MessageSuggestionsStatus,
} from "@/components/tambo/message-suggestions";
import { ScrollableMessageContainer } from "@/components/tambo/scrollable-message-container";
import { ThreadContainer, useThreadContainerContext } from "./thread-container";
import {
  ThreadContent,
  ThreadContentMessages,
} from "@/components/tambo/thread-content";
import {
  ThreadHistory,
  ThreadHistoryHeader,
  ThreadHistoryList,
  ThreadHistoryNewButton,
  ThreadHistorySearch,
} from "@/components/tambo/thread-history";
import { useMergeRefs } from "@/lib/thread-hooks";
import type { Suggestion } from "@tambo-ai/react";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface MessageThreadFullProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: VariantProps<typeof messageVariants>["variant"];
}

export const MessageThreadFull = React.forwardRef<
  HTMLDivElement,
  MessageThreadFullProps
>(({ className, variant, ...props }, ref) => {
  const { containerRef, historyPosition } = useThreadContainerContext();
  const mergedRef = useMergeRefs<HTMLDivElement | null>(ref, containerRef);

  // 1. Static Sidebar (Glassy Dark)
  const threadHistorySidebar = (
    <ThreadHistory 
      position={historyPosition} 
      className="bg-black/40 backdrop-blur-md border-r border-white/5 z-20"
    >
      <ThreadHistoryHeader className="text-emerald-500/80 font-bold tracking-widest uppercase text-[10px]" />
      <ThreadHistoryNewButton className="hover:bg-emerald-500/10 hover:border-emerald-500/20 transition-colors" />
      <ThreadHistorySearch />
      <ThreadHistoryList />
    </ThreadHistory>
  );

  const defaultSuggestions: Suggestion[] = [
    {
      id: "suggestion-1",
      title: "Create Invoice",
      detailedSuggestion: "Draft an invoice for $500 to Acme Corp.",
      messageId: "invoice-query",
    },
    {
      id: "suggestion-2",
      title: "Analyze Spending",
      detailedSuggestion: "Show me a breakdown of this month's expenses.",
      messageId: "analysis-query",
    },
  ];

  return (
    // ROOT CONTAINER: Matches Homepage #050505
    <div className="relative flex h-full w-full overflow-hidden bg-[#050505] selection:bg-emerald-500/30">

      {/* ───────────────── STATIC BACKGROUND LAYERS (From Home) ───────────────── */}
      
      {/* 1. Static Grid */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          maskImage: "radial-gradient(circle at center, black 40%, transparent 100%)",
        }}
      />

      {/* 2. Top Left Orb - Deep Emerald */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* 3. Top Right Glow - Vivid */}
      <div 
        className="absolute -top-[100px] -right-[100px] w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(52, 211, 153, 0.15) 0%, rgba(52, 211, 153, 0) 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* 4. Bottom Right Orb */}
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[100px] pointer-events-none z-0" />


      {/* ───────────────── CONTENT LAYOUT ───────────────── */}

      {/* Sidebar Left */}
      {historyPosition === "left" && threadHistorySidebar}

      {/* Main Chat Area */}
      <ThreadContainer
        ref={mergedRef}
        disableSidebarSpacing
        className={cn("relative flex-1 flex flex-col bg-transparent z-10", className)}
        {...props}
      >
        
        {/* Messages Scroll Area */}
        <ScrollableMessageContainer
          className="flex-1 px-4 md:px-8 pt-6 scroll-smooth"
          style={{
            // Fade out messages at the very top
            maskImage: "linear-gradient(to bottom, transparent 0%, black 40px)",
          }}
        >
          <ThreadContent variant={variant}>
            {/* FIXES:
               1. text-white: Forces all text to be white.
               2. User Message Bubble: Forces Emerald background, White Text, No Hover Shift.
               3. AI Message: Ensures clean readability.
            */}
            <ThreadContentMessages
              className="
                max-w-4xl mx-auto
                font-light text-[15px] text-gray-700 leading-relaxed
                space-y-6 pb-4
                
                /* Force global text color */
                [&_*]:text-gray-700

                /* USER MESSAGE STYLING (The Green Box) */
                /* Targeting specific tambo/ai selectors often used for user messages */
                [&_.user-message]:!bg-emerald-600
                [&_.user-message]:!text-black
                [&_.user-message]:!border-none
                [&_.user-message]:rounded-2xl
                [&_.user-message]:px-5
                [&_.user-message]:py-3
                
                /* Prevent Hover Color Shift */
                [&_.user-message:hover]:!bg-emerald-600 

                /* AI MESSAGE STYLING */
                [&_.ai-message]:text-gray-700
              "
            />
          </ThreadContent>
        </ScrollableMessageContainer>


        {/* ───────────────── INPUT DOCK ───────────────── */}
        <div className="w-full px-4 pb-6 md:px-8">
          
          {/* Status Text */}
          <div className="max-w-4xl mx-auto px-2 mb-2">
            <MessageSuggestions>
              <MessageSuggestionsStatus className="text-[10px] tracking-widest uppercase text-emerald-500/80 font-mono font-bold" />
            </MessageSuggestions>
          </div>

          {/* ─────────────── INPUT CAPSULE ─────────────── */}
          <div className="max-w-4xl mx-auto w-full">
            <MessageInput>
              <div
                className={cn(
                  "relative flex items-center gap-2 overflow-hidden",
                  "rounded-[2rem]", // Fully Rounded
                  "bg-[#0A0A0A]",   // Dark Background
                  "border border-white/10",
                  "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]",
                  "transition-all duration-300",
                  "focus-within:border-emerald-500/50", // Emerald Glow on Focus
                  "focus-within:ring-1",
                  "focus-within:ring-emerald-500/20"
                )}
              >
                
                {/* TEXT AREA - Fixed Transparency */}
                <MessageInputTextarea
                  placeholder="Ask anything..."
                  className="
                    flex-1 min-h-[52px] max-h-[200px]
                    py-4 pl-6 pr-2
                    bg-transparent !bg-none   /* CRITICAL: Removes white bg */
                    border-0 shadow-none outline-none
                    resize-none
                    
                    text-white
                    placeholder:text-zinc-600
                    caret-emerald-500
                    
                    font-light text-[15px] leading-relaxed
                    
                    focus:ring-0 focus:bg-transparent
                  "
                />

                {/* TOOLBAR - Fixed Button Backgrounds */}
                <MessageInputToolbar className="flex items-center gap-1 pr-2 py-2 pl-0">
                  
                  {/* Left Group */}
                  <div className="flex items-center gap-1 border-r border-white/10 pr-2 mr-1">
                    <MessageInputFileButton
                      className="
                        h-9 w-9 rounded-full p-2
                        bg-transparent             /* CRITICAL: Transparent bg */
                        text-zinc-500 
                        hover:text-emerald-400 
                        hover:bg-white/5
                        transition-colors
                        outline-none focus:outline-none focus:ring-0
                      "
                    />
                    <MessageInputMcpPromptButton
                      className="
                        h-9 w-9 rounded-full p-2
                        bg-transparent             /* CRITICAL: Transparent bg */
                        text-zinc-500 
                        hover:text-emerald-400 
                        hover:bg-white/5
                        transition-colors
                        outline-none focus:outline-none focus:ring-0
                      "
                    />
                  </div>

                  {/* Right Group */}
                  <MessageInputMcpResourceButton
                    className="
                      h-9 w-9 rounded-full p-2
                      bg-transparent               /* CRITICAL: Transparent bg */
                      text-zinc-500 
                      hover:text-emerald-400 
                      hover:bg-white/5
                      transition-colors
                      outline-none focus:outline-none focus:ring-0
                    "
                  />

                  {/* Submit Button (Green Circle) */}
                  <MessageInputSubmitButton
                    className="
                      ml-2 h-10 w-10 rounded-full
                      bg-emerald-500 hover:bg-emerald-400
                      text-black
                      shadow-[0_0_15px_rgba(16,185,129,0.4)]
                      flex items-center justify-center
                      transition-transform hover:scale-105 active:scale-95
                      outline-none focus:outline-none focus:ring-0
                      border-none
                    "
                  />
                </MessageInputToolbar>
              </div>

              <MessageInputError className="text-red-400 text-xs mt-2 ml-4 font-mono font-bold" />
            </MessageInput>
          </div>

          {/* SUGGESTIONS (Styled to match dark theme) */}
          <div
            className="
              max-w-4xl mx-auto mt-4 overflow-x-auto pb-1 no-scrollbar
              
              /* Button Styling Override */
              [&_button]:bg-white/5
              [&_button]:text-zinc-300
              [&_button]:border
              [&_button]:border-white/5
              [&_button]:rounded-full
              [&_button]:px-4
              [&_button]:py-1.5
              [&_button]:text-xs
              [&_button]:font-medium
              
              /* Hover Effects */
              [&_button:hover]:bg-emerald-500/10
              [&_button:hover]:text-emerald-400
              [&_button:hover]:border-emerald-500/20
              [&_button]:transition-all
            "
            style={{
              maskImage: "linear-gradient(to right, transparent, black 24px, black 90%, transparent)",
            }}
          >
            <MessageSuggestions initialSuggestions={defaultSuggestions}>
              <MessageSuggestionsList className="flex gap-2 px-2" />
            </MessageSuggestions>
          </div>

        </div>
      </ThreadContainer>

      {/* Sidebar Right */}
      {historyPosition === "right" && threadHistorySidebar}
    </div>
  );
});

MessageThreadFull.displayName = "MessageThreadFull";