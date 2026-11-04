"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

type IconProps = { className?: string };

// ─── 1. Python (Signature blue #3776AB + warm yellow #FFD438) ───
const PythonIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <g transform="translate(8, 8) scale(0.875)">
      <path
        fill="#3776AB"
        d="M63.5 0C44.3 0 45.6 8.3 45.6 8.3l.1 8.6h18.2v2.6H28.6S16 17.8 16 37.3s10.7 18.8 10.7 18.8h6.4V47S32.6 36.8 43.2 36.8h32s10.1.2 10.1-9.8V10.3S87.2 0 63.5 0zm-17.9 10.6a3.3 3.3 0 1 1 0 6.6 3.3 3.3 0 0 1 0-6.6z"
      />
      <path
        fill="#FFD438"
        d="M64.5 128c19.2 0 17.9-8.3 17.9-8.3l-.1-8.6H64.1v-2.6h35.3s12.6 1.6 12.6-17.9-10.7-18.8-10.7-18.8h-6.4v9.1s.5 10.2-10.1 10.2H52.8S42.7 91.2 42.7 101.2V117.7S40.8 128 64.5 128zm17.9-10.6a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6z"
      />
    </g>
  </svg>
);

// ─── 2. JavaScript (Signature yellow badge #F7DF1E + black JS) ───
const JavaScriptIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <rect width="128" height="128" rx="24" fill="#F7DF1E" />
    <path
      fill="#000000"
      d="M38 98c0 8.5 5.5 14 14.5 14 9.5 0 15.5-5.5 15.5-15.5V48h-14v48.5c0 2.5-1 3.5-3.5 3.5s-3.5-1-3.5-3.5V74H38v24zm42.5-1.5c3.5 4 8.5 6.5 14.5 6.5 6 0 10-3 10-7.5 0-4.5-3.5-6.5-10.5-8.5l-4-1.2c-12-3.8-17-9.8-17-19.8 0-11.5 9-19 22.5-19 8.5 0 15 3.2 20 8.5l-8.5 9c-3-3.2-6.8-5-11.5-5-5.2 0-8.5 2.8-8.5 6.5 0 3.8 3.2 5.8 9.5 7.8l4 1.2c13 4 18.5 9.8 18.5 20.8 0 12-9.5 20-24.5 20-10.5 0-18.5-4.2-24-10.5l9.5-11.8z"
    />
  </svg>
);

// ─── 3. TypeScript (Signature blue badge #3178C6 + crisp white TS) ───
const TypeScriptIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <rect width="128" height="128" rx="24" fill="#3178C6" />
    <path
      fill="#FFFFFF"
      d="M68 88V48h14v-9H53v9h15v40h0zM88 74.5c0-6-4-10-12-12.8-5.3-1.8-7.5-3-7.5-5.3 0-2 1.6-3.5 4.6-3.5 3.3 0 5.6 1.2 7.5 3.6l6.2-6c-3.2-3.8-7.7-5.8-13.7-5.8-8 0-14.2 4.7-14.2 12 0 6.4 4.2 10 12.3 12.7 5.9 2.1 8.1 3.6 8.1 6.3 0 2.7-2.1 4.4-5.6 4.4-3.9 0-7-1.9-9.3-5.2l-6.5 6c3.3 4.9 8.6 7.5 15.8 7.5 9 0 14.8-4.7 14.8-12.9z"
    />
  </svg>
);

