"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface RibbonBannerProps {
  theme?: "charcoal" | "gradient";
  reverse?: boolean;
  items?: string[];
}

const DEFAULT_ITEMS = [
  "ARCHITECTING INTELLIGENT SYSTEMS",
  "CURATING DIGITAL ELEGANCE",
  "BTECH ARTIFICIAL INTELLIGENCE & DATA SCIENCE 2028",
  "FRONTEND · DATA · AI · DESIGN",
];

export const RibbonBanner: React.FC<RibbonBannerProps> = ({
  theme = "charcoal",
  reverse = false,
  items = DEFAULT_ITEMS,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Guaranteed smooth infinite horizontal marquee with GSAP
    const tween = gsap.fromTo(
      track,
      { xPercent: reverse ? -50 : 0 },
      {
        xPercent: reverse ? 0 : -50,
        ease: "none",
        duration: 22,
        repeat: -1,
      }
    );

    return () => {
      tween.kill();
    };
  }, [reverse]);

  // Repeat items 4 times so it loops seamlessly on all screen widths
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`relative w-full overflow-hidden py-3.5 border-y border-white/20 shadow-lg z-20 select-none ${
        theme === "charcoal"
          ? "bg-[#18161a] text-[#faf7f5] -rotate-[0.6deg] scale-[1.02]"
          : "bg-gradient-to-r from-[#1d1b1e] via-[#db4876] to-[#1d1b1e] text-white rotate-[0.6deg] scale-[1.02]"
      }`}
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform"
        style={{ width: "max-content" }}
      >
        {repeated.map((item, idx) => (
          <span
            key={idx}
            className="font-serif italic font-bold text-sm md:text-base px-6 sm:px-8 inline-flex items-center gap-4 sm:gap-6 tracking-wide shrink-0"
          >
            {item} <span className="not-italic text-[#f7c2d1] text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};
