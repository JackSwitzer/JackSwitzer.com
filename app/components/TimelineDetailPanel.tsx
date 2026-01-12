"use client";

import Link from "next/link";
import { type TimelineItem } from "@/lib/data";

const typeColors = {
  work: "text-blue-600 dark:text-blue-400",
  education: "text-green-600 dark:text-green-400",
  leadership: "text-purple-600 dark:text-purple-400",
  project: "text-orange-600 dark:text-orange-400",
  hackathon: "text-pink-600 dark:text-pink-400",
};

interface TimelineDetailPanelProps {
  item: TimelineItem | null;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function TimelineDetailPanel({ item }: TimelineDetailPanelProps) {
  if (!item) {
    return (
      <div className="sticky top-16 z-10 bg-white dark:bg-black py-4 mb-4 min-h-[140px] border-b border-neutral-200 dark:border-neutral-800">
        <p className="text-neutral-500 text-center py-8">
          Click an item to view details
        </p>
      </div>
    );
  }

  const dateRange = item.endDate
    ? `${formatDate(item.startDate)} - ${formatDate(item.endDate)}`
    : formatDate(item.startDate);

  // Education-specific panel
  if (item.type === "education") {
    return (
      <div className="sticky top-16 z-10 bg-white dark:bg-black py-4 mb-4 min-h-[140px] border-b border-neutral-200 dark:border-neutral-800">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <span className={`text-sm font-medium ${typeColors[item.type]}`}>
                  Education
                </span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400">{item.institution}</p>
              <p className="text-sm text-neutral-500 font-mono">{dateRange}</p>
            </div>
          </div>

          {item.degree && (
            <p className="text-sm">
              <span className="font-medium">Degree:</span> {item.degree}
            </p>
          )}
          {item.gpa && (
            <p className="text-sm">
              <span className="font-medium">GPA:</span> {item.gpa}
            </p>
          )}
          {item.courses && item.courses.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-1">Relevant Courses:</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                {item.courses.slice(0, 8).join(" / ")}
                {item.courses.length > 8 && ` + ${item.courses.length - 8} more`}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Standard panel for projects/work
  return (
    <div className="sticky top-16 z-10 bg-white dark:bg-black py-4 mb-4 min-h-[140px] border-b border-neutral-200 dark:border-neutral-800">
      <div className="flex justify-between items-start gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <span className={`text-sm font-medium ${typeColors[item.type]} capitalize`}>
              {item.type}
            </span>
          </div>
          {item.subtitle && (
            <p className="text-neutral-600 dark:text-neutral-400">{item.subtitle}</p>
          )}
          <p className="text-sm text-neutral-500 font-mono">{dateRange}</p>
          {item.summary && (
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2 max-w-2xl">
              {item.summary}
            </p>
          )}
        </div>

        {item.hasDetailPage && item.slug && (
          <Link
            href={`/projects/${item.slug}`}
            className="px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black rounded-lg hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors text-sm font-medium shrink-0"
          >
            View full page
          </Link>
        )}
      </div>

      {/* Technologies */}
      {item.technologies && item.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {item.technologies.slice(0, 6).map(tech => (
            <span
              key={tech}
              className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-xs"
            >
              {tech}
            </span>
          ))}
          {item.technologies.length > 6 && (
            <span className="px-2 py-1 text-neutral-500 text-xs">
              +{item.technologies.length - 6} more
            </span>
          )}
        </div>
      )}

      {/* Accomplishments preview */}
      {item.accomplishments && item.accomplishments.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">
            {item.accomplishments[0]}
          </p>
        </div>
      )}
    </div>
  );
}