// ─── 4. C++ (Signature ISO blue shield #00599C + cyan ++) ───
const CppIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <path fill="#00599C" d="M64 8l48.5 28v56L64 120 15.5 92V36L64 8z" />
    <path fill="#004482" d="M64 8v112l48.5-28V36L64 8z" opacity="0.25" />
    <path
      fill="#FFFFFF"
      d="M50 44c-11 0-20 9-20 20s9 20 20 20c7.2 0 13.5-3.8 17-9.8l-9.2-4.9c-1.8 3.2-4.5 5.2-7.8 5.2-6 0-10.8-4.8-10.8-10.5s4.8-10.5 10.8-10.5c3.3 0 6 2 7.8 5.2l9.2-4.9C63.5 47.8 57.2 44 50 44z"
    />
    <path
      fill="#659AD2"
      d="M78 58h5v-5h5v5h5v5h-5v5h-5v-5h-5v-5zm18 0h5v-5h5v5h5v5h-5v5h-5v-5h-5v-5z"
    />
  </svg>
);

// ─── 5. React (Vibrant neon cyan #61DAFB core and orbital rings) ───
const ReactIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <circle cx="64" cy="64" r="14" fill="#61DAFB" />
    <ellipse cx="64" cy="64" rx="56" ry="21" stroke="#61DAFB" strokeWidth="5.5" />
    <ellipse cx="64" cy="64" rx="56" ry="21" stroke="#61DAFB" strokeWidth="5.5" transform="rotate(60 64 64)" />
    <ellipse cx="64" cy="64" rx="56" ry="21" stroke="#61DAFB" strokeWidth="5.5" transform="rotate(120 64 64)" />
  </svg>
);

// ─── 6. Next.js (Deep obsidian badge with crisp white diagonal N) ───
const NextjsIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <circle cx="64" cy="64" r="60" fill="#000000" stroke="#FFFFFF" strokeWidth="3.5" />
    <path
      fill="#FFFFFF"
      d="M77 88.6L46.3 47H39v34h5.7V54.8L73.6 94.4A38 38 0 0 0 102 64c0-21-17-38-38-38a38 38 0 0 0-38 38h6a32 32 0 1 1 45 29.6z"
    />
  </svg>
);

// ─── 7. Node.js (Signature Node green #539E43 hexagonal badge) ───
const NodejsIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <path fill="#539E43" d="M64 10l48 27.7v55.4L64 120.8 16 93.1V37.7L64 10z" />
    <path fill="#3E7B27" d="M64 10v110.8l48-27.7V37.7L64 10z" opacity="0.3" />
    <path
      fill="#FFFFFF"
      d="M64 36c-16 0-16.5 14-16.5 15.5 0 14 13.5 15.5 17 16.5 10 3.5 10.5 6.5 10.5 9.5 0 8-6.5 9.5-11 9.5-10 0-13-5.5-14-9.5l-7.5 3.5c2 8 8.5 13 21.5 13 13.5 0 19-7.5 19-16.5 0-13.5-13-15.5-17-17-8.5-3-10.5-5.5-10.5-9 0-6.5 5.5-9 10-9 8 0 11.5 4.5 13 8l7.5-4c-2.5-6.5-7.5-11-15-11z"
    />
  </svg>
);

// ─── 8. Tailwind CSS (Sky blue cyan gradient dual wave) ───
const TailwindIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <defs>
      <linearGradient id="twGradClean" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0EA5E9" />
      </linearGradient>
    </defs>
    <path
      fill="url(#twGradClean)"
      d="M64 16c-17.1 0-27.8 8.5-32 25.6 6.4-8.5 13.9-11.7 22.4-9.6 4.9 1.2 8.3 4.7 12.2 8.6C73 47.3 80.5 55 96 55c17.1 0 27.8-8.5 32-25.6-6.4 8.5-13.9 11.7-22.4 9.6-4.9-1.2-8.3-4.7-12.2-8.6C87 23.7 79.5 16 64 16zM32 55C14.9 55 4.2 63.5 0 80.6c6.4-8.5 13.9-11.7 22.4-9.6 4.9 1.2 8.3 4.7 12.2 8.6C41 86.3 48.5 94 64 94c17.1 0 27.8-8.5 32-25.6-6.4 8.5-13.9 11.7-22.4 9.6-4.9-1.2-8.3-4.7-12.2-8.6C55 62.7 47.5 55 32 55z"
    />
  </svg>
);

