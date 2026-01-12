"use client";

import { VerticalTimeline } from "@/app/components/VerticalTimeline";
import { getTimelineItems } from "@/lib/data";

export default function TimelinePage() {
  const items = getTimelineItems();

  return (
    <section className="space-y-6">
      <header className="border-b border-[var(--border)] pb-6">
        <div className="eyebrow mb-2">Journey</div>
        <h1 className="text-3xl font-bold leading-tight mb-2">Timeline</h1>
        <p className="text-[var(--muted)] text-sm">
          Work, education, leadership, and projects from 2022 to present.
        </p>
      </header>

      <VerticalTimeline items={items} />
    </section>
  );
}
