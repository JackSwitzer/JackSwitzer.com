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

export function Stars({ opacity, count = 50, seed = 42 }: StarsProps) {
  // Generate star field with consistent positions
  const stars = useMemo((): Star[] => {
    const random = seededRandom(seed);
    const result: Star[] = [];

    for (let i = 0; i < count; i++) {
      result.push({
        id: i,
        x: random() * 100,
        y: random() * 75, // Only upper 75% (above horizon)
        brightness: 0.3 + random() * 0.7,
        size: 1 + random() * 2,
        twinkle: random() > 0.6, // 40% of stars twinkle
        twinkleDelay: random() * 3, // Stagger twinkle animations
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
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.brightness * 0.5})`,
            animationDelay: star.twinkle ? `${star.twinkleDelay}s` : undefined,
          }}
        />
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
