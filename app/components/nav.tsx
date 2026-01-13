'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { path: '/', name: 'home' },
  { path: '/projects', name: 'projects' },
  { path: '/books', name: 'books' },
  { path: '/resume', name: 'resume' },
]

export function Navbar() {
  const pathname = usePathname() || '/'

  return (
    <nav className="border-b border-[var(--border)] pb-4">
      <div className="flex items-center gap-6">
        {navItems.map(({ path, name }) => {
          const isActive = pathname === path || (path !== '/' && pathname.startsWith(path))

          return (
            <Link
              key={path}
              href={path}
              className={`
                text-sm font-mono uppercase tracking-wide transition-colors
                ${isActive
                  ? 'text-[var(--accent)]'
                  : 'text-[var(--muted)] hover:text-[var(--ink)]'
                }
              `}
            >
              {name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
