import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Personal info
  personal: defineTable({
    name: v.string(),
    email: v.string(),
    github: v.string(),
    githubSchool: v.optional(v.string()),
    linkedin: v.string(),
  }),

  // Education
  education: defineTable({
    institution: v.string(),
    degree: v.string(),
    gpa: v.string(),
    graduation: v.string(),
    certificate: v.optional(v.string()),
    relevantCourses: v.array(v.string()),
  }),

  // Work experience
  experience: defineTable({
    order: v.number(), // For sorting
    role: v.string(),
    company: v.string(),
    period: v.string(),
    accomplishments: v.array(v.string()),
    technologies: v.array(v.string()),
  }),

  // Projects
  projects: defineTable({
    slug: v.string(),
    name: v.string(),
    type: v.union(
      v.literal("personal"),
      v.literal("work"),
      v.literal("school"),
      v.literal("hackathon"),
      v.literal("consulting"),
      v.literal("quant")
    ),
    period: v.string(),
    featured: v.boolean(),
    visible: v.boolean(),
    status: v.union(
      v.literal("active"),
      v.literal("complete"),
      v.literal("wip")
    ),
    summary: v.optional(v.string()),
    accomplishments: v.array(v.string()),
    technologies: v.array(v.string()),
    tags: v.array(v.string()),
    github: v.optional(
      v.object({
        repo: v.string(),
        account: v.string(),
      })
    ),
    link: v.optional(v.string()),
  }).index("by_slug", ["slug"])
    .index("by_type", ["type"])
    .index("by_featured", ["featured"])
    .index("by_visible", ["visible"]),

  // Quant projects (separate bucket)
  quantProjects: defineTable({
    slug: v.string(),
    name: v.string(),
    type: v.union(
      v.literal("hackathon"),
      v.literal("extracurricular"),
      v.literal("coursework")
    ),
    period: v.string(),
    accomplishments: v.array(v.string()),
    technologies: v.array(v.string()),
    github: v.optional(
      v.object({
        repo: v.string(),
        account: v.string(),
      })
    ),
  }).index("by_slug", ["slug"]),

  // Extracurriculars
  extracurriculars: defineTable({
    order: v.number(),
    role: v.string(),
    organization: v.string(),
    period: v.string(),
    accomplishments: v.array(v.string()),
  }),

  // Skills
  skills: defineTable({
    languages: v.array(v.string()),
    libraries: v.array(v.string()),
    tools: v.array(v.string()),
    externalCourses: v.array(v.string()),
  }),

  // Future plans
  future: defineTable({
    name: v.string(),
    role: v.string(),
    partner: v.optional(v.string()),
    targetDate: v.string(),
    description: v.string(),
  }),
});
