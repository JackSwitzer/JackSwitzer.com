"use client";

import Link from "next/link";
import { type TimelineItem } from "@/lib/data";

const typeStyles = {
  work: { color: "var(--accent)", label: "Work" },
  education: { color: "var(--success)", label: "Edu" },
  leadership: { color: "#7c3aed", label: "Lead" },
  project: { color: "#f59e0b", label: "Proj" },
  hackathon: { color: "#ec4899", label: "Hack" },
};

interface VerticalTimelineProps {
  items: TimelineItem[];
}

function getAbbreviatedTitle(title: string): string {
  const abbreviations: Record<string, string> = {
    "IBM Software Developer - WatsonX Code Assistant for Z": "IBM WatsonX",
    "Quantization x Interpretability": "Quant x Interp",
    "Slay the Spire Watcher Solver": "StS Solver",
    "Linear Algebra Learning Platform": "Lin Alg Site",
    "Black Box Deconstruction - Control Systems": "Control Sys",
    "Gulf of Mexico Trash Collection Simulation": "Gulf Sim",
    "Chrono - Linguistic Pattern Forecasting": "Chrono",
    "McGill FAIM Hackathon - Portfolio Optimization": "FAIM",
    "QUANTT - Options Pricing Model": "Options Model",
    "Started University": "Queen's",
    "B.ASc. Graduation": "Graduation",
    "Teaching Assistant: Linear Algebra I": "TA Lin Alg",
    "Member → President, Future Blue Intern Council": "Future Blue",
    "Consultant → Project Manager": "QSC",
    "Campus Ambassador": "RBC Amb",
    "Analyst → Project Manager": "QUANTT PM",
    "Sol - Sunrise Alarm Clock": "Sol Lamp",
    "NYT Games Solver": "NYT Games",
    "RBC Data Scientist": "RBC DS",
    "RBC Data Analyst": "RBC DA",
  };
  return abbreviations[title] || title;
}

// Timeline constants
const TIMELINE_START = new Date(2022, 8, 1); // Sep 2022
const TIMELINE_END = new Date(2027, 5, 1); // Jun 2027
const TOTAL_MONTHS = (TIMELINE_END.getFullYear() - TIMELINE_START.getFullYear()) * 12 +
                     (TIMELINE_END.getMonth() - TIMELINE_START.getMonth());

function getMonthOffset(date: Date): number {
  const months = (date.getFullYear() - TIMELINE_START.getFullYear()) * 12 +
                 (date.getMonth() - TIMELINE_START.getMonth());
  return Math.max(0, Math.min(months, TOTAL_MONTHS));
}

function getHeightPercent(startDate: Date, endDate: Date | undefined): number {
  const start = getMonthOffset(startDate);
  const end = endDate ? getMonthOffset(endDate) : getMonthOffset(new Date());
  const duration = Math.max(end - start, 1);
  return (duration / TOTAL_MONTHS) * 100;
}

function getTopPercent(startDate: Date): number {
  return (getMonthOffset(startDate) / TOTAL_MONTHS) * 100;
}

// Generate year markers
function getYearMarkers(): { year: number; top: number }[] {
  const markers = [];
  for (let year = 2022; year <= 2027; year++) {
    const date = new Date(year, 0, 1);
    if (date >= TIMELINE_START && date <= TIMELINE_END) {
      markers.push({ year, top: getTopPercent(date) });
    }
  }
  return markers;
}

// Assign items to lanes to avoid overlap
function assignLanes(items: TimelineItem[]): Map<string, number> {
  const lanes = new Map<string, number>();
  const laneEnds: number[] = []; // Track when each lane becomes free (month offset)

  // Sort by start date
  const sorted = [...items].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  for (const item of sorted) {
    const startMonth = getMonthOffset(item.startDate);
    const endMonth = item.endDate ? getMonthOffset(item.endDate) : getMonthOffset(new Date());

    // Find first lane where this item fits
    let assignedLane = -1;
    for (let i = 0; i < laneEnds.length; i++) {
      if (laneEnds[i] <= startMonth) {
        assignedLane = i;
        laneEnds[i] = endMonth + 1; // Add gap
        break;
      }
    }

    // No existing lane works, create new one
    if (assignedLane === -1) {
      assignedLane = laneEnds.length;
      laneEnds.push(endMonth + 1);
    }

    lanes.set(item.id, assignedLane);
  }

  return lanes;
}

