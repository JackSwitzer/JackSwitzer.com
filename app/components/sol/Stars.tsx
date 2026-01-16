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

        {/* === LITTLE DIPPER === extreme left edge */}
        <path
          d="M2 5 L4 14 L6 24 L8 35 L6 48 L16 54 L20 44 L8 35"
          stroke="white" strokeWidth="0.08" opacity="0.06" fill="none"
        />
        <BrightStar cx={2} cy={5} delay={0} />
        <Star cx={4} cy={14} />
        <Star cx={6} cy={24} />
        <Star cx={8} cy={35} />
        <Star cx={6} cy={48} />
        <Star cx={16} cy={54} />
        <Star cx={20} cy={44} />

        {/* === CASSIOPEIA === extreme top right corner */}
        <path
          d="M78 4 L83 14 L89 5 L94 12 L99 2"
          stroke="white" strokeWidth="0.08" opacity="0.06" fill="none"
        />
        <Star cx={78} cy={4} />
        <Star cx={83} cy={14} />
        <BrightStar cx={89} cy={5} delay={1.2} />
        <Star cx={94} cy={12} />
        <Star cx={99} cy={2} />

        {/* === ORION === right side, lower - hourglass */}
        <path
          d="M58 38 L66 52 L62 66 M78 40 L72 51 L80 64 M66 52 L69 51 L72 51"
          stroke="white" strokeWidth="0.08" opacity="0.06" fill="none"
        />
        <BrightStar cx={58} cy={38} delay={0.6} />
        <Star cx={78} cy={40} />
        <Star cx={66} cy={52} />
        <Star cx={69} cy={51} />
        <Star cx={72} cy={51} />
        <Star cx={62} cy={66} />
        <BrightStar cx={80} cy={64} delay={1.8} />

        {/* Scattered ambient stars - fill the gaps */}
        <circle cx="45" cy="12" r="0.2" fill="white" opacity="0.35" />
        <circle cx="62" cy="22" r="0.18" fill="white" opacity="0.3" />
        <circle cx="30" cy="18" r="0.15" fill="white" opacity="0.25" />
        <circle cx="70" cy="38" r="0.18" fill="white" opacity="0.3" />
        <circle cx="55" cy="28" r="0.15" fill="white" opacity="0.25" />
        <circle cx="82" cy="45" r="0.15" fill="white" opacity="0.3" />
        <circle cx="25" cy="58" r="0.18" fill="white" opacity="0.3" />
        <circle cx="75" cy="58" r="0.15" fill="white" opacity="0.25" />
        <circle cx="15" cy="62" r="0.15" fill="white" opacity="0.3" />
      </svg>
    </div>
  );
}
