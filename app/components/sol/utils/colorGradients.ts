// Sky color gradients based on sun altitude
// Interpolates between predefined color stops for realistic sky rendering

import { TimeOfDay } from "./solarCalculations";

export interface SkyColors {
  top: string; // Zenith color
  bottom: string; // Horizon color
  ground: string; // Ground/horizon line color
  border: string; // Terminal border color
  sun: string; // Sun color
  showStars: boolean;
  starOpacity: number;
}

// Color presets for different times of day
const SKY_PRESETS: Record<TimeOfDay, SkyColors> = {
  night: {
    top: "#0a0a1a",
    bottom: "#1a1a2e",
    ground: "#0d0d15",
    border: "#2a2a4a",
    sun: "#ff6b35", // Not visible but used for transitions
    showStars: true,
    starOpacity: 1,
  },
  astronomical: {
    top: "#0f0f2a",
    bottom: "#1f1f3f",
    ground: "#101018",
    border: "#3a3a5a",
    sun: "#ff4500",
    showStars: true,
    starOpacity: 0.8,
  },
  nautical: {
    top: "#1a1a3a",
    bottom: "#3a2a4a",
    ground: "#151520",
    border: "#5a4a6a",
    sun: "#ff6b35",
    showStars: true,
    starOpacity: 0.3, // Stars fading
  },
  civil: {
    top: "#2a3a5a",
    bottom: "#ff6b35",
    ground: "#1a1a25",
    border: "#ff8c42",
    sun: "#ff8c42",
    showStars: false,
    starOpacity: 0, // Stars gone by civil twilight (pre-dawn)
  },
  day: {
    top: "#4a90d9",
    bottom: "#87ceeb",
    ground: "#2a4a2a",
    border: "#ffd700",
    sun: "#ffd700",
    showStars: false,
    starOpacity: 0,
  },
};

// Parse hex color to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

