# Personal Website Transformation Plan

## Overview
Transform the APSC 174 course site into a personal portfolio at **jackswitzer.com** with the course content moved to **apsc174.jackswitzer.com**.

---

## GitHub Repos Compiled

### jackswitzer (personal)
| Repo | Description | Language |
|------|-------------|----------|
| StSRLSolver | RL agent for Slay the Spire Watcher (targeting >96% A20 winrate) | Python |
| Panokeet | Voice-to-text parakeet app with local fine-tuning | Swift |
| sol | "Let there be Light" | Python |
| Tavla | "T-5 months" | Python |
| AdventofCode | 2024 - 8 Languages, 29 Stars | Python |
| RIT-Hackathon | Market-making & liability trading strategies | Python |
| NYT-Games | LetterBoxed & Spelling Bee puzzle solver | Python |
| LinkedIn-Network-Graph | Network visualization | - |
| FAIM-Personal | Portfolio optimization project | Python |

### JackSwitzerSchool
| Repo | Description | Language |
|------|-------------|----------|
| APSC-200 | Gulf of Mexico multi-agent trash simulation (K-Means, dynamic density maps) | MATLAB |
| APSC174 | Linear Algebra Website | HTML |
| MTHE393 | APSC 300 equivalent | MATLAB |
| QHacks2025 | Chrono - Linguistic pattern forecasting | Python |
| Quantt-5 | Quantt team 5 | Python |
| Quantt-7 | Quantt team 7 | Python |
| QUESST | - | Python |

---

## Site Architecture

### Domain Strategy
- **jackswitzer.com** - Main portfolio site (Blog, Projects, About)
- **apsc174.jackswitzer.com** - Linear algebra course content (existing)

### Route Structure
```
/(portfolio)                    # jackswitzer.com
  /                             # About/Home page
  /blog                         # Blog listing
  /blog/[slug]                  # Individual blog post (e.g., /blog/money-is-energy)
  /projects                     # Projects grid with filtering
  /projects/[slug]              # Project detail page

/(course)                       # apsc174.jackswitzer.com
  /                             # Weekly summaries (current home)
  /notes, /tutorials, etc.      # Existing course content
```

---

## Data Model

### `/data/resume.json` - Structured resume data
```json
{
  "personal": { "name", "email", "github", "linkedin" },
  "education": { "institution", "degree", "majors", "gpa", "graduation" },
  "experience": [{ "id", "role", "company", "period", "accomplishments", "technologies" }],
  "skills": { "languages": [], "frameworks": [], "tools": [] }
}
```

### Project MDX Frontmatter (`/content/projects/*.mdx`)
```yaml
title: "Project Name"
projectType: work | personal | school | hackathon
technologies: ["Python", "PyTorch"]
tags: ["ml", "simulation"]
github: { repo: "user/repo", account: "jackswitzer" }
featured: true
accomplishments: ["Quantified achievement 1", "..."]
```

### Blog Post Frontmatter (`/content/blog/*.mdx`)
```yaml
title: "Money is Energy"
publishedAt: "2025-01-15"
tags: ["philosophy", "finance"]
summary: "..."
```

---

## Implementation Steps

### Phase 1: Foundation
1. Create route groups: `/(portfolio)` and `/(course)`
2. Update `/lib/config.ts` for multi-site support
3. Update `/middleware.ts` with subdomain routing
4. Create `/data/resume.json` from master resume .docx
5. Add project/blog content types to `/lib/content-types.ts`

### Phase 2: Portfolio Pages
1. Create portfolio layout with new nav (`/(portfolio)/layout.tsx`)
2. Build About/Home page (`/(portfolio)/page.tsx`)
3. Create Projects page with filter component (`/(portfolio)/projects/page.tsx`)
4. Create Blog listing page (`/(portfolio)/blog/page.tsx`)

### Phase 3: Components
1. `ProjectCard` - Visual card with tags, tech stack, GitHub link
2. `ProjectFilter` - Filter by type (work/personal/school/hackathon) and technology
3. `BlogCard` - Blog post preview card
4. `PortfolioNav` - New navigation for portfolio site

### Phase 4: Content
1. Create project MDX files in `/content/projects/`:
   - gulf-of-mexico-simulation.mdx
   - rbc-data-scientist.mdx (work experience as project)
   - rbc-data-analyst.mdx
   - slay-the-spire-rl.mdx
   - qhacks-chrono.mdx
   - handwritten-digit-recognition.mdx
   - linear-algebra-website.mdx (link to subdomain)
2. Create first blog post: `/content/blog/money-is-energy.mdx`

### Phase 5: Course Migration
1. Move existing pages under `/(course)` route group
2. Create course-specific layout with existing nav
3. Update course nav links for subdomain

### Phase 6: Deploy
1. Configure Vercel with both domains
2. Update `vercel.json` with subdomain rewrites
3. Set up DNS records for jackswitzer.com and apsc174.jackswitzer.com

---

## Key Files to Modify

| File | Changes |
|------|---------|
| `/app/layout.tsx` | Minimal root layout (move nav to route group layouts) |
| `/lib/config.ts` | Multi-site config with portfolio + course sections |
| `/middleware.ts` | Add subdomain detection and routing |
| `/lib/content-types.ts` | Add Project and BlogPost interfaces |
| `/vercel.json` | Add subdomain rewrite rules |

## New Files to Create

| File | Purpose |
|------|---------|
| `/app/(portfolio)/layout.tsx` | Portfolio layout with new nav |
| `/app/(portfolio)/page.tsx` | About/Home page |
| `/app/(portfolio)/projects/page.tsx` | Projects grid with filters |
| `/app/(portfolio)/blog/page.tsx` | Blog listing |
| `/app/(course)/layout.tsx` | Course layout (wrap existing) |
| `/app/components/portfolio/project-card.tsx` | Project display card |
| `/app/components/portfolio/project-filter.tsx` | Tag/type filtering |
| `/data/resume.json` | Structured resume data |
| `/content/projects/*.mdx` | Individual project content |
| `/content/blog/money-is-energy.mdx` | First blog post |

---

## Tagging System

### Project Types
- `work` - Professional experience (RBC roles)
- `personal` - Side projects (StSRLSolver, NYT-Games)
- `school` - Academic projects (APSC-200, MTHE393)
- `hackathon` - Competition projects (QHacks, RIT-Hackathon)

### Technology Tags
Auto-extracted from project `technologies` field for filtering

### Filter UI
- Chip-based multi-select for project types
- Dropdown or chip-select for technologies
- URL params for shareable filter states (e.g., `/projects?type=work&tech=python`)

---

## Notes
- The linear algebra website becomes a "project" on the portfolio with link to subdomain
- Resume .docx needs manual conversion to JSON (can use subagent)
- GitHub stats can be fetched via API with ISR caching
- **User will provide resume updates** - wait for new content before finalizing resume.json
- **Blog post "Money is Energy"** - create placeholder structure for user to fill in later
