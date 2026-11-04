"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";
import {
  Award,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MapPin,
  Sparkles,
  X as CloseIcon,
  ZoomIn,
  CheckCircle2,
  Camera,
} from "lucide-react";

export interface Achievement {
  id: string;
  category: string;
  title: string;
  organization: string;
  period: string;
  location?: string;
  description: string;
  highlights: string[];
  image?: string;
  gallery?: string[];
  link?: string;
  badge: string;
  gradient: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "gsx-lead",
    category: "Leadership & Community",
    title: "Chapter Lead",
    organization: "GirlScript GSX Gwalior Chapter",
    period: "Aug 2026 – Present",
    location: "Gwalior, MP, India · On-site",
    badge: "Leadership Appointment",
    image: "/achievements/gsx-lead.jpg",
    link: "https://www.linkedin.com/in/srushtirawal/",
    description:
      "Formally appointed as Chapter Lead of the GirlScript Gwalior Chapter under the GSX Chapter Network of GirlScript Foundation, directing technical workshops, community mentorship, and technology initiatives.",
    highlights: ["Chapter Network Lead", "Student Mentorship", "Community Growth"],
    gradient: "from-[#251336] via-[#3d185c] to-[#170a24]",
  },
  {
    id: "cosmodex",
    category: "Full Stack Development",
    title: "Full Stack Development Intern",
    organization: "CosmoDeX",
    period: "18 June – 18 Sept 2026",
    location: "Remote · Industry Internship",
    badge: "Engineering Internship",
    image: "/achievements/cosmodex.jpg",
    link: "https://www.linkedin.com/company/cosmodex1/",
    description:
      "Completed full-stack internship focusing on responsive frontend architecture, translating complex UI/UX designs into high-performance web interfaces with cross-device usability and consistency.",
    highlights: ["Frontend Architecture", "UI Design Principles", "Responsive Usability"],
    gradient: "from-[#1d1b38] via-[#2f2261] to-[#120f26]",
  },
  {
    id: "byamn-pm",
    category: "Product Management",
    title: "Product Manager Intern",
    organization: "BYAMN",
    period: "90-Day Engagement · Sept 2026",
    location: "Product Leadership",
    badge: "Product Strategy",
    image: "/achievements/byamn-pm.jpg",
    link: "https://www.linkedin.com/company/byamn/",
    description:
      "Spearheaded requirement analysis, roadmap planning, and feature prioritization. Aligned UI/UX direction, design systems, workflows, and stakeholder communication. Recognized with official Letter of Recommendation.",
    highlights: ["Roadmap & Execution", "UI/UX & Design Systems", "Letter of Recommendation"],
    gradient: "from-[#1c2918] via-[#2a4521] to-[#111c0f]",
  },
  {
    id: "sih-2026",
    category: "National Hackathon",
    title: "Data & Operations Lead",
    organization: "Smart India Hackathon (SIH) 2026",
    period: "National Event · 2026",
    location: "India",
    badge: "1,900+ Participants",
    image: "/achievements/sih-2026.jpg",
    description:
      "Managed datasets for 1,900+ participants, ensuring registration accuracy and result validation. Compiled, normalized, and coordinated final rankings and reports to support reliable event operations.",
    highlights: ["1,900+ Participant Datasets", "Result Validation Pipelines", "National Scale Logistics"],
    gradient: "from-[#2e1d17] via-[#4f2a1b] to-[#1a0f0b]",
  },
  {
    id: "nsoc-lead",
    category: "Open Source Leadership",
    title: "Program Lead",
    organization: "Nexus Spring of Code (NSoC)",
    period: "Oct 2026 – Jan 2027",
    location: "Core Team · Leadership & Operations",
    badge: "Program Leadership",
    image: "/achievements/nsoc-lead.jpg",
    description:
      "Selected as Program Lead on the core team for Nexus Spring of Code (NSOC) Winter Edition, overseeing program planning, cross-team coordination, and sprint deliveries across student developer teams.",
    highlights: ["Sprint Delivery", "Open Source Mentorship", "Contributor Onboarding"],
    gradient: "from-[#2d1628] via-[#4f1f44] to-[#1c0c19]",
  },
  {
    id: "digisustain",
    category: "Academic Research",
    title: "Research Paper Presenter",
    organization: "DIGI-SUSTAIN 2026 (ABV-IIITM Gwalior)",
    period: "13–15 May 2026",
    location: "ABV-IIITM Gwalior (Institute of National Importance)",
    badge: "IIITM Gwalior",
    image: "/achievements/digisustain.jpg",
    description:
      "Presented peer-reviewed research paper at the International Conference on Digital Transformative Practices for a Sustainable Future (DIGI-SUSTAIN 2026) organized by ABV-IIITM Gwalior.",
    highlights: ["International Conference", "Digital Sustainability", "Research Publication"],
    gradient: "from-[#13282b] via-[#1a4247] to-[#0b1c1f]",
  },
  {
    id: "cai-workshop",
    category: "Technical Workshop",
    title: "Git & GitHub Workshop Instructor",
    organization: "Community of AI (CAI)",
    period: "Sept 2026",
    location: "MITS Gwalior · In-Person Workshop",
    badge: "Workshop Instructor",
    image: "/achievements/git-workshop-1.jpg",
    gallery: [
      "/achievements/git-workshop-1.jpg",
      "/achievements/git-workshop-2.jpg",
      "/achievements/git-workshop-3.jpg",
    ],
    description:
      "Conducted an interactive technical workshop teaching Git version control, GitHub workflows, branch strategies, and collaborative team engineering practices, featuring a creative Mirzapur-themed branching walkthrough.",
    highlights: ["Git & GitHub Workflows", "Open Source Collaboration", "Hands-on Student Labs"],
    gradient: "from-[#291720] via-[#472033] to-[#170a11]",
  },
  {
    id: "elite-coders",
    category: "Community Management",
    title: "Community Manager Intern",
    organization: "Elite Coders (ECSoC)",
    period: "May 2026 – Aug 2026",
    location: "Yamunanagar, India · Remote",
    badge: "Community Management",
    image: "/achievements/elite-coders.jpg",
    link: "https://www.linkedin.com/in/srushtirawal/",
    description:
      "Selected as Community Manager Intern on the core ECSoC team, driving community engagement initiatives, developer communications, marketing campaigns, and open-source operations.",
    highlights: ["Community Relations", "Community Marketing", "Open Source Operations"],
    gradient: "from-[#22172d] via-[#3c1c4f] to-[#160c21]",
  },
  {
    id: "nsoc-community-lead",
    category: "Community Leadership",
    title: "Community Lead",
    organization: "Nexus Spring of Code (NSoC)",
    period: "Mar 2026 – Jun 2026",
    location: "India · Remote",
    badge: "Scaled to 4k+",
    image: "/achievements/nsoc-community-lead.jpg",
    link: "https://www.linkedin.com/in/srushtirawal/",
    description:
      "Core team lead instrumental in growing the developer community from 0 to 4,000+ participants. Drove community partnerships, merch design, Discord architecture, sponsorships, and growth ideation.",
    highlights: ["Scaled 0 to 4K+ Members", "Discord & Sponsorships", "Merch & Brand Design"],
    gradient: "from-[#2d1b14] via-[#522918] to-[#1c0e09]",
  },
];

