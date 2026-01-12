import Link from "next/link";
import Image from "next/image";
import { personal, education, getFeaturedProjects } from "@/lib/data";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  return (
    <section className="space-y-12">
      {/* Header with Profile */}
      <div className="flex items-start gap-6">
        {/* Profile Image */}
        <Image
          src="/headshot.jpeg"
          alt="Jack Switzer"
          width={80}
          height={80}
          className="shrink-0 w-20 h-20 rounded-full object-cover"
          priority
        />

        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">{personal.name}</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-3">
            {education.degree} @ {education.institution}
          </p>

          {/* Links */}
          <div className="flex flex-wrap gap-3 text-sm">
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
        </div>
      </div>

      {/* About/Intro */}
      <div>
        <h2 className="text-lg font-semibold mb-3">About</h2>
        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
          I build things that work. Currently a Software Developer at IBM building AI-powered tools for
          mainframe modernization, while exploring how quantization degrades LLM capabilities through
          interpretability research. I've shipped projects across ML, web dev, and quant finance—from
          teaching platforms used by 120+ students to trading strategies using neural networks.
        </p>
      </div>

      {/* Featured Experience */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Featured Experience</h2>
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
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                  {project.name}
                </span>
                <span className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded shrink-0">
                  {project.type}
                </span>
                {project.status === "active" && (
                  <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded shrink-0">
                    Active
                  </span>
                )}
                {project.status === "wip" && (
                  <span className="text-xs px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded shrink-0">
                    WIP
                  </span>
                )}
              </div>
              <span className="text-sm text-neutral-500 shrink-0 ml-2">{project.period}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
