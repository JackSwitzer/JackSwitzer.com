"use client";

import { useMemo } from "react";
import {
  getMoonPhaseInfo,
  getMoonPosition,
  isMoonVisible,
  getMoonShadowAngle,
  type MoonPhaseInfo,
  type MoonPosition,
} from "../utils/moonCalculations";

export interface MoonState {
  phaseInfo: MoonPhaseInfo;
  position: MoonPosition;
  isVisible: boolean;
  shadowAngle: number;
}

export function useMoonPhase(
  date: Date,
  sunAltitude: number = 0,
  sunAzimuth: number = 180,
  sunTimes?: { sunrise: Date; dusk: Date }
): MoonState {
  return useMemo(() => {
    const phaseInfo = getMoonPhaseInfo(date);
    const position = getMoonPosition(date);
    const isVisible = isMoonVisible(date, sunTimes);
    const shadowAngle = getMoonShadowAngle(date, sunAltitude, sunAzimuth);

    return {
      phaseInfo,
      position,
      isVisible,
      shadowAngle,
    };
  }, [date, sunAltitude, sunAzimuth, sunTimes]);
}
