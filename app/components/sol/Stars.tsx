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

        {/* === LITTLE DIPPER === far left */}
        <path
          d="M4 8 L7 15 L9 23 L12 32 L10 42 L20 46 L24 38 L12 32"
          stroke="white" strokeWidth="0.08" opacity="0.06" fill="none"
        />
        <BrightStar cx={4} cy={8} delay={0} />
        <Star cx={7} cy={15} />
        <Star cx={9} cy={23} />
        <Star cx={12} cy={32} />
        <Star cx={10} cy={42} />
        <Star cx={20} cy={46} />
        <Star cx={24} cy={38} />

        {/* === CASSIOPEIA === far top right - W shape */}
        <path
          d="M76 6 L81 18 L87 8 L93 16 L98 4"
          stroke="white" strokeWidth="0.08" opacity="0.06" fill="none"
        />
        <Star cx={76} cy={6} />
        <Star cx={81} cy={18} />
        <BrightStar cx={87} cy={8} delay={1.2} />
        <Star cx={93} cy={16} />
        <Star cx={98} cy={4} />

        {/* === ORION === center, lower half - hourglass */}
        <path
          d="M38 40 L46 54 L42 68 M58 42 L52 53 L60 66 M46 54 L49 53 L52 53"
          stroke="white" strokeWidth="0.08" opacity="0.06" fill="none"
        />
        <BrightStar cx={38} cy={40} delay={0.6} />
        <Star cx={58} cy={42} />
        <Star cx={46} cy={54} />
        <Star cx={49} cy={53} />
        <Star cx={52} cy={53} />
        <Star cx={42} cy={68} />
        <BrightStar cx={60} cy={66} delay={1.8} />

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
