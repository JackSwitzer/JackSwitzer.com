"use client";

import { useState, useEffect, useCallback } from "react";
import { TORONTO_TZ } from "../utils/solarCalculations";

export interface TorontoTimeState {
  date: Date;
  formatted: {
    time: string;
    date: string;
    full: string;
  };
}

// Parse time string (HH:MM or HH:MM:SS) to set on a date
function parseTimeString(timeStr: string, baseDate: Date): Date {
  const parts = timeStr.split(":").map(Number);
  const result = new Date(baseDate);
  result.setHours(parts[0] || 0, parts[1] || 0, parts[2] || 0, 0);
  return result;
}

// Parse date string (YYYY-MM-DD) to Date
function parseDateString(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

interface UseTorontoTimeOptions {
  // Override time for testing (HH:MM or HH:MM:SS)
  testTime?: string | null;
  // Override date for testing (YYYY-MM-DD)
  testDate?: string | null;
  // Enable scrub mode (cycle through 24 hours)
  scrubMode?: boolean;
  // Scrub speed in minutes per second (default 60 = 1 hour per minute)
  scrubSpeed?: number;
  // Update interval in ms (default 1000)
  updateInterval?: number;
}

export function useTorontoTime(options: UseTorontoTimeOptions = {}): TorontoTimeState {
  const {
    testTime,
    testDate,
    scrubMode = false,
    scrubSpeed = 60,
    updateInterval = 1000,
  } = options;

  const [scrubOffset, setScrubOffset] = useState(0);

  const getTorontoDate = useCallback((): Date => {
    const now = new Date();

    // Get Toronto time components directly using Intl
    const torontoFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: TORONTO_TZ,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    });

    const parts = torontoFormatter.formatToParts(now);
    const getPart = (type: string) => parseInt(parts.find(p => p.type === type)?.value || "0");

    // Build a date with Toronto's time components
    // We create it with these values so getHours()/getMinutes() return Toronto time
    let baseDate = new Date(
      testDate ? parseInt(testDate.split("-")[0]) : getPart("year"),
      testDate ? parseInt(testDate.split("-")[1]) - 1 : getPart("month") - 1,
      testDate ? parseInt(testDate.split("-")[2]) : getPart("day"),
      getPart("hour"),
      getPart("minute"),
      getPart("second")
    );

    if (testTime) {
      baseDate = parseTimeString(testTime, baseDate);
    }

    if (scrubMode) {
      // Add scrub offset (in minutes)
      const totalMinutes = baseDate.getHours() * 60 + baseDate.getMinutes() + scrubOffset;
      const wrappedMinutes = ((totalMinutes % 1440) + 1440) % 1440; // Wrap around 24 hours
      baseDate.setHours(Math.floor(wrappedMinutes / 60), wrappedMinutes % 60);
    }

    return baseDate;
  }, [testTime, testDate, scrubMode, scrubOffset]);

  const formatTime = useCallback((date: Date): string => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }, []);

  const formatDate = useCallback((date: Date): string => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }, []);

  const [state, setState] = useState<TorontoTimeState>(() => {
    const date = getTorontoDate();
    return {
      date,
      formatted: {
        time: formatTime(date),
        date: formatDate(date),
        full: `${formatDate(date)} • ${formatTime(date)}`,
      },
    };
  });

  // Update time periodically
  useEffect(() => {
    const update = () => {
      const date = getTorontoDate();
      setState({
        date,
        formatted: {
          time: formatTime(date),
          date: formatDate(date),
          full: `${formatDate(date)} • ${formatTime(date)}`,
        },
      });
    };

    // Initial update
    update();

    // Set up interval
    const interval = setInterval(update, updateInterval);

    return () => clearInterval(interval);
  }, [getTorontoDate, formatTime, formatDate, updateInterval]);

  // Handle scrub mode
  useEffect(() => {
    if (!scrubMode) {
      setScrubOffset(0);
      return;
    }

    // Increment scrub offset based on speed
    const interval = setInterval(() => {
      setScrubOffset((prev) => {
        const next = prev + scrubSpeed / (1000 / updateInterval);
        // Wrap around after 24 hours (1440 minutes)
        return next % 1440;
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [scrubMode, scrubSpeed, updateInterval]);

  return state;
}