export function VerticalTimeline({ items }: VerticalTimelineProps) {
  const yearMarkers = getYearMarkers();
  const lanes = assignLanes(items);
  const numLanes = Math.max(...Array.from(lanes.values())) + 1;

  // Calculate lane width - leave room for year labels
  const laneWidth = Math.min(140, (100 - 10) / numLanes); // 10% for year labels

  return (
    <div className="relative" style={{ height: "1400px" }}>
      {/* Year markers on left */}
      <div className="absolute left-0 top-0 bottom-0 w-12 border-r border-[var(--border)]">
        {yearMarkers.map(({ year, top }) => (
          <div
            key={year}
            className="absolute left-0 right-0 flex items-center"
            style={{ top: `${top}%` }}
          >
            <span className="text-sm font-mono font-bold text-[var(--muted)] bg-[var(--paper)] pr-2">
              {year}
            </span>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>
        ))}
      </div>

      {/* Timeline area */}
      <div className="absolute left-14 right-0 top-0 bottom-0">
        {/* Horizontal grid lines for each year */}
        {yearMarkers.map(({ year, top }) => (
          <div
            key={`grid-${year}`}
            className="absolute left-0 right-0 h-px bg-[var(--border)] opacity-30"
            style={{ top: `${top}%` }}
          />
        ))}

        {/* Timeline items */}
        {items.map((item) => {
          const style = typeStyles[item.type];
          const top = getTopPercent(item.startDate);
          const height = getHeightPercent(item.startDate, item.endDate);
          const lane = lanes.get(item.id) || 0;
          const left = lane * laneWidth;
          const hasLink = item.hasDetailPage && item.slug;

          const content = (
            <div
              className={`absolute overflow-hidden border-l-3 bg-[var(--paper)] border border-[var(--border)] ${
                hasLink ? "hover:border-[var(--accent)] cursor-pointer" : ""
              }`}
              style={{
                top: `${top}%`,
                height: `${Math.max(height, 2)}%`,
                left: `${left}%`,
                width: `${laneWidth - 1}%`,
                borderLeftWidth: "3px",
                borderLeftColor: style.color,
                minHeight: "60px",
              }}
            >
              <div className="p-2 h-full flex flex-col">
                {/* Title */}
                <div className="flex items-start gap-1 mb-1">
                  <span
                    className="shrink-0 w-2 h-2 rounded-full mt-1"
                    style={{ backgroundColor: style.color }}
                  />
                  <span className="text-xs font-semibold leading-tight line-clamp-2">
                    {getAbbreviatedTitle(item.title)}
                  </span>
                </div>

                {/* Subtitle */}
                {item.subtitle && (
                  <p className="text-[10px] text-[var(--muted)] line-clamp-1 mb-1">
                    {item.subtitle}
                  </p>
                )}

                {/* Summary - only show if enough height */}
                {height > 8 && (item.summary || item.accomplishments?.[0]) && (
                  <p className="text-[10px] text-[var(--muted)] line-clamp-2 mt-auto">
                    {item.summary || item.accomplishments?.[0]}
                  </p>
                )}
              </div>
            </div>
          );

          if (hasLink) {
            return (
              <Link key={item.id} href={`/projects/${item.slug}`}>
                {content}
              </Link>
            );
          }

          if (item.externalLink) {
            return (
              <a
                key={item.id}
                href={item.externalLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </a>
            );
          }

          return <div key={item.id}>{content}</div>;
        })}
      </div>

      {/* Legend */}
      <div className="absolute bottom-0 left-0 right-0 pt-4 border-t border-[var(--border)] bg-[var(--paper)] flex flex-wrap gap-4 text-xs">
        {Object.entries(typeStyles).map(([type, { color, label }]) => (
          <div key={type} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
            <span className="text-[var(--muted)]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
