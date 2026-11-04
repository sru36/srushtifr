import type { Metadata } from "next";
import { Playfair_Display, Space_Mono, DM_Sans, Silkscreen, Gochi_Hand } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

const gochiHand = Gochi_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

const pixelta = localFont({
  src: "./fonts/Pixelta.ttf",
  variable: "--font-pixelta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Srushti Rawal — Architecting Intelligent Systems · Curating Digital Elegance",
  description: "Portfolio of Srushti Rawal — BTech AI & Data Science (Class of 2028), frontend developer & designer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${spaceMono.variable} ${dmSans.variable} ${silkscreen.variable} ${gochiHand.variable} ${pixelta.variable}`}
    >
      <body className="font-sans antialiased bg-[var(--bg)] text-[var(--text)]">
        {children}
      </body>
    </html>
  );
}
