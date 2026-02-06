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
  MessageInputMcpConfigButton
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

/**
 * Props for the MessageThreadFull component
 */
export interface MessageThreadFullProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: VariantProps<typeof messageVariants>["variant"];
}

/**
 * A full-screen chat thread component with message history, input, and suggestions
 */
export const MessageThreadFull = React.forwardRef<
  HTMLDivElement,
  MessageThreadFullProps
>(({ className, variant, ...props }, ref) => {
  const { containerRef, historyPosition } = useThreadContainerContext();
  const mergedRef = useMergeRefs<HTMLDivElement | null>(ref, containerRef);

  // Sidebar Component - Dark & Transparent
  const threadHistorySidebar = (
    <ThreadHistory position={historyPosition} className="bg-black/20 backdrop-blur-sm border-white/5">
      <ThreadHistoryHeader />
      <ThreadHistoryNewButton />
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
    {
      id: "suggestion-3",
      title: "Add Client",
      detailedSuggestion: "Add a new client profile for John Doe.",
      messageId: "client-query",
    },
  ];

  


  return (
  <div className="relative flex h-full w-full overflow-hidden bg-[#050505]">

    {/* ───────── Ambient Green Glow (Global) ───────── */}
    <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-emerald-500/25 blur-[120px] rounded-full pointer-events-none" />
    <div className="absolute bottom-[-30%] left-[-20%] w-[400px] h-[400px] bg-green-500/20 blur-[140px] rounded-full pointer-events-none" />

    {/* 1. Sidebar (Left) */}
    {historyPosition === "left" && threadHistorySidebar}

    {/* 2. Main Chat Area */}
    <ThreadContainer
      ref={mergedRef}
      disableSidebarSpacing
      className={cn(
        "relative flex-1 flex flex-col",
        "bg-transparent",
        className
      )}
      {...props}
    >
      {/* ───────── Subtle Grid / Texture Layer ───────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(16,185,129,0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16,185,129,0.12) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(circle at top right, black 0%, black 40%, transparent 75%)",
        }}
      />

      {/* ───────── Messages Area ───────── */}
      <ScrollableMessageContainer
        className="relative z-10 flex-1 px-4 md:px-6 pt-6 scroll-smooth"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 32px)",
        }}
      >
        <ThreadContent variant={variant}>
          <ThreadContentMessages
            className="
              max-w-4xl mx-auto
              font-light text-[15 px]
              text-white/90
              leading-relaxed
            "
          />
        </ThreadContent>
      </ScrollableMessageContainer>

      {/* ───────── Input + Controls Dock ───────── */}
    <div className="relative z-10 w-full px-4 pb-6 md:px-8">

      {/* Status */}
      <div className="max-w-4xl mx-auto px-2 mb-2">
        <MessageSuggestions>
          <MessageSuggestionsStatus
            className="text-[10px] tracking-widest uppercase text-emerald-500/80 font-mono font-bold"
          />
        </MessageSuggestions>
      </div>

      {/* Input Capsule */}
      <div className="max-w-4xl mx-auto w-full">
        <MessageInput>
          <div
            className={cn(
              "group relative flex items-center gap-2",
              "rounded-4xl", /* Capsule Shape */
              "bg-black",   /* Deep Dark Background */
              "border border-white/10",
              "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]",
              "transition-all duration-300",
              "focus-within:border-emerald-500/50",
              "focus-within:ring-1",
              "focus-within:ring-emerald-500/20"
            )}
          >
            {/* Text Area */}
            <MessageInputTextarea
              placeholder="Ask anything..."
              className="
                flex-1 min-h-11 md:min-h-[52px] max-h-[200px]
                py-3 md:py-4 pl-4 md:pl-6 pr-2
                bg-transparent 
                border-0 
                resize-none 
                outline-none 
                shadow-none
                text-white
                placeholder:text-zinc-500
                font-light text-[15px]
                leading-relaxed
                focus-visible:ring-0 
                focus:ring-0
              "
            />

            {/* Toolbar */}
            <MessageInputToolbar className="flex items-center gap-1 pr-3 py-2">
              
              {/* Left Icon Group */}
              <div className="flex items-center gap-1 border-r border-white/10 pr-2 mr-2">
                <MessageInputFileButton
                  className="
                    h-9 w-9 rounded-full p-2
                    bg-white/5
                    text-emerald-500
                    hover:text-emerald-400
                    transition-colors
                    outline-none
                    focus:outline-none
                    focus:ring-0
                    focus-visible:ring-0
                    focus-visible:outline-none
                  "
                />
                <MessageInputMcpPromptButton
                  className="
                    h-9 w-9 rounded-full p-2
                    text-zinc-800
                    hover:text-emerald-400
                    transition-colors
                    outline-none
                    focus:outline-none
                    focus:ring-0
                    focus-visible:ring-0
                    focus-visible:outline-none
                  "
                />
              </div>

              {/* Right Icon Group */}
              <MessageInputMcpResourceButton
                className="
                  h-9 w-9 rounded-full p-2
                  text-zinc-400
                  hover:text-emerald-400
                  transition-colors
                  outline-none
                  focus:outline-none
                  focus:ring-0
                  focus-visible:ring-0
                  focus-visible:outline-none
                "
              />

              {/* Send Button */}
              <MessageInputSubmitButton
                className="
                  ml-2 h-10 w-10 rounded-full
                  bg-emerald-500 hover:bg-emerald-400
                  text-black
                  shadow-[0_0_15px_rgba(16,185,129,0.4)]
                  transition-all
                  hover:scale-105 active:scale-95
                  flex items-center justify-center
                  outline-none
                  focus:outline-none
                  focus:ring-0
                  focus-visible:ring-0
                  focus-visible:outline-none
                "
              />
            </MessageInputToolbar>
          </div>

      <MessageInputError className="text-red-400 text-xs mt-2 ml-4 font-mono font-bold" />
    </MessageInput>
  </div>

  {/* Suggestions Pills */}
  {/* The [&_button] classes force the inner buttons to be White BG / Black Text */}
  <div
    className="
      max-w-4xl mx-auto mt-4 overflow-x-auto pb-1 no-scrollbar
      [&_button]:bg-emerald-950
      [&_button]:text-shadow-gray-200
      [&_button]:border-none 
      [&_button]:font-medium 
      [&_button]:shadow-lg
      [&_button]:hover:opacity-90 
      [&_button]:hover:scale-[1.02]
      [&_button]:transition-transform
    "
    style={{
      maskImage: "linear-gradient(to right, transparent, black 24px, black 90%, transparent)",
    }}
  >
    <MessageSuggestions initialSuggestions={defaultSuggestions}>
      <MessageSuggestionsList className="flex gap-3 px-2" />
    </MessageSuggestions>
  </div>
</div>
    </ThreadContainer>

    {/* 3. Sidebar (Right) */}
    {historyPosition === "right" && threadHistorySidebar}
  </div>
);

});
MessageThreadFull.displayName = "MessageThreadFull";