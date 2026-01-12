"use client";

import { type TimelineItem as TimelineItemType } from "@/lib/data";

const typeColors = {
  work: {
    bg: "bg-blue-500",
    border: "border-blue-500",
    light: "bg-blue-50 dark:bg-blue-950",
  },
  education: {
    bg: "bg-green-500",
    border: "border-green-500",
    light: "bg-green-50 dark:bg-green-950",
  },
  leadership: {
    bg: "bg-purple-500",
    border: "border-purple-500",
    light: "bg-purple-50 dark:bg-purple-950",
  },
  project: {
    bg: "bg-orange-500",
    border: "border-orange-500",
    light: "bg-orange-50 dark:bg-orange-950",
  },
  hackathon: {
    bg: "bg-pink-500",
    border: "border-pink-500",
    light: "bg-pink-50 dark:bg-pink-950",
  },
};

interface TimelineItemProps {
  item: TimelineItemType;
  isSelected: boolean;
  onSelect: () => void;
  style?: React.CSSProperties;
}

export function TimelineItemCard({ item, isSelected, onSelect, style }: TimelineItemProps) {
  const colors = typeColors[item.type];

  // Items with detail pages are clickable and show full panel
  if (item.hasDetailPage) {
    return (
      <button
        onClick={onSelect}
        style={style}
        className={`
          absolute px-3 py-2 rounded-lg border-2 cursor-pointer
          transition-all duration-200 text-left min-w-[160px] max-w-[200px]
          ${isSelected
            ? `${colors.border} ${colors.light}`
            : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-500"
          }
        `}
      >
        <div className={`w-3 h-3 rounded-full ${colors.bg} mb-1`} />
        <p className="text-sm font-medium truncate">{item.title}</p>
        {item.subtitle && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{item.subtitle}</p>
        )}
      </button>
    );
  }

  // Items without pages show hover tooltip only
  return (
    <div style={style} className="absolute group">
      <div className="px-2 py-1.5 rounded border border-dashed border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 min-w-[140px] max-w-[180px]">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${colors.bg} shrink-0`} />
          <span className="text-sm truncate">{item.title}</span>
        </div>
        {item.subtitle && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate ml-4">{item.subtitle}</p>
        )}
      </div>

      {/* Tooltip on hover */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
        <div className="bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black px-3 py-2 rounded-lg text-sm max-w-xs whitespace-normal">
          <p className="font-medium">{item.title}</p>
          {item.subtitle && (
            <p className="text-neutral-300 dark:text-neutral-700 text-xs">{item.subtitle}</p>
          )}
          {item.accomplishments?.[0] && (
            <p className="text-xs mt-1 text-neutral-400 dark:text-neutral-600 line-clamp-2">
              {item.accomplishments[0]}
            </p>
          )}
          {item.externalLink && (
            <p className="text-xs mt-1 text-blue-400 dark:text-blue-600">Has external link</p>
          )}
        </div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-neutral-900 dark:border-t-neutral-100" />
      </div>
    </div>
  );
}
