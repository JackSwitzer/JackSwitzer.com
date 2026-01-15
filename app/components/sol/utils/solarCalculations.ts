// NOAA Solar Calculator equations for accurate sun position
// Reference: https://gml.noaa.gov/grad/solcalc/calcdetails.html

// Toronto coordinates
export const TORONTO_LAT = 43.6532;
export const TORONTO_LON = -79.3832;
export const TORONTO_TZ = "America/Toronto";

export interface SolarPosition {
  altitude: number; // degrees above horizon (-90 to 90)
  azimuth: number; // degrees from north (0-360, clockwise)
}

export interface SunTimes {
  sunrise: Date;
  sunset: Date;
  solarNoon: Date;
  dawn: Date; // civil twilight start
  dusk: Date; // civil twilight end
}

export interface ScreenPosition {
  x: number; // 0-100 (left to right)
  y: number; // 0-100 (top to bottom)
}

// Convert degrees to radians
function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

// Convert radians to degrees
function toDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

// Get Julian Day from Date
function getJulianDay(date: Date): number {
  const time = date.getTime();
  return time / 86400000 + 2440587.5;
}

// Get Julian Century from Julian Day
function getJulianCentury(jd: number): number {
  return (jd - 2451545) / 36525;
}

// Geometric mean longitude of the sun (degrees)
function getSunGeomMeanLon(t: number): number {
  let lon = 280.46646 + t * (36000.76983 + 0.0003032 * t);
  while (lon > 360) lon -= 360;
  while (lon < 0) lon += 360;
  return lon;
}

// Geometric mean anomaly of the sun (degrees)
function getSunGeomMeanAnomaly(t: number): number {
  return 357.52911 + t * (35999.05029 - 0.0001537 * t);
}

// Eccentricity of Earth's orbit
function getEarthOrbitEccentricity(t: number): number {
  return 0.016708634 - t * (0.000042037 + 0.0000001267 * t);
}

// Sun equation of center (degrees)
function getSunEqOfCenter(t: number): number {
  const m = toRad(getSunGeomMeanAnomaly(t));
  return (
    Math.sin(m) * (1.914602 - t * (0.004817 + 0.000014 * t)) +
    Math.sin(2 * m) * (0.019993 - 0.000101 * t) +
    Math.sin(3 * m) * 0.000289
  );
}

// Sun true longitude (degrees)
function getSunTrueLon(t: number): number {
  return getSunGeomMeanLon(t) + getSunEqOfCenter(t);
}

// Sun apparent longitude (degrees)
function getSunApparentLon(t: number): number {
  const trueLon = getSunTrueLon(t);
  const omega = 125.04 - 1934.136 * t;
  return trueLon - 0.00569 - 0.00478 * Math.sin(toRad(omega));
}

// Mean obliquity of the ecliptic (degrees)
function getMeanObliquityOfEcliptic(t: number): number {
  const seconds =
    21.448 - t * (46.815 + t * (0.00059 - t * 0.001813));
  return 23 + (26 + seconds / 60) / 60;
}

// Corrected obliquity (degrees)
function getObliquityCorrection(t: number): number {
  const meanObliquity = getMeanObliquityOfEcliptic(t);
  const omega = 125.04 - 1934.136 * t;
  return meanObliquity + 0.00256 * Math.cos(toRad(omega));
}

// Sun declination (degrees)
function getSunDeclination(t: number): number {
  const obliquity = toRad(getObliquityCorrection(t));
  const apparentLon = toRad(getSunApparentLon(t));
  return toDeg(Math.asin(Math.sin(obliquity) * Math.sin(apparentLon)));
}

// Equation of time (minutes)
function getEquationOfTime(t: number): number {
  const obliquity = toRad(getObliquityCorrection(t));
  const geomMeanLon = toRad(getSunGeomMeanLon(t));
  const eccentricity = getEarthOrbitEccentricity(t);
  const geomMeanAnomaly = toRad(getSunGeomMeanAnomaly(t));

  const y = Math.tan(obliquity / 2) ** 2;

  const eqTime =
    y * Math.sin(2 * geomMeanLon) -
    2 * eccentricity * Math.sin(geomMeanAnomaly) +
    4 * eccentricity * y * Math.sin(geomMeanAnomaly) * Math.cos(2 * geomMeanLon) -
    0.5 * y * y * Math.sin(4 * geomMeanLon) -
    1.25 * eccentricity * eccentricity * Math.sin(2 * geomMeanAnomaly);

  return toDeg(eqTime) * 4; // Convert to minutes
}

