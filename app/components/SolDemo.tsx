"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function SolDemo() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showOverlay, setShowOverlay] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Show overlay after gif animation reaches the text reveal (~2.5s based on gif timing)
  useEffect(() => {
    const timer = setTimeout(() => setShowOverlay(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* The actual terminal GIF */}
      <Image
        src="/projects/sol/sunrise.gif"
        alt="Sol sunrise alarm terminal animation"
        width={800}
        height={400}
        className="w-full h-auto"
        unoptimized
      />

      {/* Dynamic date/time overlay - positioned over the static text in the gif */}
      {showOverlay && (
        <div
          className="absolute font-mono text-sm"
          style={{
            bottom: "38%",
            left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(255, 255, 255, 0.5)",
            textShadow: "0 0 4px rgba(0,0,0,0.8)",
            backgroundColor: "rgb(42, 42, 90)",
            padding: "0 8px",
          }}
        >
          ☀ {formatDate(currentTime)} • {formatTime(currentTime)}
        </div>
      )}
    </div>
  );
}
