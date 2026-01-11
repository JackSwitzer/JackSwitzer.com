import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Page Not Found</h2>
      <p className="text-neutral-600 dark:text-neutral-400">
        This page doesn't exist yet. If you feel this is missing or would like to contribute, 
        please refer to our GitHub repository:
      </p>
      <div className="flex flex-col space-y-3">
        <Link 
          href="https://github.com/JackSwitzerSchool/APSC174"
          className="text-blue-500 hover:text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/JackSwitzerSchool/APSC174
        </Link>
        <Link 
          href="/"
          className="text-blue-500 hover:text-blue-600 hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
