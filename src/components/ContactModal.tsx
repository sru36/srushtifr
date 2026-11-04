"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X as CloseIcon, Mail, ExternalLink, Sparkles } from "lucide-react";

// Official LinkedIn SVG mark
const LinkedinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

// Official Instagram SVG mark
const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Official X (Twitter) SVG mark
const XIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Official Behance SVG mark
const BehanceIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-4.971 3-3.419 0-5.755-2.28-5.755-5.834 0-3.376 2.363-5.825 5.541-5.825 3.208 0 5.234 2.271 5.234 5.706 0 .375-.028.751-.08 1.121h-7.79c.108 1.622 1.205 2.626 2.871 2.626 1.487 0 2.261-.63 2.721-1.428l2.23.634zm-7.618-3.693h4.898c-.114-1.393-.974-2.29-2.39-2.29-1.488 0-2.378.919-2.508 2.29zm-9.108 5.693h-7v-14h7.195c3.084 0 5.055 1.565 5.055 3.999 0 1.517-.824 2.766-2.091 3.393 1.621.579 2.591 1.956 2.591 3.829 0 2.779-2.079 4.779-5.75 4.779zm-4.041-8.23h3.582c1.472 0 2.375-.71 2.375-1.921 0-1.124-.874-1.849-2.302-1.849h-3.655v3.77zm0 6.071h3.766c1.642 0 2.673-.787 2.673-2.148 0-1.312-1.031-2.112-2.673-2.112h-3.766v4.26z" />
  </svg>
);

// Official Linktree SVG mark
const LinktreeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="m13.736 5.853 4.006-4.115 2.325 2.38-4.502 4.622h5.81v3.292h-5.81l4.502 4.623-2.325 2.38-4.006-4.116v6.529h-3.472v-6.53l-4.006 4.116-2.325-2.38 4.502-4.623h-5.81V8.74h5.81L4.433 4.118l2.325-2.38 4.006 4.115V0h3.472v5.853zM10.264 18.147h3.472V24h-3.472v-5.853z" />
  </svg>
);

// Official Discord SVG mark
const DiscordIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

// Official GitHub SVG mark
const GithubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export interface SocialLink {
  name: string;
  handle: string;
  url: string;
  icon: React.FC<{ className?: string }>;
  accentColor: string;
  badge: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Email",
    handle: "sruu36@gmail.com",
    url: "mailto:sruu36@gmail.com",
    icon: Mail,
    accentColor: "#f7c2d1",
    badge: "Primary Contact",
  },
  {
    name: "LinkedIn",
    handle: "in/srushtirawal",
    url: "https://www.linkedin.com/in/srushtirawal/",
    icon: LinkedinIcon,
    accentColor: "#0A66C2",
    badge: "Professional",
  },
  {
    name: "Instagram",
    handle: "@sruxcx",
    url: "https://www.instagram.com/sruxcx",
    icon: InstagramIcon,
    accentColor: "#E4405F",
    badge: "Creative & Life",
  },
  {
    name: "X (Twitter)",
    handle: "@sruxcx",
    url: "https://x.com/sruxcx",
    icon: XIcon,
    accentColor: "#ffffff",
    badge: "Thoughts & Tech",
  },
  {
    name: "Discord",
    handle: "sruxcx",
    url: "https://discord.com/users/sruxcx",
    icon: DiscordIcon,
    accentColor: "#5865F2",
    badge: "Chat & Collab",
  },
  {
    name: "GitHub",
    handle: "github.com/sru36",
    url: "https://github.com/sru36",
    icon: GithubIcon,
    accentColor: "#faf7f5",
    badge: "Code & Repos",
  },
  {
    name: "Behance",
    handle: "Design Portfolio",
    url: "https://www.behance.net/gallery/246922889/DESIGN-PORTFOLIO",
    icon: BehanceIcon,
    accentColor: "#0057ff",
    badge: "Visual & UI",
  },
  {
    name: "Linktree",
    handle: "linktr.ee/sruxcx",
    url: "https://linktr.ee/sruxcx",
    icon: LinktreeIcon,
    accentColor: "#43e660",
    badge: "All My Links",
  },
];

export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 16 }}
            transition={{ type: "spring", damping: 25, stiffness: 320 }}
            className="relative w-full max-w-lg bg-[#141216] border border-[#f7c2d1]/40 rounded-2xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.85)] z-10 overflow-hidden"
          >
            {/* Subtle glow orb inside modal */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#db4876]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#f7c2d1]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6 relative z-10">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-[#f7c2d1]/30 font-mono text-[10px] text-[#f7c2d1] uppercase tracking-widest mb-2">
                  <Sparkles className="w-3 h-3 text-[#f7c2d1] animate-pulse" />
                  <span>Let&apos;s Connect</span>
                </div>
                <h3 className="font-serif italic font-bold text-2xl sm:text-3xl text-white tracking-tight">
                  Say <span className="text-[#f7c2d1]">Hello!</span>
                </h3>
                <p className="font-mono text-xs text-white/60 mt-1">
                  Pick your favorite platform to get in touch.
                </p>
              </div>

              {/* Close Button ('X') */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#db4876] text-white/70 hover:text-white border border-white/10 hover:border-[#f7c2d1]/50 flex items-center justify-center transition-all duration-200 hover:scale-105 cursor-pointer shadow-md"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Social Cards Grid with Pop Stagger */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
              {SOCIAL_LINKS.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 18, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: 0.05 + idx * 0.04,
                      type: "spring",
                      stiffness: 350,
                      damping: 24,
                    }}
                    className="group relative flex items-center gap-3.5 p-3 sm:p-3.5 rounded-xl bg-black/40 hover:bg-[#1f1b22] border border-white/10 hover:border-[#f7c2d1]/60 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(219,72,118,0.2)]"
                  >
                    {/* Icon container */}
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-[#f7c2d1]/40 transition-colors shrink-0"
                      style={{ color: item.accentColor }}
                    >
                      <IconComponent className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </div>

                    {/* Text info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-sans font-bold text-sm text-white group-hover:text-[#f7c2d1] transition-colors truncate">
                          {item.name}
                        </span>
                        <ExternalLink className="w-3 h-3 text-white/30 group-hover:text-[#f7c2d1] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1" />
                      </div>
                      <span className="block font-mono text-[10px] text-white/55 group-hover:text-white/80 transition-colors truncate">
                        {item.handle}
                      </span>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Bottom info footer */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-white/45">
              <span>Gwalior, India · Open for opportunities</span>
              <span className="text-[#f7c2d1]">✦ AI &amp; Dev</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};