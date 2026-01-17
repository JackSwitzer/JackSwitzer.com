// Accurate lunar calculations using Meeus's algorithms
// Reference: "Astronomical Algorithms" by Jean Meeus, Chapter 47
// Provides ~0.5° accuracy for moon position

import { TORONTO_LAT, TORONTO_LON, TORONTO_TZ } from "./solarCalculations";

// Synodic month (new moon to new moon) in days
const SYNODIC_MONTH = 29.530588861;

// Known new moon reference (UTC) - January 11, 2024 at 11:57 UTC
const KNOWN_NEW_MOON = new Date("2024-01-11T11:57:00Z");

// Convert degrees to radians
function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

// Convert radians to degrees
function toDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

// Normalize angle to 0-360 range
function normalize360(deg: number): number {
  let result = deg % 360;
  if (result < 0) result += 360;
  return result;
}

// Get Julian Day from Date
function getJulianDay(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5;
}

// Get Julian Century from Julian Day (J2000.0 epoch)
function getJulianCentury(jd: number): number {
  return (jd - 2451545.0) / 36525;
}

// Get Toronto timezone offset in minutes
function getTorontoOffset(date: Date): number {
  const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
  const torontoDate = new Date(date.toLocaleString("en-US", { timeZone: TORONTO_TZ }));
  return (utcDate.getTime() - torontoDate.getTime()) / 60000;
}

// ============================================================================
// LUNAR POSITION CALCULATIONS (Meeus Chapter 47)
// ============================================================================

interface LunarOrbitalElements {
  Lp: number;  // Moon's mean longitude (degrees)
  D: number;   // Mean elongation of the Moon (degrees)
  M: number;   // Sun's mean anomaly (degrees)
  Mp: number;  // Moon's mean anomaly (degrees)
  F: number;   // Moon's argument of latitude (degrees)
  omega: number; // Longitude of Moon's ascending node (degrees)
}

// Calculate lunar orbital elements for a given Julian Century
function getLunarOrbitalElements(T: number): LunarOrbitalElements {
  // Moon's mean longitude (degrees)
  const Lp = normalize360(
    218.3164477 + 481267.88123421 * T - 0.0015786 * T * T + T * T * T / 538841 - T * T * T * T / 65194000
  );

  // Mean elongation of the Moon (degrees)
  const D = normalize360(
    297.8501921 + 445267.1114034 * T - 0.0018819 * T * T + T * T * T / 545868 - T * T * T * T / 113065000
  );

  // Sun's mean anomaly (degrees)
  const M = normalize360(
    357.5291092 + 35999.0502909 * T - 0.0001536 * T * T + T * T * T / 24490000
  );

  // Moon's mean anomaly (degrees)
  const Mp = normalize360(
    134.9633964 + 477198.8675055 * T + 0.0087414 * T * T + T * T * T / 69699 - T * T * T * T / 14712000
  );

  // Moon's argument of latitude (angular distance from ascending node)
  const F = normalize360(
    93.2720950 + 483202.0175233 * T - 0.0036539 * T * T - T * T * T / 3526000 + T * T * T * T / 863310000
  );

  // Longitude of Moon's ascending node
  const omega = normalize360(
    125.0445479 - 1934.1362891 * T + 0.0020754 * T * T + T * T * T / 467441 - T * T * T * T / 60616000
  );

  return { Lp, D, M, Mp, F, omega };
}

// Periodic terms for lunar longitude (sigma l) - simplified set for ~0.5° accuracy
// Format: [D, M, Mp, F, coefficient in 0.000001 degrees]
const LONGITUDE_TERMS: [number, number, number, number, number][] = [
  [0, 0, 1, 0, 6288774],
  [2, 0, -1, 0, 1274027],
  [2, 0, 0, 0, 658314],
  [0, 0, 2, 0, 213618],
  [0, 1, 0, 0, -185116],
  [0, 0, 0, 2, -114332],
  [2, 0, -2, 0, 58793],
  [2, -1, -1, 0, 57066],
  [2, 0, 1, 0, 53322],
  [2, -1, 0, 0, 45758],
  [0, 1, -1, 0, -40923],
  [1, 0, 0, 0, -34720],
  [0, 1, 1, 0, -30383],
  [2, 0, 0, -2, 15327],
  [0, 0, 1, 2, -12528],
  [0, 0, 1, -2, 10980],
  [4, 0, -1, 0, 10675],
  [0, 0, 3, 0, 10034],
  [4, 0, -2, 0, 8548],
  [2, 1, -1, 0, -7888],
];

