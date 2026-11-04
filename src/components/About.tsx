"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const About: React.FC = () => {
  const sectionRef    = useRef<HTMLElement>(null);
  const filmStrip1Ref = useRef<HTMLDivElement>(null);
  const filmStrip2Ref = useRef<HTMLDivElement>(null);
  const svgTextRef    = useRef<SVGSVGElement>(null);
  const textColRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ── Film strips entrance ──────────────────────────────────────────
      gsap.fromTo(
        [filmStrip1Ref.current, filmStrip2Ref.current],
        { y: 60, opacity: 0 },
        {
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power3.out",
        }
      );

      // ── "about myself" SVG stroke-paint animation ─────────────────────
      const svg = svgTextRef.current;
      if (svg) {
        const texts = svg.querySelectorAll<SVGTextElement>("text[data-paint]");

        texts.forEach((el) => {
          const length = el.getComputedTextLength?.() ?? 800;
          gsap.set(el, {
            strokeDasharray:  length,
            strokeDashoffset: length,
            fillOpacity: 0,
          });
        });

        // Scrub stroke draw — delayed so photobooth arrives first, then handwriting paints
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 50%", // Slightly delayed start: triggers when section is well into viewport
          end:   "top 10%",
          scrub: 1.4,
          onUpdate(self) {
            texts.forEach((el, i) => {
              // Line 0 ("about") draws first (0.05 to 0.55), Line 1 ("myself") starts at 0.42 to 0.95
              const lineStart = i === 0 ? 0.05 : 0.42;
              const lineEnd   = i === 0 ? 0.58 : 0.96;
              const p = Math.min(1, Math.max(0, (self.progress - lineStart) / (lineEnd - lineStart)));
              const length = parseFloat(el.getAttribute("data-len") ?? "800");
              
              el.style.strokeDashoffset = String(length * (1 - p));
              // Ink fill bleeds in only after stroke has painted (~75% complete)
              el.style.fillOpacity = String(Math.min(1, Math.max(0, (p - 0.72) / 0.28)));
            });
          },
        });

        // Measure real lengths after mount and store
        texts.forEach((el) => {
          const length = el.getComputedTextLength?.() ?? 800;
          el.setAttribute("data-len", String(length));
          gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
        });
      }

      // ── Text block fade in ────────────────────────────────────────────
      if (textColRef.current) {
        gsap.fromTo(
          Array.from(textColRef.current.children),
          { y: 35, opacity: 0 },
          {
            scrollTrigger: { trigger: textColRef.current, start: "top 80%" },
            y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power2.out",
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-[#1d1b1e] text-white py-28 px-6 md:px-12 overflow-hidden border-y border-white/10"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-14 lg:gap-20">
        
        {/* Left: Photobooth Film Strips with Authentic Sprocket Holes */}
        <div className="relative flex justify-center items-center gap-6 min-h-[480px]">
          
          {/* ── "about myself" SVG stroke-paint overlay ── */}
          <div
            className="absolute z-20 -rotate-8 -translate-y-4 pointer-events-none select-none"
            style={{ left: "50%", transform: "translateX(-50%) rotate(-8deg) translateY(-1rem)" }}
          >
            <svg
              ref={svgTextRef}
              viewBox="0 0 520 230"
              width="520"
              height="230"
              className="w-[340px] sm:w-[420px] md:w-[520px]"
              aria-label="about myself"
              overflow="visible"
            >
              {/* Line 1: "about" */}
              <text
                data-paint="true"
                x="10"
                y="105"
                fontFamily="var(--font-hand), 'Gochi Hand', cursive"
                fontSize="108"
                fontWeight="400"
                stroke="#f7c2d1"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#f7c2d1"
                style={{ fillOpacity: 0, strokeDasharray: 800, strokeDashoffset: 800 }}
              >
                about
              </text>
              {/* Line 2: "myself" */}
              <text
                data-paint="true"
                x="10"
                y="215"
                fontFamily="var(--font-hand), 'Gochi Hand', cursive"
                fontSize="108"
                fontWeight="400"
                stroke="#f7c2d1"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#f7c2d1"
                style={{ fillOpacity: 0, strokeDasharray: 800, strokeDashoffset: 800 }}
              >
                myself
              </text>
            </svg>
          </div>

          {/* Film Strip 1 */}
          <div
            ref={filmStrip1Ref}
            className="relative w-38 sm:w-44 md:w-48 bg-[#161517] rounded-sm p-3.5 sm:p-4 pb-5 flex flex-col gap-2.5 shadow-2xl z-10 -rotate-3 border border-white/10"
          >
            {/* Top Sprocket Holes */}
            <div className="absolute top-0 left-0 right-0 h-3.5 bg-[repeating-linear-gradient(90deg,#161517_0px,#161517_8px,rgba(255,255,255,0.2)_8px,rgba(255,255,255,0.2)_16px)] rounded-t-sm" />

            {/* Frame 1 */}
            <div className="relative w-full aspect-[3/4] bg-[#262429] rounded-[2px] overflow-hidden mt-1 group/frame">
              <Image
                src="/images/about-1.jpg"
                alt="Srushti Photobooth Moment 01"
                width={260}
                height={340}
                unoptimized
                className="w-full h-full object-cover grayscale contrast-115 group-hover/frame:grayscale-0 group-hover/frame:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-60" />
            </div>

            {/* Frame 2 */}
            <div className="relative w-full aspect-[3/4] bg-[#262429] rounded-[2px] overflow-hidden group/frame">
              <Image
                src="/images/about-2.jpg"
                alt="Srushti Photobooth Moment 02"
                width={260}
                height={340}
                unoptimized
                className="w-full h-full object-cover grayscale contrast-115 group-hover/frame:grayscale-0 group-hover/frame:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-60" />
            </div>

            {/* Frame 3 */}
            <div className="relative w-full aspect-[3/4] bg-[#262429] rounded-[2px] overflow-hidden group/frame">
              <Image
                src="/images/about-3.jpg"
                alt="Srushti Photobooth Moment 03"
                width={260}
                height={340}
                unoptimized
                className="w-full h-full object-cover grayscale contrast-115 group-hover/frame:grayscale-0 group-hover/frame:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-60" />
            </div>

            {/* Bottom Sprocket Holes */}
            <div className="absolute bottom-0 left-0 right-0 h-3.5 bg-[repeating-linear-gradient(90deg,#161517_0px,#161517_8px,rgba(255,255,255,0.2)_8px,rgba(255,255,255,0.2)_16px)] rounded-b-sm" />
          </div>

          {/* Film Strip 2 */}
          <div
            ref={filmStrip2Ref}
            className="relative w-38 sm:w-44 md:w-48 bg-[#161517] rounded-sm p-3.5 sm:p-4 pb-5 flex flex-col gap-2.5 shadow-2xl z-10 rotate-3 translate-y-8 border border-white/10"
          >
            {/* Top Sprocket Holes */}
            <div className="absolute top-0 left-0 right-0 h-3.5 bg-[repeating-linear-gradient(90deg,#161517_0px,#161517_8px,rgba(255,255,255,0.2)_8px,rgba(255,255,255,0.2)_16px)] rounded-t-sm" />

            {/* Frame 4 */}
            <div className="relative w-full aspect-[3/4] bg-[#262429] rounded-[2px] overflow-hidden mt-1 group/frame">
              <Image
                src="/images/about-4.jpg"
                alt="Srushti Photobooth Moment 04"
                width={260}
                height={340}
                unoptimized
                className="w-full h-full object-cover grayscale contrast-115 group-hover/frame:grayscale-0 group-hover/frame:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-60" />
            </div>

            {/* Frame 5 */}
            <div className="relative w-full aspect-[3/4] bg-[#262429] rounded-[2px] overflow-hidden group/frame">
              <Image
                src="/images/about-5.jpg"
                alt="Srushti Photobooth Moment 05"
                width={260}
                height={340}
                unoptimized
                className="w-full h-full object-cover grayscale contrast-115 group-hover/frame:grayscale-0 group-hover/frame:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-60" />
            </div>

            {/* Frame 6 */}
            <div className="relative w-full aspect-[3/4] bg-[#262429] rounded-[2px] overflow-hidden group/frame">
              <Image
                src="/images/about-6.jpg"
                alt="Srushti Photobooth Moment 06"
                width={260}
                height={340}
                unoptimized
                className="w-full h-full object-cover grayscale contrast-115 group-hover/frame:grayscale-0 group-hover/frame:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-60" />
            </div>

            {/* Bottom Sprocket Holes */}
            <div className="absolute bottom-0 left-0 right-0 h-3.5 bg-[repeating-linear-gradient(90deg,#161517_0px,#161517_8px,rgba(255,255,255,0.2)_8px,rgba(255,255,255,0.2)_16px)] rounded-b-sm" />
          </div>

        </div>

        {/* Right: Exact Content From Prompt */}
        <div ref={textColRef} className="flex flex-col items-start gap-5">
          {/* Solid "hello!" badge with pink accent */}
          <div className="bg-black text-[#f7c2d1] border border-[#f7c2d1]/40 font-sans font-extrabold text-3xl px-5 py-1 rounded-[2px] lowercase tracking-tight shadow-[0_0_15px_rgba(219,72,118,0.15)]">
            hello!
          </div>

          <h2 className="font-serif italic font-black text-4xl sm:text-5xl text-white tracking-tight leading-none drop-shadow-sm">
            I’m <span className="text-[#f7c2d1]">Srushti</span>.
          </h2>

          <div className="space-y-4 text-base sm:text-[17px] text-white/85 leading-relaxed max-w-xl">
            <p>
              I&apos;m a <span className="text-[#ffd6e2] font-semibold">Frontend Developer, Machine Learning Enthusiast, and Open-Source Contributor</span> currently pursuing my B.Tech in Artificial Intelligence &amp; Data Science, with a passion for building meaningful digital experiences.
            </p>
            <p>
              With hands-on experience in full-stack development and a strong interest in UI/UX design, I enjoy bringing ideas to life through clean code, thoughtful design, and intuitive user experiences. I&apos;m continuously upskilling in AI/ML, exploring emerging technologies, and expanding my understanding of how intelligent systems can solve real-world problems.
            </p>
            <p>
              Beyond tech, I&apos;m drawn to the creative world of writing, illustrating, editing, and graphic design. I love experimenting, creating, and finding inspiration across different disciplines. For me, technology and creativity go hand in hand—and that&apos;s what drives me to keep learning, building, and creating.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
