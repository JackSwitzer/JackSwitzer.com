import Link from "next/link";
import Image from "next/image";
import { personal, education, getFeaturedProjects } from "@/lib/data";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  return (
    <section className="space-y-10">
      {/* Header */}
      <header className="border-b border-[var(--border)] pb-8">
        <div className="flex items-start gap-5">
          <Image
            src="/headshot.jpeg"
            alt="Jack Switzer"
            width={72}
            height={72}
            className="shrink-0 w-[72px] h-[72px] rounded-full object-cover"
            priority
          />
          <div>
            <div className="eyebrow mb-1">{education.degree}</div>
            <h1 className="text-3xl font-bold leading-tight mb-1">{personal.name}</h1>
            <p className="text-[var(--muted)] text-sm">{education.institution}</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 mt-5 text-sm">
          <a href={`mailto:${personal.email}`} className="link-accent">
            Email
          </a>
          <a
            href={`https://github.com/${personal.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent"
          >
            GitHub
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent"
          >
            LinkedIn
          </a>
        </div>
      </header>

      {/* About */}
      <div>
        <h2 className="text-lg font-semibold mb-3">About</h2>
        <p className="text-[var(--muted)] leading-relaxed">
          Working to Learn. Learning at work. Passionate about understanding the un-understood.
          Helping make the world better enjoyer.
        </p>
      </div>

      {/* Featured Experience */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Featured Experience</h2>
          <Link href="/projects" className="link-accent text-sm">
            View all projects →
          </Link>
        </div>

        <div className="space-y-2">
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block p-4 border border-[var(--border)] card-hover"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium group-hover:text-[var(--accent)] transition-colors">
                      {project.name}
                    </span>
                    {project.status === "active" && (
                      <span className="tag tag-success">Active</span>
                    )}
                    {project.status === "wip" && (
                      <span className="tag" style={{ background: "var(--warning)" }}>WIP</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="tag tag-muted">{project.type}{project.organization && ` | ${project.organization}`}</span>
                    <span className="text-[var(--muted)]">{project.period}</span>
                  </div>
                </div>
                <span className="text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
