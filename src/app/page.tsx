"use client";

import React from "react";
import { Preloader } from "@/components/Preloader";
import { ScrollStroke } from "@/components/ScrollStroke";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { RibbonBanner } from "@/components/RibbonBanner";
import { About } from "@/components/About";
import { TechStack } from "@/components/TechStack";
import { PrismCarousel } from "@/components/PrismCarousel";
import { Achievements } from "@/components/Achievements";
import { HalftoneFooter } from "@/components/HalftoneFooter";
import { AlbumRail } from "@/components/AlbumRail";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
        {/* Skiper 62 Preloader */}
        <Preloader />

        {/* Skiper 19 Scroll Progress Stroke */}
        <ScrollStroke />

        {/* Navigation */}
        <Navbar />

        {/* Hero Section (Image 1 reference) */}
        <Hero />

        {/* Satin Waving Ribbon Banner 1 */}
        <RibbonBanner theme="charcoal" />

        {/* About Section (Image 6 reference: photobooth + bio) */}
        <About />

        {/* Tech Stack (Skiper 31 bracket component) */}
        <TechStack />

        {/* Satin Waving Ribbon Banner 2 */}
        <RibbonBanner
          theme="gradient"
          reverse
          items={[
            "HUEMATCH · AI PALETTES",
            "CYCLESYNC · HEALTH TECH",
            "PORSCHE 911 · IMMERSIVE EXPERIENCE",
            "GRADEDEX · ML PREDICTOR",
            "CYBERBULLYING NLP · EMOTION DETECTION",
            "HUEMATCH · AI PALETTES",
            "CYCLESYNC · HEALTH TECH",
            "PORSCHE 911 · IMMERSIVE EXPERIENCE",
            "GRADEDEX · ML PREDICTOR",
            "CYBERBULLYING NLP · EMOTION DETECTION",
          ]}
        />

        {/* Featured Projects (React Bits Pro Prism Carousel) */}
        <PrismCarousel />

        {/* Honors & Achievements (Skiper 49 Swiper 3D Coverflow) */}
        <Achievements />

        {/* Halftone Wordmark Footer */}
        <HalftoneFooter />

        {/* React Bits Pro Album Rail Music Player Overlay */}
        <AlbumRail />
      </main>
    </SmoothScroll>
  );
}
