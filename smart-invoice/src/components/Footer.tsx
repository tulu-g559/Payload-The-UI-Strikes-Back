"use client";

import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#050505]/95 backdrop-blur-sm py-8 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Left: Name */}
          <div className="text-center sm:text-left">
            <p className="text-white font-light text-xl sm:text-3xl playfair-display-500">
              Arnab Ghosh
            </p>
          </div>

          {/* Center: Social Links */}
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/tulu-g559/Payload-The-UI-Strikes-Back/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-emerald-400 transition-colors"
              title="GitHub"
            >
              <Github size={20} />
            </Link>
            <Link
              href="https://linkedin.com/arnab-g"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-emerald-400 transition-colors"
              title="LinkedIn"
            >
              <Linkedin size={20} />
            </Link>
          </div>

          {/* Right: Copyright */}
          <div className="text-center sm:text-right">
            <p className="text-gray-500 text-xs sm:text-sm font-light">
              © 2026 Payload. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
