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

        {/* Little Dipper - smooth curve from Polaris to bowl */}
        <path d="M44 10 L37 13 L31 18 L26 24 L17 27 L19 37 L28 34 L26 24" stroke="white" strokeWidth="0.08" opacity="0.05" fill="none"/>
        <StarBurst cx={44} cy={10} size={1.8} />
        <circle cx="37" cy="13" r="0.5" fill="white" opacity="0.6"/>
        <circle cx="31" cy="18" r="0.5" fill="white" opacity="0.6"/>
        <circle cx="26" cy="24" r="0.5" fill="white" opacity="0.6"/>
        <circle cx="17" cy="27" r="0.5" fill="white" opacity="0.6"/>
        <circle cx="19" cy="37" r="0.5" fill="white" opacity="0.6"/>
        <circle cx="28" cy="34" r="0.5" fill="white" opacity="0.6"/>

        {/* Orion - symmetric hourglass */}
        <path d="M58 15 L69 40 L62 63 M87 18 L77 38 L88 60 M69 40 L73 39 L77 38" stroke="white" strokeWidth="0.08" opacity="0.05" fill="none"/>
        <StarBurst cx={58} cy={15} size={1.6} />
        <circle cx="87" cy="18" r="0.5" fill="white" opacity="0.6"/>
        <circle cx="69" cy="40" r="0.5" fill="white" opacity="0.6"/>
        <circle cx="73" cy="39" r="0.5" fill="white" opacity="0.6"/>
        <circle cx="77" cy="38" r="0.5" fill="white" opacity="0.6"/>
        <circle cx="62" cy="63" r="0.5" fill="white" opacity="0.6"/>
        <StarBurst cx={88} cy={60} size={1.6} />
      </svg>
    </div>
  );
}
