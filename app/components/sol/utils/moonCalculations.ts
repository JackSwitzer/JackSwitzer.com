// Accurate lunar calculations for moon phase and position
// Based on astronomical algorithms

import { TORONTO_LAT, TORONTO_LON, TORONTO_TZ } from "./solarCalculations";

// Synodic month (new moon to new moon) in days
const SYNODIC_MONTH = 29.53058867;

// Known new moon reference (UTC)
// January 11, 2024 at 11:57 UTC was a new moon
const KNOWN_NEW_MOON = new Date("2024-01-11T11:57:00Z");

export type MoonPhaseName =
  | "New Moon"
  | "Waxing Crescent"
  | "First Quarter"
  | "Waxing Gibbous"
  | "Full Moon"
  | "Waning Gibbous"
  | "Last Quarter"
  | "Waning Crescent";

export interface MoonPhaseInfo {
  phase: number; // 0-1 (0 = new moon, 0.5 = full moon)
  illumination: number; // 0-1 (percentage of moon illuminated)
  age: number; // days since new moon
  phaseName: MoonPhaseName;
  isWaxing: boolean; // true if moon is growing
}

export interface MoonPosition {
  altitude: number; // degrees above horizon
  azimuth: number; // degrees from north
  x: number; // screen position 0-100
  y: number; // screen position 0-100
}

// Get moon phase (0-1) for a given date
export function getMoonPhase(date: Date = new Date()): number {
  const daysSinceNewMoon =
    (date.getTime() - KNOWN_NEW_MOON.getTime()) / (1000 * 60 * 60 * 24);

  // Normalize to 0-1 range
  let phase = (daysSinceNewMoon % SYNODIC_MONTH) / SYNODIC_MONTH;
  if (phase < 0) phase += 1;

  return phase;
}

// Get moon age in days since new moon
export function getMoonAge(date: Date = new Date()): number {
  const daysSinceNewMoon =
    (date.getTime() - KNOWN_NEW_MOON.getTime()) / (1000 * 60 * 60 * 24);

  let age = daysSinceNewMoon % SYNODIC_MONTH;
  if (age < 0) age += SYNODIC_MONTH;

  return age;
}

// Get illumination percentage (0-1)
// Uses cosine function: 0 at new moon, 1 at full moon
export function getMoonIllumination(phase: number): number {
  // Illumination follows a cosine curve
  // At phase 0 (new moon): illumination = 0
  // At phase 0.5 (full moon): illumination = 1
  return (1 - Math.cos(phase * 2 * Math.PI)) / 2;
}

// Get the name of the current moon phase
export function getMoonPhaseName(phase: number): MoonPhaseName {
  // 8 phases, each covering ~3.69 days
  if (phase < 0.0625 || phase >= 0.9375) return "New Moon";
  if (phase < 0.1875) return "Waxing Crescent";
  if (phase < 0.3125) return "First Quarter";
  if (phase < 0.4375) return "Waxing Gibbous";
  if (phase < 0.5625) return "Full Moon";
  if (phase < 0.6875) return "Waning Gibbous";
  if (phase < 0.8125) return "Last Quarter";
  return "Waning Crescent";
}

// Get complete moon phase info
export function getMoonPhaseInfo(date: Date = new Date()): MoonPhaseInfo {
  const phase = getMoonPhase(date);
  const illumination = getMoonIllumination(phase);
  const age = getMoonAge(date);
  const phaseName = getMoonPhaseName(phase);
  const isWaxing = phase < 0.5;

  return { phase, illumination, age, phaseName, isWaxing };
}