// ─── 9. SQL (Modern cylinder database stack) ───
const SQLIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <rect width="128" height="128" rx="24" fill="#0F172A" stroke="#38BDF8" strokeWidth="3" />
    <ellipse cx="64" cy="34" rx="34" ry="11" fill="#0284C7" stroke="#38BDF8" strokeWidth="2.5" />
    <path d="M30 34v17c0 6.1 15.2 11 34 11s34-4.9 34-11V34" stroke="#38BDF8" strokeWidth="2.5" fill="#0369A1" />
    <path d="M30 51v17c0 6.1 15.2 11 34 11s34-4.9 34-11V51" stroke="#38BDF8" strokeWidth="2.5" fill="#075985" />
    <text x="64" y="104" textAnchor="middle" fill="#38BDF8" fontSize="22" fontWeight="900" fontFamily="monospace" letterSpacing="1px">
      SQL
    </text>
  </svg>
);

// ─── 10. MySQL (Official dolphin & warm gold wave badge) ───
const MySQLIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <rect width="128" height="128" rx="24" fill="#00758F" />
    <path
      fill="#FFFFFF"
      d="M86 34c-4-4-9-6-15-7-13-2-22 4-26 12-4 8-1 18 6 24 5 5 11 8 16 12 3 2 5 5 6 9 1 5-1 9-5 12-3 2-7 3-10 2l-2 5c5 2 11 1 15-2 6-4 8-10 7-17-1-5-4-9-8-12-5-4-10-7-14-11-4-5-6-12-3-18 3-5 10-10 19-8 5 1 8 3 10 5z"
    />
    <path
      fill="#F29111"
      d="M86 34c2 3 3 7 3 11 0 10-7 19-17 21 4-4 6-9 6-15 0-6-3-11-7-14 5 1 11 4 15 7z"
    />
    <text x="64" y="112" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1px">
      MySQL
    </text>
  </svg>
);

// ─── 11. PostgreSQL (Official PostgreSQL Elephant badge) ───
const PostgreSQLIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <rect width="128" height="128" rx="24" fill="#336791" />
    <path
      fill="#FFFFFF"
      d="M64 24c-16.5 0-28 11-28 25 0 9 5 17 12 21.5v15c0 3.5 2.5 6.5 6 7.5l2 1v6.5c0 3 2.5 5.5 5.5 5.5h7c3 0 5.5-2.5 5.5-5.5v-6.5h4.5v-8.5H74v-6.5c6.5-2.5 12-7.5 14.5-14 3-1 7.5-3.5 10-7 4.5-6.5 4.5-16.5 0-23-4.5-6.5-11-10.5-20-10.5zm-8.5 27a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm22 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"
    />
    <path fill="#336791" d="M55.5 47a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm22 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
    <text x="64" y="117" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5px">
      POSTGRES
    </text>
  </svg>
);

// ─── 12. MongoDB (Official MongoDB Green Leaf badge) ───
const MongoDBIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <rect width="128" height="128" rx="24" fill="#001E2B" stroke="#00ED64" strokeWidth="2" />
    <path
      fill="#00ED64"
      d="M64 16c-2 0-3.5 1-4.5 3.5-7.5 13.5-23 38.5-23 57.5 0 23 17 39.5 25.5 48 1 1 2 1 2 0 8.5-8.5 25.5-25 25.5-48 0-19-15.5-44-23-57.5-1-2.5-1.5-3.5-2.5-3.5z"
    />
    <path
      fill="#00684A"
      d="M64 16v109c8.5-8.5 25.5-25 25.5-48 0-19-15.5-44-23-57.5-1-2.5-1.5-3.5-2.5-3.5z"
    />
    <path
      fill="#FFFFFF"
      opacity="0.3"
      d="M64 30v77c-4-4.5-12.5-15-12.5-27.5 0-12.5 8.5-33.5 12.5-49.5z"
    />
  </svg>
);

