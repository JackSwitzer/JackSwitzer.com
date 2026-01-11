import Link from "next/link";
import { personal, education, getFeaturedProjects } from "@/lib/data";
import { Timeline } from "./components/Timeline";
import { FocusCard } from "./components/FocusCard";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  return (
    <section className="space-y-12">
      {/* Header with Profile */}
      <div className="flex items-start gap-6">
        {/* Profile Image Placeholder */}
        <div className="shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
          JS
        </div>

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
          I'm a Math & Computer Engineering student at Queen's passionate about AI systems and interpretability.
          Currently at IBM building AI-powered tools for mainframe modernization, while researching how
          quantization affects LLM capabilities through mechanistic interpretability. I love building things
          that make complex systems more understandable.
        </p>
      </div>

      {/* Current Focus */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Current Focus</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <FocusCard
            title="IBM Mainframe Modernization"
            subtitle="Software Developer"
            description="Building AI agents to translate legacy COBOL/PL1 code to modern languages. Working on MCP tooling and VSCode extensions."
            href="/projects/ibm-software-developer"
            tags={["AI Agents", "MCP", "VSCode"]}
            status="active"
          />
          <FocusCard
            title="Interpretability Research"
            subtitle="Personal Project"
            description="Studying how quantization degrades LLM capabilities using Sparse Autoencoders on Qwen 3 Coder 30B."
            href="/projects/qwen-interpretability"
            tags={["SAE", "Quantization", "Mech Interp"]}
            status="wip"
          />
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Journey</h2>
        <Timeline />
      </div>

      {/* Featured Projects */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Featured Projects</h2>
          <Link
            href="/projects"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            View all projects
          </Link>
        </div>
        <div className="grid gap-3">
          {featuredProjects.slice(0, 6).map((project) => (
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
