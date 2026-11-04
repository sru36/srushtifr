"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollStroke: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();

  // Smooth physics-based spring so the stroke glides gracefully without jitter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001,
  });

  // Master flowing curve that traverses the full height of the portfolio (0 to 5000 viewBox units)
  // Designed with sweeping, organic S-curves that guide the eye between sections without knotting.
  const pathData =
    "M 880,180 " +
    "C 950,450 780,750 480,950 " +
    "C 220,1120 120,1350 160,1650 " +
    "C 210,1980 620,2150 820,2400 " +
    "C 980,2620 920,2950 680,3250 " +
    "C 420,3580 140,3850 180,4180 " +
    "C 220,4480 620,4720 500,4980";

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-[2] overflow-hidden w-full h-full"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 5000"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Luminous dual-stop gradient matching the portfolio's blush & raspberry palette */}
          <linearGradient id="scrollStrokeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f7c2d1" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#ffd6e2" stopOpacity="1" />
            <stop offset="70%" stopColor="#db4876" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#f7c2d1" stopOpacity="0.85" />
          </linearGradient>

          {/* Soft neon bloom filter */}
          <filter id="strokeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Stronger ambient glow */}
          <filter id="ambientGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Subtle, translucent guide line previewing the journey */}
        <path
          d={pathData}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="2"
          strokeDasharray="6 12"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* 2. Soft wide ambient aura that illuminates as you scroll */}
        <motion.path
          d={pathData}
          stroke="#db4876"
          strokeWidth="8"
          strokeLinecap="round"
          strokeOpacity="0.25"
          filter="url(#ambientGlow)"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: smoothProgress }}
        />

        {/* 3. Primary sharp illuminated laser thread */}
        <motion.path
          d={pathData}
          stroke="url(#scrollStrokeGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#strokeGlow)"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: smoothProgress }}
        />
      </svg>
    </div>
  );
};
