"use client";

import { useMemo } from "react";
import { type TimelineItem } from "@/lib/data";
import { TimelineItemCard } from "./TimelineItem";

const typeColors = {
  work: "bg-blue-500",
  education: "bg-green-500",
  leadership: "bg-purple-500",
  project: "bg-orange-500",
  hackathon: "bg-pink-500",
};

const typeLabels = {
  work: "Work",
  education: "Education",
  leadership: "Leadership",
  project: "Project",
  hackathon: "Hackathon",
};

interface HorizontalTimelineProps {
  items: TimelineItem[];
  selectedItem: TimelineItem | null;
  onSelectItem: (item: TimelineItem) => void;
}

function YearMarker({ year }: { year: number }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-4 h-4 rounded-full bg-neutral-900 dark:bg-neutral-100 border-4 border-white dark:border-black z-10" />
      <span className="mt-2 text-sm font-mono font-semibold">{year}</span>
    </div>
  );
}

export function HorizontalTimeline({ items, selectedItem, onSelectItem }: HorizontalTimelineProps) {
  // Timeline spans 2022 to 2027
  const startYear = 2022;
  const endYear = 2028; // Go a bit past 2027 for padding
  const totalYears = endYear - startYear;

  // Group items by year for stacking
  const itemsByYear = useMemo(() => {
    const groups: Record<number, TimelineItem[]> = {};
    items.forEach(item => {
      const year = item.startDate.getFullYear();
      if (!groups[year]) groups[year] = [];
      groups[year].push(item);
    });
    return groups;
  }, [items]);

  // Calculate horizontal position for an item (0-100%)
  const getXPosition = (date: Date): number => {
    const yearFraction = (date.getFullYear() - startYear) + (date.getMonth() / 12);
    return (yearFraction / totalYears) * 100;
  };

  // Calculate vertical offset for stacking items in the same year
  const getYOffset = (item: TimelineItem): number => {
    const year = item.startDate.getFullYear();
    const yearItems = itemsByYear[year] || [];
    const index = yearItems.findIndex(i => i.id === item.id);
    // Alternate above/below the line, with increasing distance
    const isAbove = index % 2 === 0;
    const level = Math.floor(index / 2);
    const baseOffset = isAbove ? -80 : 40;
    const levelOffset = level * (isAbove ? -70 : 70);
    return baseOffset + levelOffset;
  };

  const years = Array.from({ length: totalYears }, (_, i) => startYear + i);

  return (
    <div className="relative">
      {/* Horizontal scroll container - break out of max-w-xl */}
      <div className="-mx-4 md:-mx-8 lg:-mx-16 xl:-mx-24">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 px-4 md:px-8 lg:px-16 xl:px-24">
          <div className="min-w-[1400px] h-[500px] relative py-8">

            {/* Horizontal axis line */}
            <div className="absolute left-8 right-8 top-1/2 h-0.5 bg-neutral-200 dark:bg-neutral-800" />

            {/* Year markers */}
            <div className="absolute left-8 right-8 top-1/2 transform -translate-y-1/2 flex justify-between">
              {years.map(year => (
                <YearMarker key={year} year={year} />
              ))}
            </div>

            {/* Timeline items */}
            {items.map(item => {
              const xPos = getXPosition(item.startDate);
              const yOffset = getYOffset(item);

              return (
                <TimelineItemCard
                  key={item.id}
                  item={item}
                  isSelected={selectedItem?.id === item.id}
                  onSelect={() => onSelectItem(item)}
                  style={{
                    left: `calc(${xPos}% + 8px)`,
                    top: `calc(50% + ${yOffset}px)`,
                    transform: "translateX(-50%)",
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Fade gradients on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white dark:from-black to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white dark:from-black to-transparent pointer-events-none" />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 text-xs">
        {Object.entries(typeColors).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${color}`} />
            <span className="text-neutral-600 dark:text-neutral-400">
              {typeLabels[type as keyof typeof typeLabels]}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-1.5 ml-4 pl-4 border-l border-neutral-300 dark:border-neutral-700">
          <div className="w-4 h-3 border-2 border-neutral-400 rounded" />
          <span className="text-neutral-600 dark:text-neutral-400">Clickable (has page)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 border border-dashed border-neutral-400 rounded" />
          <span className="text-neutral-600 dark:text-neutral-400">Hover for details</span>
        </div>
      </div>
    </div>
  );
}
