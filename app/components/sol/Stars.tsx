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
      <circle cx={cx} cy={cy} r="0.8" fill="white" opacity="0.08" />
      {/* Core */}
      <circle cx={cx} cy={cy} r="0.25" fill="white" opacity="0.95" />
      {/* Sparkle rays - horizontal */}
      <line
        x1={cx - 1.5} y1={cy} x2={cx - 0.4} y2={cy}
        stroke="white" strokeWidth="0.03" className="sparkle-h"
        style={{ animationDelay: `${delay}s` }}
      />
      <line
        x1={cx + 0.4} y1={cy} x2={cx + 1.5} y2={cy}
        stroke="white" strokeWidth="0.03" className="sparkle-h"
        style={{ animationDelay: `${delay}s` }}
      />
      {/* Sparkle rays - vertical */}
      <line
        x1={cx} y1={cy - 1.5} x2={cx} y2={cy - 0.4}
        stroke="white" strokeWidth="0.03" className="sparkle-v"
        style={{ animationDelay: `${delay + 0.3}s` }}
      />
      <line
        x1={cx} y1={cy + 0.4} x2={cx} y2={cy + 1.5}
        stroke="white" strokeWidth="0.03" className="sparkle-v"
        style={{ animationDelay: `${delay + 0.3}s` }}
      />
    </g>
  );
}

// Dim star - just a small dot
function Star({ cx, cy }: { cx: number; cy: number }) {
  return <circle cx={cx} cy={cy} r="0.2" fill="white" opacity="0.6" />;
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
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <style>{`
            @keyframes sparkle-pulse {
              0%, 100% { opacity: 0.6; }
              50% { opacity: 0.2; }
            }
            .sparkle-h {
              opacity: 0.5;
              animation: sparkle-pulse 3s ease-in-out infinite;
            }
            .sparkle-v {
              opacity: 0.5;
              animation: sparkle-pulse 3s ease-in-out infinite;
            }
          `}</style>
        </defs>

        {/* === LITTLE DIPPER === upper far left corner */}
        {/* Polaris at handle tip - the North Star */}
        <path
          d="M18 5 L14 10 L9 16 L5 24 L3 32 L10 35 L15 30 L5 24"
          stroke="white" strokeWidth="0.05" opacity="0.03" fill="none"
        />
        <BrightStar cx={18} cy={5} delay={0} />
        <Star cx={14} cy={10} />
        <Star cx={9} cy={16} />
        <Star cx={5} cy={24} />
        <Star cx={3} cy={32} />
        <Star cx={10} cy={35} />
        <Star cx={15} cy={30} />

        {/* === CASSIOPEIA === upper far right - distinctive W */}
        <path
          d="M80 6 L85 16 L90 8 L95 18 L99 5"
          stroke="white" strokeWidth="0.05" opacity="0.03" fill="none"
        />
        <Star cx={80} cy={6} />
        <Star cx={85} cy={16} />
        <BrightStar cx={90} cy={8} delay={1.2} />
        <Star cx={95} cy={18} />
        <Star cx={99} cy={5} />

        {/* === ORION === lower center - the hunter */}
        {/* Shoulders */}
        <path
          d="M35 42 L47 56 L42 70 M58 44 L52 55 L60 68 M47 56 L49.5 55.5 L52 55"
          stroke="white" strokeWidth="0.05" opacity="0.03" fill="none"
        />
        {/* Betelgeuse - red giant, top left shoulder */}
        <BrightStar cx={35} cy={42} delay={0.6} />
        {/* Bellatrix - top right shoulder */}
        <Star cx={58} cy={44} />
        {/* Belt - 3 stars */}
        <Star cx={47} cy={56} />
        <Star cx={49.5} cy={55.5} />
        <Star cx={52} cy={55} />
        {/* Saiph - bottom left */}
        <Star cx={42} cy={70} />
        {/* Rigel - bright blue, bottom right */}
        <BrightStar cx={60} cy={68} delay={1.8} />

        {/* Scattered ambient stars for depth */}
        <circle cx="30" cy="12" r="0.12" fill="white" opacity="0.3" />
        <circle cx="72" cy="28" r="0.12" fill="white" opacity="0.25" />
        <circle cx="25" cy="55" r="0.1" fill="white" opacity="0.2" />
        <circle cx="78" cy="45" r="0.12" fill="white" opacity="0.3" />
        <circle cx="55" cy="22" r="0.1" fill="white" opacity="0.25" />
        <circle cx="42" cy="28" r="0.1" fill="white" opacity="0.2" />
        <circle cx="88" cy="38" r="0.12" fill="white" opacity="0.25" />
        <circle cx="12" cy="50" r="0.1" fill="white" opacity="0.2" />
        <circle cx="65" cy="12" r="0.1" fill="white" opacity="0.3" />
      </svg>
    </div>
  );
}