// Periodic terms for lunar latitude (sigma b) - simplified set
const LATITUDE_TERMS: [number, number, number, number, number][] = [
  [0, 0, 0, 1, 5128122],
  [0, 0, 1, 1, 280602],
  [0, 0, 1, -1, 277693],
  [2, 0, 0, -1, 173237],
  [2, 0, -1, 1, 55413],
  [2, 0, -1, -1, 46271],
  [2, 0, 0, 1, 32573],
  [0, 0, 2, 1, 17198],
  [2, 0, 1, -1, 9266],
  [0, 0, 2, -1, 8822],
  [2, -1, 0, -1, 8216],
  [2, 0, -2, -1, 4324],
  [2, 0, 1, 1, 4200],
  [2, 1, 0, -1, -3359],
  [2, -1, -1, 1, 2463],
  [2, -1, 0, 1, 2211],
  [2, -1, -1, -1, 2065],
  [0, 1, -1, -1, -1870],
  [4, 0, -1, -1, 1828],
  [0, 1, 0, 1, -1794],
];

// Calculate Moon's geocentric ecliptic coordinates
function getMoonEclipticCoords(date: Date): { longitude: number; latitude: number; distance: number } {
  const jd = getJulianDay(date);
  const T = getJulianCentury(jd);
  const elements = getLunarOrbitalElements(T);

  // Calculate eccentricity correction factor
  const E = 1 - 0.002516 * T - 0.0000074 * T * T;
  const E2 = E * E;

  // Sum longitude terms
  let sigmaL = 0;
  for (const [d, m, mp, f, coef] of LONGITUDE_TERMS) {
    const arg = d * elements.D + m * elements.M + mp * elements.Mp + f * elements.F;
    let term = coef * Math.sin(toRad(arg));
    // Apply eccentricity correction for terms involving M
    if (Math.abs(m) === 1) term *= E;
    if (Math.abs(m) === 2) term *= E2;
    sigmaL += term;
  }

  // Sum latitude terms
  let sigmaB = 0;
  for (const [d, m, mp, f, coef] of LATITUDE_TERMS) {
    const arg = d * elements.D + m * elements.M + mp * elements.Mp + f * elements.F;
    let term = coef * Math.sin(toRad(arg));
    if (Math.abs(m) === 1) term *= E;
    if (Math.abs(m) === 2) term *= E2;
    sigmaB += term;
  }

  // Additional corrections
  const A1 = normalize360(119.75 + 131.849 * T);
  const A2 = normalize360(53.09 + 479264.29 * T);
  const A3 = normalize360(313.45 + 481266.484 * T);

  sigmaL += 3958 * Math.sin(toRad(A1));
  sigmaL += 1962 * Math.sin(toRad(elements.Lp - elements.F));
  sigmaL += 318 * Math.sin(toRad(A2));

  sigmaB += -2235 * Math.sin(toRad(elements.Lp));
  sigmaB += 382 * Math.sin(toRad(A3));
  sigmaB += 175 * Math.sin(toRad(A1 - elements.F));
  sigmaB += 175 * Math.sin(toRad(A1 + elements.F));
  sigmaB += 127 * Math.sin(toRad(elements.Lp - elements.Mp));
  sigmaB += -115 * Math.sin(toRad(elements.Lp + elements.Mp));

  // Moon's geocentric ecliptic longitude and latitude
  const longitude = normalize360(elements.Lp + sigmaL / 1000000);
  const latitude = sigmaB / 1000000;

  // Distance calculation (simplified) - in km
  const distance = 385000.56; // Mean distance, could add perturbations

  return { longitude, latitude, distance };
}

// Mean obliquity of the ecliptic
function getMeanObliquity(T: number): number {
  const seconds = 21.448 - T * (46.8150 + T * (0.00059 - T * 0.001813));
  return 23 + (26 + seconds / 60) / 60;
}

