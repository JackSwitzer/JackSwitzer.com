// Static data for portfolio - no database needed

export const personal = {
  name: "Jack Switzer",
  email: "jackswitzer3@gmail.com",
  github: "jackswitzer",
  githubSchool: "JackSwitzerSchool",
  linkedin: "https://www.linkedin.com/in/jack-switzer-/",
};

export const education = {
  institution: "Queen's University",
  degree: "Bachelor of Applied Mathematics & Computer Engineering",
  gpa: "3.35",
  graduation: "May 2027",
  relevantCourses: [
    "Object Oriented Programming",
    "Data Structures and Algorithms",
    "Computer Architecture",
    "Digital Systems",
    "Algorithms I",
    "Microprocessor Systems",
    "Fundamentals of Software Development",
    "Probability I & II",
    "Linear Algebra I & II",
    "Real Analysis I & II",
    "Complex Analysis",
    "Quantitative Trading Strategy (COMM420)",
    "Database Programming",
    "Math of Engineering Systems",
  ],
};

export const experience = [
  {
    id: "ibm-ai-engineer",
    role: "AI Engineer",
    company: "IBM",
    period: "May 2025 - April 2026",
    accomplishments: [
      "Developing AI tooling for Mainframe Code Assistant - code understanding and translation (COBOL, PL/1 to Java, Python)",
      "Designed and implemented benchmark pipeline evaluating Claude, Llama, Mistral, and internal models - results directly influenced product model selection",
      "Shipped data dictionary feature to production: enriches LLM context with variable definitions, types, and usage patterns from legacy code for higher-quality code explanations",
      "Extended VSCode extension with A2A and MCP integrations, connecting IBM's existing profiling tools to AI workflows for richer code explanations",
      "Led IBM's Future Blue intern council as President; organized executive networking events with IBM Canada President and senior VPs",
    ],
    technologies: ["Python", "Java", "COBOL", "PL/1", "VSCode Extensions", "MCP", "A2A", "LLM", "AI Agents"],
  },
  {
    id: "ta-linear-algebra",
    role: "Teaching Assistant: Linear Algebra I",
    company: "Queen's University",
    period: "Jan 2025 - Apr 2025",
    accomplishments: [
      "Led 2 weekly tutorials, proctored midterms, ran pre-exam helpdesks and EngLinks review sessions for 80+ students",
      "Built learning platform (apsc174.jackswitzer.com) with interactive visualizations used by 80+ students",
    ],
    technologies: ["Next.js", "MDX", "TypeScript", "Tailwind CSS", "KaTeX"],
  },
  {
    id: "rbc-data-scientist",
    role: "Data Scientist",
    company: "Royal Bank of Canada",
    period: "May 2024 - Aug 2024",
    accomplishments: [
      "Implemented time series forecasting with Prophet and LSTM, reducing forecast error by 50% - enabled precise capacity planning, reducing overhiring by ~50 FTE",
      "Led 3-week sprint to refactor codebase and migrate to GitHub",
      "Built Excel visualization tool for dynamic forecast interaction",
    ],
    technologies: ["Python", "Prophet", "LSTM", "PyTorch", "Excel", "Git"],
  },
  {
    id: "rbc-data-analyst",
    role: "Data Analyst",
    company: "Royal Bank of Canada",
    period: "May 2023 - Aug 2023",
    accomplishments: [
      "Automated weekly visualization of key business metrics, saving 8 hours weekly",
      "Conducted time series analysis with SARIMA achieving less than 5% error",
      "Designed and taught Python course to team of twelve; established coding practices that enabled team to scale from 2 to 4 developers",
    ],
    technologies: ["Python", "SARIMA", "Pandas", "Data Visualization"],
  },
];

