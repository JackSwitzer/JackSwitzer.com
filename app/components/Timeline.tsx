"use client";

type TimelineItem = {
  startDate: Date;
  endDate?: Date; // undefined = single point in time
  title: string;
  subtitle?: string;
  type: "work" | "education" | "leadership" | "project" | "hackathon";
};

// Parse "Mon YYYY" or "YYYY" to Date
function parseDate(str: string): Date {
  const months: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
  };

  const monthMatch = str.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})$/);
  if (monthMatch) {
    return new Date(parseInt(monthMatch[2]), months[monthMatch[1]]);
  }

  const yearMatch = str.match(/^(\d{4})$/);
  if (yearMatch) {
    return new Date(parseInt(yearMatch[1]), 0);
  }

  return new Date();
}

const timelineData: TimelineItem[] = [
  // Education
  { startDate: parseDate("May 2027"), title: "B.ASc. Graduation", subtitle: "Queen's University", type: "education" },
  { startDate: parseDate("Sep 2022"), title: "Started University", subtitle: "Queen's - Math & Computer Engineering", type: "education" },

  // Work - ranges
  { startDate: parseDate("May 2025"), endDate: parseDate("Apr 2026"), title: "AI Engineer", subtitle: "IBM - WatsonX Code Assistant for Z", type: "work" },
  { startDate: parseDate("Jan 2025"), endDate: parseDate("Apr 2025"), title: "Teaching Assistant", subtitle: "Linear Algebra I", type: "work" },
  { startDate: parseDate("May 2024"), endDate: parseDate("Aug 2024"), title: "Data Scientist", subtitle: "Royal Bank of Canada", type: "work" },
  { startDate: parseDate("May 2023"), endDate: parseDate("Aug 2023"), title: "Data Analyst", subtitle: "Royal Bank of Canada", type: "work" },

  // Leadership - ranges
  { startDate: parseDate("Jul 2025"), endDate: parseDate("Jan 2026"), title: "Future Blue President", subtitle: "IBM Intern Council", type: "leadership" },
  { startDate: parseDate("Jan 2025"), endDate: parseDate("Apr 2025"), title: "Project Manager", subtitle: "Queen's Startup Consulting", type: "leadership" },
  { startDate: parseDate("Sep 2024"), endDate: parseDate("Apr 2025"), title: "Campus Ambassador", subtitle: "Royal Bank of Canada", type: "leadership" },
  { startDate: parseDate("Sep 2024"), endDate: parseDate("Apr 2025"), title: "Project Manager", subtitle: "QUANTT (2 teams)", type: "leadership" },
  { startDate: parseDate("Sep 2024"), endDate: parseDate("Dec 2024"), title: "Consultant", subtitle: "Queen's Startup Consulting", type: "leadership" },
  { startDate: parseDate("Sep 2023"), endDate: parseDate("Apr 2024"), title: "Analyst", subtitle: "QUANTT", type: "leadership" },

  // Projects - ranges
  { startDate: parseDate("Jan 2026"), title: "Interpretability Research", subtitle: "SAE + Quantization", type: "project" },
  { startDate: parseDate("Jan 2025"), endDate: parseDate("Apr 2025"), title: "MTHE393 Control Systems", subtitle: "Black Box Identification", type: "project" },
  { startDate: parseDate("Jan 2024"), endDate: parseDate("Apr 2024"), title: "APSC 200", subtitle: "Gulf of Mexico Simulation", type: "project" },
  { startDate: parseDate("Dec 2024"), title: "Advent of Code 2024", subtitle: "8 languages, 29 stars", type: "project" },

  // Hackathons - single points
  { startDate: parseDate("Jan 2025"), title: "QHacks 2025", subtitle: "Chrono - Linguistic Forecasting", type: "hackathon" },
  { startDate: parseDate("Nov 2024"), title: "McGill FAIM Hackathon", subtitle: "Portfolio Optimization", type: "hackathon" },
  { startDate: parseDate("Jan 2024"), title: "QHacks 2024", subtitle: "AI Financial Advisor", type: "hackathon" },
];

const typeColors = {
  work: { bg: "bg-blue-500", light: "bg-blue-200 dark:bg-blue-900" },
  education: { bg: "bg-green-500", light: "bg-green-200 dark:bg-green-900" },
  leadership: { bg: "bg-purple-500", light: "bg-purple-200 dark:bg-purple-900" },
  project: { bg: "bg-orange-500", light: "bg-orange-200 dark:bg-orange-900" },
  hackathon: { bg: "bg-pink-500", light: "bg-pink-200 dark:bg-pink-900" },
};