// Convert ecliptic to equatorial coordinates
function eclipticToEquatorial(
  longitude: number,
  latitude: number,
  T: number
): { rightAscension: number; declination: number } {
  const obliquity = toRad(getMeanObliquity(T));
  const lon = toRad(longitude);
  const lat = toRad(latitude);

  // Right ascension
  const sinRA = Math.sin(lon) * Math.cos(obliquity) - Math.tan(lat) * Math.sin(obliquity);
  const cosRA = Math.cos(lon);
  let ra = toDeg(Math.atan2(sinRA, cosRA));
  if (ra < 0) ra += 360;

  // Declination
  const sinDec = Math.sin(lat) * Math.cos(obliquity) + Math.cos(lat) * Math.sin(obliquity) * Math.sin(lon);
  const dec = toDeg(Math.asin(sinDec));

  return { rightAscension: ra, declination: dec };
}

// Calculate Local Sidereal Time (degrees)
function getLocalSiderealTime(date: Date, longitude: number): number {
  const jd = getJulianDay(date);
  const T = (jd - 2451545.0) / 36525;

  // Greenwich Mean Sidereal Time at 0h UT
  let theta0 = 280.46061837 + 360.98564736629 * (jd - 2451545.0) +
    0.000387933 * T * T - T * T * T / 38710000;

  theta0 = normalize360(theta0);

  // Local Sidereal Time
  const lst = normalize360(theta0 + longitude);

  return lst;
}

// Convert equatorial to horizontal (altitude/azimuth) coordinates
function equatorialToHorizontal(
  rightAscension: number,
  declination: number,
  date: Date,
  latitude: number,
  longitude: number
): { altitude: number; azimuth: number } {
  const lst = getLocalSiderealTime(date, longitude);
  const hourAngle = normalize360(lst - rightAscension);
  const ha = toRad(hourAngle);
  const dec = toRad(declination);
  const lat = toRad(latitude);

  // Calculate altitude
  const sinAlt = Math.sin(dec) * Math.sin(lat) + Math.cos(dec) * Math.cos(lat) * Math.cos(ha);
  const altitude = toDeg(Math.asin(sinAlt));

  // Calculate azimuth
  const cosA = (Math.sin(dec) - Math.sin(lat) * sinAlt) / (Math.cos(lat) * Math.cos(toRad(altitude)));
  let azimuth = toDeg(Math.acos(Math.max(-1, Math.min(1, cosA))));

  // Correct azimuth based on hour angle
  if (Math.sin(ha) > 0) {
    azimuth = 360 - azimuth;
  }

  return { altitude, azimuth };
}

// ============================================================================
// PUBLIC API
// ============================================================================

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
  isWaxing: boolean;
}

export interface MoonPosition {
  altitude: number; // degrees above horizon
  azimuth: number; // degrees from north (0-360, clockwise)
  x: number; // screen position 0-100
  y: number; // screen position 0-100
}

