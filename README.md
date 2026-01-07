# Jack Switzer - Personal Portfolio

## Quick Start
```bash
bun install
bun run dev        # Start Next.js dev server
bunx convex dev    # Start Convex backend (separate terminal)
```

## Next Steps (Priority Order)

### 1. Content Polish
- [ ] **Chrono project** - Clean up description and accomplishments, consider featuring
- [ ] **StSRLSolver project** - Update with latest progress, add demo/screenshots
- [ ] Soup up resume bullet points - make accomplishments more impactful
- [ ] Review all project summaries for consistency

### 2. UI/UX Improvements
- [ ] Add project detail pages with full content
- [ ] Improve print styling for resume PDF export
- [ ] Add dark/light mode toggle
- [ ] Mobile responsiveness review

### 3. Additional Features
- [ ] Scapcentre chatbot - make visible when ready
- [ ] Add blog section (optional)
- [ ] Analytics integration

---

## Tech Stack
- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Convex (real-time database)
- **Content:** MDX for project writeups

## Data Management
All portfolio data is in `/convex/seed.ts`. To update:
```bash
bunx convex run seed:seedFromResume
```

## Featured Projects (About Page)
Currently showing: IBM, RBC Data Scientist, RBC Data Analyst, NYT Games, Linear Algebra

---

template from: https://portfolio-blog-starter.vercel.app