export const extracurriculars = [
  {
    id: "future-blue-member",
    role: "Future Blue Member",
    organization: "IBM",
    period: "May 2025 - Jul 2025",
    accomplishments: [
      "Member of IBM's intern student council",
    ],
    link: "https://www.linkedin.com/posts/ashwinbalu_ibmcanada-internshipexperience-leadership-activity-7379305095907299328-ifXj",
  },
  {
    id: "future-blue-president",
    role: "President - Future Blue",
    organization: "IBM",
    period: "Jul 2025 - Jan 2026",
    accomplishments: [
      "Led IBM's intern student council as President",
      "Organized 3 major networking events including meetings with IBM Canada President and 2 VPs",
      "Planned and executed holiday party and social events for intern community",
    ],
    link: "https://www.linkedin.com/posts/ashwinbalu_ibmcanada-internshipexperience-leadership-activity-7379305095907299328-ifXj",
  },
  {
    id: "future-blue-2026",
    role: "Future Blue",
    organization: "IBM",
    period: "Jan 2026 - Apr 2026",
    accomplishments: [
      "Continued leadership on IBM's intern student council",
    ],
    link: "https://www.linkedin.com/posts/ashwinbalu_ibmcanada-internshipexperience-leadership-activity-7379305095907299328-ifXj",
  },
  {
    id: "qsc",
    role: "QSC Analyst → PM",
    organization: "Queen's Startup Consulting",
    period: "Sep 2024 - Apr 2025",
    accomplishments: [
      "Analyst (Fall 2024): Provided strategic consulting to early-stage startups",
      "Project Manager (Spring 2025): Led consulting engagements and managed client relationships",
    ],
  },
  {
    id: "rbc-campus-ambassador",
    role: "Campus Ambassador",
    organization: "Royal Bank of Canada",
    period: "Sep 2024 - Apr 2025",
    accomplishments: [
      "Worked with RBC campus recruitment team to engage Queen's University students",
      "Selected due to strong manager and team advocacy based on project contributions",
    ],
  },
  {
    id: "quantt",
    role: "QUANTT PM",
    organization: "QUANTT (Queen's Quantitative Trading Team)",
    period: "Sep 2024 - Mar 2025",
    accomplishments: [
      "Project Manager: Managed 2 teams developing quantitative trading strategies using ML and NLP",
      "Taught data science and machine learning sessions to 60+ club members",
    ],
    github: [
      { repo: "Quantt-5", account: "JackSwitzerSchool" },
      { repo: "Quantt-7", account: "JackSwitzerSchool" },
    ],
  },
];

export const skills = {
  languages: ["Python", "Java", "C", "C++", "Assembly (NIOS II)", "R", "OCaml", "Rust", "Swift", "MATLAB", "Go"],
  libraries: ["Pandas", "NumPy", "PyTorch", "SARIMA", "SciPy", "Prophet", "Scikit-learn"],
  tools: ["Git", "GitHub", "Docker", "Excel", "Next.js", "TypeScript", "Tailwind CSS", "VSCode Extensions", "MCP"],
  externalCourses: [
    "Udemy Machine Learning",
    "Andrej Karpathy's ML series",
    "DataCamp R for Finance I & II",
  ],
};

export type Project = {
  slug: string;
  name: string;
  type: "work" | "personal" | "school" | "hackathon" | "consulting" | "quant" | "research";
  organization?: string;
  period: string;
  featured: boolean;
  visible: boolean;
  status: "active" | "complete" | "wip";
  summary: string;
  accomplishments: string[];
  technologies: string[];
  github?: { repo: string; account: string; branch?: string };
  link?: string;
};

