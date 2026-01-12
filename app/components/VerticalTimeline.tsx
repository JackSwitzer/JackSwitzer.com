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

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Academic year runs Sep-Aug
const ACADEMIC_YEARS = [
  { label: "2026-27", startYear: 2026, startMonth: 8, note: "4th Year" },
  { label: "2025-26", startYear: 2025, startMonth: 8, note: "IBM Gap Year" },
  { label: "2024-25", startYear: 2024, startMonth: 8, note: "3rd Year" },
  { label: "2023-24", startYear: 2023, startMonth: 8, note: "2nd Year - Applied Math" },
  { label: "2022-23", startYear: 2022, startMonth: 8, note: "1st Year" },
];

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
    "QUANTT - Options Pricing Model": "Options",
    "Queen's University": "Queen's",
    "Teaching Assistant: Linear Algebra I": "TA",
    "Member → President, Future Blue Intern Council": "Future Blue",
    "Consultant → Project Manager": "QSC",
    "Campus Ambassador": "RBC Amb",
    "Analyst → Project Manager": "QUANTT",
    "Sol - Sunrise Alarm Clock": "Sol",
    "NYT Games Solver": "NYT",
    "RBC Data Scientist": "RBC DS",
    "RBC Data Analyst": "RBC DA",
  };
  return abbreviations[title] || title;
}

function getMonthPosition(month: number, academicStartMonth: number): number {
  // Convert calendar month to academic year position (0-11)
  // Academic year starts in September (month 8)
  const adjusted = month - academicStartMonth;
  return adjusted < 0 ? adjusted + 12 : adjusted;
}

function itemOverlapsYear(item: TimelineItem, yearStart: Date, yearEnd: Date): boolean {
  const itemEnd = item.endDate || new Date();
  return item.startDate < yearEnd && itemEnd > yearStart;
}

function getItemPositionInYear(
  item: TimelineItem,
  yearStart: Date,
  yearEnd: Date
): { startPct: number; endPct: number } {
  const itemEnd = item.endDate || new Date();

  // Clamp to year boundaries
  const effectiveStart = item.startDate < yearStart ? yearStart : item.startDate;
  const effectiveEnd = itemEnd > yearEnd ? yearEnd : itemEnd;

  const yearMs = yearEnd.getTime() - yearStart.getTime();
  const startPct = ((effectiveStart.getTime() - yearStart.getTime()) / yearMs) * 100;
  const endPct = ((effectiveEnd.getTime() - yearStart.getTime()) / yearMs) * 100;

  return { startPct: Math.max(0, startPct), endPct: Math.min(100, endPct) };
}

// Assign items to rows within a year to avoid overlap
function assignRows(
  items: TimelineItem[],
  yearStart: Date,
  yearEnd: Date
): Map<string, number> {
  const rows = new Map<string, number>();
  const rowEnds: number[] = [];

  const yearItems = items
    .filter(item => itemOverlapsYear(item, yearStart, yearEnd))
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  for (const item of yearItems) {
    const { startPct } = getItemPositionInYear(item, yearStart, yearEnd);
    const { endPct } = getItemPositionInYear(item, yearStart, yearEnd);

    let assignedRow = -1;
    for (let i = 0; i < rowEnds.length; i++) {
      if (rowEnds[i] <= startPct + 1) {
        assignedRow = i;
        rowEnds[i] = endPct + 2;
        break;
      }
    }

    if (assignedRow === -1) {
      assignedRow = rowEnds.length;
      rowEnds.push(endPct + 2);
    }

    rows.set(item.id, assignedRow);
  }

  return rows;
}

