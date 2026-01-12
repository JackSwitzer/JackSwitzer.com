"use client";

import { useState } from "react";
import { HorizontalTimeline } from "@/app/components/HorizontalTimeline";
import { TimelineDetailPanel } from "@/app/components/TimelineDetailPanel";
import { getTimelineItems, type TimelineItem } from "@/lib/data";

export default function TimelinePage() {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
  const items = getTimelineItems();

  return (
    <section className="space-y-0">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Timeline</h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        My journey from 2022 to present - work, education, leadership, and projects.
      </p>

      {/* Sticky detail panel */}
      <TimelineDetailPanel item={selectedItem} />

      {/* Horizontal scrolling timeline */}
      <HorizontalTimeline
        items={items}
        selectedItem={selectedItem}
        onSelectItem={setSelectedItem}
      />
    </section>
  );
}
