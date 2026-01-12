"use client";

import { useState } from "react";
import Link from "next/link";
import { VerticalTimeline } from "@/app/components/VerticalTimeline";
import { getTimelineItems, getVisibleProjects, type Project } from "@/lib/data";

const PROJECT_TYPES = ["all", "work", "research", "personal", "school", "hackathon", "quant"] as const;

export default function ProjectsPage() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"timeline" | "list">("list");

  const timelineItems = getTimelineItems();
  const projects = getVisibleProjects();

  const filteredProjects = projects.filter((p) => {
    if (selectedType !== "all" && p.type !== selectedType) return false;
    return true;
  });

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section className="space-y-8">
      {/* Header */}
      <header className="border-b border-[var(--border)] pb-6">
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="eyebrow mb-2">Portfolio</div>
            <h1 className="text-3xl font-bold leading-tight mb-2">Projects</h1>
            <p className="text-[var(--muted)] text-sm">
              Work, research, and personal projects from 2022 to present.
            </p>
          </div>

          {/* View toggle */}
          <div className="flex border border-[var(--border)]">
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wide transition-colors ${
                viewMode === "list"
                  ? "bg-[var(--ink)] text-[var(--paper)]"
                  : "hover:bg-[var(--border)]"
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode("timeline")}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wide border-l border-[var(--border)] transition-colors ${
                viewMode === "timeline"
                  ? "bg-[var(--ink)] text-[var(--paper)]"
                  : "hover:bg-[var(--border)]"
              }`}
            >
              Timeline
            </button>
          </div>
        </div>
      </header>

      {viewMode === "timeline" ? (
        <VerticalTimeline items={timelineItems} />
      ) : (
        <>
          {/* Type Filter */}
          <div className="flex flex-wrap gap-1">
            {PROJECT_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 text-xs font-mono uppercase tracking-wide transition-colors ${
                  selectedType === type
                    ? "bg-[var(--accent)] text-[var(--paper)]"
                    : "bg-[var(--border)] hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <span className="tag tag-success">Featured</span>
              </h2>
              <div className="space-y-2">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </div>
          )}

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold mb-3">All Projects</h2>
              <div className="space-y-2">
                {otherProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block p-4 border border-[var(--border)] card-hover"
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium group-hover:text-[var(--accent)] transition-colors">
              {project.name}
            </h3>
            {project.status === "active" && (
              <span className="tag tag-success">Active</span>
            )}
            {project.status === "wip" && (
              <span className="tag" style={{ background: "var(--warning)" }}>WIP</span>
            )}
          </div>
          {project.summary && (
            <p className="text-sm text-[var(--muted)] line-clamp-1 mb-2">
              {project.summary}
            </p>
          )}
          <div className="flex items-center gap-2 text-xs">
            <span className="tag tag-muted">{project.type}</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className="text-sm text-[var(--muted)]">{project.period}</span>
          <span className="block text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity mt-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