// Hour angle for sunrise/sunset (degrees)
function getHourAngleSunrise(lat: number, declination: number, elevation: number = -0.833): number {
  const latRad = toRad(lat);
  const decRad = toRad(declination);
  const elevRad = toRad(elevation);

  const cosHA =
    (Math.cos(toRad(90 - elevation)) - Math.sin(latRad) * Math.sin(decRad)) /
    (Math.cos(latRad) * Math.cos(decRad));

  if (cosHA > 1) return NaN; // Sun never rises
  if (cosHA < -1) return NaN; // Sun never sets

  return toDeg(Math.acos(cosHA));
}

// Get solar position for a given date and location
export function getSolarPosition(
  date: Date,
  lat: number = TORONTO_LAT,
  lon: number = TORONTO_LON
): SolarPosition {
  const jd = getJulianDay(date);
  const t = getJulianCentury(jd);

  const declination = getSunDeclination(t);
  const eqTime = getEquationOfTime(t);

  // Time offset from UTC in minutes
  const timeOffset = date.getTimezoneOffset();

  // True solar time
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const timeInMinutes = hours * 60 + minutes + seconds / 60;

  const trueSolarTime = timeInMinutes + eqTime + 4 * lon - timeOffset;

  // Hour angle
  let hourAngle = trueSolarTime / 4 - 180;
  if (hourAngle < -180) hourAngle += 360;
  if (hourAngle > 180) hourAngle -= 360;

  // Solar zenith angle
  const latRad = toRad(lat);
  const decRad = toRad(declination);
  const haRad = toRad(hourAngle);

  const cosZenith =
    Math.sin(latRad) * Math.sin(decRad) +
    Math.cos(latRad) * Math.cos(decRad) * Math.cos(haRad);

  const zenith = toDeg(Math.acos(Math.min(1, Math.max(-1, cosZenith))));
  const altitude = 90 - zenith;

  // Solar azimuth angle
  let azimuth: number;
  const sinAzimuth = -Math.sin(haRad) * Math.cos(decRad);
  const cosAzimuth = (Math.sin(decRad) - Math.sin(latRad) * cosZenith) / (Math.cos(latRad) * Math.sin(toRad(zenith)));

  azimuth = toDeg(Math.atan2(sinAzimuth, cosAzimuth));
  if (azimuth < 0) azimuth += 360;

  return { altitude, azimuth };
}

// Get sunrise, sunset, and other sun times for a given date
export function getSunTimes(
  date: Date,
  lat: number = TORONTO_LAT,
  lon: number = TORONTO_LON
): SunTimes {
  // Use noon of the given day for calculations
  const noon = new Date(date);
  noon.setHours(12, 0, 0, 0);

  const jd = getJulianDay(noon);
  const t = getJulianCentury(jd);

  const declination = getSunDeclination(t);
  const eqTime = getEquationOfTime(t);

  // Solar noon
  const solarNoonMinutes = 720 - 4 * lon - eqTime;
  const solarNoon = new Date(noon);
  solarNoon.setHours(0, 0, 0, 0);
  solarNoon.setMinutes(solarNoonMinutes + date.getTimezoneOffset());

  // Sunrise and sunset (sun center at -0.833 degrees for atmospheric refraction)
  const hourAngle = getHourAngleSunrise(lat, declination, -0.833);

  const sunriseMinutes = solarNoonMinutes - hourAngle * 4;
  const sunsetMinutes = solarNoonMinutes + hourAngle * 4;

  const sunrise = new Date(noon);
  sunrise.setHours(0, 0, 0, 0);
  sunrise.setMinutes(sunriseMinutes + date.getTimezoneOffset());

  const sunset = new Date(noon);
  sunset.setHours(0, 0, 0, 0);
  sunset.setMinutes(sunsetMinutes + date.getTimezoneOffset());

  // Civil twilight (sun at -6 degrees)
  const civilHourAngle = getHourAngleSunrise(lat, declination, -6);

  const dawnMinutes = solarNoonMinutes - civilHourAngle * 4;
  const duskMinutes = solarNoonMinutes + civilHourAngle * 4;

  const dawn = new Date(noon);
  dawn.setHours(0, 0, 0, 0);
  dawn.setMinutes(dawnMinutes + date.getTimezoneOffset());

  const dusk = new Date(noon);
  dusk.setHours(0, 0, 0, 0);
  dusk.setMinutes(duskMinutes + date.getTimezoneOffset());

  return { sunrise, sunset, solarNoon, dawn, dusk };
}

