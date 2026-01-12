"use client";

import { useState } from "react";
import { personal, education, experience, extracurriculars, skills } from "@/lib/data";

export default function ResumePage() {
  const [viewMode, setViewMode] = useState<"web" | "print">("web");

  return (
    <section>
      {/* View Mode Toggle */}
      <div className="flex justify-between items-center mb-8 print:hidden">
        <div className="flex border border-[var(--border)]">
          <button
            onClick={() => setViewMode("web")}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wide transition-colors ${
              viewMode === "web"
                ? "bg-[var(--ink)] text-[var(--paper)]"
                : "hover:bg-[var(--border)]"
            }`}
          >
            Web
          </button>
          <button
            onClick={() => setViewMode("print")}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wide border-l border-[var(--border)] transition-colors ${
              viewMode === "print"
                ? "bg-[var(--ink)] text-[var(--paper)]"
                : "hover:bg-[var(--border)]"
            }`}
          >
            Print
          </button>
        </div>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 text-xs font-mono uppercase tracking-wide bg-[var(--accent)] text-[var(--paper)] hover:opacity-90 transition-opacity"
        >
          Export PDF
        </button>
      </div>

    <div className={viewMode === "print" ? "text-sm" : ""}>
      {/* Header */}
      <header className="text-center mb-8 pb-6 border-b border-[var(--border)]">
        <div className="eyebrow mb-2">Resume</div>
        <h1 className="text-3xl font-bold mb-3">{personal.name}</h1>
        <div className="flex justify-center flex-wrap gap-4 text-sm">
          <a href={`mailto:${personal.email}`} className="link-accent">
            {personal.email}
          </a>
          <span className="text-[var(--border)]">|</span>
          <a
            href={`https://github.com/${personal.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="link-accent"
          >
            GitHub
          </a>
          <span className="text-[var(--border)]">|</span>
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

      {/* Education */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <span className="tag tag-muted">Education</span>
        </h2>
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold">{education.degree}</p>
            <p className="text-[var(--muted)]">{education.institution}</p>
            {education.certificate && (
              <p className="text-sm text-[var(--muted)]">{education.certificate}</p>
            )}
          </div>
          <div className="text-right text-sm">
            {education.gpa && <p className="font-mono">GPA: {education.gpa}</p>}
            <p className="text-[var(--muted)]">Expected {education.graduation}</p>
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <span className="tag tag-success">Professional Experience</span>
        </h2>
        <div className="space-y-6">
          {experience.map((exp) => (
            <div key={exp.id} className="border-l-2 border-[var(--border)] pl-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-semibold">{exp.role}</span>
                  <span className="text-[var(--muted)]"> — </span>
                  <span className="text-[var(--accent)]">{exp.company}</span>
                </div>
                <span className="text-sm font-mono text-[var(--muted)]">{exp.period}</span>
              </div>
              <ul className="bullet-arrow space-y-1 text-sm text-[var(--muted)]">
                {exp.accomplishments.map((acc, i) => (
                  <li key={i} className="py-0.5">{acc}</li>
                ))}
              </ul>
              {exp.technologies.length > 0 && (
                <p className="text-xs font-mono text-[var(--muted)] mt-2">
                  {exp.technologies.join(" · ")}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Extracurriculars */}
      {extracurriculars.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <span className="tag">Leadership & Activities</span>
          </h2>
          <div className="space-y-4">
            {extracurriculars.map((extra) => (
              <div key={extra.id} className="border-l-2 border-[var(--border)] pl-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-semibold">{extra.role}</span>
                    <span className="text-[var(--muted)]"> — </span>
                    <span className="text-[var(--accent)]">{extra.organization}</span>
                  </div>
                  <span className="text-sm font-mono text-[var(--muted)]">{extra.period}</span>
                </div>
                <ul className="bullet-arrow space-y-1 text-sm text-[var(--muted)]">
                  {extra.accomplishments.map((acc, i) => (
                    <li key={i} className="py-0.5">{acc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <span className="tag tag-muted">Technical Skills</span>
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex gap-2">
            <span className="font-semibold shrink-0 w-32">Languages</span>
            <span className="text-[var(--muted)] font-mono text-xs">
              {skills.languages.join(" · ")}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold shrink-0 w-32">Libraries</span>
            <span className="text-[var(--muted)] font-mono text-xs">
              {skills.libraries.join(" · ")}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold shrink-0 w-32">Tools</span>
            <span className="text-[var(--muted)] font-mono text-xs">
              {skills.tools.join(" · ")}
            </span>
          </div>
        </div>
      </div>

      {/* Relevant Courses */}
      {education.relevantCourses && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <span className="tag tag-muted">Relevant Coursework</span>
          </h2>
          <p className="text-sm text-[var(--muted)] font-mono text-xs">
            {education.relevantCourses.join(" · ")}
          </p>
        </div>
      )}

      {/* Self-Learning / External Courses */}
      {skills.externalCourses && skills.externalCourses.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <span className="tag tag-muted">Self-Learning</span>
          </h2>
          <p className="text-sm text-[var(--muted)]">
            {skills.externalCourses.join(" · ")}
          </p>
        </div>
      )}
    </div>
    </section>
  );
}