export const projects: Project[] = [
  {
    slug: "qwen-interpretability",
    name: "Quantization x Interpretability",
    type: "research",
    period: "Jan 2026",
    featured: true,
    visible: true,
    status: "complete",
    summary: "Research investigating how model quantization affects sparse autoencoders (SAEs). Found SAEs transfer across precisions (99% correlation), code generation degrades 50% at INT4 while knowledge retrieval survives, and undercomplete SAEs (fewer features than model dimension) transfer 2.3x better than overcomplete ones.",
    accomplishments: [
      "Discovered SAEs transfer across precisions with 99% sample correlation (BF16→INT4)",
      "Found structured degradation: code generation breaks 50% at INT4, knowledge retrieval stable",
      "Undercomplete SAEs (0.5x model dimension, 1024 features) transfer 2.3x better than overcomplete (8x, 16k features)",
      "Trained 168 SAEs across 2 models (Qwen3-30B, StarCoder2-15B), 4 precisions, multiple layers",
    ],
    technologies: ["Python", "PyTorch", "SAELens", "bitsandbytes", "Transformers"],
    github: { repo: "QuantizationInterpretability", account: "JackSwitzer" },
  },
  {
    slug: "ibm-ai-engineer",
    name: "AI Engineer - Mainframe Code Assistant",
    type: "work",
    organization: "IBM",
    period: "May 2025 - April 2026",
    featured: true,
    visible: true,
    status: "active",
    summary: "AI Engineer at IBM building AI tooling for Mainframe Code Assistant - enabling mainframe code understanding and translation using LLMs.",
    accomplishments: [
      "Developing AI tooling for Mainframe Code Assistant - code understanding and translation (COBOL, PL/1 to Java, Python)",
      "Designed and implemented benchmark pipeline evaluating Claude, Llama, Mistral, and internal models - results directly influenced product model selection",
      "Shipped data dictionary feature to production: enriches LLM context with variable definitions, types, and usage patterns from legacy code",
      "Extended VSCode extension with A2A and MCP integrations, connecting IBM's existing profiling tools to AI workflows",
    ],
    technologies: ["Python", "Java", "TypeScript", "COBOL", "PL/1", "VSCode Extensions", "MCP"],
  },
  {
    slug: "slay-the-spire-rl",
    name: "Slay the Spire Watcher Solver",
    type: "research",
    period: "Jan 2026 - Apr 2026",
    featured: true,
    visible: true,
    status: "wip",
    summary: "Reinforcement learning agent targeting 100% win rate on Slay the Spire Watcher at Ascension 20 (top players achieve ~90%).",
    accomplishments: [
      "Developing RL agent targeting 100% win rate on Slay the Spire Watcher at Ascension 20 (top players achieve ~90%)",
      "Designing behavioral cloning approach using official game run data",
      "Engineering high-level strategic features including kill probability calculations",
    ],
    technologies: ["Python", "PyTorch", "RL", "Behavioral Cloning"],
    github: { repo: "StSRLSolver", account: "jackswitzer" },
  },
  {
    slug: "nyt-games",
    name: "NYT Games Solver",
    type: "personal",
    period: "Jan 2025 - Feb 2025",
    featured: false,
    visible: true,
    status: "complete",
    summary: "Interactive solvers for New York Times word puzzle games with web UI.",
    accomplishments: [
      "Built puzzle solvers for NYT LetterBoxed and Spelling Bee games",
      "Implemented efficient word search algorithms",
      "Created interactive web interface for solving puzzles",
    ],
    technologies: ["TypeScript", "Next.js", "React"],
    github: { repo: "NYT-Games", account: "jackswitzer" },
    link: "/nyt-games",
  },
  {
    slug: "qhacks2025-chrono",
    name: "Chrono - Linguistic Pattern Forecasting",
    type: "hackathon",
    period: "Jan 18 2025 - Jan 19 2025",
    featured: false,
    visible: true,
    status: "complete",
    summary: "Hackathon project forecasting linguistic patterns to predict how language evolves over time.",
    accomplishments: [
      "Built linguistic pattern forecasting system to predict language evolution",
      "Developed end-to-end ML pipeline including data preprocessing and voice synthesis",
      "Led team of 4 contributors across 52 commits in 36-hour hackathon",
    ],
    technologies: ["Python", "NLP", "Flask", "AWS Polly"],
    github: { repo: "QHacks2025", account: "JackSwitzerSchool" },
  },
  {
    slug: "linear-algebra-website",
    name: "Linear Algebra Learning Platform",
    type: "school",
    organization: "Queen's",
    period: "Jan 2025 - Apr 2025",
    featured: true,
    visible: true,
    status: "complete",
    summary: "Interactive website for teaching linear algebra fundamentals, built while TAing at Queen's University. Used as primary resource for 80+ students across 2 tutorial sections.",
    accomplishments: [
      "Built comprehensive learning platform with interactive visualizations for core linear algebra concepts",
    ],
    technologies: ["Next.js", "TypeScript", "MDX", "KaTeX"],
    github: { repo: "apsc174", account: "JackSwitzerSchool" },
    link: "https://apsc174.jackswitzer.com",
  },
  {
    slug: "gulf-of-mexico-simulation",
    name: "Gulf of Mexico Trash Collection Simulation",
    type: "school",
    organization: "Queen's",
    period: "Jan 2024 - Apr 2024",
    featured: false,
    visible: true,
    status: "complete",
    summary: "A multi-agent simulation system for optimizing garbage collection drone operations in the Gulf of Mexico.",
    accomplishments: [
      "Led team of 4 to develop Multi-Agent System for garbage collection optimization",
      "Used satellite imagery to simulate Gulf Stream and model garbage flow",
      "Implemented K-Means clustering leading to 20% efficiency improvement",
    ],
    technologies: ["MATLAB", "Multi-Agent Systems", "K-Means"],
    github: { repo: "APSC-200", account: "JackSwitzerSchool" },
  },
  {
    slug: "mthe393-control-systems",
    name: "Black Box Deconstruction - Control Systems",
    type: "school",
    period: "Jan 2025 - Apr 2025",
    featured: true,
    visible: true,
    status: "complete",
    summary: "Reverse-engineered unknown dynamic systems through experimental identification, designed stable PID controllers.",
    accomplishments: [
      "Deconstructed black-box systems to identify transfer functions",
      "Designed stable control systems using MATLAB/Simulink",
      "Implemented PID controllers with tuning for optimal transient response",
    ],
    technologies: ["MATLAB", "Simulink", "PID Control"],
    github: { repo: "MTHE393", account: "JackSwitzerSchool" },
  },
  {
    slug: "faim-hackathon",
    name: "McGill FAIM Hackathon - Portfolio Optimization",
    type: "quant",
    period: "Oct 2024",
    featured: false,
    visible: true,
    status: "complete",
    summary: "Led a team developing trading strategies using neural networks and portfolio optimization.",
    accomplishments: [
      "Led team of 5 developing trading strategy for McGill FAIM hackathon",
      "Used LSTM neural networks trained on Queen's University compute cluster",
      "Implemented Black-Litterman portfolio management technique",
    ],
    technologies: ["Python", "PyTorch", "LSTM", "Black-Litterman"],
    github: { repo: "FAIM-Personal", account: "jackswitzer" },
  },
  {
    slug: "quantt-analyst",
    name: "QUANTT - Options Pricing Model",
    type: "quant",
    period: "2023-2024",
    featured: false,
    visible: true,
    status: "complete",
    summary: "Built options pricing models using Monte Carlo simulation and the Heston model.",
    accomplishments: [
      "Participated in 10-week educational program in quantitative finance",
      "Implemented Monte Carlo simulation and Heston model to price AMD options to ~5% error",
    ],
    technologies: ["Python", "Monte Carlo", "Heston"],
  },
  {
    slug: "advent-of-code-2024",
    name: "Advent of Code 2024",
    type: "personal",
    period: "Dec 2024",
    featured: false,
    visible: false,
    status: "complete",
    summary: "Advent of Code 2024 solutions implemented across 8 programming languages.",
    accomplishments: [
      "Completed challenges in 8 different programming languages",
      "Achieved 29 stars across various algorithmic problems",
    ],
    technologies: ["Python", "Rust", "Go", "Java", "C", "OCaml", "R"],
    github: { repo: "AdventofCode", account: "jackswitzer" },
  },
  {
    slug: "rbc-data-scientist",
    name: "Data Scientist - Forecasting & Modelling",
    type: "work",
    organization: "RBC",
    period: "May 2024 - Aug 2024",
    featured: true,
    visible: true,
    status: "complete",
    summary: "Data Scientist role at Royal Bank of Canada, implementing advanced time series forecasting.",
    accomplishments: [
      "Implemented time series forecasting with Prophet and LSTM reducing error by 50%",
      "Led 3-week sprint to refactor codebase and migrate to GitHub",
      "Built Excel visualization tool for dynamic forecast interaction",
    ],
    technologies: ["Python", "PyTorch", "Prophet", "LSTM"],
  },
  {
    slug: "rbc-data-analyst",
    name: "Data Analyst - Automation & Visualization",
    type: "work",
    organization: "RBC",
    period: "May 2023 - Aug 2023",
    featured: false,
    visible: true,
    status: "complete",
    summary: "Data Analyst role at Royal Bank of Canada, focusing on automation and forecasting.",
    accomplishments: [
      "Automated weekly visualization of key business metrics saving 8 hours weekly",
      "Conducted time series analysis with SARIMA achieving less than 5% error",
      "Designed and taught Python course to team of twelve",
    ],
    technologies: ["Python", "SARIMA", "Pandas"],
  },
  {
    slug: "qhacks2024-financial-advisor",
    name: "QHacks 2024 - AI Financial Advisor",
    type: "hackathon",
    period: "Jan 2024",
    featured: false,
    visible: false,
    status: "complete",
    summary: "Hackathon project building an AI-powered financial advisor chatbot.",
    accomplishments: [
      "Built AI financial advisor chatbot at QHacks 2024",
      "Integrated financial APIs for real-time market data",
    ],
    technologies: ["Python", "OpenAI API", "Flask"],
    github: { repo: "qhacks24", account: "jackswitzer" },
  },
  {
    slug: "sol",
    name: "Sol",
    type: "personal",
    period: "Dec 2025",
    featured: false,
    visible: true,
    status: "complete",
    summary: "Sunrise alarm clock TUI to gently ease one into the world.",
    accomplishments: [
      "Built gradual sunrise simulation with configurable warmup duration",
      "Integrated with Kasa smart bulbs via python-kasa library",
      "Exposed as MCP server for Claude Desktop integration",
    ],
    technologies: ["Python", "TUI", "MCP", "asyncio"],
    github: { repo: "sol", account: "JackSwitzer" },
  },
];

