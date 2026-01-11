import Link from "next/link";
import { personal, education, getFeaturedProjects } from "@/lib/data";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

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
          href="/resume"
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
            href="/projects"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            View all projects
          </Link>
        </div>
        <div className="grid gap-3">
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
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
    </section>
  );
}
