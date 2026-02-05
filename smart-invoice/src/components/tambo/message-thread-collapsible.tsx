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
import {
  ThreadContent,
  ThreadContentMessages,
} from "@/components/tambo/thread-content";
import { ThreadDropdown } from "@/components/tambo/thread-dropdown";
import { cn } from "@/lib/utils";
import { type Suggestion } from "@tambo-ai/react";
import { type VariantProps } from "class-variance-authority";
import { MessageSquare, XIcon, Sparkles } from "lucide-react"; // Added Icons
import { Collapsible } from "radix-ui";
import * as React from "react";


/**
 * Props for the MessageThreadCollapsible component
 */
export interface MessageThreadCollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  variant?: VariantProps<typeof messageVariants>["variant"];
  height?: string;
  maxHeight?: string;
}

/**
 * Custom hook for collapsible state
 */
const useCollapsibleState = (defaultOpen = false) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const [isMobile, setIsMobile] = React.useState(false);
  
  const isMac = typeof navigator !== "undefined" && navigator.platform.startsWith("Mac");
  const shortcutText = isMac ? "⌘K" : "Ctrl+K";

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return { isOpen, setIsOpen, shortcutText, isMobile };
};

/**
 * Container component
 */
const CollapsibleContainer = React.forwardRef<
  HTMLDivElement,
  { isOpen: boolean; onOpenChange: (open: boolean) => void; isMobile?: boolean } & React.HTMLAttributes<HTMLDivElement>
>(({ className, isOpen, onOpenChange, children, isMobile, ...props }, ref) => (
  <Collapsible.Root
    ref={ref}
    open={isOpen}
    onOpenChange={onOpenChange}
    className={cn(
      // POSITIONING: Bottom Right
      "fixed z-[9999] transition-all duration-300 ease-in-out",
      isOpen 
        ? "bottom-8 right-8 w-[calc(100vw-2rem)] sm:w-[450px] shadow-2xl shadow-emerald-500/10" 
        : "bottom-8 right-8 w-auto shadow-lg",
      
      // THEME: Dark Glassmorphic Card
      isOpen && "bg-[#0A0A0A]/95 border border-emerald-500/20 rounded-2xl backdrop-blur-md",
      
      // MOBILE: Full screen-ish on mobile
      isMobile && isOpen && "bottom-0 right-0 left-0 w-full h-[85vh] rounded-b-none border-b-0",
      
      className
    )}
    {...props}
  >
    {children}
  </Collapsible.Root>
));
CollapsibleContainer.displayName = "CollapsibleContainer";

/**
 * Trigger component
 */
const CollapsibleTrigger = ({
  isOpen,
  shortcutText,
  onClose,
  onThreadChange,
  config,
  isMobile = false,
}: {
  isOpen: boolean;
  shortcutText: string;
  onClose: () => void;
  onThreadChange: () => void;
  config: { labels: { openState: string; closedState: string } };
  isMobile?: boolean;
}) => (
  <>
    {/* CLOSED STATE: Floating Action Button Style */}
    {!isOpen && (
      <Collapsible.Trigger asChild>
        <button
          className={cn(
            "group flex items-center gap-3",
            "px-6 py-4",
            "bg-emerald-500 hover:bg-emerald-400 text-black font-bold",
            "rounded-full shadow-lg shadow-emerald-500/20",
            "transition-all hover:scale-105 active:scale-95"
          )}
        >
          <MessageSquare size={20} className="fill-black" />
          <span className="text-sm font-bold tracking-wide">{config.labels.closedState}</span>
          {!isMobile && (
            <span className="ml-2 text-[10px] opacity-60 bg-black/10 px-2 py-0.5 rounded font-mono">
              {shortcutText}
            </span>
          )}
        </button>
      </Collapsible.Trigger>
    )}

    {/* OPEN STATE: Header Bar */}
    {isOpen && (
      <div className="flex items-center justify-between w-full p-4 border-b border-white/5 bg-white/5 rounded-t-2xl">
        <div className="flex items-center gap-2 min-w-0 flex-1 text-emerald-500">
           <div className="p-1.5 bg-emerald-500/10 rounded-md">
             <Sparkles size={16} />
           </div>
           <span className="text-sm font-bold text-white tracking-wide">{config.labels.openState}</span>
           <div className="ml-2 scale-90 opacity-80">
              <ThreadDropdown onThreadChange={onThreadChange} />
           </div>
        </div>
        
        <button
          className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <XIcon size={18} />
        </button>
      </div>
    )}
  </>
);
CollapsibleTrigger.displayName = "CollapsibleTrigger";


