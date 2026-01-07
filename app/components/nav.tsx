'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Content, ContentType } from '@/lib/content-types'

// Static nav items that are always present
const staticNavItems = {
  '/': {
    name: 'home',
    order: 0
  },
  '/portfolio': {
    name: 'about',
    order: 1
  },
  '/portfolio/projects': {
    name: 'projects',
    order: 2
  },
  '/portfolio/resume': {
    name: 'resume',
    order: 3
  },
  '/notes': {
    name: 'notes',
    order: 4
  },
  '/course-resources': {
    name: 'resources',
    order: 5
  },
  '/tutorials': {
    name: 'tutorials',
    order: 6
  }
}

export function Navbar() {
  const pathname = usePathname() || '/'

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(staticNavItems).map(([path, { name }]) => {
              const isActive = pathname === path ||
                (path !== '/' && pathname.startsWith(path))

              return (
                <Link
                  key={path}
                  href={path}
                  className={`
                    transition-all hover:text-neutral-800 dark:hover:text-neutral-200 
                    flex align-middle relative py-1 px-2 m-1
                    ${isActive ? 'font-semibold' : ''}
                  `}
                >
                  {name}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </aside>
  )
}
