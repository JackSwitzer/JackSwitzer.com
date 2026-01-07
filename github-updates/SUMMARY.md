# GitHub Updates Summary

## Files Created

### 1. AdventofCode README
**File:** `AdventofCode-README.md`
**Repo:** `jackswitzer/AdventofCode`

Updates:
- Language breakdown table (14 days)
- ASCII bar chart of language usage
- Project structure documentation
- Running instructions per language
- Stats summary (29 stars, 8 languages)

### 2. NYT-Games README
**File:** `NYT-Games-README.md`
**Repo:** `jackswitzer/NYT-Games`

Updates:
- Added roadmap with checkbox tracking
- Phase 1: Additional games (Wordle, Connections, Strands)
- Phase 2: Full web UI (React/Next.js)
- Phase 3: Enhancements (better corpus, mobile)

### 3. StSRLSolver README
**File:** `StSRLSolver-README.md`
**Repo:** `jackswitzer/StSRLSolver`

Updates:
- WIP status badge
- Current progress checklist
- Architecture documentation
- Feature engineering details (44 features)
- 4-phase roadmap to 96% target
- Metrics table with targets

---

## How to Apply Updates

### Option A: Copy-paste each README

```bash
# AdventofCode
cd ~/repos/AdventofCode
cp /path/to/AdventofCode-README.md README.md
git add README.md && git commit -m "docs: Add comprehensive README with language breakdown"
git push

# NYT-Games
cd ~/repos/NYT-Games
cp /path/to/NYT-Games-README.md README.md
git add README.md && git commit -m "docs: Add roadmap for web UI and additional games"
git push

# StSRLSolver
cd ~/repos/StSRLSolver
cp /path/to/StSRLSolver-README.md README.md
git add README.md && git commit -m "docs: Add WIP status and development roadmap"
git push
```

### Option B: Create GitHub Issues for NYT-Games

If you want actual GitHub issues instead of README checkboxes:

```bash
gh issue create --repo jackswitzer/NYT-Games --title "Add Wordle solver" --body "Implement 5-letter word guessing with optimal feedback strategy"
gh issue create --repo jackswitzer/NYT-Games --title "Add Connections solver" --body "Implement grouping algorithm for 16 words into 4 categories"
gh issue create --repo jackswitzer/NYT-Games --title "Add Strands solver" --body "Implement theme-based word search solver"
gh issue create --repo jackswitzer/NYT-Games --title "Build React/Next.js web UI" --body "Phase 2: Full web interface with interactive puzzle input"
```

---

## Convex Updates Applied

1. **StSRLSolver** status changed from `active` to `wip`
2. **Linear Algebra Website** added as new featured project
   - Link: `https://linalg.jackswitzer.com`
   - Type: personal
   - Featured: yes

### To reseed Convex database:

```bash
# Clear existing data first (in Convex dashboard) then:
bunx convex functions:run seed:seedFromResume
```

---

## Linear Algebra Subdomain Setup

To move the linear algebra content to `linalg.jackswitzer.com`:

1. **DNS**: Add CNAME record `linalg` → your Vercel deployment
2. **Vercel**: Add `linalg.jackswitzer.com` as custom domain
3. **Content**: Either:
   - Deploy existing `/notes` content separately, OR
   - Set up redirect rules on main site

The project entry is already configured with link `https://linalg.jackswitzer.com`.
