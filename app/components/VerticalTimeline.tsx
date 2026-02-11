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

// Type priority for layer ordering: education on top, then work, leadership, project, hackathon
const TYPE_PRIORITY: Record<string, number> = {
  education: 0,
  work: 1,
  leadership: 2,
  project: 3,
  hackathon: 4,
};

// Assign items to rows within a year to avoid overlap
// Items are sorted by type priority first, then by start date
function assignRows(
  items: TimelineItem[],
  yearStart: Date,
  yearEnd: Date
): Map<string, number> {
  const rows = new Map<string, number>();
  const rowEnds: number[] = [];

  const yearItems = items
    .filter(item => itemOverlapsYear(item, yearStart, yearEnd))
    .sort((a, b) => {
      // First sort by type priority
      const typeDiff = (TYPE_PRIORITY[a.type] ?? 5) - (TYPE_PRIORITY[b.type] ?? 5);
      if (typeDiff !== 0) return typeDiff;
      // Then by start date
      return a.startDate.getTime() - b.startDate.getTime();
    });

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

export function VerticalTimeline({ items }: VerticalTimelineProps) {
  // Items now come fully processed from lib/data.ts getTimelineItems()
  // No need for local transformations - data layer handles:
  // - Education breakdown by academic year
  // - QUANTT timing correction
  const processedItems = items;

  return (
    <div className="space-y-0">
      {CALENDAR_YEARS.map((year, yearIndex) => {
        const yearStart = new Date(year, 0, 1);
        const yearEnd = new Date(year + 1, 0, 1);

        const yearItems = processedItems.filter(item => itemOverlapsYear(item, yearStart, yearEnd));
        const rows = assignRows(processedItems, yearStart, yearEnd);
        const numRows = yearItems.length > 0 ? Math.max(...yearItems.map(i => rows.get(i.id) || 0)) + 1 : 1;
        const rowHeight = 36;
        const timelineHeight = Math.max(numRows * rowHeight + 12, 60);

        return (
          <div key={year} className="relative">
            {/* Year row */}
            <div className="flex items-stretch">
              {/* Year label column */}
              <div className="w-14 shrink-0 flex flex-col items-center">
                {yearIndex > 0 && (
                  <div className="w-0.5 h-2 bg-[var(--border)]" />
                )}
                <div className="bg-[var(--ink)] text-[var(--paper)] px-2 py-1 text-center">
                  <div className="text-sm font-mono font-bold">{year}</div>
                </div>
                {yearIndex < CALENDAR_YEARS.length - 1 && (
                  <div className="w-0.5 flex-1 bg-[var(--border)] min-h-[12px]" />
                )}
              </div>

              {/* Timeline area */}
              <div className="flex-1 border border-[var(--border)] border-l-0 bg-[var(--paper)]">
                {/* Month markers */}
                <div className="relative h-4 border-b border-[var(--border)] flex">
                  {MONTHS.map((month, i) => {
                    const isSummer = i >= 4 && i <= 7; // May-Aug
                    return (
                      <div
                        key={i}
                        className={`flex-1 text-center text-[8px] font-mono leading-4 border-r border-[var(--border)] last:border-r-0 ${
                          isSummer ? "bg-amber-50 text-amber-600" : "text-[var(--muted)]"
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
                          className={`flex-1 border-r border-[var(--border)] last:border-r-0 opacity-40 ${
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
                    const width = Math.max(endPct - startPct, 2);
                    const content = (
                      <div
                        className={`absolute flex items-center gap-1 px-1.5 text-[10px] border bg-[var(--paper)] overflow-hidden whitespace-nowrap ${
                          hasLink ? "hover:border-[var(--accent)] cursor-pointer" : ""
                        }`}
                        style={{
                          left: `${startPct}%`,
                          width: `${width}%`,
                          top: row * rowHeight + 4,
                          height: rowHeight - 8,
                          borderLeftWidth: "3px",
                          borderLeftColor: style.color,
                          minWidth: "40px",
                        }}
                      >
                        <span className="font-medium truncate">
                          {item.displayTitle}
                        </span>
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
      <div className="pt-3 flex flex-wrap gap-3 text-[9px]">
        {Object.entries(typeStyles).map(([type, { color, label }]) => (
          <div key={type} className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: color }} />
            <span className="text-[var(--muted)]">{label}</span>
          </div>
        ))}
        <div className="flex items-center gap-1 ml-2 pl-2 border-l border-[var(--border)]">
          <span className="w-2 h-2 bg-amber-100 border border-amber-200" />
          <span className="text-[var(--muted)]">Summer</span>
        </div>
      </div>
    </div>
  );
}
