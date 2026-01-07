"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Link from "next/link";

export default function PortfolioPage() {
  const personal = useQuery(api.resume.getPersonal);
  const education = useQuery(api.resume.getEducation);
  const featuredProjects = useQuery(api.projects.getFeaturedProjects);
  const future = useQuery(api.resume.getFuture);

  if (!personal || !education || !featuredProjects) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-2/3 mb-2"></div>
        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <section>
      {/* Header */}
      <h1 className="text-3xl font-bold tracking-tight mb-2">{personal.name}</h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-4">
        {education.degree} @ {education.institution}
      </p>

      {/* Links */}
      <div className="flex gap-4 mb-8 text-sm">
        <a
          href={`mailto:${personal.email}`}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Email
        </a>
        <a
          href={`https://github.com/${personal.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          GitHub
        </a>
        <a
          href={personal.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          LinkedIn
        </a>
        <Link
          href="/portfolio/resume"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Resume
        </Link>
      </div>

      {/* Featured Projects */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Featured Projects</h2>
          <Link
            href="/portfolio/projects"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-3">
          {featuredProjects.map((project) => (
            <Link
              key={project._id}
              href={`/portfolio/projects/${project.slug}`}
              className="group flex items-center justify-between p-3 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.name}
                </span>
                <span className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded">
                  {project.type}
                </span>
                {project.status === "active" && (
                  <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">
                    Active
                  </span>
                )}
                {project.status === "wip" && (
                  <span className="text-xs px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded">
                    WIP
                  </span>
                )}
              </div>
              <span className="text-sm text-neutral-500">{project.period}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Future Plans */}
      {future && future.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">What's Next</h2>
          {future.map((item) => (
            <div
              key={item._id}
              className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg"
            >
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {item.role} {item.partner && `with ${item.partner}`} · Target: {item.targetDate}
              </p>
              <p className="text-sm mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
