import Link from "next/link";
import { getProjectBySlug, getVisibleProjects } from "@/lib/data";
import { notFound } from "next/navigation";
import { Card3D } from "@/app/components/Card3D";

export function generateStaticParams() {
  const projects = getVisibleProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <section>
      {/* Breadcrumb */}
      <nav className="text-sm mb-6">
        <Link
          href="/"
          className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
        >
          Home
        </Link>
        <span className="mx-2 text-neutral-400">/</span>
        <Link
          href="/projects"
          className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
        >
          Projects
        </Link>
        <span className="mx-2 text-neutral-400">/</span>
        <span className="text-neutral-700 dark:text-neutral-300">{project.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
          {project.featured && (
            <span className="text-yellow-500 text-xl" title="Featured">★</span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="px-2 py-1 bg-neutral-200 dark:bg-neutral-800 rounded">
            {project.type}
          </span>
          <span className="text-neutral-500">{project.period}</span>
          {project.status === "active" && (
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">
              Active Development
            </span>
          )}
          {project.status === "wip" && (
            <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded">
              Work in Progress
            </span>
          )}
          {project.status === "complete" && (
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
              Complete
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {project.summary && (
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
          {project.summary}
        </p>
      )}

      {/* Links */}
      <div className="flex gap-4 mb-8">
        {project.github && (
          <a
            href={`https://github.com/${project.github.account}/${project.github.repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black rounded-lg hover:opacity-90 transition-opacity"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Visit Site
          </a>
        )}
      </div>

      {/* Technologies */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Technologies</h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech: string) => (
            <span
              key={tech}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Accomplishments */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Key Accomplishments</h2>
        <ul className="space-y-3">
          {project.accomplishments.map((acc: string, i: number) => (
            <li key={i} className="flex gap-3">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-neutral-700 dark:text-neutral-300">{acc}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Student Card - only for linear algebra project */}
      {project.slug === "linear-algebra-website" && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">From My Students</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-sm">
            A card from my Linear Algebra students - the &quot;Switzer Theorem&quot; states that
            our education and my teaching are linearly dependent.
          </p>
          <Card3D />
        </div>
      )}

      {/* Tags */}
      {project.tags && project.tags.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Back Link */}
      <div className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800">
        <Link
          href="/projects"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to All Projects
        </Link>
      </div>
    </section>
  );
}
