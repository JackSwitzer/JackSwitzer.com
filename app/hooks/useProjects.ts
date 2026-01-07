"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

// Hook to get all visible projects
export function useVisibleProjects() {
  return useQuery(api.projects.getVisibleProjects);
}

// Hook to get featured projects
export function useFeaturedProjects() {
  return useQuery(api.projects.getFeaturedProjects);
}

// Hook to get a project by slug
export function useProject(slug: string) {
  return useQuery(api.projects.getProjectBySlug, { slug });
}

// Hook to get projects by type
export function useProjectsByType(
  type: "personal" | "work" | "school" | "hackathon" | "consulting"
) {
  return useQuery(api.projects.getProjectsByType, { type });
}

// Hook to get all projects (including hidden)
export function useAllProjects() {
  return useQuery(api.projects.getAllProjects);
}

// Hook to get quant projects
export function useQuantProjects() {
  return useQuery(api.projects.getQuantProjects);
}

// Hook to get all technologies for filtering
export function useTechnologies() {
  return useQuery(api.projects.getAllTechnologies);
}

// Hook to get all tags for filtering
export function useTags() {
  return useQuery(api.projects.getAllTags);
}
