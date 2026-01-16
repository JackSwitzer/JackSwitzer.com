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

interface ConstellationStar {
  x: number;
  y: number;
  size: number;
  brightness: number;
}

interface Constellation {
  name: string;
  stars: ConstellationStar[];
  lines: [number, number][]; // Pairs of star indices to connect
}

interface StarsProps {
  opacity: number; // 0-1, controls overall star visibility
  count?: number;
  seed?: number;
}

// Seeded random number generator for consistent star positions
function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

// Recognizable constellations with approximate positions
const CONSTELLATIONS: Constellation[] = [
  {
    // Orion - positioned left side
    name: "Orion",
    stars: [
      { x: 12, y: 18, size: 2.5, brightness: 0.95 }, // Betelgeuse (shoulder)
      { x: 18, y: 18, size: 2, brightness: 0.85 },   // Bellatrix (shoulder)
      { x: 14, y: 28, size: 1.8, brightness: 0.8 },  // Belt star 1
      { x: 15, y: 29, size: 1.8, brightness: 0.8 },  // Belt star 2
      { x: 16, y: 30, size: 1.8, brightness: 0.8 },  // Belt star 3
      { x: 12, y: 40, size: 2.2, brightness: 0.9 },  // Saiph (foot)
      { x: 19, y: 40, size: 2.5, brightness: 0.95 }, // Rigel (foot)
    ],
    lines: [[0, 1], [0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6]],
  },
  {
    // Big Dipper - positioned upper right
    name: "Big Dipper",
    stars: [
      { x: 70, y: 12, size: 2.2, brightness: 0.9 },  // Alkaid
      { x: 74, y: 14, size: 2, brightness: 0.85 },   // Mizar
      { x: 78, y: 13, size: 2, brightness: 0.85 },   // Alioth
      { x: 82, y: 15, size: 2, brightness: 0.85 },   // Megrez
      { x: 85, y: 18, size: 2.2, brightness: 0.9 },  // Phecda
      { x: 82, y: 22, size: 2.2, brightness: 0.9 },  // Merak
      { x: 86, y: 12, size: 2.3, brightness: 0.92 }, // Dubhe
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]],
  },
  {
    // Cassiopeia - positioned upper center (W shape)
    name: "Cassiopeia",
    stars: [
      { x: 42, y: 8, size: 2.2, brightness: 0.88 },
      { x: 46, y: 14, size: 2, brightness: 0.85 },
      { x: 50, y: 10, size: 2.3, brightness: 0.9 },
      { x: 54, y: 15, size: 2, brightness: 0.85 },
      { x: 58, y: 9, size: 2.2, brightness: 0.88 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
  },
];

export function Stars({ opacity, count = 50, seed = 42 }: StarsProps) {
  // Generate random background stars
  const stars = useMemo((): Star[] => {
    const random = seededRandom(seed);
    const result: Star[] = [];

    for (let i = 0; i < count; i++) {
      result.push({
        id: i,
        x: random() * 100,
        y: random() * 75,
        brightness: 0.2 + random() * 0.5, // Dimmer background stars
        size: 1 + random() * 1.5,
        twinkle: random() > 0.7,
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
        transition: "opacity 2s ease",
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
            boxShadow: `0 0 ${star.size}px rgba(255, 255, 255, ${star.brightness * 0.3})`,
            animationDelay: star.twinkle ? `${star.twinkleDelay}s` : undefined,
          }}
        />
      ))}

      {/* Constellations */}
      {CONSTELLATIONS.map((constellation) => (
        <div key={constellation.name}>
          {/* Constellation lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.3 }}
          >
            {constellation.lines.map(([from, to], i) => (
              <line
                key={i}
                x1={`${constellation.stars[from].x}%`}
                y1={`${constellation.stars[from].y}%`}
                x2={`${constellation.stars[to].x}%`}
                y2={`${constellation.stars[to].y}%`}
                stroke="white"
                strokeWidth="0.5"
              />
            ))}
          </svg>

          {/* Constellation stars */}
          {constellation.stars.map((star, i) => (
            <div
              key={`${constellation.name}-${i}`}
              style={{
                position: "absolute",
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
                backgroundColor: "white",
                borderRadius: "50%",
                opacity: star.brightness,
                boxShadow: `0 0 ${star.size * 3}px rgba(255, 255, 255, ${star.brightness * 0.6})`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
      ))}

      {/* CSS for twinkle animation */}
      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: var(--star-opacity, 0.7);
          }
          50% {
            opacity: calc(var(--star-opacity, 0.7) * 0.3);
          }
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