// Helper functions
export function getFeaturedProjects() {
  return projects.filter(p => p.featured && p.visible);
}

export function getVisibleProjects() {
  return projects.filter(p => p.visible);
}

export function getProjectBySlug(slug: string) {
  return projects.find(p => p.slug === slug && p.visible) || null;
}

export function getAllTechnologies() {
  const techs = new Set<string>();
  projects.forEach(p => p.technologies.forEach(t => techs.add(t)));
  return Array.from(techs).sort();
}

// Timeline types and utilities
export type TimelineType = "work" | "education" | "leadership" | "project" | "hackathon";

export interface TimelineItem {
  id: string;
  title: string;
  displayTitle: string;
  subtitle?: string;
  type: TimelineType;
  startDate: Date;
  endDate?: Date;
  hasDetailPage: boolean;
  slug?: string;
  summary?: string;
  technologies?: string[];
  accomplishments?: string[];
  // Education-specific
  institution?: string;
  gpa?: string;
  courses?: string[];
  degree?: string;
  externalLink?: string;
}

const monthMap: Record<string, number> = {
  jan: 0, january: 0,
  feb: 1, february: 1,
  mar: 2, march: 2,
  apr: 3, april: 3,
  may: 4,
  jun: 5, june: 5,
  jul: 6, july: 6,
  aug: 7, august: 7,
  sep: 8, september: 8,
  oct: 9, october: 9,
  nov: 10, november: 10,
  dec: 11, december: 11,
};

