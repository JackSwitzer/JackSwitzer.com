"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SkyCanvas } from "./sol/SkyCanvas";
import { useTorontoTime } from "./sol/hooks/useTorontoTime";
import { useSolarPosition } from "./sol/hooks/useSolarPosition";

interface SolDemoProps {
  testTime?: string;
  testDate?: string;
  scrubMode?: boolean;
}

export function SolDemo({ testTime, testDate, scrubMode }: SolDemoProps) {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [animationStartTime, setAnimationStartTime] = useState(0); // Starting minute of day
  const [animationElapsed, setAnimationElapsed] = useState(0); // Minutes elapsed in animation

  const time = testTime || searchParams.get("time");
  const date = testDate || searchParams.get("date");
  const scrub = scrubMode || searchParams.get("scrub") === "true";

  // Animation: 20 seconds for full day = 1440 minutes / 20 seconds = 72 min per second
  // At 50ms intervals: 72 / 20 = 3.6 minutes per tick
  const ANIMATION_DURATION = 20000; // 20 seconds
  const TICK_INTERVAL = 50;
  const MINUTES_PER_TICK = 1440 / (ANIMATION_DURATION / TICK_INTERVAL);

  // Calculate current animation time (wraps around midnight)
  const currentAnimationMinute = animating
    ? (animationStartTime + animationElapsed) % 1440
    : 0;
  const animationTimeString = animating
    ? `${Math.floor(currentAnimationMinute / 60).toString().padStart(2, '0')}:${Math.floor(currentAnimationMinute % 60).toString().padStart(2, '0')}`
    : null;

  const torontoTime = useTorontoTime({
    testTime: animationTimeString || time,
    testDate: date,
    scrubMode: scrub && !animating,
    scrubSpeed: 60,
    updateInterval: 1000,
  });

  const solar = useSolarPosition(torontoTime.date);

  // Determine if sunrise or sunset is next
  const getNextSunEvent = () => {
    const now = torontoTime.date;
    const { sunrise, sunset } = solar.sunTimes;

    if (now < sunrise) return "Sunrise";
    if (now < sunset) return "Sunset";
    return "Sunrise"; // After sunset, next is tomorrow's sunrise
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle animation
  useEffect(() => {
    if (!animating) return;

    const interval = setInterval(() => {
      setAnimationElapsed(prev => {
        const next = prev + MINUTES_PER_TICK;
        if (next >= 1440) {
          // Full cycle complete - stop at starting time
          setAnimating(false);
          return 0;
        }
        return next;
      });
    }, TICK_INTERVAL);

    return () => clearInterval(interval);
  }, [animating]);

  const startAnimation = () => {
    // Capture current Toronto time as starting point
    const now = torontoTime.date;
    const startMinutes = now.getHours() * 60 + now.getMinutes();
    setAnimationStartTime(startMinutes);
    setAnimationElapsed(0);
    setAnimating(true);
  };

  if (!mounted) {
    return <SolDemoSkeleton />;
  }

  return (
    <div className="relative overflow-hidden rounded-lg font-mono" style={{ height: 220 }}>
      {/* Sky background */}
      <SkyCanvas date={torontoTime.date} />

      {/* Test mode indicator */}
      {(time || date || (scrub && !animating)) && (
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

      {/* Bottom overlay with date/time and animate button */}
      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center justify-between">
        <span
          className="text-sm font-medium tracking-wide"
          style={{
            color: "#ff6b35",
            textShadow: "0 1px 3px rgba(0,0,0,0.5)",
          }}
        >
          {solar.isDaytime ? "☀" : "☽"} {torontoTime.formatted.full}
        </span>

        {/* Sunrise/Sunset button */}
        <button
          onClick={startAnimation}
          disabled={animating}
          className="text-xs px-2 py-1 rounded transition-colors"
          style={{
            backgroundColor: animating ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.25)",
            color: "#ff6b35",
            opacity: animating ? 0.6 : 1,
            cursor: animating ? "default" : "pointer",
          }}
        >
          {animating ? "Playing..." : getNextSunEvent()}
        </button>
      </div>
    </div>
  );
}

function SolDemoSkeleton() {
  return (
    <div
      className="relative overflow-hidden rounded-lg font-mono"
      style={{
        height: 220,
        background: "linear-gradient(to bottom, #1a1a3a 0%, #2a2a4a 100%)",
      }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ color: "rgba(255, 255, 255, 0.3)" }}
      >
        Loading...
      </div>
    </div>
  );
}
