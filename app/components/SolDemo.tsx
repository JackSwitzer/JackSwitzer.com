"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SkyCanvas } from "./sol/SkyCanvas";
import { useTorontoTime } from "./sol/hooks/useTorontoTime";
import { useSolarPosition } from "./sol/hooks/useSolarPosition";

interface SolDemoProps {
  // Optional test overrides (can also use URL params)
  testTime?: string;
  testDate?: string;
  scrubMode?: boolean;
}

export function SolDemo({ testTime, testDate, scrubMode }: SolDemoProps) {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  // Get test params from URL or props
  const time = testTime || searchParams.get("time");
  const date = testDate || searchParams.get("date");
  const scrub = scrubMode || searchParams.get("scrub") === "true";
  const speed = Number(searchParams.get("speed")) || 60;

  // Get Toronto time (with optional test overrides)
  const torontoTime = useTorontoTime({
    testTime: time,
    testDate: date,
    scrubMode: scrub,
    scrubSpeed: speed,
    updateInterval: 1000,
  });

  // Get solar position for border color
  const solar = useSolarPosition(torontoTime.date);

  // Client-side only rendering to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <SolDemoSkeleton />;
  }

  return (
    <div className="relative overflow-hidden rounded-lg font-mono">
      {/* Terminal frame with dynamic border */}
      <div
        className="relative"
        style={{
          backgroundColor: "#0a0a1a",
        }}
      >
        {/* Top border */}
        <div
          className="text-[10px] leading-none select-none overflow-hidden whitespace-nowrap"
          style={{
            color: solar.borderColor,
            transition: "color 1s ease",
          }}
        >
          {"█".repeat(120)}
        </div>

        {/* Middle content with side borders */}
        <div className="relative flex">
          {/* Left border column */}
          <div
            className="text-[10px] leading-[1.2] select-none flex-shrink-0 flex flex-col"
            style={{
              color: solar.borderColor,
              transition: "color 1s ease",
            }}
          >
            {Array(20)
              .fill("█")
              .map((char, i) => (
                <span key={i}>{char}</span>
              ))}
          </div>

          {/* Main sky canvas */}
          <div className="flex-1 relative" style={{ height: 240 }}>
            <SkyCanvas date={torontoTime.date} />

            {/* Date/time overlay */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 text-sm"
              style={{
                bottom: "25%",
                color: "rgba(255, 255, 255, 0.6)",
                textShadow: "0 0 8px rgba(0,0,0,0.9)",
              }}
            >
              {solar.isDaytime ? "☀" : "☽"} {torontoTime.formatted.full}
            </div>

            {/* Test mode indicator */}
            {(time || date || scrub) && (
              <div
                className="absolute top-2 right-2 text-xs px-2 py-1 rounded"
                style={{
                  backgroundColor: "rgba(255, 100, 100, 0.3)",
                  color: "rgba(255, 255, 255, 0.7)",
                }}
              >
                TEST MODE
              </div>
            )}
          </div>

          {/* Right border column */}
          <div
            className="text-[10px] leading-[1.2] select-none flex-shrink-0 flex flex-col"
            style={{
              color: solar.borderColor,
              transition: "color 1s ease",
            }}
          >
            {Array(20)
              .fill("█")
              .map((char, i) => (
                <span key={i}>{char}</span>
              ))}
          </div>
        </div>

        {/* Bottom border */}
        <div
          className="text-[10px] leading-none select-none overflow-hidden whitespace-nowrap"
          style={{
            color: solar.borderColor,
            transition: "color 1s ease",
          }}
        >
          {"█".repeat(120)}
        </div>
      </div>

      {/* Scrub mode controls */}
      {scrub && (
        <div className="mt-2 text-xs text-center text-[var(--muted)]">
          Scrubbing through 24 hours at {speed}x speed
        </div>
      )}
    </div>
  );
}

// Loading skeleton while client hydrates
function SolDemoSkeleton() {
  return (
    <div
      className="relative overflow-hidden rounded-lg font-mono"
      style={{ backgroundColor: "#0a0a1a" }}
    >
      <div className="text-[10px] leading-none select-none overflow-hidden whitespace-nowrap text-[#4a4a6a]">
        {"█".repeat(120)}
      </div>
      <div className="flex">
        <div className="text-[10px] leading-[1.2] select-none flex-shrink-0 flex flex-col text-[#4a4a6a]">
          {Array(20)
            .fill("█")
            .map((_, i) => (
              <span key={i}>█</span>
            ))}
        </div>
        <div
          className="flex-1 relative"
          style={{
            height: 240,
            background: "linear-gradient(to bottom, #1a1a3a 0%, #2a2a4a 100%)",
          }}
        >
          <div
            className="absolute left-1/2 transform -translate-x-1/2 text-sm"
            style={{
              bottom: "25%",
              color: "rgba(255, 255, 255, 0.3)",
            }}
          >
            Loading...
          </div>
        </div>
        <div className="text-[10px] leading-[1.2] select-none flex-shrink-0 flex flex-col text-[#4a4a6a]">
          {Array(20)
            .fill("█")
            .map((_, i) => (
              <span key={i}>█</span>
            ))}
        </div>
      </div>
      <div className="text-[10px] leading-none select-none overflow-hidden whitespace-nowrap text-[#4a4a6a]">
        {"█".repeat(120)}
      </div>
    </div>
  );
}
