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
  const moon = useMoonPhase(date);

  const skyGradient = getSkyGradientCSS(solar.colors);
  const groundColors = getGroundColors(solar.position.altitude);

  // Show sun during day, moon at night (with some overlap during twilight)
  const showSun = solar.position.altitude > -5;
  const showMoon = solar.position.altitude < 10 && moon.isVisible;

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Sky gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: skyGradient,
          transition: "background 2s ease",
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
        />
      )}

      {/* Horizon/ground area */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "15%",
        }}
      >
        {/* Horizon line */}
        <div
          className="h-[2px]"
          style={{
            backgroundColor: groundColors.horizon,
            transition: "background-color 2s ease",
          }}
        />
        {/* Ground */}
        <div
          className="h-full"
          style={{
            backgroundColor: groundColors.ground,
            transition: "background-color 2s ease",
          }}
        />
      </div>
    </div>
  );
}
