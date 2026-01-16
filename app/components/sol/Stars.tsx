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

      {/* Constellations SVG - designed by Gemini 3.0 Pro */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 75"
        preserveAspectRatio="none"
      >
        {/* Constellation lines */}
        <g stroke="white" strokeWidth="0.12" opacity="0.15" fill="none">
          {/* Big Dipper */}
          <path d="M 8 22 L 15 17 L 21 15 L 28 14 L 35 12 L 35 20 L 27 21 L 28 14" />
          {/* Cassiopeia */}
          <path d="M 70 20 L 76 12 L 83 16 L 88 10 L 94 15" />
          {/* Orion */}
          <path d="M 30 40 L 43 42 L 45 62 L 33 65 L 30 40 M 36 52 L 40 51" />
        </g>

        {/* Constellation stars */}
        <g fill="white">
          {/* Big Dipper Stars */}
          <circle cx="8" cy="22" r="0.8" />
          <circle cx="15" cy="17" r="0.75" />
          <circle cx="21" cy="15" r="0.75" />
          <circle cx="28" cy="14" r="0.5" />
          <circle cx="35" cy="12" r="0.8" />
          <circle cx="35" cy="20" r="0.7" />
          <circle cx="27" cy="21" r="0.65" />

          {/* Cassiopeia Stars */}
          <circle cx="70" cy="20" r="0.5" />
          <circle cx="76" cy="12" r="0.6" />
          <circle cx="83" cy="16" r="0.8" />
          <circle cx="88" cy="10" r="0.75" />
          <circle cx="94" cy="15" r="0.65" />

          {/* Orion Stars */}
          <circle cx="30" cy="40" r="0.8" />
          <circle cx="43" cy="42" r="0.7" />
          <circle cx="36" cy="52" r="0.65" />
          <circle cx="38" cy="51.5" r="0.65" />
          <circle cx="40" cy="51" r="0.6" />
          <circle cx="33" cy="65" r="0.65" />
          <circle cx="45" cy="62" r="0.8" />
        </g>
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
