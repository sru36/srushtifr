"use client";

import React from "react";
import Link from "next/link";

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 backdrop-blur-xl bg-[#0d0c0e]/85 border-b border-[#f7c2d1]/20 shadow-[0_4px_20px_rgba(219,72,118,0.08)] transition-all duration-300">
      <Link href="#hero" className="flex items-center gap-2.5 group">
        <span className="font-serif italic font-bold text-xl tracking-tight text-white group-hover:text-[#f7c2d1] transition-colors drop-shadow-sm flex items-center gap-1.5">
          <span className="text-[#f7c2d1] not-italic text-sm">✦</span>
          Srushti Rawal
        </span>
        <span className="font-pixel text-[9px] px-2 py-0.5 rounded bg-[#db4876]/20 text-[#f7c2d1] tracking-wider border border-[#f7c2d1]/40 shadow-[0_0_8px_rgba(247,194,209,0.2)]">
          AI/DS &apos;28
        </span>
      </Link>

      <ul className="flex items-center gap-6 md:gap-8 list-none">
        {["about", "tech", "projects", "achievements"].map((item) => (
          <li key={item} className="hidden sm:block">
            <Link
              href={`#${item}`}
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/75 hover:text-[#f7c2d1] transition-all duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#f7c2d1] hover:after:w-full after:transition-all after:duration-200"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
