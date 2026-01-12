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

// Calendar years (Jan-Dec), most recent first
const CALENDAR_YEARS = [2027, 2026, 2025, 2024, 2023, 2022];

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
    "Teaching Assistant: Linear Algebra I": "TA Lin Alg",
    "Consultant → Project Manager": "QSC",
    "Campus Ambassador": "RBC Amb",
    "Analyst → Project Manager": "QUANTT PM",
    "Sol - Sunrise Alarm Clock": "Sol",
    "NYT Games Solver": "NYT Games",
    "RBC Data Scientist": "RBC DS",
    "RBC Data Analyst": "RBC DA",
    // Education items
    "Queen's - Engineering": "Queen's",
    "Queen's - Applied Math & Comp Eng": "Queen's",
    "Future Blue President": "FUBU President",
    "Future Blue Member": "Future Blue",
    "Anthropic Fellow": "Anthropic",
  };
  return abbreviations[title] || title;
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
    const { startPct, endPct } = getItemPositionInYear(item, yearStart, yearEnd);

    let assignedRow = -1;
    for (let i = 0; i < rowEnds.length; i++) {
      if (rowEnds[i] <= startPct + 0.5) {
        assignedRow = i;
        rowEnds[i] = endPct + 1;
        break;
      }
    }

    if (assignedRow === -1) {
      assignedRow = rowEnds.length;
      rowEnds.push(endPct + 1);
    }

    rows.set(item.id, assignedRow);
  }

  return rows;
}

interface ProcessedItem extends TimelineItem {
  isHopeful?: boolean;
}