// Simplified moon position calculation
// The moon rises about 50 minutes later each day and follows a similar arc to the sun
// This is a simplified model - for exact position you'd need full ephemeris calculations
export function getMoonPosition(date: Date = new Date()): MoonPosition {
  const moonAge = getMoonAge(date);

  // Get Toronto time
  const torontoTime = new Date(
    date.toLocaleString("en-US", { timeZone: TORONTO_TZ })
  );
  const hours = torontoTime.getHours() + torontoTime.getMinutes() / 60;

  // Moon rises ~50 minutes later each day
  // At new moon, moon rises/sets roughly with the sun
  // At full moon, moon rises at sunset and sets at sunrise
  // Moon's transit delay is roughly moonAge * 50 minutes

  const moonDelayHours = (moonAge * 50) / 60; // Hours after solar noon for lunar transit

  // Calculate hour angle relative to moon's transit
  // Moon transits at approximately solar noon + delay hours
  const transitHour = 12 + moonDelayHours;
  const hourAngle = (hours - transitHour) * 15; // 15 degrees per hour

  // Simplified altitude calculation
  // Moon can reach max altitude of ~70° at Toronto's latitude
  // Uses cosine curve based on hour angle
  const maxAltitude = 70;
  const altitude = maxAltitude * Math.cos((hourAngle * Math.PI) / 180);

  // Azimuth calculation
  // Similar to sun: east at rise, south at transit, west at set
  // Range roughly 90° (east) to 270° (west) during visible portion
  let azimuth = 180 + hourAngle; // 180 = south at transit
  if (azimuth < 0) azimuth += 360;
  if (azimuth >= 360) azimuth -= 360;

  // Convert to screen coordinates
  // X: east=right (100), west=left (0)
  // Y: horizon=85, peak=15
  const padding = 10;
  const normalizedAzimuth = (azimuth - 90) / 180; // 0 at east (90°), 1 at west (270°)
  const x = padding + (1 - Math.max(0, Math.min(1, normalizedAzimuth))) * (100 - 2 * padding);

  const horizonY = 85;
  const peakY = 15;

  let y: number;
  if (altitude <= 0) {
    y = 100; // Below horizon
  } else {
    const altitudeRatio = Math.min(altitude / maxAltitude, 1);
    y = horizonY - (horizonY - peakY) * Math.sin(altitudeRatio * (Math.PI / 2));
  }

  return {
    altitude,
    azimuth,
    x: Math.max(0, Math.min(100, x)),
    y: Math.max(peakY, Math.min(100, y)),
  };
}

// Get the angle for the moon's terminator (shadow edge) for rendering
// Returns angle in degrees where the shadow should be
export function getMoonTerminatorAngle(phase: number): number {
  // At new moon (0) and full moon (0.5), terminator is at edge
  // First quarter (0.25): terminator at 90° (right edge illuminated)
  // Last quarter (0.75): terminator at 270° (left edge illuminated)

  if (phase < 0.5) {
    // Waxing: shadow on left, moving right
    return 270 - phase * 360;
  } else {
    // Waning: shadow on right, moving left
    return 90 + (phase - 0.5) * 360;
  }
}

// Determine if moon is above horizon
export function isMoonVisible(date: Date = new Date()): boolean {
  const position = getMoonPosition(date);
  return position.altitude > 0;
}

// Get next significant moon phase
export function getNextMoonPhase(date: Date = new Date()): {
  phase: MoonPhaseName;
  date: Date;
} {
  const currentPhase = getMoonPhase(date);

  // Define phase boundaries
  const phases: Array<{ threshold: number; name: MoonPhaseName }> = [
    { threshold: 0, name: "New Moon" },
    { threshold: 0.25, name: "First Quarter" },
    { threshold: 0.5, name: "Full Moon" },
    { threshold: 0.75, name: "Last Quarter" },
    { threshold: 1, name: "New Moon" },
  ];

  // Find next phase
  let nextPhaseThreshold: number;
  let nextPhaseName: MoonPhaseName;

  for (const p of phases) {
    if (p.threshold > currentPhase) {
      nextPhaseThreshold = p.threshold;
      nextPhaseName = p.name;
      break;
    }
  }

  // Calculate days until next phase
  const daysUntilNextPhase =
    (nextPhaseThreshold! - currentPhase) * SYNODIC_MONTH;
  const nextPhaseDate = new Date(
    date.getTime() + daysUntilNextPhase * 24 * 60 * 60 * 1000
  );

  return { phase: nextPhaseName!, date: nextPhaseDate };
}
