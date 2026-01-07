"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";

export default function ResumePage() {
  const [viewMode, setViewMode] = useState<"web" | "print">("web");
  const resume = useQuery(api.resume.getFullResume);
  const skills = useQuery(api.resume.getSkills);

  if (!resume || !skills) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3"></div>
        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-2/3"></div>
        <div className="h-32 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
      </div>
    );
  }

  const { personal, education, experience, extracurriculars } = resume;

  return (
    <section className="max-w-3xl">
      {/* View Mode Toggle */}
      <div className="flex justify-between items-center mb-6 print:hidden">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("web")}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              viewMode === "web"
                ? "bg-blue-600 text-white"
                : "bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700"
            }`}
          >
            Web View
          </button>
          <button
            onClick={() => setViewMode("print")}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              viewMode === "print"
                ? "bg-blue-600 text-white"
                : "bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700"
            }`}
          >
            Print View
          </button>
        </div>
        <button
          onClick={() => window.print()}
          className="px-3 py-1 text-sm bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black rounded hover:opacity-90 transition-opacity"
        >
          Export PDF
        </button>
      </div>

    <div className={viewMode === "print" ? "text-sm" : ""}>
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <h1 className="text-3xl font-bold mb-2">{personal?.name}</h1>
        <div className="flex justify-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
          <a href={`mailto:${personal?.email}`} className="hover:text-blue-600">
            {personal?.email}
          </a>
          <span>|</span>
          <a
            href={`https://github.com/${personal?.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            GitHub
          </a>
          <span>|</span>
          <a
            href={personal?.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* Education */}
      <div className="mb-8">
        <h2 className="text-lg font-bold uppercase tracking-wide border-b border-neutral-300 dark:border-neutral-700 pb-1 mb-3">
          Education
        </h2>
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold">{education?.degree}</p>
            <p className="text-neutral-600 dark:text-neutral-400">{education?.institution}</p>
            {education?.certificate && (
              <p className="text-sm text-neutral-500">{education.certificate}</p>
            )}
          </div>
          <div className="text-right text-sm">
            <p>GPA: {education?.gpa}</p>
            <p className="text-neutral-500">Expected {education?.graduation}</p>
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-lg font-bold uppercase tracking-wide border-b border-neutral-300 dark:border-neutral-700 pb-1 mb-3">
          Professional Experience
        </h2>
        <div className="space-y-6">
          {experience?.map((exp) => (
            <div key={exp._id}>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <span className="font-semibold">{exp.role}</span>
                  <span className="text-neutral-500"> | </span>
                  <span className="text-neutral-600 dark:text-neutral-400">{exp.company}</span>
                </div>
                <span className="text-sm text-neutral-500">{exp.period}</span>
              </div>
              <ul className="list-disc list-outside ml-4 text-sm space-y-1 text-neutral-700 dark:text-neutral-300">
                {exp.accomplishments.map((acc, i) => (
                  <li key={i}>{acc}</li>
                ))}
              </ul>
              {exp.technologies.length > 0 && (
                <p className="text-xs text-neutral-500 mt-1">
                  <span className="font-medium">Technologies:</span> {exp.technologies.join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Extracurriculars */}
      {extracurriculars && extracurriculars.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-neutral-300 dark:border-neutral-700 pb-1 mb-3">
            Leadership & Activities
          </h2>
          <div className="space-y-4">
            {extracurriculars.map((extra) => (
              <div key={extra._id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <span className="font-semibold">{extra.role}</span>
                    <span className="text-neutral-500"> | </span>
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {extra.organization}
                    </span>
                  </div>
                  <span className="text-sm text-neutral-500">{extra.period}</span>
                </div>
                <ul className="list-disc list-outside ml-4 text-sm space-y-1 text-neutral-700 dark:text-neutral-300">
                  {extra.accomplishments.map((acc, i) => (
                    <li key={i}>{acc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      <div className="mb-8">
        <h2 className="text-lg font-bold uppercase tracking-wide border-b border-neutral-300 dark:border-neutral-700 pb-1 mb-3">
          Technical Skills
        </h2>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold">Languages:</span>{" "}
            <span className="text-neutral-600 dark:text-neutral-400">
              {skills.languages.join(", ")}
            </span>
          </p>
          <p>
            <span className="font-semibold">Libraries & Frameworks:</span>{" "}
            <span className="text-neutral-600 dark:text-neutral-400">
              {skills.libraries.join(", ")}
            </span>
          </p>
          <p>
            <span className="font-semibold">Tools:</span>{" "}
            <span className="text-neutral-600 dark:text-neutral-400">
              {skills.tools.join(", ")}
            </span>
          </p>
        </div>
      </div>

      {/* Relevant Courses */}
      {education?.relevantCourses && (
        <div className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-neutral-300 dark:border-neutral-700 pb-1 mb-3">
            Relevant Coursework
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {education.relevantCourses.join(" • ")}
          </p>
        </div>
      )}

      {/* Self-Learning / External Courses */}
      {skills.externalCourses && skills.externalCourses.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-wide border-b border-neutral-300 dark:border-neutral-700 pb-1 mb-3">
            Self-Learning
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {skills.externalCourses.join(" • ")}
          </p>
        </div>
      )}
    </div>
    </section>
  );
}