const typeLabels = {
  work: "Work",
  education: "Education",
  leadership: "Leadership",
  project: "Project",
  hackathon: "Hackathon",
};

// Timeline range: Sep 2022 to May 2027
const TIMELINE_START = new Date(2022, 8); // Sep 2022
const TIMELINE_END = new Date(2027, 4); // May 2027
const TOTAL_MONTHS = (TIMELINE_END.getFullYear() - TIMELINE_START.getFullYear()) * 12 +
                     (TIMELINE_END.getMonth() - TIMELINE_START.getMonth());

function dateToPercent(date: Date): number {
  const months = (date.getFullYear() - TIMELINE_START.getFullYear()) * 12 +
                 (date.getMonth() - TIMELINE_START.getMonth());
  return (months / TOTAL_MONTHS) * 100;
}

function formatMonth(date: Date): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function Timeline() {
  // Group items by type for row layout
  const groupedByType: Record<string, TimelineItem[]> = {};

  timelineData.forEach(item => {
    if (!groupedByType[item.type]) groupedByType[item.type] = [];
    groupedByType[item.type].push(item);
  });

  // Sort each group by start date
  Object.values(groupedByType).forEach(items => {
    items.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  });

  const typeOrder: (keyof typeof typeColors)[] = ["work", "education", "leadership", "project", "hackathon"];
  const years = [2022, 2023, 2024, 2025, 2026, 2027];

  return (
    <div className="relative">
      {/* Year markers at top */}
      <div className="relative h-6 mb-2">
        {years.map(year => {
          const percent = dateToPercent(new Date(year, 0));
          return (
            <div
              key={year}
              className="absolute text-xs font-mono text-neutral-500 dark:text-neutral-400 -translate-x-1/2"
              style={{ left: `${Math.max(2, Math.min(98, percent))}%` }}
            >
              {year}
            </div>
          );
        })}
      </div>

      {/* Timeline rows by type */}
      <div className="space-y-3">
        {typeOrder.map(type => {
          const items = groupedByType[type] || [];
          if (items.length === 0) return null;

          return (
            <div key={type} className="relative">
              {/* Type label */}
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full ${typeColors[type].bg}`} />
                <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  {typeLabels[type]}
                </span>
              </div>

              {/* Timeline track */}
              <div className="relative h-8 bg-neutral-100 dark:bg-neutral-800 rounded">
                {/* Year gridlines */}
                {years.map(year => {
                  const percent = dateToPercent(new Date(year, 0));
                  return (
                    <div
                      key={year}
                      className="absolute top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-700"
                      style={{ left: `${percent}%` }}
                    />
                  );
                })}

                {/* Items */}
                {items.map((item, idx) => {
                  const startPercent = dateToPercent(item.startDate);
                  const endPercent = item.endDate ? dateToPercent(item.endDate) : startPercent;
                  const isPoint = !item.endDate;
                  const width = Math.max(endPercent - startPercent, 0.5);

                  return (
                    <div
                      key={idx}
                      className="absolute top-1 bottom-1 group cursor-pointer"
                      style={{
                        left: `${startPercent}%`,
                        width: isPoint ? '8px' : `${width}%`,
                        minWidth: isPoint ? '8px' : '4px'
                      }}
                    >
                      {isPoint ? (
                        // Single point - dot
                        <div className={`w-2 h-2 rounded-full ${typeColors[type].bg} mt-2`} />
                      ) : (
                        // Range - bar
                        <div className={`h-full rounded ${typeColors[type].light} border-l-2 ${typeColors[type].bg.replace('bg-', 'border-')}`} />
                      )}

                      {/* Tooltip */}
                      <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-20">
                        <div className="bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">
                          <div className="font-medium">{item.title}</div>
                          {item.subtitle && <div className="text-neutral-300 dark:text-neutral-600">{item.subtitle}</div>}
                          <div className="text-neutral-400 dark:text-neutral-500 mt-0.5">
                            {formatMonth(item.startDate)}{item.endDate ? ` - ${formatMonth(item.endDate)}` : ''}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Now marker */}
      <div
        className="absolute top-6 bottom-0 w-0.5 bg-red-500 z-10"
        style={{ left: `${dateToPercent(new Date())}%` }}
      >
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-red-500 font-mono">
          Now
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 text-xs">
        {Object.entries(typeColors).map(([type, colors]) => (
          <div key={type} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${colors.bg}`} />
            <span className="text-neutral-600 dark:text-neutral-400">{typeLabels[type as keyof typeof typeLabels]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
