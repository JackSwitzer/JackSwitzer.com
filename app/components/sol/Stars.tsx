"use client";

interface StarsProps {
  opacity: number;
  count?: number;
  seed?: number;
}

// Sparkle star for brightest stars - 4-point star with twinkling rays
function Sparkle({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      {/* Core star */}
      <circle cx={cx} cy={cy} r="0.35" fill="white" opacity="0.9" />
      {/* Twinkling rays */}
      <g className="sparkle-rays">
        <line x1={cx - 1.2} y1={cy} x2={cx + 1.2} y2={cy} stroke="white" strokeWidth="0.04" opacity="0.6" />
        <line x1={cx} y1={cy - 1.2} x2={cx} y2={cy + 1.2} stroke="white" strokeWidth="0.04" opacity="0.6" />
        <line x1={cx - 0.7} y1={cy - 0.7} x2={cx + 0.7} y2={cy + 0.7} stroke="white" strokeWidth="0.03" opacity="0.3" />
        <line x1={cx - 0.7} y1={cy + 0.7} x2={cx + 0.7} y2={cy - 0.7} stroke="white" strokeWidth="0.03" opacity="0.3" />
      </g>
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
      {/* Constellations SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 75"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <style>{`
            @keyframes sparkle {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.5; transform: scale(0.8); }
            }
            .sparkle-rays {
              animation: sparkle 1.5s ease-in-out infinite;
              transform-origin: center;
            }
          `}</style>
        </defs>

        {/* Little Dipper */}
        <path d="M44 10 L37 13 L31 18 L26 24 L17 27 L19 37 L28 34 L26 24" stroke="white" strokeWidth="0.06" opacity="0.04" fill="none"/>
        <Sparkle cx={44} cy={10} />
        <circle cx="37" cy="13" r="0.3" fill="white" opacity="0.7"/>
        <circle cx="31" cy="18" r="0.3" fill="white" opacity="0.7"/>
        <circle cx="26" cy="24" r="0.3" fill="white" opacity="0.7"/>
        <circle cx="17" cy="27" r="0.3" fill="white" opacity="0.7"/>
        <circle cx="19" cy="37" r="0.3" fill="white" opacity="0.7"/>
        <circle cx="28" cy="34" r="0.3" fill="white" opacity="0.7"/>

        {/* Orion */}
        <path d="M58 15 L69 40 L62 63 M87 18 L77 38 L88 60 M69 40 L73 39 L77 38" stroke="white" strokeWidth="0.06" opacity="0.04" fill="none"/>
        <Sparkle cx={58} cy={15} />
        <circle cx="87" cy="18" r="0.3" fill="white" opacity="0.7"/>
        <circle cx="69" cy="40" r="0.3" fill="white" opacity="0.7"/>
        <circle cx="73" cy="39" r="0.3" fill="white" opacity="0.7"/>
        <circle cx="77" cy="38" r="0.3" fill="white" opacity="0.7"/>
        <circle cx="62" cy="63" r="0.3" fill="white" opacity="0.7"/>
        <Sparkle cx={88} cy={60} />
      </svg>
    </div>
  );
}
