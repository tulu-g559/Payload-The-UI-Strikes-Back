"use client";

import React from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

// Lazily load the heavy chat overlay (TamboProvider + collapsible UI)
// so it doesn't block the main page from rendering.
const ChatOverlay = dynamic(
  () => import("@/components/tambo/chat-overlay").then((m) => m.ChatOverlay),
  {
    ssr: false,
  },
);

export function Providers({ children }: { children: React.ReactNode }) {
  const [showOverlay, setShowOverlay] = React.useState(false);
  const pathname = usePathname();

  // Mount the overlay only after the app has hydrated on the client.
  React.useEffect(() => {
    setShowOverlay(true);
  }, []);

  // Only show ChatOverlay on the homepage
  const isHomepage = pathname === "/";

  return (
    <>
      {children}
      {showOverlay && isHomepage && <ChatOverlay />}
    </>
  );
}

