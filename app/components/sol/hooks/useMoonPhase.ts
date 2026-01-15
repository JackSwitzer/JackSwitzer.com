"use client";

import { useMemo } from "react";
import {
  getMoonPhaseInfo,
  getMoonPosition,
  isMoonVisible,
  type MoonPhaseInfo,
  type MoonPosition,
} from "../utils/moonCalculations";

export interface MoonState {
  phaseInfo: MoonPhaseInfo;
  position: MoonPosition;
  isVisible: boolean;
}

export function useMoonPhase(date: Date): MoonState {
  return useMemo(() => {
    const phaseInfo = getMoonPhaseInfo(date);
    const position = getMoonPosition(date);
    const isVisible = isMoonVisible(date);

    return {
      phaseInfo,
      position,
      isVisible,
    };
  }, [date]);
}