// Map solar position to screen coordinates for rendering
export function solarToScreen(
  sunPosition: SolarPosition,
  sunTimes: SunTimes
): ScreenPosition {
  const { altitude, azimuth } = sunPosition;

  // Get sunrise and sunset azimuths for proper X mapping
  const sunrisePos = getSolarPosition(sunTimes.sunrise);
  const sunsetPos = getSolarPosition(sunTimes.sunset);

  // Normalize azimuth to screen X
  // East (sunrise) = right side (high X), West (sunset) = left side (low X)
  const azimuthRange = sunsetPos.azimuth - sunrisePos.azimuth;
  let normalizedAzimuth: number;

  if (azimuthRange > 0) {
    normalizedAzimuth = (azimuth - sunrisePos.azimuth) / azimuthRange;
  } else {
    // Handle wrap-around case (azimuth crossing 0/360)
    const adjustedSunset = sunsetPos.azimuth + 360;
    const adjustedAzimuth = azimuth < sunrisePos.azimuth ? azimuth + 360 : azimuth;
    normalizedAzimuth = (adjustedAzimuth - sunrisePos.azimuth) / (adjustedSunset - sunrisePos.azimuth);
  }

  // Invert: east=right (100%), west=left (0%)
  // Also add padding so sun doesn't go to extreme edges
  const padding = 10;
  const x = padding + (1 - normalizedAzimuth) * (100 - 2 * padding);

  // Map altitude to Y position
  // altitude <= 0 (at/below horizon) -> y = 85% (near bottom)
  // altitude = max (~70° for Toronto summer) -> y = 10% (near top)
  const horizonY = 85;
  const peakY = 15;
  const maxAltitude = 70; // Toronto max solar elevation

  if (altitude <= 0) {
    return { x: Math.max(0, Math.min(100, x)), y: 100 }; // Below horizon
  }

  // Use sine curve for natural arc appearance
  const altitudeRatio = Math.min(altitude / maxAltitude, 1);
  const y = horizonY - (horizonY - peakY) * Math.sin(altitudeRatio * (Math.PI / 2));

  return {
    x: Math.max(0, Math.min(100, x)),
    y: Math.max(peakY, Math.min(horizonY, y)),
  };
}

// Get Toronto time from any Date
export function getTorontoTime(date: Date = new Date()): Date {
  const torontoString = date.toLocaleString("en-US", { timeZone: TORONTO_TZ });
  return new Date(torontoString);
}

// Format time for display (Toronto timezone)
export function formatTorontoTime(date: Date = new Date()): string {
  return date.toLocaleTimeString("en-US", {
    timeZone: TORONTO_TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

// Format date for display (Toronto timezone)
export function formatTorontoDate(date: Date = new Date()): string {
  return date.toLocaleDateString("en-US", {
    timeZone: TORONTO_TZ,
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

// Determine time of day category based on sun altitude
export type TimeOfDay = "night" | "astronomical" | "nautical" | "civil" | "day";

export function getTimeOfDay(altitude: number): TimeOfDay {
  if (altitude > 0) return "day";
  if (altitude > -6) return "civil"; // Civil twilight
  if (altitude > -12) return "nautical"; // Nautical twilight
  if (altitude > -18) return "astronomical"; // Astronomical twilight
  return "night";
}