// ─── 13. Supabase (Official Emerald Lightning Bolt) ───
const SupabaseIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <defs>
      <linearGradient id="supaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3ECF8E" />
        <stop offset="100%" stopColor="#249361" />
      </linearGradient>
    </defs>
    <rect width="128" height="128" rx="24" fill="#1C1C1C" stroke="rgba(62,207,142,0.3)" strokeWidth="2" />
    <path
      fill="url(#supaGrad)"
      d="M68.5 20L28 72.8c-1.8 2.3-.2 5.6 2.7 5.6h31.8l-5 33.6c-.7 4.7 5.2 7.3 8.3 3.7L104.3 63c1.8-2.3.2-5.6-2.7-5.6H69.8l5-33.6c.7-4.8-5.2-7.4-8.3-3.8z"
    />
  </svg>
);

// ─── 14. Vercel (Crisp white triangle on dark circle) ───
const VercelIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <circle cx="64" cy="64" r="56" fill="#000000" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
    <path fill="#FFFFFF" d="M64 30L102 96H26L64 30z" />
  </svg>
);

// ─── 15. Git (Official orange diamond with branch nodes) ───
const GitIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <rect width="128" height="128" rx="24" fill="#F05032" />
    <path
      fill="#FFFFFF"
      d="M98.6 57.3L70.7 29.4a7.9 7.9 0 0 0-11.2 0l-5.6 5.6 14.2 14.2a9.5 9.5 0 0 1 12 12l13.7 13.7a9.5 9.5 0 1 1-5.6 5.6L74.8 66.8v22.4a9.5 9.5 0 1 1-8 0V66.2a9.5 9.5 0 0 1-5.1-12.5L47.5 39.5 29.4 57.6a7.9 7.9 0 0 0 0 11.2l27.9 27.9a7.9 7.9 0 0 0 11.2 0l30.1-30.1a7.9 7.9 0 0 0 0-11.2z"
    />
  </svg>
);

// ─── 16. GitHub (Crisp Octocat white on dark charcoal) ───
const GithubIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 128 128" className={className} fill="none">
    <circle cx="64" cy="64" r="60" fill="#24292E" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" />
    <path
      fill="#FFFFFF"
      d="M64 16a48 48 0 0 0-15.2 93.6c2.4.4 3.3-1 3.3-2.3v-8.9c-13.4 2.9-16.2-5.7-16.2-5.7-2.2-5.5-5.3-7-5.3-7-4.3-3 .4-2.9.4-2.9 4.8.4 7.4 4.9 7.4 4.9 4.2 7.3 11.2 5.2 13.9 4 .5-3.1 1.7-5.2 3-6.4-10.7-1.2-21.9-5.4-21.9-23.7 0-5.3 1.9-9.5 5-12.8-.5-1.2-2.1-6.1.5-12.6 0 0 4-1.3 13.2 4.9a45.8 45.8 0 0 1 24 0c9.2-6.2 13.2-4.9 13.2-4.9 2.6 6.5 1 11.4.5 12.6 3.1 3.3 5 7.5 5 12.8 0 18.4-11.3 22.5-22 23.6 1.7 1.5 3.2 4.4 3.2 8.9v13.3c0 1.3.8 2.8 3.3 2.3A48 48 0 0 0 64 16z"
    />
  </svg>
);

type TechEntry = { Icon: React.FC<IconProps>; label: string };

// Row 1: Languages, Core & Frontend Frameworks
const ROW_1: TechEntry[] = [
  { Icon: PythonIcon,     label: "Python"       },
  { Icon: JavaScriptIcon, label: "JavaScript"   },
  { Icon: TypeScriptIcon, label: "TypeScript"   },
  { Icon: CppIcon,        label: "C++"          },
  { Icon: ReactIcon,      label: "React"        },
  { Icon: NextjsIcon,     label: "Next.js"      },
  { Icon: NodejsIcon,     label: "Node.js"      },
  { Icon: TailwindIcon,   label: "Tailwind CSS" },
];

