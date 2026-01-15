"use client";

import { useMemo } from "react";

interface SunProps {
  x: number; // 0-100 screen position
  y: number; // 0-100 screen position
  color: string;
  altitude: number; // Sun altitude for size variation
}

export function Sun({ x, y, color, altitude }: SunProps) {
  // Scale sun size based on altitude (larger near horizon for visual effect)
  const scale = useMemo(() => {
    if (altitude <= 0) return 1;
    if (altitude <= 10) return 1 + (10 - altitude) * 0.03; // Slightly larger near horizon
    return 1;
  }, [altitude]);

  // Don't render if below horizon
  if (altitude <= -5) return null;

  // Fade out near horizon
  const opacity = altitude < 0 ? Math.max(0, (altitude + 5) / 5) : 1;

  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        transition: "left 1s ease-out, top 1s ease-out, opacity 0.5s ease",
      }}
    >
      {/* ASCII-style sun with rays */}
      <pre
        className="font-mono text-xs leading-none whitespace-pre"
        style={{
          color,
          textShadow: `0 0 10px ${color}, 0 0 20px ${color}40`,
        }}
      >
        {`    \\   │   /
     \\  │  /
      \\ │ /
   ─────☀─────
      / │ \\
     /  │  \\
    /   │   \\`}
      </pre>
    </div>
  );
}