export function VerticalTimeline({ items }: VerticalTimelineProps) {
  return (
    <div className="space-y-0">
      {ACADEMIC_YEARS.map((academicYear, yearIndex) => {
        const yearStart = new Date(academicYear.startYear, academicYear.startMonth, 1);
        const yearEnd = new Date(academicYear.startYear + 1, academicYear.startMonth, 1);

        const yearItems = items.filter(item => itemOverlapsYear(item, yearStart, yearEnd));
        const rows = assignRows(items, yearStart, yearEnd);
        const numRows = yearItems.length > 0 ? Math.max(...yearItems.map(i => rows.get(i.id) || 0)) + 1 : 1;
        const rowHeight = 52;
        const timelineHeight = Math.max(numRows * rowHeight + 20, 80);

        // Generate month markers
        const monthMarkers = [];
        for (let i = 0; i < 12; i++) {
          const monthIndex = (academicYear.startMonth + i) % 12;
          monthMarkers.push({
            label: MONTHS[monthIndex],
            position: (i / 12) * 100,
            isSummer: monthIndex >= 4 && monthIndex <= 7, // May-Aug
          });
        }

        return (
          <div key={academicYear.label} className="relative">
            {/* Year header with pipe connector */}
            <div className="flex items-stretch">
              {/* Year label column */}
              <div className="w-24 shrink-0 flex flex-col items-center">
                {yearIndex > 0 && (
                  <div className="w-0.5 h-4 bg-[var(--border)]" />
                )}
                <div className="bg-[var(--ink)] text-[var(--paper)] px-3 py-2 text-center">
                  <div className="text-sm font-mono font-bold">{academicYear.label}</div>
                  <div className="text-[10px] opacity-80">{academicYear.note}</div>
                </div>
                {yearIndex < ACADEMIC_YEARS.length - 1 && (
                  <div className="w-0.5 flex-1 bg-[var(--border)] min-h-[20px]" />
                )}
              </div>

              {/* Timeline area */}
              <div className="flex-1 border border-[var(--border)] bg-[var(--paper)]">
                {/* Month markers */}
                <div className="relative h-6 border-b border-[var(--border)] flex">
                  {monthMarkers.map((m, i) => (
                    <div
                      key={i}
                      className={`flex-1 text-center text-[10px] font-mono leading-6 border-r border-[var(--border)] last:border-r-0 ${
                        m.isSummer ? "bg-amber-50 text-amber-700" : "text-[var(--muted)]"
                      }`}
                    >
                      {m.label}
                    </div>
                  ))}
                </div>

                {/* Items area */}
                <div className="relative" style={{ height: timelineHeight }}>
                  {/* Month grid lines */}
                  <div className="absolute inset-0 flex pointer-events-none">
                    {monthMarkers.map((m, i) => (
                      <div
                        key={i}
                        className={`flex-1 border-r border-[var(--border)] last:border-r-0 ${
                          m.isSummer ? "bg-amber-50/30" : ""
                        }`}
                      />
                    ))}
                  </div>

                  {/* Timeline items */}
                  {yearItems.map(item => {
                    const { startPct, endPct } = getItemPositionInYear(item, yearStart, yearEnd);
                    const row = rows.get(item.id) || 0;
                    const style = typeStyles[item.type];
                    const hasLink = item.hasDetailPage && item.slug;
                    const width = Math.max(endPct - startPct, 5);

                    const content = (
                      <div
                        className={`absolute flex items-center gap-1.5 px-2 py-1 text-xs border bg-[var(--paper)] overflow-hidden ${
                          hasLink ? "hover:border-[var(--accent)] cursor-pointer" : ""
                        }`}
                        style={{
                          left: `${startPct}%`,
                          width: `${width}%`,
                          top: row * rowHeight + 8,
                          height: rowHeight - 12,
                          borderLeftWidth: "3px",
                          borderLeftColor: style.color,
                          minWidth: "60px",
                        }}
                      >
                        <span
                          className="shrink-0 w-2 h-2 rounded-full"
                          style={{ backgroundColor: style.color }}
                        />
                        <span className="font-medium truncate">
                          {getAbbreviatedTitle(item.title)}
                        </span>
                        {item.subtitle && width > 15 && (
                          <span className="text-[var(--muted)] truncate hidden sm:inline">
                            · {item.subtitle}
                          </span>
                        )}
                      </div>
                    );

                    if (hasLink) {
                      return (
                        <Link key={`${academicYear.label}-${item.id}`} href={`/projects/${item.slug}`}>
                          {content}
                        </Link>
                      );
                    }

                    if (item.externalLink) {
                      return (
                        <a
                          key={`${academicYear.label}-${item.id}`}
                          href={item.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {content}
                        </a>
                      );
                    }

                    return <div key={`${academicYear.label}-${item.id}`}>{content}</div>;
                  })}

                  {/* Empty state */}
                  {yearItems.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-sm text-[var(--muted)]">
                      Coming soon...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="pt-6 flex flex-wrap gap-4 text-xs">
        {Object.entries(typeStyles).map(([type, { color, label }]) => (
          <div key={type} className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
            <span className="text-[var(--muted)]">{label}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5 ml-4 pl-4 border-l border-[var(--border)]">
          <span className="w-3 h-3 bg-amber-100 border border-amber-300" />
          <span className="text-[var(--muted)]">Summer</span>
        </div>
      </div>
    </div>
  );
}
