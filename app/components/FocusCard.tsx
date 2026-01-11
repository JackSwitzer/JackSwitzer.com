import Link from "next/link";

type FocusCardProps = {
  title: string;
  subtitle: string;
  description: string;
  href?: string;
  tags: string[];
  status: "active" | "wip";
};

export function FocusCard({ title, subtitle, description, href, tags, status }: FocusCardProps) {
  const content = (
    <div className="group relative p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950 hover:border-blue-400 dark:hover:border-blue-600 transition-all hover:shadow-md">
      {/* Status badge */}
      <div className="absolute top-3 right-3">
        {status === "active" ? (
          <span className="flex items-center gap-1.5 text-xs px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Active
          </span>
        ) : (
          <span className="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 rounded-full">
            WIP
          </span>
        )}
      </div>

      {/* Content */}
      <div className="pr-16">
        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
          {subtitle}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-3">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}
