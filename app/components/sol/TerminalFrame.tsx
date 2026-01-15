"use client";

import { ReactNode } from "react";

interface TerminalFrameProps {
  borderColor: string;
  children: ReactNode;
}

export function TerminalFrame({ borderColor, children }: TerminalFrameProps) {
  // Border character used in the Python Rich terminal version
  const borderChar = "█";

  return (
    <div
      className="relative font-mono"
      style={{
        backgroundColor: "#0a0a1a",
      }}
    >
      {/* Top border */}
      <div
        className="text-xs leading-none select-none overflow-hidden whitespace-nowrap"
        style={{
          color: borderColor,
          transition: "color 1s ease",
        }}
      >
        {borderChar.repeat(100)}
      </div>

      {/* Middle content with side borders */}
      <div className="relative flex">
        {/* Left border */}
        <div
          className="text-xs leading-none select-none flex-shrink-0"
          style={{
            color: borderColor,
            transition: "color 1s ease",
            writingMode: "vertical-lr",
            height: "100%",
          }}
        >
          {Array(25)
            .fill(borderChar)
            .map((char, i) => (
              <span key={i} className="block">
                {char}
              </span>
            ))}
        </div>

        {/* Main content area */}
        <div className="flex-1 relative overflow-hidden" style={{ minHeight: 200 }}>
          {children}
        </div>

        {/* Right border */}
        <div
          className="text-xs leading-none select-none flex-shrink-0"
          style={{
            color: borderColor,
            transition: "color 1s ease",
            writingMode: "vertical-lr",
            height: "100%",
          }}
        >
          {Array(25)
            .fill(borderChar)
            .map((char, i) => (
              <span key={i} className="block">
                {char}
              </span>
            ))}
        </div>
      </div>

      {/* Bottom border */}
      <div
        className="text-xs leading-none select-none overflow-hidden whitespace-nowrap"
        style={{
          color: borderColor,
          transition: "color 1s ease",
        }}
      >
        {borderChar.repeat(100)}
      </div>
    </div>
  );
}