export function VerticalTimeline({ items }: VerticalTimelineProps) {
  // Process items to add special ones and split education
  const processedItems: ProcessedItem[] = [];

  for (const item of items) {
    // Skip the full Queen's span - we'll add year-specific ones
    if (item.id === "edu-queens") continue;
    processedItems.push(item);
  }

  // Add Queen's education by academic year (only during school: Sep-Apr)
  const queensYears = [
    { id: "queens-1", title: "Queen's - Engineering", start: new Date(2022, 8, 1), end: new Date(2023, 3, 30), note: "1st Year" },
    { id: "queens-2", title: "Queen's - Applied Math & Comp Eng", start: new Date(2023, 8, 1), end: new Date(2024, 3, 30), note: "2nd Year" },
    { id: "queens-3", title: "Queen's - Applied Math & Comp Eng", start: new Date(2024, 8, 1), end: new Date(2025, 3, 30), note: "3rd Year" },
    // Gap year 2025-26 for IBM
    { id: "queens-4", title: "Queen's - Applied Math & Comp Eng", start: new Date(2026, 8, 1), end: new Date(2027, 3, 30), note: "4th Year" },
  ];

  for (const q of queensYears) {
    processedItems.push({
      id: q.id,
      title: q.title,
      subtitle: q.note,
      type: "education",
      startDate: q.start,
      endDate: q.end,
      hasDetailPage: false,
    });
  }

  // Add Anthropic Fellow (hopeful) for Summer 2026
  processedItems.push({
    id: "anthropic-fellow",
    title: "Anthropic Fellow",
    subtitle: "Summer 2026 🤞",
    type: "work",
    startDate: new Date(2026, 4, 1), // May 2026
    endDate: new Date(2026, 7, 31), // Aug 2026
    hasDetailPage: false,
    isHopeful: true,
  } as ProcessedItem);

  return (
    <div className="space-y-0">
      {CALENDAR_YEARS.map((year, yearIndex) => {
        const yearStart = new Date(year, 0, 1);
        const yearEnd = new Date(year + 1, 0, 1);

        const yearItems = processedItems.filter(item => itemOverlapsYear(item, yearStart, yearEnd));
        const rows = assignRows(processedItems, yearStart, yearEnd);
        const numRows = yearItems.length > 0 ? Math.max(...yearItems.map(i => rows.get(i.id) || 0)) + 1 : 1;
        const rowHeight = 44;
        const timelineHeight = Math.max(numRows * rowHeight + 16, 70);

        return (
          <div key={year} className="relative">
            {/* Year row */}
            <div className="flex items-stretch">
              {/* Year label column */}
              <div className="w-16 shrink-0 flex flex-col items-center">
                {yearIndex > 0 && (
                  <div className="w-0.5 h-3 bg-[var(--border)]" />
                )}
                <div className="bg-[var(--ink)] text-[var(--paper)] px-2 py-1.5 text-center">
                  <div className="text-base font-mono font-bold">{year}</div>
                </div>
                {yearIndex < CALENDAR_YEARS.length - 1 && (
                  <div className="w-0.5 flex-1 bg-[var(--border)] min-h-[16px]" />
                )}
              </div>

              {/* Timeline area */}
              <div className="flex-1 border border-[var(--border)] border-l-0 bg-[var(--paper)]">
                {/* Month markers */}
                <div className="relative h-5 border-b border-[var(--border)] flex">
                  {MONTHS.map((month, i) => {
                    const isSummer = i >= 4 && i <= 7; // May-Aug
                    return (
                      <div
                        key={i}
                        className={`flex-1 text-center text-[9px] font-mono leading-5 border-r border-[var(--border)] last:border-r-0 ${
                          isSummer ? "bg-amber-50 text-amber-700" : "text-[var(--muted)]"
                        }`}
                      >
                        {month}
                      </div>
                    );
                  })}
                </div>

                {/* Items area */}
                <div className="relative" style={{ height: timelineHeight }}>
                  {/* Month grid lines */}
                  <div className="absolute inset-0 flex pointer-events-none">
                    {MONTHS.map((_, i) => {
                      const isSummer = i >= 4 && i <= 7;
                      return (
                        <div
                          key={i}
                          className={`flex-1 border-r border-[var(--border)] last:border-r-0 opacity-50 ${
                            isSummer ? "bg-amber-50/50" : ""
                          }`}
                        />
                      );
                    })}
                  </div>

                  {/* Timeline items */}
                  {yearItems.map(item => {
                    const { startPct, endPct } = getItemPositionInYear(item, yearStart, yearEnd);
                    const row = rows.get(item.id) || 0;
                    const style = typeStyles[item.type];
                    const hasLink = item.hasDetailPage && item.slug;
                    const width = Math.max(endPct - startPct, 3);
                    const isHopeful = (item as ProcessedItem).isHopeful;

                    const content = (
                      <div
                        className={`absolute flex items-center gap-1 px-1.5 py-0.5 text-[11px] border bg-[var(--paper)] overflow-hidden whitespace-nowrap ${
                          hasLink ? "hover:border-[var(--accent)] cursor-pointer" : ""
                        } ${isHopeful ? "border-dashed opacity-70" : ""}`}
                        style={{
                          left: `${startPct}%`,
                          width: `${width}%`,
                          top: row * rowHeight + 6,
                          height: rowHeight - 10,
                          borderLeftWidth: "3px",
                          borderLeftColor: style.color,
                          borderLeftStyle: isHopeful ? "dashed" : "solid",
                          minWidth: "50px",
                        }}
                      >
                        <span
                          className="shrink-0 w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: style.color }}
                        />
                        <span className="font-medium truncate">
                          {getAbbreviatedTitle(item.title)}
                        </span>
                        {item.subtitle && width > 12 && (
                          <span className="text-[var(--muted)] truncate text-[10px]">
                            {item.subtitle}
                          </span>
                        )}
                      </div>
                    );

                    if (hasLink) {
                      return (
                        <Link key={`${year}-${item.id}`} href={`/projects/${item.slug}`}>
                          {content}
                        </Link>
                      );
                    }

                    if (item.externalLink) {
                      return (
                        <a
                          key={`${year}-${item.id}`}
                          href={item.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {content}
                        </a>
                      );
                    }

                    return <div key={`${year}-${item.id}`}>{content}</div>;
                  })}

                  {/* Empty state */}
                  {yearItems.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-[var(--muted)]">
                      —
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="pt-4 flex flex-wrap gap-3 text-[10px]">
        {Object.entries(typeStyles).map(([type, { color, label }]) => (
          <div key={type} className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
            <span className="text-[var(--muted)]">{label}</span>
          </div>
        ))}
        <div className="flex items-center gap-1 ml-2 pl-2 border-l border-[var(--border)]">
          <span className="w-2.5 h-2.5 bg-amber-100 border border-amber-300" />
          <span className="text-[var(--muted)]">Summer</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-4 h-2.5 border border-dashed border-[var(--muted)] opacity-70" />
          <span className="text-[var(--muted)]">Hopeful 🤞</span>
        </div>
      </div>
    </div>
  );
}
