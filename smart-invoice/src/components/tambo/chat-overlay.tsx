 "use client";

import { TamboProvider } from "@tambo-ai/react";
import { components } from "@/lib/tambo";
import { MessageThreadCollapsible } from "@/components/tambo/message-thread-collapsible";

/**
 * Lightweight wrapper that mounts the Tambo chat overlay.
 * This is loaded lazily from the main Providers component
 * so the heavy Tambo SDK and chat UI don't block initial page load.
 */
export function ChatOverlay() {
  return (
    <TamboProvider
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY ?? ""}
      components={components}
    >
      {/* Collapsible AI UI lives globally */}
      <MessageThreadCollapsible />
    </TamboProvider>
  );
}

