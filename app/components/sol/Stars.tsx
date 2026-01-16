"use client";

interface StarsProps {
  opacity: number;
  count?: number;
  seed?: number;
}

// Sparkle star for brightest stars - rays that twinkle
function Sparkle({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="0.3" fill="white" opacity="0.9" />
      <line x1={cx - 1} y1={cy} x2={cx + 1} y2={cy} stroke="white" strokeWidth="0.04" className="ray" />
      <line x1={cx} y1={cy - 1} x2={cx} y2={cy + 1} stroke="white" strokeWidth="0.04" className="ray" />
      <line x1={cx - 0.6} y1={cy - 0.6} x2={cx + 0.6} y2={cy + 0.6} stroke="white" strokeWidth="0.03" className="ray-dim" />
      <line x1={cx - 0.6} y1={cy + 0.6} x2={cx + 0.6} y2={cy - 0.6} stroke="white" strokeWidth="0.03" className="ray-dim" />
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
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 75"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <style>{`
            @keyframes twinkle {
              0%, 100% { opacity: 0.7; }
              50% { opacity: 0.3; }
            }
            .ray { opacity: 0.5; animation: twinkle 2s ease-in-out infinite; }
            .ray-dim { opacity: 0.25; animation: twinkle 2s ease-in-out infinite 0.5s; }
          `}</style>
        </defs>

        {/* Little Dipper - far left */}
        <path d="M28 8 L22 12 L16 18 L12 26 L5 30 L8 40 L18 36 L12 26" stroke="white" strokeWidth="0.06" opacity="0.04" fill="none"/>
        <Sparkle cx={28} cy={8} />
        <circle cx="22" cy="12" r="0.3" fill="white" opacity="0.7"/>
        <circle cx="16" cy="18" r="0.3" fill="white" opacity="0.7"/>
        <circle cx="12" cy="26" r="0.3" fill="white" opacity="0.7"/>
        <circle cx="5" cy="30" r="0.3" fill="white" opacity="0.7"/>
        <circle cx="8" cy="40" r="0.3" fill="white" opacity="0.7"/>
        <circle cx="18" cy="36" r="0.3" fill="white" opacity="0.7"/>

        {/* Cassiopeia - upper center W shape */}
        <path d="M45 10 L50 18 L56 12 L62 20 L68 8" stroke="white" strokeWidth="0.06" opacity="0.04" fill="none"/>
        <circle cx="45" cy="10" r="0.3" fill="white" opacity="0.7"/>
        <circle cx="50" cy="18" r="0.3" fill="white" opacity="0.7"/>
        <Sparkle cx={56} cy={12} />
        <circle cx="62" cy="20" r="0.3" fill="white" opacity="0.7"/>
        <circle cx="68" cy="8" r="0.3" fill="white" opacity="0.7"/>

        {/* Orion - far right */}
        <path d="M75 12 L82 38 L78 62 M95 15 L88 36 L94 58 M82 38 L85 37 L88 36" stroke="white" strokeWidth="0.06" opacity="0.04" fill="none"/>
        <Sparkle cx={75} cy={12} />
        <circle cx="95" cy="15" r="0.3" fill="white" opacity="0.7"/>
        <circle cx="82" cy="38" r="0.3" fill="white" opacity="0.7"/>
        <circle cx="85" cy="37" r="0.3" fill="white" opacity="0.7"/>
        <circle cx="88" cy="36" r="0.3" fill="white" opacity="0.7"/>
        <circle cx="78" cy="62" r="0.3" fill="white" opacity="0.7"/>
        <Sparkle cx={94} cy={58} />
      </svg>
    </div>
  );
}
