# APSC174 Backend Optimization Guide

Repository: `github.com/JackSwitzerSchool/APSC174`
Site: `apsc174.jackswitzer.com`

## Current Tech Stack

| Component | Version | Notes |
|-----------|---------|-------|
| Next.js | 14.2.23 | App Router |
| React | 18.2.0 | |
| TypeScript | 5.3.3 | |
| Tailwind CSS | 3.4.1 | |
| MDX | next-mdx-remote 4.4.1 | Runtime serialization |
| KaTeX | 0.16.9 | Math rendering |
| Deployment | Vercel | Single region (iad1) |

## Identified Performance Issues

### Critical (Causing Slow TTFB/LCP)

1. **No Static Generation**
   - File: `app/[...slug]/page.tsx`
   - Issue: Missing `generateStaticParams()` - all 58 pages are SSR'd on every request
   - Impact: ~500-1500ms added per page load

2. **Client-Side Only MDX**
   - File: `app/[...slug]/page.tsx` (line 7-10)
   - Issue: `dynamic(() => import(...), { ssr: false })` prevents server rendering
   - Impact: Content requires JS hydration to display

3. **Runtime MDX Serialization**
   - File: `lib/content.ts` (line 97)
   - Issue: `serialize()` runs on every request instead of build time
   - Impact: ~200-500ms per page

### High

4. **External KaTeX CSS**
   - File: `app/layout.tsx` (line 57-61)
   - Issue: CDN fetch blocks rendering
   - Fix: Self-host with `import 'katex/dist/katex.min.css'`

5. **Single Region Deployment**
   - File: `vercel.json` (line 6)
   - Issue: `"regions": ["iad1"]` - only Virginia
   - Fix: Add `["iad1", "sfo1", "cdg1"]` for US West + Europe

### Medium

6. **Overly Broad Middleware**
   - File: `middleware.ts`
   - Issue: Runs on every non-static request
   - Fix: Narrow matcher to only `/content/:path*`

7. **Unnecessary API Route**
   - File: `app/api/content/route.ts`
   - Issue: Re-serializes MDX on every API call
   - Fix: Remove entirely - not needed with static generation

8. **Manual Terser Config**
   - File: `next.config.js` (line 21-32)
   - Issue: Next.js handles this automatically
   - Fix: Remove the custom webpack optimization block

## Fix Implementation

### 1. Add Static Generation (HIGHEST PRIORITY)

In `app/[...slug]/page.tsx`, add:

```tsx
import { getNotes } from '@/app/notes/utils'

export const revalidate = 3600 // ISR: revalidate hourly

export async function generateStaticParams() {
  const notes = await getNotes()

  return [
    ...notes.map((note) => ({ slug: ['notes', note.slug] })),
    { slug: ['course-resources'] },
    { slug: ['tutorials'] },
    { slug: ['internships'] },
  ]
}
```

### 2. Enable Server-Side MDX Rendering

In `app/[...slug]/page.tsx`, change:

```tsx
// FROM:
const MDXContent = dynamic(() => import('@/app/components/mdx-content'), {
  ssr: false,
  loading: () => <div>Loading...</div>
})

// TO:
import MDXContent from '@/app/components/mdx-content'
```

In `app/components/mdx-content.tsx`, remove:
```tsx
'use client'  // DELETE THIS LINE
```

And remove all `memo()` wrappers (not needed for server components).

### 3. Self-Host KaTeX CSS

```bash
# KaTeX is already installed, just need to import differently
```

In `app/layout.tsx`:

```tsx
// ADD at top:
import 'katex/dist/katex.min.css'

// REMOVE the entire <head> block with the CDN link
```

### 4. Multi-Region Deployment

In `vercel.json`:

```json
{
  "regions": ["iad1", "sfo1", "cdg1"]
}
```

### 5. Simplify Middleware

Replace `middleware.ts` with:

```tsx
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith('/content/notes/')) {
    const slug = pathname.split('/').slice(3).join('/')
    return NextResponse.redirect(new URL(`/notes/${slug}`, request.url))
  }

  if (pathname.startsWith('/content/assets/')) {
    const assetPath = pathname.split('/').slice(3).join('/')
    return NextResponse.redirect(new URL(`/assets/${assetPath}`, request.url))
  }

  if (pathname.startsWith('/content/')) {
    const path = pathname.split('/').slice(2).join('/')
    return NextResponse.redirect(new URL(`/${path}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/content/:path*']
}
```

### 6. Clean Up next.config.js

Remove the entire webpack optimization block (lines 15-33). Next.js handles minification automatically.

### 7. Delete API Route

Remove the entire `app/api/content/` directory.

### 8. Add ISR to Notes Page

In `app/notes/page.tsx`, add at top level:

```tsx
export const revalidate = 3600
```

## Expected Impact

| Metric | Before | After |
|--------|--------|-------|
| TTFB | 800-1500ms | 50-200ms |
| LCP | 2-4s | 0.5-1.5s |
| FCP | 1.5-3s | 0.3-0.8s |
| Build time | ~30s | ~60s |
| Runtime compute | Every request | Zero (pre-built) |

## Content Structure Reference

```
content/
└── notes/           # 58 markdown files
    ├── Sets.md
    ├── Mapping.md
    ├── basis.md
    ├── eigen-stuff.md
    └── ...
```

## Key Files to Modify

1. `app/[...slug]/page.tsx` - Add generateStaticParams, remove dynamic import
2. `app/components/mdx-content.tsx` - Remove 'use client' and memo
3. `app/layout.tsx` - Self-host KaTeX CSS
4. `app/notes/page.tsx` - Add revalidate
5. `middleware.ts` - Simplify and narrow scope
6. `next.config.js` - Remove Terser config
7. `vercel.json` - Add regions
8. `app/api/content/route.ts` - DELETE

## Coherence with JackSwitzer.com

The optimized APSC174 will mirror JackSwitzer.com patterns:
- Both use `generateStaticParams` for static generation
- Similar simplified next.config.js
- Consistent Vercel analytics/speed-insights usage
- Same Geist font configuration
- Matching tailwind setup