function parsePeriodString(period: string): { start: Date; end?: Date } {
  const normalized = period.toLowerCase().trim();

  // Check for range with " - "
  if (normalized.includes(" - ")) {
    const [startPart, endPart] = normalized.split(" - ").map(s => s.trim());
    return {
      start: parseDate(startPart),
      end: parseDate(endPart),
    };
  }

  // Check for year range like "2023-2024"
  const yearRangeMatch = normalized.match(/^(\d{4})-(\d{4})$/);
  if (yearRangeMatch) {
    return {
      start: new Date(parseInt(yearRangeMatch[1]), 0, 1),
      end: new Date(parseInt(yearRangeMatch[2]), 11, 31),
    };
  }

  // Single date or year - for single month entries, set end to end of that month
  const start = parseDate(normalized);
  const monthYearMatch = normalized.match(/^([a-z]+)\s+(\d{4})$/);
  if (monthYearMatch) {
    const month = monthMap[monthYearMatch[1]] ?? 0;
    const year = parseInt(monthYearMatch[2]);
    const end = new Date(year, month + 1, 0);
    return { start, end };
  }
  return { start, end: undefined };
}

function parseDate(str: string): Date {
  const normalized = str.toLowerCase().trim();

  // Just a year like "2026"
  const yearOnly = normalized.match(/^(\d{4})$/);
  if (yearOnly) {
    return new Date(parseInt(yearOnly[1]), 0, 1);
  }

  // Full date like "Jan 18 2025" or "January 18 2025"
  const fullDate = normalized.match(/^([a-z]+)\s+(\d{1,2})\s+(\d{4})$/);
  if (fullDate) {
    const month = monthMap[fullDate[1]] ?? 0;
    const day = parseInt(fullDate[2]);
    const year = parseInt(fullDate[3]);
    return new Date(year, month, day);
  }

  // Month and year like "May 2025" or "Jan 2024"
  const monthYear = normalized.match(/^([a-z]+)\s+(\d{4})$/);
  if (monthYear) {
    const month = monthMap[monthYear[1]] ?? 0;
    const year = parseInt(monthYear[2]);
    return new Date(year, month, 1);
  }

  // Fallback: try to extract year
  const yearMatch = normalized.match(/(\d{4})/);
  if (yearMatch) {
    return new Date(parseInt(yearMatch[1]), 0, 1);
  }

  return new Date();
}

