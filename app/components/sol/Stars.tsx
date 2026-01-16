"use client";

interface StarsProps {
  opacity: number;
  count?: number;
  seed?: number;
}

// 4-point star shape for bright stars
function StarBurst({ cx, cy, size = 1.5 }: { cx: number; cy: number; size?: number }) {
  const s = size;
  return (
    <g className="animate-twinkle">
      {/* Horizontal line */}
      <line x1={cx - s} y1={cy} x2={cx + s} y2={cy} stroke="white" strokeWidth="0.06" opacity="0.5" />
      {/* Vertical line */}
      <line x1={cx} y1={cy - s} x2={cx} y2={cy + s} stroke="white" strokeWidth="0.06" opacity="0.5" />
      {/* Center dot */}
      <circle cx={cx} cy={cy} r="0.5" fill="white" opacity="0.8" />
    </g>
  );
}

export function Stars({ opacity }: StarsProps) {
  if (opacity <= 0) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        opacity,
        transition: "opacity 0.8s ease",
      }}
    >
      {/* Constellations SVG - designed by Gemini 3 Pro */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 75"
        preserveAspectRatio="none"
      >
        <defs>
          <style>{`
            @keyframes twinkle {
              0%, 100% { opacity: 0.8; }
              50% { opacity: 0.4; }
            }
            .animate-twinkle {
              animation: twinkle 2s ease-in-out infinite;
            }
          `}</style>
        </defs>

        {/* Little Dipper - upper left, more vertical spread */}
        <path d="M42 9 L36 13 L29 18 L23 26 L26 33 L17 37 L13 29 L23 26" stroke="white" strokeWidth="0.08" opacity="0.08" fill="none"/>
        <StarBurst cx={42} cy={9} size={1.8} />
        <circle cx="36" cy="13" r="0.5" fill="white" opacity="0.6"/>
        <circle cx="29" cy="18" r="0.5" fill="white" opacity="0.6"/>
        <circle cx="23" cy="26" r="0.5" fill="white" opacity="0.6"/>
        <circle cx="26" cy="33" r="0.5" fill="white" opacity="0.6"/>
        <circle cx="17" cy="37" r="0.5" fill="white" opacity="0.6"/>
        <circle cx="13" cy="29" r="0.5" fill="white" opacity="0.6"/>

        {/* Orion - right side, hourglass shape */}
        <path d="M60 16 L69 41 L63 64 M82 19 L77 39 L86 61 M69 41 L73 40 L77 39" stroke="white" strokeWidth="0.08" opacity="0.08" fill="none"/>
        <StarBurst cx={60} cy={16} size={1.6} />
        <circle cx="82" cy="19" r="0.5" fill="white" opacity="0.6"/>
        <circle cx="69" cy="41" r="0.5" fill="white" opacity="0.6"/>
        <circle cx="73" cy="40" r="0.5" fill="white" opacity="0.6"/>
        <circle cx="77" cy="39" r="0.5" fill="white" opacity="0.6"/>
        <circle cx="63" cy="64" r="0.5" fill="white" opacity="0.6"/>
        <StarBurst cx={86} cy={61} size={1.6} />
      </svg>
    </div>
  );
}
