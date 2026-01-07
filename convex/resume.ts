import { query } from "./_generated/server";

// Get personal info
export const getPersonal = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("personal").first();
  },
});

// Get education
export const getEducation = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("education").first();
  },
});

// Get all experience, sorted by order
export const getExperience = query({
  args: {},
  handler: async (ctx) => {
    const experiences = await ctx.db.query("experience").collect();
    return experiences.sort((a, b) => a.order - b.order);
  },
});

// Get skills
export const getSkills = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("skills").first();
  },
});

// Get extracurriculars, sorted by order
export const getExtracurriculars = query({
  args: {},
  handler: async (ctx) => {
    const extras = await ctx.db.query("extracurriculars").collect();
    return extras.sort((a, b) => a.order - b.order);
  },
});

// Get future plans
export const getFuture = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("future").collect();
  },
});

// Get full resume (all sections)
export const getFullResume = query({
  args: {},
  handler: async (ctx) => {
    const [personal, education, experiences, skills, extracurriculars, future] =
      await Promise.all([
        ctx.db.query("personal").first(),
        ctx.db.query("education").first(),
        ctx.db.query("experience").collect(),
        ctx.db.query("skills").first(),
        ctx.db.query("extracurriculars").collect(),
        ctx.db.query("future").collect(),
      ]);

    return {
      personal,
      education,
      experience: experiences.sort((a, b) => a.order - b.order),
      skills,
      extracurriculars: extracurriculars.sort((a, b) => a.order - b.order),
      future,
    };
  },
});
