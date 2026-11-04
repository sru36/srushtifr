"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  tag: string;
  description: string;
  tech: string[];
  icon: string;
  image?: string;
  gradient: string;
  link: string;
  deployedLink?: string;
}

const PROJECTS: Project[] = [
  {
    id: "huematch",
    title: "HueMatch",
    tag: "AI · Web App · Canvas 2D",
    description:
      "A responsive web application enabling users to upload a photo, sample pixels to extract exact skin tones, and compute the closest foundation shade match using LAB color-space conversion and Euclidean distance.",
    tech: ["React", "TypeScript", "Canvas API", "Color Science", "Tailwind CSS"],
    icon: "🎨",
    image: "/huematch.jpg",
    gradient: "from-[#201018] via-[#3d1928] to-[#1a0c14]",
    link: "https://github.com/sru36/HueMatch",
    deployedLink: "https://hue-match-six.vercel.app/",
  },
  {
    id: "cyclesync",
    title: "CycleSync",
    tag: "Full-Stack · AI · Health Tech",
    description:
      "Empathetic menstrual and mood tracking application combining AI-powered cycle predictions with hormonal phase modeling, proactive nutritional reminders, and mutual partner syncing for seamless communication.",
    tech: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    icon: "🌸",
    image: "/cyclesync.jpg",
    gradient: "from-[#241322] via-[#3a1d35] to-[#1a0e1a]",
    link: "https://github.com/sru36",
    deployedLink: "https://cycle-sync-pearl.vercel.app/",
  },
  {
    id: "porsche",
    title: "Porsche 911 Showcase",
    tag: "Interactive 3D · Immersive Web",
    description:
      "Immersive automotive showcase engineered with Three.js, React Three Fiber, and custom GLSL shaders. Features real-time ray-traced reflections, dynamic paint customizers, and cinematic camera orbits.",
    tech: ["Three.js", "R3F", "GLSL Shaders", "React", "GSAP"],
    icon: "🏎️",
    image: "/porsche.jpg",
    gradient: "from-[#1f1912] via-[#362717] to-[#17130e]",
    link: "https://github.com/sru36",
    deployedLink: "https://porsche911srush.netlify.app/",
  },
  {
    id: "gradedex",
    title: "GradeDex",
    tag: "ML · Tuned XGBoost · 95.92% Acc",
    description:
      "ML-powered student at-risk prediction and intervention system built with a tuned XGBoost model, achieving 95.92% accuracy and 95.36% F1-score to identify academic vulnerability early and support timely student help.",
    tech: ["Python", "XGBoost", "Machine Learning", "FastAPI", "Render"],
    icon: "🎓",
    image: "/gradedex.jpg",
    gradient: "from-[#1d152b] via-[#331e4d] to-[#120d1c]",
    link: "https://github.com/sru36/GradeDex-Student-at-Risk-Prediction-and-Help",
    deployedLink: "https://gradedex-student-at-risk-prediction-and.onrender.com/",
  },
  {
    id: "cyberbullying",
    title: "CyberBullying Emotion Detection",
    tag: "NLP · Hugging Face · PyTorch",
    description:
      "Natural Language Processing system that analyzes social media text to detect cyberbullying emotions (Anger, Sadness, Fear, Disgust, Joy, Neutral) using pre-trained Hugging Face transformers and PyTorch on real-world tweet datasets.",
    tech: ["Python", "Transformers", "PyTorch", "NLTK", "Pandas"],
    icon: "🛡️",
    image: "/cyberbullying.jpg",
    gradient: "from-[#1b1026] via-[#2f1847] to-[#12091c]",
    link: "https://github.com/sru36/CyberBullyingEmotionDetection",
  },
];

