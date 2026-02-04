"use client";

import {
  MessageInput,
  MessageInputSubmitButton,
  MessageInputTextarea,
  MessageInputToolbar,
} from "@/components/tambo/message-input";
import { ScrollableMessageContainer } from "@/components/tambo/scrollable-message-container";
import {
  ThreadContent,
  ThreadContentMessages,
} from "@/components/tambo/thread-content";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { SettingsPanel } from "./components/settings-panel";

export default function InteractablesPage() {
  const [isChatOpen, setIsChatOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      
      {/* ───────────────── Chat Sidebar ───────────────── */}
      <aside
        className={`${
          isChatOpen ? "w-80" : "w-0"
        } relative border-r border-border bg-card transition-all duration-300 flex flex-col`}
      >
        {isChatOpen && (
          <>
            <div className="p-4 border-b border-border">
              <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                AI Assistant
              </h2>
            </div>

            <ScrollableMessageContainer className="flex-1 p-4">
              <ThreadContent variant="default">
                <ThreadContentMessages />
              </ThreadContent>
            </ScrollableMessageContainer>

            <div className="p-4 border-t border-border">
              <MessageInput variant="bordered">
                <MessageInputTextarea placeholder="Update the settings…" />
                <MessageInputToolbar>
                  <MessageInputSubmitButton />
                </MessageInputToolbar>
              </MessageInput>
            </div>
          </>
        )}

        {/* Toggle */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="absolute -right-10 top-1/2 -translate-y-1/2 bg-card border border-border rounded-r-lg p-2 hover:bg-muted transition-colors"
        >
          {isChatOpen ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </aside>

      {/* ───────────────── Main Content ───────────────── */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-4xl mx-auto animate-in-smart">
          <SettingsPanel />
        </div>
      </main>
    </div>
  );
}
