"use client";

import { Sun } from "./Sun";
import { Moon } from "./Moon";
import { Stars } from "./Stars";
import { useSolarPosition } from "./hooks/useSolarPosition";
import { useMoonPhase } from "./hooks/useMoonPhase";
import { getSkyGradientCSS, getGroundColors } from "./utils/colorGradients";

interface SkyCanvasProps {
  date: Date;
}

export function SkyCanvas({ date }: SkyCanvasProps) {
  const solar = useSolarPosition(date);
  const moon = useMoonPhase(date, solar.position.altitude, solar.position.azimuth);

  const skyGradient = getSkyGradientCSS(solar.colors);
  const groundColors = getGroundColors(solar.position.altitude);

  // Show sun when above horizon (with some buffer for glow effect)
  const showSun = solar.position.altitude > -5;

  // Show moon when it's above the horizon (based on accurate astronomical calculation)
  // moon.isVisible already checks altitude > 0
  const showMoon = moon.isVisible;

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Sky gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: skyGradient,
          transition: "background 0.3s ease",
        }}
      />

      {/* Stars layer */}
      <Stars
        opacity={solar.colors.starOpacity}
        count={60}
        seed={42}
      />

      {/* Sun */}
      {showSun && (
        <Sun
          x={solar.screenPosition.x}
          y={solar.screenPosition.y}
          color={solar.sunColor}
          altitude={solar.position.altitude}
        />
      )}

      {/* Moon */}
      {showMoon && (
        <Moon
          position={moon.position}
          phaseInfo={moon.phaseInfo}
          visible={moon.isVisible}
          shadowAngle={moon.shadowAngle}
        />
      )}
    </div>
  );
}