export const MessageThreadCollapsible = React.forwardRef<
  HTMLDivElement,
  MessageThreadCollapsibleProps
>(
  (
    { className, defaultOpen = false, variant, height, maxHeight, ...props },
    ref,
  ) => {
    const { isOpen, setIsOpen, shortcutText, isMobile } = useCollapsibleState(defaultOpen);

    // Height calculation
    const effectiveHeight = height ?? maxHeight ?? (isMobile ? "calc(85vh - 130px)" : "600px");

    const handleThreadChange = React.useCallback(() => {
      setIsOpen(true);
    }, [setIsOpen]);

    const THREAD_CONFIG = {
      labels: {
        openState: "AI Assistant",
        closedState: "Create your Invoice with chat",
      },
    };

    const defaultSuggestions: Suggestion[] = [
      { id: "1", title: "Create Invoice", detailedSuggestion: "Create an invoice for web development services...", messageId: "q1" },
      { id: "2", title: "Add Client", detailedSuggestion: "Add a new client called Acme Corp...", messageId: "q2" },
      { id: "3", title: "Features", detailedSuggestion: "What can you do?", messageId: "q3" },
    ];

    return (
      <CollapsibleContainer
        ref={ref}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        isMobile={isMobile}
        className={className}
        {...props}
      >
        <CollapsibleTrigger
          isOpen={isOpen}
          shortcutText={shortcutText}
          onClose={() => setIsOpen(false)}
          onThreadChange={handleThreadChange}
          config={THREAD_CONFIG}
          isMobile={isMobile}
        />
        <Collapsible.Content>
          <div
            className="relative overflow-hidden rounded-2xl bg-background border border-border shadow-xl"
            style={{ height: effectiveHeight }}
          >
            {/* Soft emerald texture in the background */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage: `
                  radial-gradient(circle at top right, rgba(16,185,129,0.28), transparent 55%),
                  radial-gradient(circle at bottom left, rgba(16,185,129,0.18), transparent 60%)
                `,
              }}
            />

            <div className="relative z-10 flex flex-col h-full">
              {/* Messages */}
              <ScrollableMessageContainer className="p-4 flex-1">
                <ThreadContent variant={variant}>
                  <ThreadContentMessages />
                </ThreadContent>
              </ScrollableMessageContainer>

              {/* Status */}
              <div className="px-4 pb-2">
                <MessageSuggestions>
                  <MessageSuggestionsStatus />
                </MessageSuggestions>
              </div>

              {/* Input */}
              <div className="px-4 pb-4">
                <MessageInput>
                  <MessageInputTextarea placeholder="Ask anything about your invoice…" />
                  <MessageInputToolbar className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {/* Re‑enable attach image while keeping UI compact */}
                      <MessageInputFileButton />
                    </div>
                    <MessageInputSubmitButton />
                  </MessageInputToolbar>
                  <MessageInputError />
                </MessageInput>
              </div>

              {/* Suggestions */}
              <MessageSuggestions initialSuggestions={defaultSuggestions}>
                <MessageSuggestionsList />
              </MessageSuggestions>
            </div>
          </div>
        </Collapsible.Content>

      </CollapsibleContainer>
    );
  },
);
MessageThreadCollapsible.displayName = "MessageThreadCollapsible";