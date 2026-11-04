"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LiveClock = dynamic(() => import("./LiveClock"), {
  ssr: false,
  loading: () => (
    <div className="font-mono text-xs text-[var(--palette-raspberry)] mt-2 font-medium">
      IST Local Time
    </div>
  ),
});

export const BentoGlance: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          Array.from(gridRef.current.children),
          { y: 40, opacity: 0 },
          {
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
            },
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: "power2.out",
          }
        );
      }
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="bento" className="py-24 px-6 md:px-12 bg-[#0d0c0e] border-y border-white/10 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif italic font-black text-3xl sm:text-4xl text-white">
            Curated <em>Overview</em>
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-[#ffd6e2] mt-2">
            At a glance — background, philosophy &amp; coordinates
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Tile 1: Name & Role */}
          <div className="md:col-span-4 bg-black/40 text-white p-7 rounded-2xl flex flex-col justify-between min-h-[180px] shadow-lg border border-white/15 backdrop-blur-sm">
            <div>
              <h3 className="font-serif font-black text-3xl leading-tight">
                Srushti<br />Rawal
              </h3>
              <p className="font-pixel text-[10px] text-[#f7c2d1] tracking-wider mt-2">
                AI &amp; Data Science Undergrad · Class of 2028
              </p>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--palette-raspberry)] animate-pulse" />
          </div>

          {/* Tile 2: Status */}
          <div className="md:col-span-4 bg-black/25 text-white p-7 rounded-2xl border border-white/15 flex flex-col justify-between backdrop-blur-sm shadow-md">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/70">
              Current Status
            </span>
            <div>
              <div className="text-sm font-bold text-green-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                Open to Work &amp; Collaborations
              </div>
              <p className="text-xs text-white/80 mt-2 leading-relaxed">
                Available for frontend engineering, AI/data internships &amp; select freelance projects.
              </p>
            </div>
          </div>

          {/* Tile 3: Coordinates */}
          <div className="md:col-span-4 bg-black/25 text-white p-7 rounded-2xl border border-white/15 flex flex-col justify-between backdrop-blur-sm shadow-md">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/70">
              Coordinates
            </span>
            <div>
              <div className="font-serif italic font-bold text-2xl text-white">
                Gwalior, India
              </div>
              <LiveClock />
            </div>
          </div>

          {/* Tile 4: Mantra Quote */}
          <div className="md:col-span-6 bg-[#7e4156] text-white p-7 rounded-2xl flex flex-col justify-between min-h-[170px] shadow-lg border border-white/20">
            <p className="font-serif italic text-lg sm:text-xl leading-relaxed">
              &ldquo;Ideas are great. Building them is better. Be inventive, be unusual.&rdquo;
            </p>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#f7c2d1] mt-3">
              — Srushti&apos;s Creative Philosophy
            </span>
          </div>

          {/* Tile 5: Education */}
          <div className="md:col-span-6 bg-black/25 text-white p-7 rounded-2xl border border-white/15 flex flex-col justify-between backdrop-blur-sm shadow-md">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/70">
              Academics
            </span>
            <div>
              <div className="font-serif italic font-bold text-xl text-white">
                ITM University
              </div>
              <p className="text-xs text-white/80 mt-1">
                B.Tech in Artificial Intelligence &amp; Data Science
              </p>
              <div className="font-pixel text-[10px] text-[#f7c2d1] mt-3">
                Expected Graduation: 2028 · Design, Frontend, Data &amp; AI
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
