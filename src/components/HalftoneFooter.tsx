"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";

interface HalftonePalette {
  background: string;
  ink: string;
  warm: string;
}

export const HalftoneFooter: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const colors: HalftonePalette = {
    background: "#0d0c0e",
    ink: "#f7c2d1",
    warm: "#ffffff",
  };

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let px = -1e5;
    let py = -1e5;
    let raf = 0;
    let visible = true;
    let awake = true;
    let ring = { x: 0, y: 0, t: -1 };
    let dots = new Float32Array(0);
    let count = 0;
    let grainTile: HTMLCanvasElement | null = null;

    const WORD = "srushti";
    const GAP = 6;
    const RADIUS = 85;

    const hexToRgb = (hex: string): [number, number, number] => {
      const clean = hex.replace("#", "");
      return [
        parseInt(clean.slice(0, 2), 16),
        parseInt(clean.slice(2, 4), 16),
        parseInt(clean.slice(4, 6), 16),
      ];
    };

    const inkRgb = hexToRgb(colors.ink);
    const warmRgb = hexToRgb(colors.warm);

    const layout = () => {
      const rect = root.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);

      const mask = document.createElement("canvas");
      mask.width = w;
      mask.height = h;
      const m = mask.getContext("2d", { willReadFrequently: true });
      if (!m) return;

      m.font = '900 100px "Playfair Display", Georgia, serif';
      const mw = m.measureText(WORD).width;
      const fit = mw > 0 ? (w * 1.02 / mw) * 100 : 100;
      m.font = `900 ${fit}px "Playfair Display", Georgia, serif`;
      const box = m.measureText(WORD);
      const cap = box.actualBoundingBoxAscent || fit * 0.72;
      m.fillStyle = "#000";
      m.textBaseline = "alphabetic";
      m.fillText(WORD, (w - box.width) / 2, h + cap * 0.22);
      const img = m.getImageData(0, 0, w, h).data;

      const cols = Math.ceil(w / GAP);
      const rows = Math.ceil(h / GAP);
      const tmp: number[] = [];

      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          let sum = 0;
          for (let sy = 0; sy < 3; sy++) {
            for (let sx = 0; sx < 3; sx++) {
              const xi = Math.min(w - 1, Math.floor(gx * GAP + ((sx + 0.5) * GAP) / 3));
              const yi = Math.min(h - 1, Math.floor(gy * GAP + ((sy + 0.5) * GAP) / 3));
              sum += img[(yi * w + xi) * 4 + 3];
            }
          }
          const cov = sum / (9 * 255);
          if (cov < 0.06) continue;
          const hx = gx * GAP + GAP / 2;
          const hy = gy * GAP + GAP / 2;
          tmp.push(hx, hy, 0, 0, hx, hy, Math.sqrt(cov) * GAP * 0.56);
        }
      }
      dots = new Float32Array(tmp);
      count = tmp.length / 7;

      grainTile = document.createElement("canvas");
      grainTile.width = 256;
      grainTile.height = 256;
      const g = grainTile.getContext("2d");
      if (g) {
        const id = g.createImageData(256, 256);
        for (let i = 0; i < id.data.length; i += 4) {
          const v = Math.random() * 255;
          id.data[i] = id.data[i + 1] = id.data[i + 2] = v;
          id.data[i + 3] = Math.random() < 0.5 ? 0 : 255;
        }
        g.putImageData(id, 0, 0);
      }
      awake = true;
    };

    const draw = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, w, h);

      const ringAge = ring.t < 0 ? 1e9 : now - ring.t;
      const ringR = ringAge * 0.9;
      let moving = false;

      for (let i = 0; i < count; i++) {
        const j = i * 7;
        let x = dots[j];
        let y = dots[j + 1];
        let vx = dots[j + 2];
        let vy = dots[j + 3];
        const hx = dots[j + 4];
        const hy = dots[j + 5];

        if (ringAge < 900) {
          const dx = hx - ring.x;
          const dy = hy - ring.y;
          const d = Math.sqrt(dx * dx + dy * dy) + 0.001;
          const band = 1 - Math.min(1, Math.abs(d - ringR) / 26);
          if (band > 0) {
            const f = band * 3.2 * (1 - ringAge / 900);
            vx += (dx / d) * f;
            vy += (dy / d) * f;
          }
        }

        const dx2 = x - px;
        const dy2 = y - py;
        const d2 = dx2 * dx2 + dy2 * dy2;
        if (d2 < RADIUS * RADIUS) {
          const d = Math.sqrt(d2) + 0.001;
          const f = (1 - d / RADIUS) * 2.6;
          vx += (dx2 / d) * f;
          vy += (dy2 / d) * f;
        }

        vx = (vx + (hx - x) * 0.05) * 0.84;
        vy = (vy + (hy - y) * 0.05) * 0.84;
        x += vx;
        y += vy;

        if (Math.abs(vx) + Math.abs(vy) > 0.02 || Math.abs(x - hx) + Math.abs(y - hy) > 0.05) {
          moving = true;
        } else {
          x = hx;
          y = hy;
          vx = 0;
          vy = 0;
        }

        dots[j] = x;
        dots[j + 1] = y;
        dots[j + 2] = vx;
        dots[j + 3] = vy;

        const dist = Math.hypot(x - hx, y - hy);
        const k = Math.min(1, dist / 28);
        ctx.fillStyle =
          k > 0.02
            ? `rgb(${Math.round(inkRgb[0] + (warmRgb[0] - inkRgb[0]) * k)},${Math.round(
                inkRgb[1] + (warmRgb[1] - inkRgb[1]) * k
              )},${Math.round(inkRgb[2] + (warmRgb[2] - inkRgb[2]) * k)})`
            : colors.ink;

        ctx.beginPath();
        ctx.arc(x, y, dots[j + 6], 0, Math.PI * 2);
        ctx.fill();
      }

      if (grainTile) {
        ctx.globalAlpha = 0.04;
        ctx.globalCompositeOperation = "overlay";
        const pat = ctx.createPattern(grainTile, "repeat");
        if (pat) {
          ctx.fillStyle = pat;
          ctx.fillRect(0, 0, w, h);
        }
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
      }

      awake = moving || ringAge < 900 || px > -1e4;
    };

    const loop = (now: number) => {
      raf = 0;
      if (!visible) return;
      draw(now);
      if (awake) raf = requestAnimationFrame(loop);
    };

    const wake = () => {
      awake = true;
      if (!raf && visible) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      px = e.clientX - b.left;
      py = e.clientY - b.top;
      wake();
    };

    const onLeave = () => {
      px = -1e5;
      py = -1e5;
      wake();
    };

    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) return;
      const b = canvas.getBoundingClientRect();
      ring = { x: e.clientX - b.left, y: e.clientY - b.top, t: performance.now() };
      wake();
    };

    layout();
    draw(performance.now());
    wake();

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerdown", onDown);

    const ro = new ResizeObserver(() => {
      layout();
      wake();
    });
    ro.observe(root);

    const io = new IntersectionObserver((entries) => {
      visible = entries[0] ? entries[0].isIntersecting : true;
      if (visible) wake();
    });
    io.observe(root);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerdown", onDown);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={rootRef}
      id="footer"
      className="relative w-full overflow-hidden [isolation:isolate] bg-[#0d0c0e] text-white min-h-[580px] flex flex-col justify-between border-t border-white/10"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-auto" aria-hidden="true" />
      <span className="sr-only">srushti</span>

      {/* Top Grid Info */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-6 md:px-14 pt-12 font-mono text-[11px] tracking-[0.18em] uppercase leading-relaxed">
        <div>
          <strong className="block font-bold text-white text-xs mb-1">
            Srushti Rawal
          </strong>
          <span className="opacity-45">©2026 · AI &amp; Data Science · Gwalior, India</span>
        </div>

        <nav aria-label="Index">
          <h3 className="font-semibold text-[#f7c2d1] opacity-90 mb-2.5">
            Index
          </h3>
          <ul className="space-y-1">
            {["hero", "about", "tech", "projects", "achievements"].map((sec) => (
              <li key={sec}>
                <Link href={`#${sec}`} className="opacity-70 hover:opacity-100 hover:text-[#f7c2d1] transition-opacity">
                  {sec}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Connect">
          <h3 className="font-semibold text-[#f7c2d1] opacity-90 mb-2.5">
            Connect
          </h3>
          <ul className="space-y-1">
            <li>
              <a href="https://github.com/sru36" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:text-[#f7c2d1] transition-opacity">
                GitHub (sru36)
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/srushtirawal/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:text-[#f7c2d1] transition-opacity">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://x.com/sruxcx" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:text-[#f7c2d1] transition-opacity">
                X (@sruxcx)
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/sruxcx" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:text-[#f7c2d1] transition-opacity">
                Instagram (@sruxcx)
              </a>
            </li>
            <li>
              <a href="https://discord.com/users/sruxcx" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 hover:text-[#f7c2d1] transition-opacity">
                Discord (sruxcx)
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="More Links">
          <h3 className="font-semibold text-[#f7c2d1] opacity-90 mb-2.5">
            More Links
          </h3>
          <ul className="space-y-1">
            <li>
              <a
                href="https://www.behance.net/gallery/246922889/DESIGN-PORTFOLIO"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 hover:text-[#f7c2d1] transition-opacity"
              >
                Design Portfolio ↗
              </a>
            </li>
            <li>
              <a
                href="https://linktr.ee/sruxcx"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 hover:text-[#f7c2d1] transition-opacity"
              >
                Linktree ↗
              </a>
            </li>
            <li>
              <a
                href="https://drive.google.com/file/d/10HOUmlZKO4YYqN7RoWACKlDzTxSxNowJ/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 hover:text-[#f7c2d1] transition-opacity"
              >
                Resume ↗
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label="Contact">
          <h3 className="font-semibold text-[#f7c2d1] opacity-90 mb-2.5">
            Say Hello
          </h3>
          <ul className="space-y-1">
            <li>
              <a href="mailto:SRUU36@GMAIL.COM" className="opacity-70 hover:opacity-100 hover:text-[#f7c2d1] transition-opacity">
                SRUU36@GMAIL.COM
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Back to top rule */}
      <div className="relative z-10 flex justify-end px-6 md:px-14 pb-8 pt-4 border-t border-white/10 font-mono text-[10px] uppercase tracking-widest text-white/50">
        <button
          type="button"
          onClick={scrollToTop}
          className="hover:text-white transition-colors cursor-pointer"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
};