export const Achievements: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [lightbox, setLightbox] = useState<{
    images: string[];
    currentIndex: number;
    title: string;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightbox) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") {
        setLightbox((prev) =>
          prev ? { ...prev, currentIndex: (prev.currentIndex + 1) % prev.images.length } : null
        );
      }
      if (e.key === "ArrowLeft") {
        setLightbox((prev) =>
          prev
            ? {
                ...prev,
                currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
              }
            : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox]);

  const openViewer = (item: Achievement, startIndex = 0) => {
    const images = item.gallery && item.gallery.length > 0 ? item.gallery : item.image ? [item.image] : [];
    if (images.length === 0) return;
    setLightbox({
      images,
      currentIndex: startIndex,
      title: item.title,
    });
  };

  return (
    <section
      id="achievements"
      className="py-28 bg-[#1d1b1e] text-white overflow-hidden border-y border-white/10 relative"
    >
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#db4876]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 border border-[#f7c2d1]/30 font-mono text-[10px] text-[#f7c2d1] uppercase tracking-widest mb-3">
          <Sparkles className="w-3 h-3 text-[#f7c2d1] animate-pulse" />
          <span>Milestones &amp; Leadership</span>
        </div>
        <h2 className="font-serif italic font-black text-3xl sm:text-5xl text-white">
          Honors &amp; <em className="text-[#f7c2d1]">Achievements</em>
        </h2>
        <p className="font-mono text-xs uppercase tracking-widest text-[#ffd6e2] mt-2">
          Skiper 49 · 3D Coverflow Showcase with rotation, depth &amp; verified credentials
        </p>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 min-h-[500px] flex items-center justify-center relative z-10">
        {mounted ? (
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={true}
            autoplay={{
              delay: 3400,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            coverflowEffect={{
              rotate: 28,
              stretch: 0,
              depth: 140,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[EffectCoverflow, Autoplay, Pagination]}
            className="pb-16 achievements-swiper"
            style={{
              ["--swiper-theme-color" as string]: "#db4876",
              ["--swiper-pagination-bullet-inactive-color" as string]: "#f7c2d1",
              ["--swiper-pagination-bullet-inactive-opacity" as string]: "0.35",
            }}
          >
            {ACHIEVEMENTS.map((item) => {
              const hasGallery = item.gallery && item.gallery.length > 1;

              return (
                <SwiperSlide
                  key={item.id}
                  className="!w-[310px] sm:!w-[370px] md:!w-[410px] !h-[500px] rounded-2xl overflow-hidden p-6 sm:p-7 flex flex-col justify-between shadow-2xl border border-white/15 relative group"
                  style={{
                    background: "linear-gradient(135deg, #1b1620, #2c1a2e)",
                  }}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-95`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 pointer-events-none" />

                  {/* Top Bar: Badge & Action */}
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <span className="font-pixel text-[8px] sm:text-[9px] uppercase tracking-wider text-[#f7c2d1] px-2.5 py-1 rounded bg-black/60 border border-[#f7c2d1]/30 flex items-center gap-1.5 shadow-sm">
                      <Award className="w-3 h-3 text-[#f7c2d1]" />
                      {item.badge}
                    </span>

                    {(item.image || hasGallery) && (
                      <button
                        type="button"
                        onClick={() => openViewer(item)}
                        className="px-2.5 py-1 rounded bg-white/10 hover:bg-[#db4876] text-white/80 hover:text-white font-mono text-[9px] uppercase tracking-wider border border-white/15 flex items-center gap-1 transition-all duration-200 cursor-pointer shadow-sm hover:scale-105"
                        title={hasGallery ? "View Workshop Photos" : item.id === "sih-2026" ? "View Team Photo" : "View Certificate"}
                      >
                        {hasGallery ? (
                          <Camera className="w-3 h-3 text-[#f7c2d1]" />
                        ) : (
                          <ZoomIn className="w-3 h-3" />
                        )}
                        {hasGallery
                          ? `Photos (${item.gallery?.length})`
                          : item.id === "sih-2026"
                          ? "Team & Event"
                          : item.id === "nsoc-lead" || item.id === "elite-coders"
                          ? "Offer Letter"
                          : item.id === "nsoc-lead" || item.id === "elite-coders"
                          ? "Offer Letter"
                          : "Certificate"}
                      </button>
                    )}
                  </div>

                  {/* Center / Image Thumbnail Preview */}
                  <div className="relative z-10 my-auto py-2">
                    {item.image ? (
                      <div
                        onClick={() => openViewer(item)}
                        className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden border border-white/20 shadow-lg cursor-pointer group/thumb bg-black/40"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/thumb:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end justify-between p-2.5">
                          <span className="font-mono text-[9px] text-[#f7c2d1] flex items-center gap-1">
                            <ZoomIn className="w-3 h-3" />
                            {hasGallery
                              ? "Enlarge workshop photos"
                              : item.id === "sih-2026"
                              ? "Click to view SIH '26 team"
                              : item.id === "nsoc-lead" || item.id === "elite-coders"
                              ? "Click to view offer letter"
                              : "Click to enlarge credential"}
                          </span>

                          {hasGallery && (
                            <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-black/70 border border-[#f7c2d1]/40 text-[#ffd6e2]">
                              +{item.gallery!.length - 1} more
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-32 rounded-xl bg-black/30 border border-white/10 flex flex-col items-center justify-center p-4 text-center">
                        <Award className="w-8 h-8 text-[#f7c2d1] mb-2 opacity-80" />
                        <span className="font-pixel text-[9px] uppercase tracking-wider text-white/70">
                          {item.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Details */}
                  <div className="relative z-10 space-y-2">
                    <div>
                      <span className="font-mono text-[10px] text-[#ffd6e2]/80 uppercase tracking-widest block">
                        {item.organization}
                      </span>
                      <h3 className="font-serif italic font-bold text-xl sm:text-2xl text-white leading-tight mt-0.5">
                        {item.title}
                      </h3>
                    </div>

                    <p className="font-sans text-xs text-white/80 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Highlights Pills */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.highlights.map((h) => (
                        <span
                          key={h}
                          className="font-mono text-[8px] sm:text-[9px] px-2 py-0.5 rounded bg-black/50 border border-white/10 text-white/75 flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-2.5 h-2.5 text-[#f7c2d1]" />
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Footer Meta */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/10 font-mono text-[9px] text-white/50">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5 text-[#f7c2d1]" />
                        {item.period}
                      </span>
                      {item.location && (
                        <span className="flex items-center gap-1 truncate max-w-[140px]">
                          <MapPin className="w-2.5 h-2.5 text-[#f7c2d1]" />
                          {item.location}
                        </span>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <div className="font-mono text-xs text-[#e6a3b6] uppercase tracking-widest animate-pulse">
            Loading 3D Achievements Showcase...
          </div>
        )}
      </div>

      {/* Lightbox Modal with Multi-Photo Gallery Navigation */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md cursor-pointer animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#16141a] border border-[#f7c2d1]/40 rounded-2xl p-4 sm:p-6 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#f7c2d1]" />
                <h4 className="font-serif italic font-bold text-lg text-white">
                  {lightbox.title}
                </h4>
                {lightbox.images.length > 1 && (
                  <span className="font-mono text-[10px] text-[#ffd6e2] px-2 py-0.5 rounded bg-white/10 ml-2">
                    {lightbox.currentIndex + 1} of {lightbox.images.length}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#db4876] text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Main Image Display with Navigation Arrows */}
            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/70 flex-1 min-h-[300px] flex items-center justify-center">
              <img
                src={lightbox.images[lightbox.currentIndex]}
                alt={`${lightbox.title} photo ${lightbox.currentIndex + 1}`}
                className="w-full h-auto max-h-[68vh] object-contain select-none"
              />

              {/* Prev / Next controls if multiple photos */}
              {lightbox.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightbox((prev) =>
                        prev
                          ? {
                              ...prev,
                              currentIndex:
                                (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
                            }
                          : null
                      );
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-[#db4876] text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer hover:scale-105"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightbox((prev) =>
                        prev
                          ? {
                              ...prev,
                              currentIndex: (prev.currentIndex + 1) % prev.images.length,
                            }
                          : null
                      );
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-[#db4876] text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer hover:scale-105"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip for Multi-Photo Gallery */}
            {lightbox.images.length > 1 && (
              <div className="flex items-center justify-center gap-2 pt-3 shrink-0">
                {lightbox.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setLightbox((prev) => (prev ? { ...prev, currentIndex: i } : null))}
                    className={`relative w-14 h-11 rounded-md overflow-hidden border transition-all cursor-pointer ${
                      i === lightbox.currentIndex
                        ? "border-[#f7c2d1] scale-105 shadow-[0_0_8px_#f7c2d1]"
                        : "border-white/20 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};