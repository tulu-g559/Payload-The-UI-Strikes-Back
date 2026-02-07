"use client";

import { cn } from "@/lib/utils";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  type TamboThread,
  useTamboThread,
  useTamboThreadList,
} from "@tambo-ai/react";
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Sparkles,
  MessageSquare,
  Clock
} from "lucide-react";
import React, { useMemo } from "react";

/**
 * Context for sharing thread history state and functions
 */
interface ThreadHistoryContextValue {
  threads: { items?: TamboThread[] } | null | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<unknown>;
  currentThread: TamboThread;
  switchCurrentThread: (threadId: string) => void;
  startNewThread: () => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  onThreadChange?: () => void;
  position?: "left" | "right";
  updateThreadName: (newName: string, threadId?: string) => Promise<void>;
  generateThreadName: (threadId: string) => Promise<TamboThread>;
}

const ThreadHistoryContext = React.createContext<ThreadHistoryContextValue | null>(null);

const useThreadHistoryContext = () => {
  const context = React.useContext(ThreadHistoryContext);
  if (!context) {
    throw new Error("ThreadHistory components must be used within ThreadHistory");
  }
  return context;
};

/**
 * Root component that provides context for thread history
 */
interface ThreadHistoryProps extends React.HTMLAttributes<HTMLDivElement> {
  onThreadChange?: () => void;
  children?: React.ReactNode;
  defaultCollapsed?: boolean;
  position?: "left" | "right";
}

const ThreadHistory = React.forwardRef<HTMLDivElement, ThreadHistoryProps>(
  (
    {
      className,
      onThreadChange,
      defaultCollapsed = false, // Defaults to open for better UX on desktop
      position = "left",
      children,
      ...props
    },
    ref,
  ) => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
    const [shouldFocusSearch, setShouldFocusSearch] = React.useState(false);

    const { data: threads, isLoading, error, refetch } = useTamboThreadList();

    const {
      switchCurrentThread,
      startNewThread,
      thread: currentThread,
      updateThreadName,
      generateThreadName,
    } = useTamboThread();

    // Update CSS variable when sidebar collapses/expands
    React.useEffect(() => {
      const sidebarWidth = isCollapsed ? "4rem" : "18rem"; // Adjusted widths
      document.documentElement.style.setProperty("--sidebar-width", sidebarWidth);
    }, [isCollapsed]);

    // Focus search input when expanded from collapsed state
    React.useEffect(() => {
      if (!isCollapsed && shouldFocusSearch) {
        setShouldFocusSearch(false);
      }
    }, [isCollapsed, shouldFocusSearch]);

    const contextValue = React.useMemo(
      () => ({
        threads,
        isLoading,
        error,
        refetch,
        currentThread,
        switchCurrentThread,
        startNewThread,
        searchQuery,
        setSearchQuery,
        isCollapsed,
        setIsCollapsed,
        onThreadChange,
        position,
        updateThreadName,
        generateThreadName,
      }),
      [
        threads,
        isLoading,
        error,
        refetch,
        currentThread,
        switchCurrentThread,
        startNewThread,
        searchQuery,
        isCollapsed,
        onThreadChange,
        position,
        updateThreadName,
        generateThreadName,
      ],
    );

    return (
      <ThreadHistoryContext.Provider value={contextValue as ThreadHistoryContextValue}>
        <div
          ref={ref}
          className={cn(
            // THEME: Dark background, subtle border
            "h-full transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] flex-none bg-[#050505]",
            position === "left" ? "border-r border-white/5" : "border-l border-white/5",
            isCollapsed ? "w-16" : "w-72", // Slightly wider for better readability
            className,
          )}
          {...props}
        >
          <div
            className={cn(
              "flex flex-col h-full",
              isCollapsed ? "px-2 py-4" : "p-4",
            )}
          >
            {children}
          </div>
        </div>
      </ThreadHistoryContext.Provider>
    );
  },
);
ThreadHistory.displayName = "ThreadHistory";

/**
 * Header component with title and collapse toggle
 */
const ThreadHistoryHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isCollapsed, setIsCollapsed, position = "left" } = useThreadHistoryContext();

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center mb-6 relative h-8",
        isCollapsed ? "justify-center" : "justify-between",
        className,
      )}
      {...props}
    >
      <h2
        className={cn(
          // TYPOGRAPHY: Elegant, spaced out header
          "text-xs font-bold uppercase tracking-widest text-emerald-500/80 whitespace-nowrap",
          isCollapsed
            ? "opacity-0 absolute pointer-events-none"
            : "opacity-100 transition-opacity duration-300 delay-100",
        )}
      >
        History
      </h2>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          // BUTTON: Ghost styling
          "p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer",
          !isCollapsed && "absolute right-0"
        )}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ArrowRightToLine
            className={cn("h-4 w-4", position === "right" && "rotate-180")}
          />
        ) : (
          <ArrowLeftToLine
            className={cn("h-4 w-4", position === "right" && "rotate-180")}
          />
        )}
      </button>
    </div>
  );
});
ThreadHistoryHeader.displayName = "ThreadHistory.Header";

/**
 * Button to create a new thread
 */
const ThreadHistoryNewButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ ...props }, ref) => {
  const { isCollapsed, startNewThread, refetch, onThreadChange } = useThreadHistoryContext();

  const handleNewThread = React.useCallback(
    async (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      try {
        await startNewThread();
        await refetch();
        onThreadChange?.();
      } catch (error) {
        console.error("Failed to create new thread:", error);
      }
    },
    [startNewThread, refetch, onThreadChange],
  );

  return (
  <button
    ref={ref}
    onClick={handleNewThread}
    className={cn(
      "flex flex-row items-center leading-none rounded-xl mb-6 transition-all duration-200 cursor-pointer group",
      "border border-dashed border-white/10 hover:border-emerald-500/50 hover:bg-emerald-950/20",
      isCollapsed
        ? "p-3 justify-center aspect-square"
        : "px-3 py-2.5 gap-2 w-full"
    )}
    title="New thread"
    {...props}
  >
    {/* Icon */}
    <div
      className={cn(
        "flex items-center justify-center h-5 w-5 rounded-md text-emerald-500 transition-colors",
        !isCollapsed && "bg-emerald-500/10"
      )}
    >
      <Plus className="h-4 w-4" />
    </div>

    {/* Text */}
    <span
      className={cn(
        "text-sm font-medium text-gray-300 whitespace-nowrap group-hover:text-emerald-400 transition-colors",
        isCollapsed
          ? "opacity-0 scale-x-0 origin-left"
          : "opacity-100 scale-x-100"
      )}
    >
      New Invoice Chat
    </span>
  </button>
  );
});
ThreadHistoryNewButton.displayName = "ThreadHistory.NewButton";

/**
 * Search input for filtering threads
 */
const ThreadHistorySearch = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isCollapsed, setIsCollapsed, searchQuery, setSearchQuery } = useThreadHistoryContext();
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const expandOnSearch = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300);
    }
  };

  return (
    <div ref={ref} className={cn("mb-2 relative", className)} {...props}>
      {/* Collapsed Icon */}
      <button
        onClick={expandOnSearch}
        className={cn(
          "p-2 hover:bg-white/5 hover:text-emerald-400 rounded-lg cursor-pointer absolute left-1/2 -translate-x-1/2 transition-all",
          isCollapsed
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-90 pointer-events-none",
        )}
        title="Search threads"
      >
        <Search className="h-4 w-4 text-gray-500" />
      </button>

      {/* Expanded Input */}
      <div
        className={cn(
          "relative transition-all duration-300",
          isCollapsed
            ? "opacity-0 translate-x-[-10px] pointer-events-none"
            : "opacity-100 translate-x-0",
        )}
      >
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-3.5 w-3.5 text-gray-500" />
        </div>
        <input
          ref={searchInputRef}
          type="text"
          className="pl-9 pr-4 py-2 w-full text-xs font-medium rounded-lg bg-[#0A0A0A] border border-white/5 focus:border-emerald-500/30 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none text-gray-300 placeholder:text-gray-600 transition-all"
          placeholder="Search history..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
});
ThreadHistorySearch.displayName = "ThreadHistory.Search";

/**
 * List of thread items
 */
