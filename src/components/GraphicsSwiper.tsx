"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";

const GRAPHICS_WORKS = [
  {
    id: "01",
    tag: "Visual Art",
    title: "Digital Melancholia",
    description: "Generative vectors & high-contrast editorial typography study",
    gradient: "from-[#381528] to-[#611e3b]",
  },
  {
    id: "02",
    tag: "Brand Identity",
    title: "Neon Cybernetics",
    description: "Futuristic typography system & dark mode design tokens",
    gradient: "from-[#182236] to-[#223759]",
  },
  {
    id: "03",
    tag: "Editorial",
    title: "Couture Serif",
    description: "Avant-garde magazine layout & Swiss grid structure",
    gradient: "from-[#2b1736] to-[#48215e]",
  },
  {
    id: "04",
    tag: "3D Concepts",
    title: "Chrome Reflections",
    description: "Metamorphic liquid metal shapes & raytraced lighting",
    gradient: "from-[#183329] to-[#255442]",
  },
  {
    id: "05",
    tag: "Poster Series",
    title: "Bauhaus Fusion",
    description: "Retro-modern chromatic poster experimentation",
    gradient: "from-[#362516] to-[#59391e]",
  },
];

export const GraphicsSwiper: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="graphics" className="py-28 bg-[#1d1b1e] text-white overflow-hidden border-y border-white/10">
      <div className="max-w-6xl mx-auto px-6 text-center mb-12">
        <h2 className="font-serif italic font-black text-3xl sm:text-5xl text-white">
          Graphic <em className="text-[#f7c2d1]">Design</em> &amp; Visuals
        </h2>
        <p className="font-mono text-xs uppercase tracking-widest text-[#ffd6e2] mt-2">
          Skiper 49 · 3D Swiper Coverflow carousel with rotation, shadows &amp; depth
        </p>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 min-h-[440px] flex items-center justify-center">
        {mounted ? (
          <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={true}
          autoplay={{
            delay: 2400,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 35,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[EffectCoverflow, Autoplay, Pagination]}
          className="pb-16"
        >
          {GRAPHICS_WORKS.map((work) => (
            <SwiperSlide
              key={work.id}
              className="!w-[300px] sm:!w-[340px] !h-[420px] rounded-2xl overflow-hidden p-7 flex flex-col justify-between shadow-2xl border border-white/10 relative"
              style={{
                background: "linear-gradient(135deg, #261622, #401d33)",
              }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${work.gradient} opacity-90`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              <div className="relative z-10">
                <span className="font-pixel text-[9px] uppercase tracking-wider text-[#f7c2d1] px-2.5 py-1 rounded bg-black/40 border border-white/15">
                  {work.id} · {work.tag}
                </span>
              </div>

              <div className="relative z-10">
                <h4 className="font-serif italic font-bold text-2xl text-white">
                  {work.title}
                </h4>
                <p className="font-mono text-xs text-white/70 mt-1.5 leading-relaxed">
                  {work.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        ) : (
          <div className="font-mono text-xs text-[#e6a3b6] uppercase tracking-widest animate-pulse">
            Loading 3D Graphics Gallery...
          </div>
        )}
      </div>
    </section>
  );
};
