"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  Shuffle,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Disc3,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export interface SongItem {
  id: string;
  title: string;
  artist: string;
  cover: string;
  audioSrc: string;
}

const DEFAULT_SONGS: SongItem[] = [
  {
    id: "housewife",
    title: "Housewife",
    artist: "Tate McRae",
    cover: "/music/housewife-cover.jpg",
    audioSrc: "/music/housewife.mp3",
  },
  {
    id: "espresso",
    title: "Espresso",
    artist: "Sabrina Carpenter",
    cover: "/music/espresso-cover.jpg",
    audioSrc: "/music/sabrina-carpenter-espresso.mp3",
  },
  {
    id: "buttons",
    title: "Buttons",
    artist: "The Pussycat Dolls",
    cover: "/music/buttons-cover.jpg",
    audioSrc: "/music/buttons.mp3",
  },
  {
    id: "morning-dew",
    title: "Morning Dew",
    artist: "Donk",
    cover: "/music/morning-dew-cover.jpg",
    audioSrc: "/music/morning-dew.mp3",
  },
];

export const AlbumRail: React.FC<{
  songs?: SongItem[];
  className?: string;
}> = ({ songs = DEFAULT_SONGS, className = "" }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSong = songs[currentIdx] || songs[0];

  // ─── Switch Song (Only rewinds when song is explicitly changed) ───
  const switchSong = useCallback(
    (newIdx: number) => {
      const targetIdx = (newIdx + songs.length) % songs.length;
      setCurrentIdx(targetIdx);
      setProgress(0);

      const audio = audioRef.current;
      if (!audio) return;

      const nextTrack = songs[targetIdx] || songs[0];
      audio.src = nextTrack.audioSrc;
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Handled if browser restricts playback
      });
    },
    [songs]
  );

  // ─── Initial Autoplay as soon as page finishes loading ───
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const initialTrack = songs[0]; // Default song: Housewife
    audio.src = initialTrack.audioSrc;
    audio.currentTime = 0;

    let hasHandledGesture = false;

    const removeUnlockListeners = () => {
      window.removeEventListener("click", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
      window.removeEventListener("touchstart", onFirstGesture);
      window.removeEventListener("scroll", onFirstGesture);
    };

    const onFirstGesture = () => {
      if (hasHandledGesture) return;
      hasHandledGesture = true;
      removeUnlockListeners();
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
    };

    // Attempt immediate playback on load
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // If browser restricts autoplay before user interaction, unlock on first gesture
          window.addEventListener("click", onFirstGesture, { once: true, passive: true });
          window.addEventListener("keydown", onFirstGesture, { once: true, passive: true });
          window.addEventListener("touchstart", onFirstGesture, { once: true, passive: true });
          window.addEventListener("scroll", onFirstGesture, { once: true, passive: true });
        });
    }

    return () => {
      hasHandledGesture = true;
      removeUnlockListeners();
    };
  }, [songs]);

  // ─── Mute / Unmute handler ───
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // ─── Toggle Play / Pause without rewinding ───
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  const handleShuffle = () => {
    let nextIdx = Math.floor(Math.random() * songs.length);
    if (nextIdx === currentIdx && songs.length > 1) {
      nextIdx = (currentIdx + 1) % songs.length;
    }
    switchSong(nextIdx);
  };

  const handleNext = () => {
    switchSong(currentIdx + 1);
  };

  const handlePrev = () => {
    switchSong(currentIdx - 1);
  };

  return (
    <aside
      aria-label="Album Rail Music Player"
      className={`fixed bottom-4 right-4 z-40 select-none transition-all duration-300 ${className}`}
    >
      {/* Transparent glass wrapper — completely see-through & lightweight */}
      <div className="relative bg-black/20 hover:bg-black/35 backdrop-blur-[6px] border border-white/10 hover:border-[#f7c2d1]/30 rounded-xl p-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 w-[220px] sm:w-[240px]">
        
        {/* Micro header */}
        <div className="flex items-center justify-between pb-1.5 mb-1 border-b border-white/10 text-[10px]">
          <div className="flex items-center gap-1.5">
            <Disc3
              className={`w-3.5 h-3.5 text-[#f7c2d1] ${
                isPlaying ? "animate-spin" : ""
              }`}
            />
            <span className="font-pixel text-[8px] uppercase tracking-wider text-[#ffd6e2]/85">
              Album Rail
            </span>
          </div>

          <div className="flex items-center gap-0.5">
            <button
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? "Unmute" : "Mute"}
              className="p-1 rounded text-white/50 hover:text-[#f7c2d1] transition-colors"
            >
              {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? "Collapse" : "Expand"}
              className="p-1 rounded text-white/50 hover:text-[#f7c2d1] transition-colors"
            >
              {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* ─── Compact 3D Album Rail: Fan of Sleeves ─── */}
        {isExpanded && (
          <div className="relative h-24 sm:h-28 w-full flex items-center justify-center overflow-visible my-1.5 [perspective:600px]">
            {songs.map((song, idx) => {
              const isCurrent = idx === currentIdx;
              const isHovered = hoveredIdx === idx;
              const offset = idx - currentIdx;

              // Proportional 3D positioning scaled down for compact view
              let xTrans = offset * 26;
              let zTrans = -Math.abs(offset) * 30;
              let rotY = offset * -16;
              let rotZ = offset * 4;
              let scale = isCurrent ? 1 : 0.84;
              let opacity = isCurrent ? 1 : 0.45;

              return (
                <div
                  key={song.id}
                  onClick={() => {
                    if (idx !== currentIdx) {
                      switchSong(idx);
                    } else {
                      togglePlay();
                    }
                  }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="absolute cursor-pointer transition-all duration-500 ease-out"
                  style={{
                    transform: `translateX(${xTrans}px) translateZ(${zTrans}px) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`,
                    zIndex: isCurrent ? 20 : 10 - Math.abs(offset),
                    opacity,
                  }}
                >
                  {/* Compact Sleeve Outer Wrapper */}
                  <div className="relative w-20 h-20 sm:w-22 sm:h-22 group">
                    
                    {/* Vinyl Record tucked inside */}
                    <div
                      className={`absolute top-0.5 left-0 w-19 h-19 sm:w-21 sm:h-21 rounded-full border border-black/90 shadow-xl transition-all duration-700 ease-out pointer-events-none ${
                        isCurrent && isPlaying
                          ? "translate-x-8 sm:translate-x-9 rotate-180 animate-[spin_3.5s_linear_infinite]"
                          : isHovered || isCurrent
                          ? "translate-x-4 sm:translate-x-5"
                          : "translate-x-0.5"
                      }`}
                      style={{
                        background:
                          "repeating-radial-gradient(circle at center, #111 0px, #111 1.5px, #202020 2px, #202020 2.5px, #080808 3px)",
                      }}
                    >
                      {/* Center sticker */}
                      <div className="absolute inset-0 m-auto w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-[#db4876] to-[#f7c2d1] border border-black flex items-center justify-center shadow-inner">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0d0c0e] border border-white/60" />
                      </div>
                    </div>

                    {/* Cardstock Album Jacket */}
                    <div className="relative z-10 w-full h-full rounded-md overflow-hidden border border-white/20 shadow-[0_6px_16px_rgba(0,0,0,0.7)] bg-[#1a171d]/90">
                      <img
                        src={song.cover}
                        alt={song.title}
                        className={`w-full h-full object-cover transition-all duration-300 ${
                          isCurrent
                            ? "grayscale-0"
                            : "grayscale contrast-110 group-hover:grayscale-0"
                        }`}
                      />

                      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none" />

                      {isCurrent && isPlaying && (
                        <div className="absolute bottom-1 left-1 px-1.5 py-0.2 rounded bg-black/80 border border-[#f7c2d1]/50 text-[#f7c2d1] font-pixel text-[7px] flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-[#f7c2d1] animate-ping" />
                          PLAY
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ─── Compact Controls ─── */}
        <div className="pt-1.5 border-t border-white/10">
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <div className="truncate min-w-0 pr-1">
              <h4 className="font-serif italic font-bold text-xs text-white truncate">
                {currentSong.title}
              </h4>
              <p className="font-mono text-[9px] text-[#ffd6e2]/75 truncate">
                {currentSong.artist}
              </p>
            </div>

            {/* Micro Controls */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={handleShuffle}
                title="Shuffle Songs"
                className="w-6 h-6 rounded-full border border-[#f7c2d1]/30 bg-white/5 text-[#f7c2d1] hover:bg-[#db4876]/40 flex items-center justify-center transition-all hover:scale-105"
              >
                <Shuffle className="w-3 h-3" />
              </button>

              <button
                onClick={handlePrev}
                title="Previous"
                className="w-5 h-5 rounded-full text-white/60 hover:text-white flex items-center justify-center transition-colors"
              >
                <SkipBack className="w-3 h-3" />
              </button>

              <button
                onClick={togglePlay}
                title={isPlaying ? "Pause" : "Play"}
                className="w-7 h-7 rounded-full bg-[#db4876] text-white hover:bg-[#f7c2d1] hover:text-black flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-[0_0_10px_rgba(219,72,118,0.4)]"
              >
                {isPlaying ? (
                  <Pause className="w-3 h-3 fill-current" />
                ) : (
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                )}
              </button>

              <button
                onClick={handleNext}
                title="Next"
                className="w-5 h-5 rounded-full text-white/60 hover:text-white flex items-center justify-center transition-colors"
              >
                <SkipForward className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Micro Progress Bar */}
          <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#db4876] to-[#f7c2d1] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* ─── Persistent Audio Element (Never unmounted during collapse/expand) ─── */}
        <audio
          ref={audioRef}
          preload="auto"
          onTimeUpdate={(e) => {
            const el = e.currentTarget;
            if (el.duration && !isNaN(el.duration)) {
              setProgress((el.currentTime / el.duration) * 100);
            }
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={handleNext}
        />
      </div>
    </aside>
  );
};