// Row 2: Databases, Cloud, Backend & Version Control
const ROW_2: TechEntry[] = [
  { Icon: SQLIcon,        label: "SQL"          },
  { Icon: MySQLIcon,      label: "MySQL"        },
  { Icon: PostgreSQLIcon, label: "PostgreSQL"   },
  { Icon: MongoDBIcon,    label: "MongoDB"      },
  { Icon: SupabaseIcon,   label: "Supabase"     },
  { Icon: VercelIcon,     label: "Vercel"       },
  { Icon: GitIcon,        label: "Git"          },
  { Icon: GithubIcon,     label: "GitHub"       },
];

type AnimIconProps = {
  entry: TechEntry;
  index: number;
  centerIndex: number;
  progress: ReturnType<typeof useSpring>;
  rowOffset?: number;
};

const AnimIcon = ({
  entry,
  index,
  centerIndex,
  progress,
  rowOffset = 1,
}: AnimIconProps) => {
  const dist = index - centerIndex;

  // Harmonic arc transform for butter-smooth scroll fanning
  const x = useTransform(progress, [0.05, 0.75], [dist * 30, 0]);
  const rotate = useTransform(progress, [0.05, 0.75], [dist * (rowOffset * 8), 0]);
  const y = useTransform(progress, [0.05, 0.75], [-Math.abs(dist) * 9 * rowOffset, 0]);
  const scale = useTransform(progress, [0.05, 0.75], [0.85, 1]);
  const opacity = useTransform(progress, [0.0, 0.35], [0.4, 1]);

  return (
    <motion.div
      className="flex flex-col items-center gap-2 sm:gap-2.5 cursor-pointer shrink-0 select-none group"
      style={{ x, rotate, y, scale, opacity, transformOrigin: "bottom center" }}
      whileHover={{ scale: 1.18, y: -6 }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
    >
      {/* Icon frame */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] group-hover:drop-shadow-[0_12px_24px_rgba(247,194,209,0.3)] transition-all duration-300">
        <entry.Icon className="w-full h-full" />
      </div>

      {/* Label beneath icon */}
      <span className="font-pixel text-[8px] sm:text-[9px] md:text-[10px] tracking-wider text-white/70 group-hover:text-[#f7c2d1] uppercase transition-colors whitespace-nowrap">
        {entry.label}
      </span>
    </motion.div>
  );
};

export const ScrollAnimIcons: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure scroll over this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Spring smoothing for 60fps interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 24,
    restDelta: 0.001,
  });

  const centerIndex1 = (ROW_1.length - 1) / 2; // 3.5 for 8 items
  const centerIndex2 = (ROW_2.length - 1) / 2; // 3.5 for 8 items

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-visible py-4"
      style={{ perspective: "1000px" }}
    >
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 w-full max-w-7xl mx-auto">
        
        {/* Row 1: Languages, Core & Frontend */}
        <div className="flex flex-nowrap items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-2 sm:px-6 w-full overflow-x-auto sm:overflow-visible no-scrollbar py-2">
          {ROW_1.map((entry, i) => (
            <AnimIcon
              key={entry.label}
              entry={entry}
              index={i}
              centerIndex={centerIndex1}
              progress={smoothProgress}
              rowOffset={1}
            />
          ))}
        </div>

        {/* Row 2: Databases, Cloud, Backend & Version Control */}
        <div className="flex flex-nowrap items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-2 sm:px-6 w-full overflow-x-auto sm:overflow-visible no-scrollbar py-2">
          {ROW_2.map((entry, i) => (
            <AnimIcon
              key={entry.label}
              entry={entry}
              index={i}
              centerIndex={centerIndex2}
              progress={smoothProgress}
              rowOffset={0.7}
            />
          ))}
        </div>

      </div>
    </div>
  );
};