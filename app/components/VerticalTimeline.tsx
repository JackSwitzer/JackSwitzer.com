"use client";

import Link from "next/link";
import { type TimelineItem } from "@/lib/data";

const typeStyles = {
  work: { accent: "var(--accent)", label: "Work" },
  education: { accent: "var(--success)", label: "Edu" },
  leadership: { accent: "#7c3aed", label: "Lead" },
  project: { accent: "var(--accent)", label: "Proj" },
  hackathon: { accent: "#ec4899", label: "Hack" },
};

interface VerticalTimelineProps {
  items: TimelineItem[];
}

function formatDateShort(date: Date): string {
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);
  return `${month} '${year}`;
}

function getAbbreviatedTitle(item: TimelineItem): string {
  // Create abbreviated names for long titles
  const abbreviations: Record<string, string> = {
    "IBM Software Developer - WatsonX Code Assistant for Z": "IBM - WatsonX Code Assistant",
    "Quantization x Interpretability": "Quantization x Interp",
    "Slay the Spire Watcher Solver": "StS Watcher Solver",
    "Linear Algebra Learning Platform": "Lin Alg Platform",
    "Black Box Deconstruction - Control Systems": "Control Systems",
    "Gulf of Mexico Trash Collection Simulation": "Gulf Simulation",
    "Chrono - Linguistic Pattern Forecasting": "Chrono (QHacks)",
    "McGill FAIM Hackathon - Portfolio Optimization": "FAIM Hackathon",
    "QUANTT - Options Pricing Model": "QUANTT Options",
    "Started University": "Queen's Started",
    "B.ASc. Graduation": "Graduation",
    "Teaching Assistant: Linear Algebra I": "TA - Linear Algebra",
    "Member → President, Future Blue Intern Council": "Future Blue Council",
    "Consultant → Project Manager": "QSC",
    "Campus Ambassador": "RBC Ambassador",
    "Analyst → Project Manager": "QUANTT",
    "Sol - Sunrise Alarm Clock": "Sol Lamp",
  };

  return abbreviations[item.title] || item.title;
}

function getDurationMonths(item: TimelineItem): number {
  const start = item.startDate;
  const end = item.endDate || new Date();
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  return Math.max(1, months);
}

export function VerticalTimeline({ items }: VerticalTimelineProps) {
  // Group items by year
  const itemsByYear = items.reduce((acc, item) => {
    const year = item.startDate.getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {} as Record<number, TimelineItem[]>);

  const years = Object.keys(itemsByYear).map(Number).sort((a, b) => b - a); // Most recent first

  return (
    <div className="space-y-8">
      {years.map((year) => (
        <div key={year} className="relative">
          {/* Year header */}
          <div className="sticky top-0 z-10 bg-[var(--paper)] py-2 border-b border-[var(--border)] mb-4">
            <span className="text-2xl font-bold font-mono">{year}</span>
          </div>

          {/* Items for this year */}
          <div className="space-y-3 pl-4 border-l-2 border-[var(--border)]">
            {itemsByYear[year].map((item) => {
              const style = typeStyles[item.type];
              const duration = getDurationMonths(item);
              const hasLink = item.hasDetailPage && item.slug;

              const content = (
                <div
                  className={`relative p-4 border border-[var(--border)] bg-[var(--paper)] transition-all ${
                    hasLink ? "card-hover cursor-pointer" : ""
                  }`}
                  style={{
                    borderLeftWidth: "3px",
                    borderLeftColor: style.accent,
                  }}
                >
                  {/* Duration indicator line */}
                  <div
                    className="absolute -left-[calc(1rem+3px)] top-1/2 -translate-y-1/2 h-0.5"
                    style={{
                      width: "1rem",
                      backgroundColor: style.accent,
                    }}
                  />

                  {/* Header row */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 flex-wrap min-w-0">
                      <span
                        className="tag text-[10px] uppercase shrink-0"
                        style={{ backgroundColor: style.accent, color: "white" }}
                      >
                        {style.label}
                      </span>
                      <h3 className="font-semibold text-sm truncate">
                        {getAbbreviatedTitle(item)}
                      </h3>
                      {item.hasDetailPage && (
                        <span className="text-[var(--accent)] text-xs shrink-0">→</span>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono text-[var(--muted)]">
                        {formatDateShort(item.startDate)}
                        {item.endDate && ` - ${formatDateShort(item.endDate)}`}
                      </span>
                      {duration > 1 && (
                        <span className="block text-[10px] text-[var(--muted)]">
                          {duration} mo
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Subtitle */}
                  {item.subtitle && (
                    <p className="text-xs text-[var(--muted)] mb-2">{item.subtitle}</p>
                  )}

                  {/* Summary or first accomplishment */}
                  {(item.summary || item.accomplishments?.[0]) && (
                    <p className="text-sm text-[var(--muted)] line-clamp-2">
                      {item.summary || item.accomplishments?.[0]}
                    </p>
                  )}

                  {/* Technologies (compact) */}
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-1.5 py-0.5 text-[10px] font-mono bg-[var(--border)] text-[var(--muted)]"
                        >
                          {tech}
                        </span>
                      ))}
                      {item.technologies.length > 4 && (
                        <span className="text-[10px] text-[var(--muted)]">
                          +{item.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );

              if (hasLink) {
                return (
                  <Link key={item.id} href={`/projects/${item.slug}`}>
                    {content}
                  </Link>
                );
              }

              // For items with external links
              if (item.externalLink) {
                return (
                  <a
                    key={item.id}
                    href={item.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {content}
                  </a>
                );
              }

              return <div key={item.id}>{content}</div>;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
