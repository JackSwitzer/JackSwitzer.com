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

        {/* === LITTLE DIPPER === far left, 25% longer */}
        <path
          d="M5 6 L8 12 L10 19 L14 27 L12 38 L24 42 L28 32 L14 27"
          stroke="white" strokeWidth="0.08" opacity="0.06" fill="none"
        />
        <BrightStar cx={5} cy={6} delay={0} />
        <Star cx={8} cy={12} />
        <Star cx={10} cy={19} />
        <Star cx={14} cy={27} />
        <Star cx={12} cy={38} />
        <Star cx={24} cy={42} />
        <Star cx={28} cy={32} />

        {/* === CASSIOPEIA === top right - W shape */}
        <path
          d="M72 8 L78 22 L85 10 L92 20 L98 6"
          stroke="white" strokeWidth="0.08" opacity="0.06" fill="none"
        />
        <Star cx={72} cy={8} />
        <Star cx={78} cy={22} />
        <BrightStar cx={85} cy={10} delay={1.2} />
        <Star cx={92} cy={20} />
        <Star cx={98} cy={6} />

        {/* === ORION === right of center (+15%) - hourglass */}
        <path
          d="M53 34 L61 51 L55 68 M77 36 L69 49 L79 66 M61 51 L65 50 L69 49"
          stroke="white" strokeWidth="0.08" opacity="0.06" fill="none"
        />
        <BrightStar cx={53} cy={34} delay={0.6} />
        <Star cx={77} cy={36} />
        <Star cx={61} cy={51} />
        <Star cx={65} cy={50} />
        <Star cx={69} cy={49} />
        <Star cx={55} cy={68} />
        <BrightStar cx={79} cy={66} delay={1.8} />

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
