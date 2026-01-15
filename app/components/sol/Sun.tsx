"use client";

interface SunProps {
  x: number;
  y: number;
  color: string;
  altitude: number;
}

export function Sun({ x, y, color, altitude }: SunProps) {
  // Don't render if below horizon
  if (altitude <= -2) return null;

  // Fade out near horizon
  const opacity = altitude < 0 ? Math.max(0, (altitude + 2) / 2) : 1;

  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        opacity,
        transition: "left 0.15s linear, top 0.15s linear, opacity 0.3s ease",
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
