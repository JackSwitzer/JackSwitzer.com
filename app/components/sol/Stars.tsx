"use client";

interface StarsProps {
  opacity: number;
  count?: number;
  seed?: number;
}

// Bright star with delicate 4-point sparkle
function BrightStar({ cx, cy, delay = 0 }: { cx: number; cy: number; delay?: number }) {
  return (
    <g style={{ animationDelay: `${delay}s` }}>
      {/* Soft glow */}
      <circle cx={cx} cy={cy} r="1.2" fill="white" opacity="0.12" />
      {/* Core */}
      <circle cx={cx} cy={cy} r="0.4" fill="white" opacity="1" />
      {/* Sparkle rays - horizontal */}
      <line
        x1={cx - 2} y1={cy} x2={cx - 0.5} y2={cy}
        stroke="white" strokeWidth="0.08" className="sparkle-h"
        style={{ animationDelay: `${delay}s` }}
      />
      <line
        x1={cx + 0.5} y1={cy} x2={cx + 2} y2={cy}
        stroke="white" strokeWidth="0.08" className="sparkle-h"
        style={{ animationDelay: `${delay}s` }}
      />
      {/* Sparkle rays - vertical */}
      <line
        x1={cx} y1={cy - 2} x2={cx} y2={cy - 0.5}
        stroke="white" strokeWidth="0.08" className="sparkle-v"
        style={{ animationDelay: `${delay + 0.3}s` }}
      />
      <line
        x1={cx} y1={cy + 0.5} x2={cx} y2={cy + 2}
        stroke="white" strokeWidth="0.08" className="sparkle-v"
        style={{ animationDelay: `${delay + 0.3}s` }}
      />
    </g>
  );
}

// Dim star - just a small dot
function Star({ cx, cy }: { cx: number; cy: number }) {
  return <circle cx={cx} cy={cy} r="0.35" fill="white" opacity="0.8" />;
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
            @keyframes sparkle-pulse {
              0%, 100% { opacity: 0.7; }
              50% { opacity: 0.25; }
            }
            .sparkle-h {
              opacity: 0.6;
              animation: sparkle-pulse 2.5s ease-in-out infinite;
            }
            .sparkle-v {
              opacity: 0.6;
              animation: sparkle-pulse 2.5s ease-in-out infinite;
            }
          `}</style>
        </defs>

        {/* === LITTLE DIPPER === upper left */}
        <path
          d="M22 8 L18 14 L13 20 L10 28 L8 36 L16 38 L20 32 L10 28"
          stroke="white" strokeWidth="0.08" opacity="0.06" fill="none"
        />
        <BrightStar cx={22} cy={8} delay={0} />
        <Star cx={18} cy={14} />
        <Star cx={13} cy={20} />
        <Star cx={10} cy={28} />
        <Star cx={8} cy={36} />
        <Star cx={16} cy={38} />
        <Star cx={20} cy={32} />

        {/* === CASSIOPEIA === upper right - W shape */}
        <path
          d="M72 10 L78 20 L84 12 L90 22 L96 8"
          stroke="white" strokeWidth="0.08" opacity="0.06" fill="none"
        />
        <Star cx={72} cy={10} />
        <Star cx={78} cy={20} />
        <BrightStar cx={84} cy={12} delay={1.2} />
        <Star cx={90} cy={22} />
        <Star cx={96} cy={8} />

        {/* === ORION === lower center - hourglass */}
        <path
          d="M38 38 L48 52 L44 66 M62 40 L54 51 L58 64 M48 52 L51 51 L54 51"
          stroke="white" strokeWidth="0.08" opacity="0.06" fill="none"
        />
        <BrightStar cx={38} cy={38} delay={0.6} />
        <Star cx={62} cy={40} />
        <Star cx={48} cy={52} />
        <Star cx={51} cy={51} />
        <Star cx={54} cy={51} />
        <Star cx={44} cy={66} />
        <BrightStar cx={58} cy={64} delay={1.8} />

        {/* Scattered ambient stars */}
        <circle cx="32" cy="15" r="0.2" fill="white" opacity="0.4" />
        <circle cx="68" cy="32" r="0.18" fill="white" opacity="0.35" />
        <circle cx="28" cy="50" r="0.15" fill="white" opacity="0.3" />
        <circle cx="76" cy="48" r="0.2" fill="white" opacity="0.4" />
        <circle cx="50" cy="25" r="0.15" fill="white" opacity="0.35" />
        <circle cx="45" cy="18" r="0.15" fill="white" opacity="0.3" />
        <circle cx="85" cy="42" r="0.18" fill="white" opacity="0.35" />
        <circle cx="15" cy="52" r="0.15" fill="white" opacity="0.3" />
        <circle cx="60" cy="15" r="0.15" fill="white" opacity="0.4" />
      </svg>
    </div>
  );
}
