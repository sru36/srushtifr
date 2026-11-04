"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ContactModal } from "@/components/ContactModal";

export const Hero: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const discoRef = useRef<HTMLDivElement>(null);
  const starPinkRef = useRef<HTMLDivElement>(null);
  const starBalloonRef = useRef<HTMLDivElement>(null);
  const starChromeRef = useRef<HTMLDivElement>(null);
  const clapperRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const photoWrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance timeline for content and steady stickers
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        contentRef.current ? Array.from(contentRef.current.children) : [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
        }
      )
      .fromTo(
        photoWrapRef.current,
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 },
        "-=0.5"
      )
      .fromTo(
        [
          discoRef.current,
          starPinkRef.current,
          starBalloonRef.current,
          starChromeRef.current,
          clapperRef.current,
          catRef.current,
          cursorRef.current,
        ],
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.6"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen bg-[#0d0c0e] text-white overflow-hidden flex flex-col justify-between pt-20"
    >
      {/* Background Subtle Halftone Dots Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-80" />


      {/* Hero Main Grid: Text on Left (col-span-7), Photo on Right (col-span-5) */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 items-center max-w-7xl mx-auto w-full px-6 md:px-12 py-8 lg:py-12 gap-8 lg:gap-10">
        
        {/* Left Column: Typography & Corner Stickers */}
        <div className="lg:col-span-7 relative flex flex-col items-start gap-4 text-left pt-14 pb-20 sm:pt-20 sm:pb-28 pl-0 sm:pl-4 md:pl-8">
          
          {/* Sticker 1: Top-Left (Disco Ball) - Well above and away from text */}
          <div
            ref={discoRef}
            className="absolute -top-16 sm:-top-24 md:-top-28 -left-6 sm:-left-16 md:-left-20 z-20 w-28 sm:w-36 md:w-44 pointer-events-none select-none"
            title="Disco Ball Sticker"
          >
            <Image
              src="/disco-ball-clean.png"
              alt="Disco ball sticker"
              width={180}
              height={180}
              unoptimized
              className="w-full h-auto drop-shadow-[0_16px_32px_rgba(0,0,0,0.65)]"
            />
          </div>

          {/* Sticker 3: Bottom-Left Corner (Pink Star) - Below and left of CTA buttons */}
          <div
            ref={starPinkRef}
            className="absolute bottom-0 sm:-bottom-4 -left-8 sm:-left-16 md:-left-24 z-20 w-24 sm:w-30 md:w-36 pointer-events-none select-none"
            title="Pink Star Sticker"
          >
            <Image
              src="/star-pink-clean.png"
              alt="Pink star sticker"
              width={150}
              height={150}
              unoptimized
              className="w-full h-auto drop-shadow-[0_14px_28px_rgba(0,0,0,0.55)]"
            />
          </div>

          {/* Content Group */}
          <div ref={contentRef} className="flex flex-col items-start gap-4 w-full">
            
            {/* Open for Opportunities Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/35 border border-green-400/50 text-green-300 font-mono text-[10px] tracking-widest uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
              Open for Opportunities
            </div>

            <div>
              {/* "meet the" solid black badge with pink text, border & chrome sparkle sticker */}
              <div className="relative inline-block">
                <div className="inline-block bg-black text-[#f7c2d1] font-sans font-extrabold text-2xl md:text-3xl px-4 py-1 rounded-[2px] leading-tight border border-[#f7c2d1]/40 shadow-md">
                  meet the
                </div>

                {/* Sparkling chrome star sticker anchored to the top-right corner of "meet the" */}
                <div
                  ref={starChromeRef}
                  className="absolute -top-5 sm:-top-6 -right-6 sm:-right-8 z-20 w-9 sm:w-11 md:w-13 pointer-events-none select-none rotate-12"
                  title="Sparkle Sticker"
                >
                  <Image
                    src="/star-chrome-clean.png"
                    alt="Chrome star sticker"
                    width={80}
                    height={80}
                    unoptimized
                    className="w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                  />
                </div>
              </div>

              {/* "DEVELOPER" grand heading */}
              <h1
                style={{ fontFamily: 'var(--font-pixelta), "Pixelta", monospace' }}
                className="font-pixelta font-normal text-5xl sm:text-7xl md:text-8xl lg:text-[6.8rem] text-white uppercase tracking-tight leading-[0.88] mt-2 drop-shadow-sm"
              >
                DEVELOPER
              </h1>

              {/* Underline line with pink diamond emblem */}
              <div className="flex items-center w-full max-w-md gap-3 mt-2">
                <div className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-[#f7c2d1]/60 to-[#f7c2d1]" />
                <span className="text-[#f7c2d1] text-xs">◆</span>
                <div className="flex-1 h-[1.5px] bg-gradient-to-l from-transparent via-[#f7c2d1]/60 to-[#f7c2d1]" />
              </div>
            </div>

            {/* Oval Pill Tagline */}
            <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-[#f7c2d1]/50 bg-black/40 backdrop-blur-md font-serif italic text-base md:text-lg text-white mt-2 shadow-[0_0_15px_rgba(219,72,118,0.12)]">
              <span className="text-[#f7c2d1] text-lg not-italic">✦</span>
              <span>Architecting intelligent systems. Curating <span className="text-[#f7c2d1]">digital elegance</span>.</span>
            </div>

            {/* Action CTAs */}
            <div className="relative flex items-center gap-4 mt-3 flex-wrap">
              <a
                href="https://drive.google.com/file/d/10HOUmlZKO4YYqN7RoWACKlDzTxSxNowJ/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-[#f7c2d1] hover:bg-[#db4876] hover:text-white border border-[#f7c2d1]/50 font-mono text-xs uppercase tracking-widest px-7 py-3 rounded-[2px] transition-all duration-200 hover:-translate-y-0.5 shadow-[0_0_15px_rgba(219,72,118,0.2)]"
              >
                Resume ↗
              </a>
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="bg-black text-[#f7c2d1] hover:bg-[#db4876] hover:text-white border border-[#f7c2d1]/50 font-mono text-xs uppercase tracking-widest px-7 py-3 rounded-[2px] transition-all duration-200 hover:-translate-y-0.5 shadow-[0_0_15px_rgba(219,72,118,0.2)] cursor-pointer"
              >
                Say Hello ↗
              </button>

              {/* Retro Pink Pixel Cursor Pointer Sticker */}
              <div
                ref={cursorRef}
                className="absolute -bottom-7 sm:-bottom-8 right-2 sm:right-6 md:right-10 z-20 w-8 sm:w-10 pointer-events-none select-none -rotate-12"
                title="Pixel Cursor Sticker"
              >
                <Image
                  src="/sticker-pink-cursor.png"
                  alt="Pink pixel cursor sticker"
                  width={64}
                  height={64}
                  unoptimized
                  className="w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Srushti's Photo (Larger, No Background Frame) with Stickers */}
        <div className="lg:col-span-5 flex justify-center items-center relative py-4">
          <div className="relative w-full max-w-[440px] sm:max-w-[480px] md:max-w-[530px]">
            
            {/* Clapperboard Sticker - "MAIN CHARACTER" tucked at top-right of portrait */}
            <div
              ref={clapperRef}
              className="absolute z-20 -top-8 sm:-top-12 -right-4 sm:-right-8 md:-right-12 w-28 sm:w-34 md:w-40 pointer-events-none select-none -rotate-12"
              title="Main Character Clapperboard Sticker"
            >
              <Image
                src="/sticker-main-character.png"
                alt="Main Character clapperboard sticker"
                width={180}
                height={180}
                unoptimized
                className="w-full h-auto drop-shadow-[0_16px_32px_rgba(0,0,0,0.65)]"
              />
            </div>

            {/* The Photo itself (No background frame, clean transparent silhouette) */}
            <div
              ref={photoWrapRef}
              className="relative z-10 w-full overflow-visible"
            >
              <Image
                src="/photo.png"
                alt="Srushti Rawal"
                width={530}
                height={630}
                priority
                unoptimized
                className="w-full h-auto block filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.55)] grayscale contrast-115 hover:contrast-120 transition-all duration-300"
              />
            </div>

            {/* Star Sticker cluster - Tucked at bottom-left of portrait, safely away from text */}
            <div
              ref={starBalloonRef}
              className="absolute z-20 -bottom-6 sm:-bottom-10 -left-6 sm:-left-12 md:-left-16 w-30 sm:w-38 md:w-44 pointer-events-none select-none"
              title="Balloon Stars Sticker"
            >
              <Image
                src="/star-balloon-clean.png"
                alt="Balloon star sticker near photo"
                width={190}
                height={190}
                unoptimized
                className="w-full h-auto drop-shadow-[0_16px_32px_rgba(0,0,0,0.65)]"
              />
            </div>

            {/* Dior Cat Sticker - Peeking playfully at bottom-right of portrait */}
            <div
              ref={catRef}
              className="absolute z-20 -bottom-8 sm:-bottom-12 -right-4 sm:-right-8 md:-right-12 w-24 sm:w-30 md:w-36 pointer-events-none select-none rotate-6"
              title="Dior Kitten Sticker"
            >
              <Image
                src="/sticker-dior-cat.png"
                alt="Dior cat sticker with bow"
                width={160}
                height={160}
                unoptimized
                className="w-full h-auto drop-shadow-[0_16px_32px_rgba(0,0,0,0.65)]"
              />
            </div>

          </div>
        </div>

      </div>

      {/* Say Hello Social Pop-up Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </section>
  );
};