function mapProjectTypeToTimelineType(projectType: Project["type"]): TimelineType {
  switch (projectType) {
    case "work": return "work";
    case "hackathon": return "hackathon";
    default: return "project";
  }
}

// Display title mappings for timeline items
const displayTitleMap: Record<string, string> = {
  // Work
  "AI Engineer - Mainframe Code Assistant": "IBM: AI Tooling",
  "Data Scientist - Forecasting & Modelling": "RBC: Data Science",
  "Data Analyst - Automation & Visualization": "RBC: Data Analyst",
  // Research/Projects
  "Quantization x Interpretability": "Quant x Interp",
  "Slay the Spire Watcher Solver": "StS Solver",
  "Linear Algebra Learning Platform": "Lin Alg Site",
  "Black Box Deconstruction - Control Systems": "Black Box",
  "Gulf of Mexico Trash Collection Simulation": "Gulf Sim",
  "Chrono - Linguistic Pattern Forecasting": "Chrono",
  "McGill FAIM Hackathon - Portfolio Optimization": "FAIM",
  "QUANTT - Options Pricing Model": "QUANTT",
  "Sol": "Sol",
  "NYT Games Solver": "NYT Games",
  // Leadership
  "Teaching Assistant: Linear Algebra I": "Lin Alg TA",
  "QSC Analyst → PM": "QSC",
  "Campus Ambassador": "RBC Ambassador",
  "QUANTT PM": "QUANTT PM",
  "President - Future Blue": "Future Blue President",
  "Future Blue Member": "Future Blue",
  "Future Blue": "Future Blue",
  // Education - show year context
  "Queen's - 1st Year": "1st Year: Engineering",
  "Queen's - 2nd Year": "2nd Year: Applied Math",
  "Queen's - 3rd Year": "3rd Year: Applied Math",
  "Queen's - 4th Year": "4th Year: Applied Math",
};