// Get moon phase (0-1) for a given date
export function getMoonPhase(date: Date = new Date()): number {
  const daysSinceNewMoon =
    (date.getTime() - KNOWN_NEW_MOON.getTime()) / (1000 * 60 * 60 * 24);

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
export function getMoonIllumination(phase: number): number {
  return (1 - Math.cos(phase * 2 * Math.PI)) / 2;
}

// Get the name of the current moon phase
export function getMoonPhaseName(phase: number): MoonPhaseName {
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

// Get accurate moon position (altitude/azimuth) for Toronto
export function getMoonAltAz(
  date: Date,
  lat: number = TORONTO_LAT,
  lon: number = TORONTO_LON
): { altitude: number; azimuth: number; declination: number } {
  const jd = getJulianDay(date);
  const T = getJulianCentury(jd);

  // Get ecliptic coordinates
  const ecliptic = getMoonEclipticCoords(date);

  // Convert to equatorial
  const equatorial = eclipticToEquatorial(ecliptic.longitude, ecliptic.latitude, T);

  // Convert to horizontal
  const horizontal = equatorialToHorizontal(
    equatorial.rightAscension,
    equatorial.declination,
    date,
    lat,
    lon
  );

  return {
    altitude: horizontal.altitude,
    azimuth: horizontal.azimuth,
    declination: equatorial.declination,
  };
}

// Get moon position with screen coordinates
// Uses azimuth for smooth continuous arc (matches sun positioning)
export function getMoonPosition(date: Date = new Date()): MoonPosition {
  const { altitude, azimuth } = getMoonAltAz(date);

  // X position based on azimuth for smooth continuous movement
  // East (90°) = right side, South (180°) = center, West (270°) = left side
  let x: number;

  if (azimuth >= 90 && azimuth <= 270) {
    // Moon in southern sky (visible arc): 90° -> 90%, 180° -> 50%, 270° -> 10%
    x = 90 - ((azimuth - 90) / 180) * 80;
  } else if (azimuth < 90) {
    // Moon in eastern sky: smoothly approach from right
    x = 90 + ((90 - azimuth) / 90) * 10;
  } else {
    // Moon in western sky: smoothly exit to left
    x = 10 - ((azimuth - 270) / 90) * 10;
  }

  // Y position based on altitude - smooth arc that continues below horizon
  const horizonY = 80;
  const peakY = 22; // Moon arcs lower than sun
  const maxAltitude = 70;
  const minAltitude = -20; // Continue arc below horizon

  let y: number;
  if (altitude >= 0) {
    // Above horizon: map altitude to y position
    const altitudeRatio = Math.min(altitude / maxAltitude, 1);
    y = horizonY - (horizonY - peakY) * altitudeRatio;
  } else {
    // Below horizon: continue the arc smoothly
    const belowRatio = Math.min(Math.abs(altitude) / Math.abs(minAltitude), 1);
    y = horizonY + (100 - horizonY) * belowRatio;
  }

  return {
    altitude,
    azimuth,
    x: Math.max(0, Math.min(100, x)),
    y: Math.max(peakY, Math.min(100, y)),
  };
}

// Calculate approximate moonrise time for a given date
export function getMoonRiseSet(
  date: Date,
  lat: number = TORONTO_LAT,
  lon: number = TORONTO_LON
): { rise: Date | null; set: Date | null; transit: Date | null } {
  // Search for moonrise/set by checking altitude at intervals
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  let rise: Date | null = null;
  let set: Date | null = null;
  let transit: Date | null = null;
  let maxAlt = -90;
  let prevAlt = getMoonAltAz(startOfDay, lat, lon).altitude;

  // Check every 10 minutes
  for (let mins = 10; mins <= 1440; mins += 10) {
    const checkTime = new Date(startOfDay.getTime() + mins * 60000);
    const { altitude } = getMoonAltAz(checkTime, lat, lon);

    // Detect horizon crossing
    if (prevAlt <= 0 && altitude > 0 && !rise) {
      // Moonrise - interpolate for more accuracy
      const ratio = -prevAlt / (altitude - prevAlt);
      rise = new Date(startOfDay.getTime() + (mins - 10 + ratio * 10) * 60000);
    } else if (prevAlt > 0 && altitude <= 0 && !set) {
      // Moonset - interpolate
      const ratio = prevAlt / (prevAlt - altitude);
      set = new Date(startOfDay.getTime() + (mins - 10 + ratio * 10) * 60000);
    }

    // Track transit (highest point)
    if (altitude > maxAlt) {
      maxAlt = altitude;
      transit = checkTime;
    }

    prevAlt = altitude;
  }

  return { rise, set, transit };
}

// Check if a date falls on an equinox (March 19-21 or September 21-23)
export function isEquinox(date: Date): boolean {
  const month = date.getMonth(); // 0-indexed
  const day = date.getDate();

  // Vernal equinox: around March 20 (month 2)
  if (month === 2 && day >= 19 && day <= 21) return true;
  // Autumnal equinox: around September 22 (month 8)
  if (month === 8 && day >= 21 && day <= 23) return true;

  return false;
}

// Get approximate equinox time for a given equinox date
// Equinoxes occur at specific UTC times each year
function getEquinoxTime(date: Date): Date {
  const year = date.getFullYear();
  const month = date.getMonth();

  // Approximate equinox times (these vary by year, using rough estimates)
  // Spring equinox ~10:00 UTC, Fall equinox ~14:00 UTC (varies by year)
  const equinoxDate = new Date(date);
  if (month === 2) {
    // Vernal equinox - typically around 10:00-12:00 UTC
    equinoxDate.setUTCHours(10, 0, 0, 0);
  } else {
    // Autumnal equinox - typically around 14:00-16:00 UTC
    equinoxDate.setUTCHours(14, 0, 0, 0);
  }

  return equinoxDate;
}

// Determine if moon should be visible based on sun times
// Moon hides 1 hour after sunrise and reappears at dusk
// On equinoxes, moon becomes visible at the equinox time
export function isMoonVisible(
  date: Date = new Date(),
  sunTimes?: { sunrise: Date; dusk: Date }
): boolean {
  const { altitude } = getMoonAltAz(date);

  // Moon must be above horizon (with buffer for smooth arc)
  if (altitude <= -20) return false;

  // If no sun times provided, fall back to altitude-only check
  if (!sunTimes) return true;

  const { sunrise, dusk } = sunTimes;
  const oneHourAfterSunrise = new Date(sunrise.getTime() + 60 * 60 * 1000);

  // Check for equinox
  if (isEquinox(date)) {
    const equinoxTime = getEquinoxTime(date);
    // On equinox, moon becomes visible at the equinox time (not dusk)
    if (date >= equinoxTime) return true;
    // Before equinox time, follow normal rules
    if (date >= sunrise && date < oneHourAfterSunrise) return true;
    if (date < sunrise) return true;
    return false;
  }

  // Normal day: moon visible before sunrise, visible until 1h after sunrise,
  // then hidden until dusk
  if (date < sunrise) return true;
  if (date < oneHourAfterSunrise) return true;
  if (date >= dusk) return true;

  return false;
}

// Calculate the rotation angle for moon shadow rendering
// The illuminated side of the moon always faces the sun
// Returns angle in degrees where 0 = sun to the right, 90 = sun above, etc.
export function getMoonShadowAngle(
  date: Date,
  sunAltitude: number,
  sunAzimuth: number
): number {
  const moonPos = getMoonAltAz(date);

  // Calculate the angle from moon to sun
  // This determines which direction the lit portion should face
  const moonAz = moonPos.azimuth;
  const moonAlt = moonPos.altitude;

  // Simple 2D angle calculation based on azimuth difference
  // The sun's direction relative to the moon determines shadow orientation
  let azDiff = sunAzimuth - moonAz;

  // Normalize to -180 to 180
  while (azDiff > 180) azDiff -= 360;
  while (azDiff < -180) azDiff += 360;

  // Calculate vertical component based on altitude difference
  const altDiff = sunAltitude - moonAlt;

  // Convert to angle: atan2(vertical, horizontal)
  // This gives us the direction the sun is relative to the moon
  const angle = Math.atan2(altDiff, azDiff) * (180 / Math.PI);

  // The shadow should be opposite to the sun direction
  // Add 180 to point shadow away from sun, then adjust for rendering
  return angle;
}

// Get next significant moon phase
export function getNextMoonPhase(date: Date = new Date()): {
  phase: MoonPhaseName;
  date: Date;
} {
  const currentPhase = getMoonPhase(date);

  const phases: Array<{ threshold: number; name: MoonPhaseName }> = [
    { threshold: 0, name: "New Moon" },
    { threshold: 0.25, name: "First Quarter" },
    { threshold: 0.5, name: "Full Moon" },
    { threshold: 0.75, name: "Last Quarter" },
    { threshold: 1, name: "New Moon" },
  ];

  let nextPhaseThreshold: number = 1;
  let nextPhaseName: MoonPhaseName = "New Moon";

  for (const p of phases) {
    if (p.threshold > currentPhase) {
      nextPhaseThreshold = p.threshold;
      nextPhaseName = p.name;
      break;
    }
  }

  const daysUntilNextPhase = (nextPhaseThreshold - currentPhase) * SYNODIC_MONTH;
  const nextPhaseDate = new Date(date.getTime() + daysUntilNextPhase * 24 * 60 * 60 * 1000);

  return { phase: nextPhaseName, date: nextPhaseDate };
}