// Convert RGB to hex
function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b]
    .map((x) => Math.round(Math.max(0, Math.min(255, x))).toString(16).padStart(2, "0"))
    .join("")}`;
}

// Interpolate between two colors
function interpolateColor(color1: string, color2: string, t: number): string {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const r = rgb1.r + (rgb2.r - rgb1.r) * t;
  const g = rgb1.g + (rgb2.g - rgb1.g) * t;
  const b = rgb1.b + (rgb2.b - rgb1.b) * t;

  return rgbToHex(r, g, b);
}

// Interpolate between two sky color sets
function interpolateSkyColors(
  colors1: SkyColors,
  colors2: SkyColors,
  t: number
): SkyColors {
  return {
    top: interpolateColor(colors1.top, colors2.top, t),
    bottom: interpolateColor(colors1.bottom, colors2.bottom, t),
    ground: interpolateColor(colors1.ground, colors2.ground, t),
    border: interpolateColor(colors1.border, colors2.border, t),
    sun: interpolateColor(colors1.sun, colors2.sun, t),
    showStars: t < 0.5 ? colors1.showStars : colors2.showStars,
    starOpacity: colors1.starOpacity + (colors2.starOpacity - colors1.starOpacity) * t,
  };
}

// Get sky colors based on sun altitude with smooth interpolation
export function getSkyColors(altitude: number): SkyColors {
  // Define altitude thresholds for transitions
  // Night: < -18
  // Astronomical twilight: -18 to -12
  // Nautical twilight: -12 to -6
  // Civil twilight: -6 to 0
  // Day: > 0

  if (altitude <= -18) {
    return SKY_PRESETS.night;
  }

  if (altitude <= -12) {
    // Transition from night to astronomical
    const t = (altitude + 18) / 6; // 0 at -18, 1 at -12
    return interpolateSkyColors(SKY_PRESETS.night, SKY_PRESETS.astronomical, t);
  }

  if (altitude <= -6) {
    // Transition from astronomical to nautical
    const t = (altitude + 12) / 6; // 0 at -12, 1 at -6
    return interpolateSkyColors(SKY_PRESETS.astronomical, SKY_PRESETS.nautical, t);
  }

  if (altitude <= 0) {
    // Transition from nautical to civil
    const t = (altitude + 6) / 6; // 0 at -6, 1 at 0
    return interpolateSkyColors(SKY_PRESETS.nautical, SKY_PRESETS.civil, t);
  }

  if (altitude <= 15) {
    // Transition from civil to day (golden hour)
    const t = altitude / 15; // 0 at 0, 1 at 15
    return interpolateSkyColors(SKY_PRESETS.civil, SKY_PRESETS.day, t);
  }

  // Full day
  return SKY_PRESETS.day;
}

// Get sun color based on altitude (redder near horizon)
export function getSunColor(altitude: number): string {
  if (altitude <= 0) {
    return "#ff4500"; // Deep orange/red at horizon
  }
  if (altitude <= 5) {
    const t = altitude / 5;
    return interpolateColor("#ff4500", "#ff8c42", t);
  }
  if (altitude <= 15) {
    const t = (altitude - 5) / 10;
    return interpolateColor("#ff8c42", "#ffd700", t);
  }
  if (altitude <= 30) {
    const t = (altitude - 15) / 15;
    return interpolateColor("#ffd700", "#ffff00", t);
  }
  return "#ffff00"; // Bright yellow when high
}

// Get border color based on sun altitude (matches Python Rich terminal colors)
export function getBorderColor(altitude: number): string {
  if (altitude <= -6) {
    return "#4a4a6a"; // Night/twilight - muted purple
  }
  if (altitude <= 0) {
    const t = (altitude + 6) / 6;
    return interpolateColor("#4a4a6a", "#ff4500", t); // red
  }
  if (altitude <= 10) {
    const t = altitude / 10;
    return interpolateColor("#ff4500", "#ff8c00", t); // red to orange
  }
  if (altitude <= 25) {
    const t = (altitude - 10) / 15;
    return interpolateColor("#ff8c00", "#ffd700", t); // orange to yellow
  }
  if (altitude <= 45) {
    const t = (altitude - 25) / 20;
    return interpolateColor("#ffd700", "#ffff00", t); // yellow to bright yellow
  }
  return "#ffff00"; // bright_yellow when sun is high
}

// CSS gradient string for sky background
export function getSkyGradientCSS(colors: SkyColors): string {
  return `linear-gradient(to bottom, ${colors.top} 0%, ${colors.bottom} 100%)`;
}

// Star opacity based on sun visibility
// Stars fade quickly as sun appears on screen
export function getStarOpacity(altitude: number): number {
  // Full stars when sun not visible
  if (altitude <= -15) return 1;
  // Fade out quickly as sun rises (-15 to -10)
  if (altitude <= -10) {
    return (altitude + 10) / -5; // 1 at -15, 0 at -10
  }
  // Gone quickly after sun appears
  return 0;
}

// Terminal-style ground colors based on time
export function getGroundColors(altitude: number): {
  horizon: string;
  ground: string;
} {
  if (altitude <= -12) {
    return { horizon: "#1a1a1a", ground: "#0d0d0d" };
  }
  if (altitude <= -6) {
    const t = (altitude + 12) / 6;
    return {
      horizon: interpolateColor("#1a1a1a", "#2a2a2a", t),
      ground: interpolateColor("#0d0d0d", "#151515", t),
    };
  }
  if (altitude <= 0) {
    const t = (altitude + 6) / 6;
    return {
      horizon: interpolateColor("#2a2a2a", "#3a3a3a", t),
      ground: interpolateColor("#151515", "#1f1f1f", t),
    };
  }
  if (altitude <= 15) {
    const t = altitude / 15;
    return {
      horizon: interpolateColor("#3a3a3a", "#4a5a4a", t),
      ground: interpolateColor("#1f1f1f", "#2a3a2a", t),
    };
  }
  return { horizon: "#4a5a4a", ground: "#2a3a2a" };
}
