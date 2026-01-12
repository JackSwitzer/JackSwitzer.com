"use client";

import { useState } from "react";
import Link from "next/link";
import { HorizontalTimeline } from "@/app/components/HorizontalTimeline";
import { TimelineDetailPanel } from "@/app/components/TimelineDetailPanel";
import { getTimelineItems, getVisibleProjects, getAllTechnologies, type TimelineItem, type Project } from "@/lib/data";

const PROJECT_TYPES = ["all", "work", "personal", "school", "hackathon", "consulting", "quant"] as const;

export default function ProjectsPage() {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"timeline" | "list">("timeline");

  const timelineItems = getTimelineItems();
  const projects = getVisibleProjects();
  const technologies = getAllTechnologies();

  const filteredProjects = projects.filter((p) => {
    if (selectedType !== "all" && p.type !== selectedType) return false;
    if (selectedTech && !p.technologies.includes(selectedTech)) return false;
    return true;
  });

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Projects</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            My journey from 2022 to present - work, education, leadership, and projects.
          </p>
        </div>

        {/* View toggle */}
        <div className="flex gap-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
          <button
            onClick={() => setViewMode("timeline")}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              viewMode === "timeline"
                ? "bg-white dark:bg-neutral-700 shadow-sm"
                : "hover:bg-neutral-200 dark:hover:bg-neutral-700"
            }`}
          >
            Timeline
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              viewMode === "list"
                ? "bg-white dark:bg-neutral-700 shadow-sm"
                : "hover:bg-neutral-200 dark:hover:bg-neutral-700"
            }`}
          >
            List
          </button>
        </div>
      </div>

      {viewMode === "timeline" ? (
        <>
          {/* Sticky detail panel */}
          <TimelineDetailPanel item={selectedItem} />

          {/* Horizontal scrolling timeline */}
          <HorizontalTimeline
            items={timelineItems}
            selectedItem={selectedItem}
            onSelectItem={setSelectedItem}
          />
        </>
      ) : (
        <>
          {/* Filters */}
          <div className="space-y-4">
            {/* Type Filter */}
            <div className="flex flex-wrap gap-2">
              {PROJECT_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedType === type
                      ? "bg-blue-600 text-white"
                      : "bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            {/* Tech Filter */}
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setSelectedTech(null)}
                className={`px-2 py-0.5 text-xs rounded transition-colors ${
                  !selectedTech
                    ? "bg-green-600 text-white"
                    : "bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                }`}
              >
                All Tech
              </button>
              {technologies.slice(0, 15).map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech === selectedTech ? null : tech)}
                  className={`px-2 py-0.5 text-xs rounded transition-colors ${
                    selectedTech === tech
                      ? "bg-green-600 text-white"
                      : "bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-neutral-500">
            Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
          </p>

          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="text-yellow-500">★</span> Featured
              </h2>
              <div className="grid gap-4">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </div>
          )}

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">All Projects</h2>
              <div className="grid gap-4">
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
      className="group block p-3 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
              {project.name}
            </h3>
            <span className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded shrink-0">
              {project.type}
            </span>
            {project.status === "active" && (
              <span className="text-xs px-1.5 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded shrink-0">
                Active
              </span>
            )}
            {project.status === "wip" && (
              <span className="text-xs px-1.5 py-0.5 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded shrink-0">
                WIP
              </span>
            )}
          </div>
          {project.summary && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-1">
              {project.summary}
            </p>
          )}
          <div className="flex items-center gap-3 mt-1 text-xs text-neutral-500">
            {project.github && (
              <span className="hover:text-blue-600 dark:hover:text-blue-400">
                {project.github.account}/{project.github.repo}
              </span>
            )}
            {project.link && (
              <span className="text-blue-600 dark:text-blue-400">{project.link}</span>
            )}
          </div>
        </div>
        <span className="text-sm text-neutral-500 shrink-0">{project.period}</span>
      </div>
    </Link>
  );
}
