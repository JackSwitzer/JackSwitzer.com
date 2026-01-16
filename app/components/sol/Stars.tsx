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

        {/* === LITTLE DIPPER === top-left corner, rotated diagonal */}
        <path
          d="M3 3 L8 8 L14 12 L22 14 L28 22 L22 28 L16 24 L22 14"
          stroke="white" strokeWidth="0.08" opacity="0.06" fill="none"
        />
        <BrightStar cx={3} cy={3} delay={0} />
        <Star cx={8} cy={8} />
        <Star cx={14} cy={12} />
        <Star cx={22} cy={14} />
        <Star cx={28} cy={22} />
        <Star cx={22} cy={28} />
        <Star cx={16} cy={24} />

        {/* === CASSIOPEIA === top right, bigger W */}
        <path
          d="M68 5 L75 20 L84 6 L92 22 L99 4"
          stroke="white" strokeWidth="0.08" opacity="0.06" fill="none"
        />
        <Star cx={68} cy={5} />
        <Star cx={75} cy={20} />
        <BrightStar cx={84} cy={6} delay={1.2} />
        <Star cx={92} cy={22} />
        <Star cx={99} cy={4} />

        {/* === ORION === centered lower, between the two */}
        <path
          d="M38 45 L46 58 L42 72 M56 47 L50 57 L58 70 M46 58 L48 57 L50 57"
          stroke="white" strokeWidth="0.08" opacity="0.06" fill="none"
        />
        <BrightStar cx={38} cy={45} delay={0.6} />
        <Star cx={56} cy={47} />
        <Star cx={46} cy={58} />
        <Star cx={48} cy={57} />
        <Star cx={50} cy={57} />
        <Star cx={42} cy={72} />
        <BrightStar cx={58} cy={70} delay={1.8} />

        {/* Scattered ambient stars */}
        <circle cx="45" cy="18" r="0.18" fill="white" opacity="0.3" />
        <circle cx="58" cy="28" r="0.15" fill="white" opacity="0.25" />
        <circle cx="35" cy="12" r="0.15" fill="white" opacity="0.3" />
        <circle cx="72" cy="42" r="0.18" fill="white" opacity="0.3" />
        <circle cx="25" cy="45" r="0.15" fill="white" opacity="0.25" />
        <circle cx="85" cy="50" r="0.15" fill="white" opacity="0.25" />
        <circle cx="12" cy="55" r="0.15" fill="white" opacity="0.3" />
        <circle cx="78" cy="65" r="0.15" fill="white" opacity="0.25" />
        <circle cx="18" cy="68" r="0.15" fill="white" opacity="0.25" />
      </svg>
    </div>
  );
}
