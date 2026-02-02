"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { TamboProvider } from "@tambo-ai/react";
import { components } from "@/lib/tambo";
import { MessageThreadCollapsible } from "@/components/tambo/message-thread-collapsible";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TamboProvider
          apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY ?? ""}
          components={components}
        >
          {children}

          {/* Collapsible AI UI lives globally */}
          <MessageThreadCollapsible />
        </TamboProvider>
      </body>
    </html>
  );
}