const ThreadHistoryList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const {
    threads,
    isLoading,
    error,
    isCollapsed,
    searchQuery,
    currentThread,
    switchCurrentThread,
    onThreadChange,
    updateThreadName,
    generateThreadName,
    refetch,
  } = useThreadHistoryContext();

  const [editingThread, setEditingThread] = React.useState<TamboThread | null>(null);
  const [newName, setNewName] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Focus input when entering edit mode
  React.useEffect(() => {
    if (editingThread) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [editingThread]);

  // Click outside to close edit
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editingThread && inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setEditingThread(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [editingThread]);

  const filteredThreads = useMemo(() => {
    if (!threads?.items) return [];
    const query = searchQuery.toLowerCase();
    return threads.items.filter((thread: TamboThread) => {
      const nameMatches = thread.name?.toLowerCase().includes(query) ?? false;
      return nameMatches;
    });
  }, [threads, searchQuery]);

  const handleSwitchThread = async (threadId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      switchCurrentThread(threadId);
      onThreadChange?.();
    } catch (error) {
      console.error("Failed to switch thread:", error);
    }
  };

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingThread) return;
    try {
      await updateThreadName(newName, editingThread.id);
      await refetch();
      setEditingThread(null);
    } catch (error) {
      console.error("Failed to rename thread:", error);
    }
  };

  // Content Logic
  let content;
  if (isLoading) {
    content = <div className="text-xs text-gray-600 p-2 animate-pulse">Loading...</div>;
  } else if (error) {
    content = <div className="text-xs text-red-500/50 p-2">Failed to load</div>;
  } else if (filteredThreads.length === 0) {
    content = <div className="text-xs text-gray-700 p-2 italic">{searchQuery ? "No matches" : "Empty history"}</div>;
  } else {
    content = (
      <div className="space-y-1">
        {filteredThreads.map((thread: TamboThread) => {
          const isActive = currentThread?.id === thread.id;
          return (
            <div
              key={thread.id}
              onClick={async () => await handleSwitchThread(thread.id)}
              className={cn(
                "group relative p-2 rounded-lg cursor-pointer transition-all duration-200 border border-transparent",
                isActive 
                    ? "bg-white/5 border-white/5 shadow-lg shadow-black/40" 
                    : "hover:bg-white/5 hover:border-white/5",
              )}
            >
                {/* Active Indicator Strip */}
                {isActive && (
                    <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-emerald-500 rounded-r-full" />
                )}

              <div className="flex items-center gap-3">
                <div className={cn(
                    "shrink-0",
                    isActive ? "text-emerald-500" : "text-gray-600 group-hover:text-gray-400"
                )}>
                    <MessageSquare size={16} />
                </div>

                <div className={cn("flex-1 min-w-0", isCollapsed && "hidden")}>
                  {editingThread?.id === thread.id ? (
                    <form onSubmit={handleNameSubmit}>
                      <input
                        ref={inputRef}
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full bg-[#050505] text-white px-1 py-0.5 text-sm rounded border border-emerald-500/50 focus:outline-none"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </form>
                  ) : (
                    <>
                      <div className={cn(
                        "text-sm font-medium truncate transition-colors",
                        isActive ? "text-white" : "text-gray-400 group-hover:text-gray-200"
                      )}>
                        {thread.name || "Untitled Invoice"}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-gray-600">
                        <Clock size={10} />
                        {new Date(thread.createdAt).toLocaleDateString(undefined, {
                            month: 'short', day: 'numeric'
                        })}
                      </div>
                    </>
                  )}
                </div>

                {/* Dropdown Menu - Only show when expanded */}
                {!isCollapsed && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ThreadOptionsDropdown
                        thread={thread}
                        onRename={(t) => { setEditingThread(t); setNewName(t.name || ""); }}
                        />
                    </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-y-auto flex-1 transition-all duration-300 no-scrollbar mt-2",
        isCollapsed && "overflow-hidden px-1", // Tighten padding when collapsed
        className
      )}
      {...props}
    >
      {content}
    </div>
  );
});
ThreadHistoryList.displayName = "ThreadHistory.List";

/**
 * Dropdown menu component for thread actions
 */
const ThreadOptionsDropdown = ({
  thread,
  onRename,
}: {
  thread: TamboThread;
  onRename: (thread: TamboThread) => void;
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="p-1 hover:bg-white/10 rounded-md text-gray-500 hover:text-white transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[160px] bg-[#0A0A0A] rounded-xl p-1 shadow-2xl border border-white/10 text-gray-300 z-[9999]"
          sideOffset={5}
          align="end"
        >
          <DropdownMenu.Item
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium hover:bg-white/10 hover:text-white rounded-lg cursor-pointer outline-none transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onRename(thread);
            }}
          >
            <Pencil className="h-3.5 w-3.5 text-gray-500" />
            Rename Chat
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export {
  ThreadHistory,
  ThreadHistoryHeader,
  ThreadHistoryList,
  ThreadHistoryNewButton,
  ThreadHistorySearch,
  ThreadOptionsDropdown,
};