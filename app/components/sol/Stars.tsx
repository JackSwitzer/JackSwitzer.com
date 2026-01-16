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

      {/* Constellations SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 75"
        preserveAspectRatio="none"
      >
        {/* Orion - left side */}
        <g className="constellation-orion">
          {/* Lines first (behind stars) */}
          <path
            d="M 8 15 L 14 15 M 8 15 L 10 25 M 14 15 L 12 25 M 10 25 L 11 27 L 12 25 M 10 25 L 7 38 M 12 25 L 15 38"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.3"
            fill="none"
          />
          {/* Stars */}
          <circle cx="8" cy="15" r="0.8" fill="white" opacity="0.9" /> {/* Betelgeuse */}
          <circle cx="14" cy="15" r="0.6" fill="white" opacity="0.8" /> {/* Bellatrix */}
          <circle cx="10" cy="25" r="0.5" fill="white" opacity="0.75" /> {/* Belt 1 */}
          <circle cx="11" cy="27" r="0.5" fill="white" opacity="0.75" /> {/* Belt 2 */}
          <circle cx="12" cy="25" r="0.5" fill="white" opacity="0.75" /> {/* Belt 3 */}
          <circle cx="7" cy="38" r="0.6" fill="white" opacity="0.8" /> {/* Saiph */}
          <circle cx="15" cy="38" r="0.8" fill="white" opacity="0.95" /> {/* Rigel */}
        </g>

        {/* Big Dipper - upper right */}
        <g className="constellation-dipper">
          <path
            d="M 65 8 L 70 10 L 75 9 L 80 12 L 83 18 L 79 22 L 84 14 L 80 12"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.3"
            fill="none"
          />
          <circle cx="65" cy="8" r="0.6" fill="white" opacity="0.85" /> {/* Alkaid */}
          <circle cx="70" cy="10" r="0.55" fill="white" opacity="0.8" /> {/* Mizar */}
          <circle cx="75" cy="9" r="0.55" fill="white" opacity="0.8" /> {/* Alioth */}
          <circle cx="80" cy="12" r="0.5" fill="white" opacity="0.75" /> {/* Megrez */}
          <circle cx="83" cy="18" r="0.6" fill="white" opacity="0.85" /> {/* Phecda */}
          <circle cx="79" cy="22" r="0.6" fill="white" opacity="0.85" /> {/* Merak */}
          <circle cx="84" cy="14" r="0.65" fill="white" opacity="0.9" /> {/* Dubhe */}
        </g>

        {/* Cassiopeia - upper center (W shape) */}
        <g className="constellation-cassiopeia">
          <path
            d="M 38 6 L 43 12 L 48 7 L 53 13 L 58 5"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.3"
            fill="none"
          />
          <circle cx="38" cy="6" r="0.6" fill="white" opacity="0.85" />
          <circle cx="43" cy="12" r="0.55" fill="white" opacity="0.8" />
          <circle cx="48" cy="7" r="0.65" fill="white" opacity="0.88" />
          <circle cx="53" cy="13" r="0.55" fill="white" opacity="0.8" />
          <circle cx="58" cy="5" r="0.6" fill="white" opacity="0.85" />
        </g>

        {/* Lyra (small) - right side */}
        <g className="constellation-lyra">
          <path
            d="M 88 30 L 90 34 L 92 34 L 90 34 L 89 38 L 91 38"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.25"
            fill="none"
          />
          <circle cx="88" cy="30" r="0.7" fill="white" opacity="0.95" /> {/* Vega */}
          <circle cx="90" cy="34" r="0.4" fill="white" opacity="0.7" />
          <circle cx="92" cy="34" r="0.4" fill="white" opacity="0.7" />
          <circle cx="89" cy="38" r="0.35" fill="white" opacity="0.65" />
          <circle cx="91" cy="38" r="0.35" fill="white" opacity="0.65" />
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
