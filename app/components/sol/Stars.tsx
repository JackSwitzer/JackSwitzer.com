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

      {/* Constellations SVG - designed by Gemini */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 75"
        preserveAspectRatio="none"
      >
        {/* Big Dipper - upper left */}
        <g id="big-dipper">
          <path d="M 15 12 L 20 17 L 25 15 L 30 20 L 35 25 L 33 30 L 30 35" stroke="white" strokeWidth="0.15" opacity="0.2" fill="none" />
          <circle cx="15" cy="12" r="0.6" fill="white" opacity="0.9" />
          <circle cx="20" cy="17" r="0.7" fill="white" opacity="0.85" />
          <circle cx="25" cy="15" r="0.5" fill="white" opacity="0.8" />
          <circle cx="30" cy="20" r="0.8" fill="white" opacity="0.9" />
          <circle cx="35" cy="25" r="0.7" fill="white" opacity="0.85" />
          <circle cx="33" cy="30" r="0.6" fill="white" opacity="0.8" />
          <circle cx="30" cy="35" r="0.5" fill="white" opacity="0.75" />
        </g>

        {/* Cassiopeia - upper center (W shape) */}
        <g id="cassiopeia">
          <path d="M 45 8 L 50 14 L 55 6 L 60 13 L 65 5" stroke="white" strokeWidth="0.15" opacity="0.2" fill="none" />
          <circle cx="45" cy="8" r="0.5" fill="white" opacity="0.85" />
          <circle cx="50" cy="14" r="0.6" fill="white" opacity="0.8" />
          <circle cx="55" cy="6" r="0.7" fill="white" opacity="0.9" />
          <circle cx="60" cy="13" r="0.6" fill="white" opacity="0.8" />
          <circle cx="65" cy="5" r="0.5" fill="white" opacity="0.85" />
        </g>

        {/* Orion - right side */}
        <g id="orion">
          {/* Body outline */}
          <path d="M 78 20 L 85 25 L 80 32 L 75 38 L 80 45 L 77 40" stroke="white" strokeWidth="0.15" opacity="0.15" fill="none" />
          {/* Belt */}
          <path d="M 76 32 L 79 32 L 82 32" stroke="white" strokeWidth="0.15" opacity="0.2" fill="none" />

          {/* Betelgeuse - bright red giant */}
          <circle cx="78" cy="20" r="0.8" fill="white" opacity="0.95" />
          {/* Bellatrix */}
          <circle cx="85" cy="25" r="0.6" fill="white" opacity="0.85" />
          {/* Belt stars */}
          <circle cx="76" cy="32" r="0.5" fill="white" opacity="0.8" />
          <circle cx="79" cy="32" r="0.55" fill="white" opacity="0.85" />
          <circle cx="82" cy="32" r="0.5" fill="white" opacity="0.8" />
          {/* Saiph */}
          <circle cx="75" cy="38" r="0.6" fill="white" opacity="0.8" />
          {/* Rigel - bright blue */}
          <circle cx="85" cy="42" r="0.8" fill="white" opacity="0.95" />
        </g>

        {/* Scattered background stars */}
        <circle cx="5" cy="5" r="0.4" fill="white" opacity="0.6" />
        <circle cx="92" cy="8" r="0.4" fill="white" opacity="0.65" />
        <circle cx="8" cy="45" r="0.35" fill="white" opacity="0.55" />
        <circle cx="95" cy="55" r="0.4" fill="white" opacity="0.6" />
        <circle cx="42" cy="42" r="0.35" fill="white" opacity="0.5" />
        <circle cx="70" cy="58" r="0.4" fill="white" opacity="0.55" />
        <circle cx="12" cy="62" r="0.35" fill="white" opacity="0.5" />
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
