"use client";

type TimelineItem = {
  date: string;
  title: string;
  subtitle?: string;
  type: "work" | "education" | "leadership" | "project" | "hackathon";
};

const timelineData: TimelineItem[] = [
  // 2027
  { date: "May 2027", title: "B.ASc. Graduation", subtitle: "Queen's University", type: "education" },

  // 2026
  { date: "Jan 2026", title: "Interpretability Research", subtitle: "SAE + Quantization", type: "project" },

  // 2025
  { date: "May 2025 - Apr 2026", title: "Software Developer", subtitle: "IBM - WatsonX Code Assistant for Z", type: "work" },
  { date: "Jul 2025 - Jan 2026", title: "Future Blue President", subtitle: "IBM Intern Council", type: "leadership" },
  { date: "Jan - Apr 2025", title: "Teaching Assistant", subtitle: "Linear Algebra I", type: "work" },
  { date: "Jan - Apr 2025", title: "Project Manager", subtitle: "Queen's Startup Consulting", type: "leadership" },
  { date: "Jan - Apr 2025", title: "MTHE393 Control Systems", subtitle: "Black Box Identification", type: "project" },
  { date: "Jan 2025", title: "QHacks 2025", subtitle: "Chrono - Linguistic Forecasting", type: "hackathon" },

  // 2024
  { date: "Nov 2024", title: "McGill FAIM Hackathon", subtitle: "Portfolio Optimization", type: "hackathon" },
  { date: "Dec 2024", title: "Advent of Code 2024", subtitle: "8 languages, 29 stars", type: "project" },
  { date: "Sep 2024 - Apr 2025", title: "Campus Ambassador", subtitle: "Royal Bank of Canada", type: "leadership" },
  { date: "Sep 2024 - Apr 2025", title: "Project Manager", subtitle: "QUANTT (2 teams)", type: "leadership" },
  { date: "Sep - Dec 2024", title: "Consultant", subtitle: "Queen's Startup Consulting", type: "leadership" },
  { date: "May - Aug 2024", title: "Data Scientist", subtitle: "Royal Bank of Canada", type: "work" },
  { date: "Jan - Apr 2024", title: "APSC 200", subtitle: "Gulf of Mexico Simulation", type: "project" },
  { date: "Jan 2024", title: "QHacks 2024", subtitle: "AI Financial Advisor", type: "hackathon" },

  // 2023
  { date: "Sep 2023 - Apr 2024", title: "Analyst", subtitle: "QUANTT", type: "leadership" },
  { date: "May - Aug 2023", title: "Data Analyst", subtitle: "Royal Bank of Canada", type: "work" },

  // 2022
  { date: "Sep 2022", title: "Started University", subtitle: "Queen's - Math & Computer Engineering", type: "education" },
];

const typeColors = {
  work: "bg-blue-500",
  education: "bg-green-500",
  leadership: "bg-purple-500",
  project: "bg-orange-500",
  hackathon: "bg-pink-500",
};

const typeLabels = {
  work: "Work",
  education: "Education",
  leadership: "Leadership",
  project: "Project",
  hackathon: "Hackathon",
};

// Format date display - show full range for multi-year spans, abbreviated for same-year
function formatDateDisplay(date: string, groupYear: string): string {
  const years = date.match(/20\d{2}/g) || [];

  // Multi-year range (e.g., "May 2025 - Apr 2026")
  if (years.length >= 2 && years[0] !== years[years.length - 1]) {
    // Show abbreviated format: "May '25 - Apr '26"
    return date.replace(/20(\d{2})/g, "'$1");
  }

  // Same year range or single date - strip the year since it's in the group header
  const stripped = date.replace(/20\d{2}/g, '').replace(/^\s*-?\s*/, '').trim();
  return stripped || groupYear;
}

export function Timeline() {
  // Group by year
  const groupedByYear: Record<string, TimelineItem[]> = {};

  timelineData.forEach(item => {
    const year = item.date.match(/20\d{2}/)?.[0] || "2022";
    if (!groupedByYear[year]) groupedByYear[year] = [];
    groupedByYear[year].push(item);
  });

  const years = Object.keys(groupedByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-neutral-200 dark:bg-neutral-800" />

      <div className="space-y-6">
        {years.map((year) => (
          <div key={year} className="relative pl-10">
            {/* Year marker */}
            <div className="absolute left-0 w-6 h-6 rounded-full bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white dark:bg-black" />
            </div>

            {/* Year label */}
            <div className="font-mono text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              {year}
            </div>

            {/* Items for this year */}
            <div className="space-y-2">
              {groupedByYear[year].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 text-sm"
                >
                  <div className={`w-2 h-2 rounded-full ${typeColors[item.type]} mt-1.5 shrink-0`} />
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-medium text-neutral-800 dark:text-neutral-200">
                        {item.title}
                      </span>
                      <span className="text-xs text-neutral-400 dark:text-neutral-500 font-mono">
                        {formatDateDisplay(item.date, year)}
                      </span>
                    </div>
                    {item.subtitle && (
                      <span className="text-neutral-500 dark:text-neutral-400 text-xs">
                        {item.subtitle}
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
        {Object.entries(typeColors).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${color}`} />
            <span className="text-neutral-600 dark:text-neutral-400">{typeLabels[type as keyof typeof typeLabels]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
