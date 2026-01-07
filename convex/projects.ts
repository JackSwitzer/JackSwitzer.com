import { query } from "./_generated/server";
import { v } from "convex/values";

// Get all visible projects
export const getVisibleProjects = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_visible", (q) => q.eq("visible", true))
      .collect();
  },
});

// Get featured projects
export const getFeaturedProjects = query({
  args: {},
  handler: async (ctx) => {
    const projects = await ctx.db
      .query("projects")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .collect();
    // Only return visible featured projects
    return projects.filter((p) => p.visible);
  },
});

// Get project by slug
export const getProjectBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

// Get projects by type
export const getProjectsByType = query({
  args: {
    type: v.union(
      v.literal("personal"),
      v.literal("work"),
      v.literal("school"),
      v.literal("hackathon"),
      v.literal("consulting")
    ),
  },
  handler: async (ctx, args) => {
    const projects = await ctx.db
      .query("projects")
      .withIndex("by_type", (q) => q.eq("type", args.type))
      .collect();
    return projects.filter((p) => p.visible);
  },
});

// Get all projects (including hidden, for admin)
export const getAllProjects = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("projects").collect();
  },
});

// Get quant projects
export const getQuantProjects = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("quantProjects").collect();
  },
});

// Get all unique technologies from projects
export const getAllTechnologies = query({
  args: {},
  handler: async (ctx) => {
    const projects = await ctx.db
      .query("projects")
      .withIndex("by_visible", (q) => q.eq("visible", true))
      .collect();

    const techSet = new Set<string>();
    projects.forEach((p) => {
      p.technologies.forEach((t) => techSet.add(t));
    });

    return Array.from(techSet).sort();
  },
});

// Get all unique tags from projects
export const getAllTags = query({
  args: {},
  handler: async (ctx) => {
    const projects = await ctx.db
      .query("projects")
      .withIndex("by_visible", (q) => q.eq("visible", true))
      .collect();

    const tagSet = new Set<string>();
    projects.forEach((p) => {
      p.tags.forEach((t) => tagSet.add(t));
    });

    return Array.from(tagSet).sort();
  },
});
