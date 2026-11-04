"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const PRELOADER_PHRASES = [
  "Architecting intelligent systems.",
  "Curating digital elegance.",
  "Synthesizing data & design.",
  "Initializing canvas springs.",
  "Ready.",
];

export const Preloader: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % PRELOADER_PHRASES.length);
    }, 450);

    const timer = setTimeout(() => {
      clearInterval(interval);
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 0.98,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: () => setIsVisible(false),
        });
      }
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.28, ease: "power2.out" }
      );
    }
  }, [index]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-6 bg-[#0d0c0e] text-white"
    >
      <div className="font-pixel text-[11px] uppercase tracking-[0.25em] text-[#e6a3b6] opacity-90">
        ✦ Srushti Rawal · Portfolio ✦
      </div>

      <div className="h-14 overflow-hidden text-center">
        <div
          ref={textRef}
          className="font-serif italic text-2xl md:text-4xl font-bold text-[#faf7f5]"
        >
          {PRELOADER_PHRASES[index]}
        </div>
      </div>

      <div className="w-52 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#db4876] to-[#f7c2d1] animate-[loaderFill_1.8s_ease_forwards]"
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};
