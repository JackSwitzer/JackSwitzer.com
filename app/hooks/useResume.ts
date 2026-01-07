"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

// Hook to get full resume data
export function useResume() {
  return useQuery(api.resume.getFullResume);
}

// Hook to get just personal info
export function usePersonal() {
  return useQuery(api.resume.getPersonal);
}

// Hook to get education
export function useEducation() {
  return useQuery(api.resume.getEducation);
}

// Hook to get experience
export function useExperience() {
  return useQuery(api.resume.getExperience);
}

// Hook to get skills
export function useSkills() {
  return useQuery(api.resume.getSkills);
}

// Hook to get extracurriculars
export function useExtracurriculars() {
  return useQuery(api.resume.getExtracurriculars);
}

// Hook to get future plans
export function useFuture() {
  return useQuery(api.resume.getFuture);
}
