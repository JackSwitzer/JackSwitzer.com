"use client";

import { useMemo } from "react";
import {
  getSolarPosition,
  getSunTimes,
  solarToScreen,
  getTimeOfDay,
  TORONTO_LAT,
  TORONTO_LON,
  type SolarPosition,
  type SunTimes,
  type ScreenPosition,
  type TimeOfDay,
} from "../utils/solarCalculations";
import { getSkyColors, getSunColor, getBorderColor, type SkyColors } from "../utils/colorGradients";

export interface SolarState {
  position: SolarPosition;
  screenPosition: ScreenPosition;
  sunTimes: SunTimes;
  timeOfDay: TimeOfDay;
  isDaytime: boolean;
  colors: SkyColors;
  sunColor: string;
  borderColor: string;
}

export function useSolarPosition(date: Date): SolarState {
  return useMemo(() => {
    const position = getSolarPosition(date, TORONTO_LAT, TORONTO_LON);
    const sunTimes = getSunTimes(date, TORONTO_LAT, TORONTO_LON);
    const screenPosition = solarToScreen(position, sunTimes);
    const timeOfDay = getTimeOfDay(position.altitude);
    const isDaytime = position.altitude > 0;
    const colors = getSkyColors(position.altitude);
    const sunColor = getSunColor(position.altitude);
    const borderColor = getBorderColor(position.altitude);

    return {
      position,
      screenPosition,
      sunTimes,
      timeOfDay,
      isDaytime,
      colors,
      sunColor,
      borderColor,
    };
  }, [date]);
}
