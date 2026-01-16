"use client";

interface SunProps {
  x: number;
  y: number;
  color: string;
  altitude: number;
}

export function Sun({ x, y, color, altitude }: SunProps) {
  // Don't render if far below horizon (but continue arc for smooth motion)
  if (altitude <= -20) return null;

  // Fade out gradually below horizon for smooth arc effect
  let opacity = 1;
  if (altitude < 0) {
    // Fade from altitude 0 to -15 for smooth transition
    opacity = Math.max(0, (altitude + 15) / 15);
  }

  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        opacity,
        transition: "left 0.12s ease-out, top 0.12s ease-out, opacity 0.24s ease",
      }}
    >
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