function getDisplayTitle(title: string): string {
  return displayTitleMap[title] || title;
}

export function getTimelineItems(): TimelineItem[] {
  const items: TimelineItem[] = [];
  const processedIds = new Set<string>();

  // 1. Add projects (visible only), excluding QUANTT analyst (handled specially)
  projects.filter(p => p.visible && p.slug !== "quantt-analyst").forEach(project => {
    const { start, end } = parsePeriodString(project.period);
    processedIds.add(project.slug);

    items.push({
      id: `project-${project.slug}`,
      title: project.name,
      displayTitle: getDisplayTitle(project.name),
      subtitle: project.type === "work"
        ? experience.find(e => e.id === project.slug)?.company || project.type
        : project.type.charAt(0).toUpperCase() + project.type.slice(1),
      type: mapProjectTypeToTimelineType(project.type),
      startDate: start,
      endDate: end,
      hasDetailPage: true,
      slug: project.slug,
      summary: project.summary,
      technologies: project.technologies,
      accomplishments: project.accomplishments,
    });
  });

  // 2. Add QUANTT analyst with correct duration (just fall semester 2023)
  items.push({
    id: "quantt-analyst",
    title: "QUANTT - Options Pricing Model",
    displayTitle: "QUANTT",
    type: "project",
    startDate: new Date(2023, 8, 1), // Sep 2023
    endDate: new Date(2023, 11, 15), // Dec 2023
    hasDetailPage: true,
    slug: "quantt-analyst",
  });

  // 3. Add experiences NOT already in projects
  experience.forEach(exp => {
    if (!processedIds.has(exp.id)) {
      const { start, end } = parsePeriodString(exp.period);
      items.push({
        id: `exp-${exp.id}`,
        title: exp.role,
        displayTitle: getDisplayTitle(exp.role),
        subtitle: exp.company,
        type: "work",
        startDate: start,
        endDate: end,
        hasDetailPage: false,
        summary: exp.accomplishments[0],
        technologies: exp.technologies,
        accomplishments: exp.accomplishments,
      });
    }
  });

  // 4. Add extracurriculars as leadership
  extracurriculars.forEach(extra => {
    const { start, end } = parsePeriodString(extra.period);
    items.push({
      id: `extra-${extra.id}`,
      title: extra.role,
      displayTitle: getDisplayTitle(extra.role),
      subtitle: extra.organization,
      type: "leadership",
      startDate: start,
      endDate: end,
      hasDetailPage: false,
      accomplishments: extra.accomplishments,
      externalLink: extra.link,
    });
  });

  // 5. Add Queen's education by academic year (only during school: Sep-Apr)
  const queensYears = [
    { id: "queens-1", title: "Queen's - 1st Year", start: new Date(2022, 8, 1), end: new Date(2023, 3, 30) },
    { id: "queens-2", title: "Queen's - 2nd Year", start: new Date(2023, 8, 1), end: new Date(2024, 3, 30) },
    { id: "queens-3", title: "Queen's - 3rd Year", start: new Date(2024, 8, 1), end: new Date(2025, 3, 30) },
    // Gap year 2025-26 for IBM
    { id: "queens-4", title: "Queen's - 4th Year", start: new Date(2026, 8, 1), end: new Date(2027, 3, 30) },
  ];

  for (const q of queensYears) {
    items.push({
      id: q.id,
      title: q.title,
      displayTitle: getDisplayTitle(q.title),
      type: "education",
      startDate: q.start,
      endDate: q.end,
      hasDetailPage: false,
    });
  }

  // Sort by startDate ascending (2022 -> 2027)
  return items.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
}