export const PrismCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = PROJECTS.length;

  const handleNext = () => setCurrent((prev) => (prev + 1) % total);
  const handlePrev = () => setCurrent((prev) => (prev - 1 + total) % total);

  // Auto-rotate every 3.2 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 3200);

    return () => clearInterval(interval);
  }, [isPaused, total]);

  return (
    <section id="projects" className="py-28 px-6 md:px-12 bg-[#0d0c0e] text-white overflow-hidden border-t border-[#f7c2d1]/15">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="font-serif italic font-black text-3xl sm:text-5xl text-white">
            Featured <em className="text-[#f7c2d1]">Projects</em>
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-[#ffd6e2] mt-2 flex items-center justify-center gap-2">
            <span className="text-[#f7c2d1]">✦</span>
            Interactive Coverflow · Auto-Rotating Showcase
            <span className="text-[#f7c2d1]">✦</span>
          </p>
        </div>

        {/* 3D Prism Track with pause-on-hover */}
        <div
          className="relative min-h-[500px] flex items-center justify-center [perspective:1200px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {PROJECTS.map((proj, idx) => {
            const isActive = idx === current;
            const isPrev = idx === (current - 1 + total) % total;
            const isNext = idx === (current + 1) % total;

            let cardStyle = "opacity-0 pointer-events-none scale-75";
            if (isActive) {
              cardStyle = "opacity-100 pointer-events-auto scale-100 z-20 translate-x-0 [transform:translateZ(0)] border-[#f7c2d1]/40 shadow-[0_15px_35px_rgba(219,72,118,0.18)]";
            } else if (isPrev) {
              cardStyle =
                "opacity-55 pointer-events-auto scale-90 z-10 -translate-x-[45%] md:-translate-x-[52%] [transform:translateZ(-80px)_rotateY(18deg)] cursor-pointer hover:opacity-80";
            } else if (isNext) {
              cardStyle =
                "opacity-55 pointer-events-auto scale-90 z-10 translate-x-[45%] md:translate-x-[52%] [transform:translateZ(-80px)_rotateY(-18deg)] cursor-pointer hover:opacity-80";
            }

            return (
              <div
                key={proj.id}
                onClick={() => {
                  if (isPrev) handlePrev();
                  if (isNext) handleNext();
                }}
                className={`absolute w-full max-w-[680px] bg-[#141216]/90 backdrop-blur-md rounded-2xl border border-white/15 overflow-hidden grid grid-cols-1 md:grid-cols-12 transition-all duration-500 ease-out ${cardStyle}`}
              >
                {/* Visual / Prism Sheen */}
                <div
                  className={`md:col-span-5 bg-gradient-to-br ${proj.gradient} flex items-center justify-center p-4 sm:p-6 relative overflow-hidden group/visual min-h-[220px] md:min-h-[300px]`}
                >
                  {proj.image ? (
                    <div className="relative w-full h-full min-h-[190px] rounded-xl overflow-hidden border border-white/20 shadow-[0_10px_25px_rgba(0,0,0,0.6)] bg-white/5 flex items-center justify-center">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/visual:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                  ) : (
                    <div className="text-6xl drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] select-none">
                      {proj.icon}
                    </div>
                  )}

                  {/* Color sweep prism light bar */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-transparent via-[#f7c2d1]/20 to-transparent transition-transform duration-1000 pointer-events-none ${
                      isActive ? "translate-x-full" : "-translate-x-full"
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="md:col-span-7 p-7 md:p-8 flex flex-col justify-center gap-3.5">
                  <span className="font-pixel text-[10px] uppercase tracking-wider text-[#f7c2d1] font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f7c2d1] inline-block animate-pulse" />
                    {proj.tag}
                  </span>
                  <h3 className="font-serif italic font-bold text-2xl md:text-3xl text-white leading-tight">
                    {proj.title}
                  </h3>
                  <p className="text-xs md:text-sm text-white/85 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 my-1">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-[#db4876]/15 border border-[#f7c2d1]/30 text-[#ffd6e2]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-2 flex-wrap">
                    {proj.deployedLink && (
                      <a
                        href={proj.deployedLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs font-bold uppercase tracking-wider text-black bg-[#f7c2d1] hover:bg-white px-3.5 py-1.5 rounded-[2px] flex items-center gap-1.5 transition-all duration-200 hover:scale-105 shadow-[0_0_12px_rgba(247,194,209,0.3)]"
                      >
                        Live Demo ↗
                      </a>
                    )}
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs font-bold uppercase tracking-wider text-[#f7c2d1] hover:text-[#ffd6e2] underline underline-offset-4 flex items-center gap-1.5 transition-colors"
                    >
                      {proj.deployedLink ? "GitHub ↗" : "View Project on GitHub ↗"}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-5 mt-10">
          <button
            onClick={handlePrev}
            aria-label="Previous project"
            className="w-11 h-11 rounded-full border border-[#f7c2d1]/30 bg-black/40 text-[#f7c2d1] hover:bg-[#db4876] hover:text-white hover:border-[#db4876] flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-[0_0_10px_rgba(219,72,118,0.15)]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2 items-center">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-7 bg-[#db4876] shadow-[0_0_10px_#db4876]"
                    : "w-2 bg-white/20 hover:bg-[#f7c2d1]/60"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next project"
            className="w-11 h-11 rounded-full border border-[#f7c2d1]/30 bg-black/40 text-[#f7c2d1] hover:bg-[#db4876] hover:text-white hover:border-[#db4876] flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-[0_0_10px_rgba(219,72,118,0.15)]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
