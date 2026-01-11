"use client";

type TimelineItem = {
  year: string;
  items: {
    title: string;
    subtitle?: string;
    type: "work" | "education" | "leadership" | "project";
  }[];
};

const timelineData: TimelineItem[] = [
  {
    year: "2027",
    items: [
      { title: "B.ASc. Mathematics & Computer Engineering", subtitle: "Queen's University", type: "education" },
    ],
  },
  {
    year: "2025",
    items: [
      { title: "Software Developer", subtitle: "IBM", type: "work" },
      { title: "President, Future Blue Intern Council", subtitle: "IBM", type: "leadership" },
      { title: "Interpretability Research", subtitle: "SAE + Quantization", type: "project" },
    ],
  },
  {
    year: "2024",
    items: [
      { title: "Data Scientist", subtitle: "Royal Bank of Canada", type: "work" },
      { title: "Teaching Assistant", subtitle: "Queen's University", type: "work" },
      { title: "Project Manager", subtitle: "QUANTT", type: "leadership" },
    ],
  },
  {
    year: "2023",
    items: [
      { title: "Data Analyst", subtitle: "Royal Bank of Canada", type: "work" },
      { title: "Analyst", subtitle: "QUANTT", type: "leadership" },
    ],
  },
];

const typeColors = {
  work: "bg-blue-500",
  education: "bg-green-500",
  leadership: "bg-purple-500",
  project: "bg-orange-500",
};

export function Timeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-neutral-200 dark:bg-neutral-800" />

      <div className="space-y-6">
        {timelineData.map((yearGroup) => (
          <div key={yearGroup.year} className="relative pl-10">
            {/* Year marker */}
            <div className="absolute left-0 w-6 h-6 rounded-full bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white dark:bg-black" />
            </div>

            {/* Year label */}
            <div className="font-mono text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              {yearGroup.year}
            </div>

            {/* Items for this year */}
            <div className="space-y-2">
              {yearGroup.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-sm"
                >
                  <div className={`w-2 h-2 rounded-full ${typeColors[item.type]}`} />
                  <div>
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">
                      {item.title}
                    </span>
                    {item.subtitle && (
                      <span className="text-neutral-500 dark:text-neutral-400">
                        {" "}@ {item.subtitle}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <span className="text-neutral-600 dark:text-neutral-400">Work</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-neutral-600 dark:text-neutral-400">Education</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-purple-500" />
          <span className="text-neutral-600 dark:text-neutral-400">Leadership</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
          <span className="text-neutral-600 dark:text-neutral-400">Research</span>
        </div>
      </div>
    </div>
  );
}
