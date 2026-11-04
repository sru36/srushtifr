"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollAnimIcons } from "@/components/ScrollAnimIcons";

export const TechStack: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tech"
      className="py-24 px-6 md:px-12 bg-[#0d0c0e] text-white overflow-hidden relative border-y border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Skiper 31 Bracket Title Component */}
        <div ref={headerRef} className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-3 md:gap-4 font-sans text-xl sm:text-2xl md:text-3xl font-semibold text-white">
            <svg className="h-9 sm:h-11 w-auto fill-[#f7c2d1] drop-shadow-[0_0_8px_rgba(247,194,209,0.3)]" viewBox="0 0 27 78">
              <path d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z" />
            </svg>
            <span className="tracking-tight">
              integrate with your fav <span className="text-[#f7c2d1]">tech stack</span>
            </span>
            <svg className="h-9 sm:h-11 w-auto fill-[#f7c2d1] drop-shadow-[0_0_8px_rgba(247,194,209,0.3)] -scale-x-100" viewBox="0 0 27 78">
              <path d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z" />
            </svg>
          </div>
          <p className="font-pixel text-[11px] uppercase tracking-widest text-[#ffd6e2] mt-3 opacity-90">
            ✦ Engineered for resilient design &amp; scalable intelligence ✦
          </p>
        </div>

        {/* Skiper 31 ScrollAnimIcons — floating vibrant icons that fan in on scroll */}
        <div className="-mx-6 md:-mx-12">
          <ScrollAnimIcons />
        </div>

      </div>
    </section>
  );
};
