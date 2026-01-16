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
        {/* Little Dipper - upper left, Polaris at top-right */}
        <path d="M42 7 L32 11 L24 16 L17 19 L7 21 L10 29 L20 27 L17 19" stroke="white" strokeWidth="0.1" opacity="0.1" fill="none"/>
        <circle cx="42" cy="7" r="0.6" fill="white" opacity="0.9"/>
        <circle cx="32" cy="11" r="0.43" fill="white" opacity="0.7"/>
        <circle cx="24" cy="16" r="0.43" fill="white" opacity="0.7"/>
        <circle cx="17" cy="19" r="0.45" fill="white" opacity="0.7"/>
        <circle cx="7" cy="21" r="0.55" fill="white" opacity="0.7"/>
        <circle cx="10" cy="29" r="0.52" fill="white" opacity="0.7"/>
        <circle cx="20" cy="27" r="0.4" fill="white" opacity="0.7"/>

        {/* Orion - right side, large hourglass */}
        <path d="M60 20 L68 43 L63 65 M85 22 L77 41 L90 68 M68 43 L72.5 42 L77 41" stroke="white" strokeWidth="0.1" opacity="0.1" fill="none"/>
        <circle cx="60" cy="20" r="0.6" fill="white" opacity="0.7"/>
        <circle cx="85" cy="22" r="0.5" fill="white" opacity="0.7"/>
        <circle cx="68" cy="43" r="0.45" fill="white" opacity="0.7"/>
        <circle cx="72.5" cy="42" r="0.45" fill="white" opacity="0.7"/>
        <circle cx="77" cy="41" r="0.45" fill="white" opacity="0.7"/>
        <circle cx="63" cy="65" r="0.5" fill="white" opacity="0.7"/>
        <circle cx="90" cy="68" r="0.6" fill="white" opacity="0.7"/>
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
