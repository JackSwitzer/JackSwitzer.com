"use client";

import { useState, useEffect } from "react";

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function formatDay(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

// Color temperature to RGB (approximation)
function kelvinToRgb(kelvin: number): { r: number; g: number; b: number } {
  const temp = kelvin / 100;
  let r, g, b;

  if (temp <= 66) {
    r = 255;
    g = Math.min(255, Math.max(0, 99.4708025861 * Math.log(temp) - 161.1195681661));
  } else {
    r = Math.min(255, Math.max(0, 329.698727446 * Math.pow(temp - 60, -0.1332047592)));
    g = Math.min(255, Math.max(0, 288.1221695283 * Math.pow(temp - 60, -0.0755148492)));
  }

  if (temp >= 66) {
    b = 255;
  } else if (temp <= 19) {
    b = 0;
  } else {
    b = Math.min(255, Math.max(0, 138.5177312231 * Math.log(temp - 10) - 305.0447927307));
  }

  return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
}

export function SolDemo() {
  const [phase, setPhase] = useState(0);
  const [brightness, setBrightness] = useState(0);
  const [temperature, setTemperature] = useState(2500);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [logs, setLogs] = useState<string[]>([]);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Animation effect
  useEffect(() => {
    if (!isRunning) return;

    const duration = 8000; // 8 seconds for demo (compressed from 30 min)
    const startTime = Date.now();
    const phases = [
      { name: "Dawn", startBrightness: 1, endBrightness: 30, startTemp: 2500, endTemp: 2700 },
      { name: "Golden Hour", startBrightness: 30, endBrightness: 70, startTemp: 2700, endTemp: 3200 },
      { name: "Morning", startBrightness: 70, endBrightness: 100, startTemp: 3200, endTemp: 4000 },
    ];

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Determine current phase
      const phaseIndex = Math.min(Math.floor(progress * 3), 2);
      const phaseProgress = (progress * 3) % 1;
      const currentPhase = phases[phaseIndex];

      const newBrightness = Math.round(
        currentPhase.startBrightness +
          (currentPhase.endBrightness - currentPhase.startBrightness) * phaseProgress
      );
      const newTemp = Math.round(
        currentPhase.startTemp +
          (currentPhase.endTemp - currentPhase.startTemp) * phaseProgress
      );

      setBrightness(newBrightness);
      setTemperature(newTemp);
      setPhase(phaseIndex);

      // Add log entries
      if (progress < 0.02) {
        setLogs(["Starting sunrise simulation...", `Target: ${formatTime(currentTime)}`]);
      } else if (progress > 0.1 && progress < 0.12) {
        setLogs((prev) => [...prev.slice(-3), `Phase 1: Dawn (${newTemp}K, ${newBrightness}%)`]);
      } else if (progress > 0.4 && progress < 0.42) {
        setLogs((prev) => [...prev.slice(-3), `Phase 2: Golden Hour (${newTemp}K, ${newBrightness}%)`]);
      } else if (progress > 0.7 && progress < 0.72) {
        setLogs((prev) => [...prev.slice(-3), `Phase 3: Morning (${newTemp}K, ${newBrightness}%)`]);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setLogs((prev) => [...prev.slice(-3), "Sunrise complete!"]);
        setTimeout(() => {
          setIsRunning(false);
          setBrightness(0);
          setTemperature(2500);
          setPhase(0);
          setLogs([]);
        }, 2000);
      }
    };

    requestAnimationFrame(animate);
  }, [isRunning, currentTime]);

  const rgb = kelvinToRgb(temperature);
  const glowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${brightness / 100})`;

  return (
    <div className="border border-[var(--border)] rounded-lg overflow-hidden">
      {/* Terminal header */}
      <div className="bg-[#1a1a2e] px-4 py-2 flex items-center gap-2 border-b border-[#2d2d44]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
        </div>
        <span className="text-xs text-[#888] font-mono ml-2">sol</span>
      </div>

      {/* Terminal content */}
      <div
        className="bg-[#0d0d1a] p-4 font-mono text-sm min-h-[200px] relative transition-all duration-500"
        style={{
          boxShadow: isRunning ? `inset 0 0 60px ${glowColor}` : "none",
        }}
      >
        {/* Status line */}
        <div className="text-[#666] mb-4">
          <span className="text-[#27ca40]">$</span> sol demo
        </div>

        {/* Live clock */}
        <div className="mb-4">
          <div className="text-[#888] text-xs uppercase tracking-wider mb-1">Current Time</div>
          <div className="text-2xl text-white font-bold">
            {formatTime(currentTime)}
          </div>
          <div className="text-[#666]">{formatDay(currentTime)}</div>
        </div>

        {/* Status display when running */}
        {isRunning && (
          <div className="mb-4 p-3 bg-[#1a1a2e] rounded border border-[#2d2d44]">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-[#888] text-xs uppercase">Phase</div>
                <div className="text-white">
                  {phase === 0 ? "Dawn" : phase === 1 ? "Golden" : "Morning"}
                </div>
              </div>
              <div>
                <div className="text-[#888] text-xs uppercase">Brightness</div>
                <div className="text-white">{brightness}%</div>
              </div>
              <div>
                <div className="text-[#888] text-xs uppercase">Temp</div>
                <div className="text-white">{temperature}K</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-3 h-2 bg-[#2d2d44] rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-100"
                style={{
                  width: `${brightness}%`,
                  background: `linear-gradient(90deg, #ff6b35, #f7c948, #fff)`,
                }}
              />
            </div>
          </div>
        )}

        {/* Logs */}
        <div className="text-xs text-[#666] space-y-1">
          {logs.map((log, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[#27ca40]">→</span>
              <span>{log}</span>
            </div>
          ))}
        </div>

        {/* Start button */}
        {!isRunning && (
          <button
            onClick={() => {
              setIsRunning(true);
              setLogs([]);
            }}
            className="mt-4 px-4 py-2 bg-[#27ca40] text-black text-xs font-bold uppercase tracking-wider rounded hover:bg-[#2edf4a] transition-colors"
          >
            Run Demo
          </button>
        )}

        {/* Simulated bulb glow */}
        {isRunning && (
          <div
            className="absolute top-4 right-4 w-8 h-8 rounded-full transition-all duration-300"
            style={{
              background: `radial-gradient(circle, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${brightness / 100}) 0%, transparent 70%)`,
              boxShadow: `0 0 20px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${brightness / 100})`,
            }}
          />
        )}
      </div>
    </div>
  );
}
