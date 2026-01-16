"use client";

import { useMemo } from "react";
import type { MoonPhaseInfo, MoonPosition } from "./utils/moonCalculations";

interface MoonProps {
  position: MoonPosition;
  phaseInfo: MoonPhaseInfo;
  visible: boolean;
  shadowAngle?: number;
}

export function Moon({ position, phaseInfo, visible, shadowAngle = 0 }: MoonProps) {
  const { x, y, altitude } = position;
  const { phase, illumination, isWaxing } = phaseInfo;

  // Calculate the clip path for the moon phase
  // This creates an accurate representation of the illuminated portion
  const clipPath = useMemo(() => {
    // For the moon phase, we need to show which portion is illuminated
    // Waxing: right side illuminated first
    // Waning: left side illuminated (right side in shadow)

    // Convert phase to a percentage of the terminator position
    // At new moon (0), entire moon is dark
    // At first quarter (0.25), right half is lit
    // At full moon (0.5), entire moon is lit
    // At last quarter (0.75), left half is lit

    // We'll use an ellipse mask that reveals the illuminated portion
    // The terminator is the line between light and dark

    if (illumination < 0.02) {
      // New moon - show thin crescent outline
      return "none";
    }

    if (illumination > 0.98) {
      // Full moon - show full circle
      return "circle(50% at 50% 50%)";
    }

    // For crescent and gibbous phases, use a more complex shape
    // We'll simulate with overlapping circles

    return "circle(50% at 50% 50%)";
  }, [illumination]);

  // Don't render if far below horizon (but continue arc for smooth motion)
  if (!visible || altitude <= -20) return null;

  // Fade out gradually below horizon for smooth arc effect
  let opacity = 1;
  if (altitude < 0) {
    // Fade from altitude 0 to -15 to match sun visibility threshold
    opacity = Math.max(0, (altitude + 15) / 15);
  }

  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        opacity,
        transition: "left 0.12s ease-out, top 0.12s ease-out, opacity 0.24s ease",
      }}
    >
      {/* Moon container */}
      <div className="relative" style={{ width: 40, height: 40 }}>
        {/* Dark side of moon (always visible as base) */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundColor: "#1a1a2e",
            border: "1px solid #2a2a4a",
          }}
        />

        {/* Illuminated portion */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            backgroundColor: "#f0f0e8",
            boxShadow: "0 0 15px rgba(240, 240, 232, 0.5)",
          }}
        >
          {/* Shadow overlay for phase - rotated to face sun */}
          <div
            className="absolute inset-0"
            style={{
              transform: `rotate(${shadowAngle}deg)`,
            }}
          >
            <MoonShadow phase={phase} isWaxing={isWaxing} illumination={illumination} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Component to render the shadow portion of the moon
function MoonShadow({
  phase,
  isWaxing,
  illumination,
}: {
  phase: number;
  isWaxing: boolean;
  illumination: number;
}) {
  // Calculate shadow position based on phase
  // The shadow moves across the moon face as the phase progresses

  const shadowStyle = useMemo(() => {
    // At new moon, entire face is shadow
    // At full moon, no shadow
    // In between, shadow covers a portion

    if (illumination >= 0.98) {
      // Full moon - no shadow
      return { display: "none" as const };
    }

    if (illumination <= 0.02) {
      // New moon - entire face is shadow
      return {
        position: "absolute" as const,
        inset: 0,
        backgroundColor: "#1a1a2e",
        borderRadius: "50%",
      };
    }

    // Calculate how much of the moon is in shadow
    // Use an ellipse that squishes from the side

    // The terminator position: 0 = far right, 0.5 = center, 1 = far left
    let terminatorPos: number;

    if (phase <= 0.5) {
      // Waxing: shadow on left, shrinking
      // phase 0 -> terminator at 0 (shadow covers all from left)
      // phase 0.25 -> terminator at 0.5 (shadow covers left half)
      // phase 0.5 -> terminator at 1 (no shadow)
      terminatorPos = phase * 2;
    } else {
      // Waning: shadow on right, growing
      // phase 0.5 -> terminator at 1 (no shadow)
      // phase 0.75 -> terminator at 0.5 (shadow covers right half)
      // phase 1 -> terminator at 0 (shadow covers all from right)
      terminatorPos = 2 - phase * 2;
    }

    // Create ellipse mask for the shadow
    // The ellipse width determines how much is shadowed
    const ellipseWidth = Math.abs(terminatorPos - 0.5) * 200; // 0-100%

    if (isWaxing) {
      // Shadow on left side
      return {
        position: "absolute" as const,
        top: 0,
        bottom: 0,
        left: 0,
        width: `${(1 - terminatorPos) * 100}%`,
        backgroundColor: "#1a1a2e",
        borderRadius: terminatorPos < 0.5
          ? `0 ${ellipseWidth}% ${ellipseWidth}% 0 / 0 50% 50% 0`
          : `${ellipseWidth}% 0 0 ${ellipseWidth}% / 50% 0 0 50%`,
      };
    } else {
      // Shadow on right side
      return {
        position: "absolute" as const,
        top: 0,
        bottom: 0,
        right: 0,
        width: `${(1 - terminatorPos) * 100}%`,
        backgroundColor: "#1a1a2e",
        borderRadius: terminatorPos < 0.5
          ? `${ellipseWidth}% 0 0 ${ellipseWidth}% / 50% 0 0 50%`
          : `0 ${ellipseWidth}% ${ellipseWidth}% 0 / 0 50% 50% 0`,
      };
    }
  }, [phase, isWaxing, illumination]);

  return <div style={shadowStyle} />;
}
