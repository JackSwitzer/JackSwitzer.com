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

        {/* === LITTLE DIPPER === top-left, 20% bigger, more left */}
        <g transform="translate(-10, -2) scale(1.32) rotate(-15, 15, 20)">
          <path
            d="M12 8 L16 12 L19 16 L23 21 L22 29 L31 31 L33 23 L23 21"
            stroke="white" strokeWidth="0.06" opacity="0.06" fill="none"
          />
          <BrightStar cx={12} cy={8} delay={0} />
          <Star cx={16} cy={12} />
          <Star cx={19} cy={16} />
          <Star cx={23} cy={21} />
          <Star cx={22} cy={29} />
          <Star cx={31} cy={31} />
          <Star cx={33} cy={23} />
        </g>

        {/* === CASSIOPEIA === top right, 10% bigger, rotated down-right */}
        <g transform="translate(10, 0) scale(1.32) rotate(8, 80, 15)">
          <path
            d="M66 12 L73 27 L80 15 L88 25 L94 7"
            stroke="white" strokeWidth="0.06" opacity="0.06" fill="none"
          />
          <Star cx={66} cy={12} />
          <Star cx={73} cy={27} />
          <BrightStar cx={80} cy={15} delay={1.2} />
          <Star cx={88} cy={25} />
          <Star cx={94} cy={7} />
        </g>

        {/* === ORION === shifted right, up, 20% bigger */}
        <g transform="translate(12, -8) scale(1.2)">
          <path
            d="M38 34 L46 51 L40 68 M62 36 L54 49 L64 66 M46 51 L50 50 L54 49"
            stroke="white" strokeWidth="0.06" opacity="0.06" fill="none"
          />
          <BrightStar cx={38} cy={34} delay={0.6} />
          <Star cx={62} cy={36} />
          <Star cx={46} cy={51} />
          <Star cx={50} cy={50} />
          <Star cx={54} cy={49} />
          <Star cx={40} cy={68} />
          <BrightStar cx={64} cy={66} delay={1.8} />
        </g>

        {/* Scattered ambient stars */}
        <circle cx="50" cy="15" r="0.18" fill="white" opacity="0.3" />
        <circle cx="42" cy="22" r="0.15" fill="white" opacity="0.25" />
        <circle cx="58" cy="8" r="0.15" fill="white" opacity="0.3" />
        <circle cx="75" cy="45" r="0.18" fill="white" opacity="0.25" />
        <circle cx="20" cy="50" r="0.15" fill="white" opacity="0.25" />
        <circle cx="85" cy="55" r="0.15" fill="white" opacity="0.25" />
        <circle cx="10" cy="60" r="0.15" fill="white" opacity="0.25" />
        <circle cx="70" cy="68" r="0.15" fill="white" opacity="0.2" />
      </svg>
    </div>
  );
}
