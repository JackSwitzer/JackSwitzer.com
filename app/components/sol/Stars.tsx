"use client";

import { useMemo } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  brightness: number;
  size: number;
  twinkle: boolean;
  twinkleDelay: number;
}

interface StarsProps {
  opacity: number;
  count?: number;
  seed?: number;
}

// Seeded random for consistent positions
function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

export function Stars({ opacity, count = 40, seed = 42 }: StarsProps) {
  const stars = useMemo((): Star[] => {
    const random = seededRandom(seed);
    const result: Star[] = [];

    for (let i = 0; i < count; i++) {
      result.push({
        id: i,
        x: random() * 100,
        y: random() * 70,
        brightness: 0.3 + random() * 0.5,
        size: 1 + random() * 1.2,
        twinkle: random() > 0.75,
        twinkleDelay: random() * 3,
      });
    }

    return result;
  }, [count, seed]);

  if (opacity <= 0) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        opacity,
        transition: "opacity 1.5s ease",
      }}
    >
      {/* Background stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={star.twinkle ? "animate-twinkle" : ""}
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor: "white",
            borderRadius: "50%",
            opacity: star.brightness,
            boxShadow: `0 0 ${star.size}px rgba(255, 255, 255, 0.4)`,
            animationDelay: star.twinkle ? `${star.twinkleDelay}s` : undefined,
          }}
        />
      ))}

      {/* Constellations SVG - designed by Gemini 3 Pro */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 75"
        preserveAspectRatio="none"
      >
        {/* Big Dipper - upper left */}
        <path d="M8.5,14.5 L13.5,13.2 L17.5,12.5 L21.5,12.2 L29.2,10.5 L29.5,18.2 L21.8,18.5 L21.5,12.2" stroke="white" strokeWidth="0.1" opacity="0.12" fill="none"/>
        <circle cx="8.5" cy="14.5" r="0.55" fill="white" opacity="0.7"/>
        <circle cx="13.5" cy="13.2" r="0.5" fill="white" opacity="0.7"/>
        <circle cx="17.5" cy="12.5" r="0.55" fill="white" opacity="0.7"/>
        <circle cx="21.5" cy="12.2" r="0.4" fill="white" opacity="0.7"/>
        <circle cx="21.8" cy="18.5" r="0.5" fill="white" opacity="0.7"/>
        <circle cx="29.5" cy="18.2" r="0.5" fill="white" opacity="0.7"/>
        <circle cx="29.2" cy="10.5" r="0.6" fill="white" opacity="0.7"/>

        {/* Little Dipper - upper center */}
        <path d="M68 7 L63 9 L58 11 L54 13 L54 18 L49 20 L47 15 L54 13" stroke="white" strokeWidth="0.1" opacity="0.12" fill="none"/>
        <circle cx="68" cy="7" r="0.6" fill="white" opacity="0.9"/>
        <circle cx="63" cy="9" r="0.4" fill="white" opacity="0.7"/>
        <circle cx="58" cy="11" r="0.4" fill="white" opacity="0.7"/>
        <circle cx="54" cy="13" r="0.45" fill="white" opacity="0.7"/>
        <circle cx="54" cy="18" r="0.4" fill="white" opacity="0.7"/>
        <circle cx="49" cy="20" r="0.5" fill="white" opacity="0.7"/>
        <circle cx="47" cy="15" r="0.55" fill="white" opacity="0.8"/>

        {/* Cassiopeia - upper right */}
        <path d="M76 11 L80.5 18.5 L86 13 L91.5 19.5 L94.5 9" stroke="white" strokeWidth="0.1" opacity="0.12" fill="none"/>
        <circle cx="76" cy="11" r="0.4" fill="white" opacity="0.7"/>
        <circle cx="80.5" cy="18.5" r="0.45" fill="white" opacity="0.7"/>
        <circle cx="86" cy="13" r="0.55" fill="white" opacity="0.7"/>
        <circle cx="91.5" cy="19.5" r="0.55" fill="white" opacity="0.7"/>
        <circle cx="94.5" cy="9" r="0.5" fill="white" opacity="0.7"/>

        {/* Orion - lower right */}
        <path d="M 58 35 L 65 47 L 67.5 47.5 L 70 48 L 74 33 M 65 47 L 63 63 M 70 48 L 77 59" stroke="white" strokeWidth="0.1" opacity="0.12" fill="none"/>
        <circle cx="58" cy="35" r="0.6" fill="white" opacity="0.7"/>
        <circle cx="74" cy="33" r="0.5" fill="white" opacity="0.7"/>
        <circle cx="65" cy="47" r="0.45" fill="white" opacity="0.7"/>
        <circle cx="67.5" cy="47.5" r="0.45" fill="white" opacity="0.7"/>
        <circle cx="70" cy="48" r="0.45" fill="white" opacity="0.7"/>
        <circle cx="63" cy="63" r="0.5" fill="white" opacity="0.7"/>
        <circle cx="77" cy="59" r="0.6" fill="white" opacity="0.7"/>
      </svg>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.25; }
        }
        .animate-twinkle {
          animation: twinkle 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
