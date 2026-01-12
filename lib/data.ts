// Static data for portfolio - no database needed

export const personal = {
  name: "Jack Switzer",
  email: "jackswitzer3@gmail.com",
  github: "jackswitzer",
  githubSchool: "JackSwitzerSchool",
  linkedin: "https://linkedin.com/in/jackswitzer",
};

export const education = {
  institution: "Queen's University",
  degree: "Bachelor of Applied Mathematics & Computer Engineering",
  gpa: "3.7",
  graduation: "May 2027",
  certificate: "Certificate in Business",
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
    id: "ibm-software-developer",
    role: "Software Developer",
    company: "IBM",
    period: "May 2025 - April 2026",
    accomplishments: [
      "Working on translating legacy mainframe languages (COBOL, PL1, REXX) into modern compiled languages (Java, Python)",
      "Developed inference portion of new benchmark pipeline that influenced product model decisions",
      "Orchestrated new VSCode extension for high-quality code explanations with architecture schema visualization",
      "Developed MCP and subagent tooling for code explanation workflows",
      "Built first official feature adding data dictionary of all variables into the main explain pipeline",
      "Working on adding A2A (Agent-to-Agent) support with improved intricate subagent loops",
    ],
    technologies: ["Python", "Java", "COBOL", "VSCode Extensions", "MCP", "LLM", "AI Agents"],
  },
  {
    id: "ta-linear-algebra",
    role: "Teaching Assistant: Linear Algebra I",
    company: "Queen's University",
    period: "Jan 2025 - Apr 2025",
    accomplishments: [
      "Led 2 weekly tutorials teaching linear algebra fundamentals to 60 students",
      "Built learning platform (apsc174.jackswitzer.com) with interactive visualizations used by 120+ students",
    ],
    technologies: ["Next.js", "MDX", "TypeScript", "Tailwind CSS", "KaTeX"],
  },
  {
    id: "rbc-data-scientist",
    role: "Data Scientist",
    company: "Royal Bank of Canada",
    period: "May 2024 - Aug 2024",
    accomplishments: [
      "Implemented time series forecasting with Prophet and LSTM, reducing error by 50%",
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
      "Designed and taught Python course to team of twelve",
    ],
    technologies: ["Python", "SARIMA", "Pandas", "Data Visualization"],
  },
];

export const extracurriculars = [
  {
    id: "future-blue",
    role: "Member → President, Future Blue Intern Council",
    organization: "IBM",
    period: "May 2025 - Apr 2026",
    accomplishments: [
      "President (Jul 2025 - Jan 2026): Led IBM's intern student council",
      "Organized 3 major networking events including meetings with IBM Canada President and 2 VPs",
      "Planned and executed holiday party and social events for intern community",
    ],
    link: "https://www.linkedin.com/posts/ashwinbalu_ibmcanada-internshipexperience-leadership-activity-7379305095907299328-ifXj",
  },
  {
    id: "qsc",
    role: "Consultant → Project Manager",
    organization: "Queen's Startup Consulting",
    period: "Sep 2024 - Apr 2025",
    accomplishments: [
      "Consultant (Sep-Dec 2024): Provided strategic consulting to early-stage startups",
      "Project Manager (Jan-Apr 2025): Led consulting engagements and managed client relationships",
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
    role: "Analyst → Project Manager",
    organization: "QUANTT (Queen's Quantitative Trading Team)",
    period: "Sep 2023 - Apr 2025",
    accomplishments: [
      "Analyst (2nd year): Learned quantitative finance fundamentals and built options pricing models",
      "Project Manager (3rd year): Managed 2 teams developing quantitative trading strategies using ML and NLP",
      "Taught data science and machine learning sessions to 60+ club members",
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
  type: "work" | "personal" | "school" | "hackathon" | "consulting" | "quant";
  period: string;
  featured: boolean;
  visible: boolean;
  status: "active" | "complete" | "wip" | "paused";
  summary: string;
  accomplishments: string[];
  technologies: string[];
  tags: string[];
  github?: { repo: string; account: string };
  link?: string;
};

export const projects: Project[] = [
  {
    slug: "qwen-interpretability",
    name: "Quantization Degradation Analysis with SAEs",
    type: "personal",
    period: "Jan 2026",
    featured: true,
    visible: true,
    status: "wip",
    summary: "Studying quantization degradation in Qwen 3 Coder 30B using Sparse Autoencoders (SAEs) and benchmarks to understand how compression affects coding ability and general capabilities.",
    accomplishments: [
      "Investigating how quantization affects model capabilities using interpretability tools",
      "Applying Sparse Autoencoders to analyze feature degradation across quantization levels",
    ],
    technologies: ["Python", "SAE", "Interpretability", "LLM", "Quantization", "PyTorch"],
    tags: ["interpretability", "sae", "quantization", "llm-analysis", "mechanistic-interpretability"],
  },
  {
    slug: "ibm-software-developer",
    name: "IBM Software Developer - Mainframe Modernization",
    type: "work",
    period: "May 2025 - April 2026",
    featured: true,
    visible: true,
    status: "active",
    summary: "Software Developer at IBM working on mainframe modernization - translating legacy code to modern languages using AI-powered tools.",
    accomplishments: [
      "Working on translating legacy mainframe languages (COBOL, PL1, REXX) into modern languages",
      "Developed inference portion of new benchmark pipeline that influenced product model decisions",
      "Orchestrated new VSCode extension for high-quality code explanations",
      "Developed MCP and subagent tooling for code explanation workflows",
    ],
    technologies: ["Python", "Java", "COBOL", "VSCode Extensions", "MCP", "LLM", "AI Agents"],
    tags: ["internship", "mainframe", "ai", "modernization"],
  },
  {
    slug: "slay-the-spire-rl",
    name: "StSRLSolver",
    type: "personal",
    period: "2026",
    featured: true,
    visible: true,
    status: "paused",
    summary: "A reinforcement learning agent designed to achieve exceptional performance in Slay the Spire, targeting >96% win rate at the highest difficulty.",
    accomplishments: [
      "Developing RL agent targeting >96% win rate on Slay the Spire Watcher at Ascension 20",
      "Planning behavioral cloning approach using official game run data",
      "Designing high-level strategic features including kill probability calculations",
    ],
    technologies: ["Python", "Neural Networks", "Behavioral Cloning", "PyTorch"],
    tags: ["behavioral-cloning", "self-play", "feature-engineering", "game-ai"],
    github: { repo: "StSRLSolver", account: "jackswitzer" },
  },
  {
    slug: "nyt-games",
    name: "NYT Games Solver",
    type: "personal",
    period: "2025",
    featured: true,
    visible: true,
    status: "active",
    summary: "Interactive solvers for New York Times word puzzle games with web UI.",
    accomplishments: [
      "Built puzzle solvers for NYT LetterBoxed and Spelling Bee games",
      "Implemented efficient word search algorithms",
      "Created interactive web interface for solving puzzles",
    ],
    technologies: ["TypeScript", "React", "Next.js", "Algorithms"],
    tags: ["algorithms", "graph-search", "web-ui"],
    github: { repo: "NYT-Games", account: "jackswitzer" },
    link: "/nyt-games",
  },
  {
    slug: "qhacks2025-chrono",
    name: "Chrono - Linguistic Pattern Forecasting",
    type: "hackathon",
    period: "Jan 2025",
    featured: true,
    visible: true,
    status: "complete",
    summary: "A hackathon project that forecasts linguistic patterns to predict how language evolves over time.",
    accomplishments: [
      "Built linguistic pattern forecasting system to predict language evolution",
      "Developed end-to-end ML pipeline including data preprocessing and voice synthesis",
      "Led team of 4 contributors across 52 commits in 36-hour hackathon",
    ],
    technologies: ["Python", "NLP", "Machine Learning", "Flask", "AWS Polly"],
    tags: ["nlp", "time-series-forecasting", "voice-synthesis"],
    github: { repo: "QHacks2025", account: "JackSwitzerSchool" },
  },
  {
    slug: "linear-algebra-website",
    name: "Linear Algebra Learning Platform",
    type: "personal",
    period: "Jan 2025 - Apr 2025",
    featured: true,
    visible: true,
    status: "complete",
    summary: "Interactive website for teaching linear algebra fundamentals, built while TAing at Queen's University.",
    accomplishments: [
      "Built comprehensive learning platform with interactive visualizations",
      "Created custom MDX-based content system for mathematical notation",
      "Used as primary resource for 120+ students across 2 tutorial sections",
    ],
    technologies: ["Next.js", "TypeScript", "MDX", "Tailwind CSS", "KaTeX"],
    tags: ["education", "math", "teaching"],
    github: { repo: "apsc174", account: "JackSwitzerSchool" },
    link: "https://apsc174.jackswitzer.com",
  },
  {
    slug: "gulf-of-mexico-simulation",
    name: "Gulf of Mexico Trash Collection Simulation",
    type: "school",
    period: "Jan 2024 - Apr 2024",
    featured: false,
    visible: true,
    status: "complete",
    summary: "A multi-agent simulation system for optimizing garbage collection drone operations.",
    accomplishments: [
      "Led team of 4 to develop Multi-Agent System for garbage collection optimization",
      "Used satellite imagery to simulate Gulf Stream and model garbage flow",
      "Implemented K-Means clustering leading to 20% efficiency improvement",
    ],
    technologies: ["MATLAB", "Multi-Agent Systems", "K-Means Clustering", "Simulation"],
    tags: ["k-means", "multi-agent-systems", "optimization"],
    github: { repo: "APSC-200", account: "JackSwitzerSchool" },
  },
  {
    slug: "mthe393-control-systems",
    name: "MTHE393 Control Systems - Black Box Identification",
    type: "school",
    period: "Jan 2025 - Apr 2025",
    featured: true,
    visible: true,
    status: "complete",
    summary: "Analyzed unknown dynamic systems through experimental identification, designed stable control systems.",
    accomplishments: [
      "Deconstructed black-box systems to identify transfer functions",
      "Designed stable control systems using MATLAB/Simulink",
      "Implemented PID controllers with tuning for optimal transient response",
    ],
    technologies: ["MATLAB", "Simulink", "Control Theory", "System Identification"],
    tags: ["control-systems", "transfer-functions", "pid"],
    github: { repo: "MTHE393", account: "JackSwitzerSchool" },
  },
  {
    slug: "faim-hackathon",
    name: "McGill FAIM Hackathon - Portfolio Optimization",
    type: "quant",
    period: "Nov 2024",
    featured: false,
    visible: true,
    status: "complete",
    summary: "Led a team developing trading strategies using neural networks and portfolio optimization.",
    accomplishments: [
      "Led team of 5 developing trading strategy for McGill FAIM hackathon",
      "Used LSTM neural networks trained on Queen's University compute cluster",
      "Implemented Black-Litterman portfolio management technique",
    ],
    technologies: ["Python", "LSTM", "Elastic Net", "Black-Litterman", "PyTorch", "HPC"],
    tags: ["black-litterman", "lstm", "portfolio-optimization"],
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
    technologies: ["Python", "Monte Carlo", "Heston Model", "Options Pricing"],
    tags: ["monte-carlo", "heston-model", "options-pricing"],
    github: { repo: "Quantt-5", account: "JackSwitzerSchool" },
  },
  {
    slug: "advent-of-code-2024",
    name: "Advent of Code 2024",
    type: "personal",
    period: "Dec 2024",
    featured: false,
    visible: true,
    status: "complete",
    summary: "Advent of Code 2024 solutions implemented across 8 programming languages.",
    accomplishments: [
      "Completed challenges in 8 different programming languages",
      "Achieved 29 stars across various algorithmic problems",
    ],
    technologies: ["Python", "Rust", "Go", "Java", "C", "OCaml", "R"],
    tags: ["algorithms", "polyglot", "competitive-programming"],
    github: { repo: "AdventofCode", account: "jackswitzer" },
  },
  {
    slug: "rbc-data-scientist",
    name: "RBC Data Scientist",
    type: "work",
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
    technologies: ["Python", "Prophet", "LSTM", "PyTorch", "Excel", "Git"],
    tags: ["lstm", "prophet", "time-series-forecasting"],
  },
  {
    slug: "rbc-data-analyst",
    name: "RBC Data Analyst",
    type: "work",
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
    technologies: ["Python", "SARIMA", "Pandas", "Data Visualization"],
    tags: ["sarima", "time-series-forecasting", "automation"],
  },
  {
    slug: "qhacks2024-financial-advisor",
    name: "QHacks 2024 - AI Financial Advisor",
    type: "hackathon",
    period: "Jan 2024",
    featured: false,
    visible: true,
    status: "complete",
    summary: "Hackathon project building an AI-powered financial advisor chatbot.",
    accomplishments: [
      "Built AI financial advisor chatbot at QHacks 2024",
      "Integrated financial APIs for real-time market data",
    ],
    technologies: ["Python", "OpenAI API", "Flask"],
    tags: ["hackathon", "ai", "finance", "chatbot"],
    github: { repo: "qhacks24", account: "jackswitzer" },
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
  // Handle formats:
  // "May 2025 - April 2026" -> { start: Date(2025, 4), end: Date(2026, 3) }
  // "Jan 2024" -> { start: Date(2024, 0), end: undefined }
  // "2023-2024" -> { start: Date(2023, 0), end: Date(2024, 11) }
  // "Dec 2024" -> { start: Date(2024, 11), end: undefined }
  // "2026" -> { start: Date(2026, 0), end: undefined }

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

  // Single date or year
  return { start: parseDate(normalized), end: undefined };
}

function parseDate(str: string): Date {
  const normalized = str.toLowerCase().trim();

  // Just a year like "2026"
  const yearOnly = normalized.match(/^(\d{4})$/);
  if (yearOnly) {
    return new Date(parseInt(yearOnly[1]), 0, 1);
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

export function getTimelineItems(): TimelineItem[] {
  const items: TimelineItem[] = [];
  const processedIds = new Set<string>();

  // 1. Add projects (visible only)
  projects.filter(p => p.visible).forEach(project => {
    const { start, end } = parsePeriodString(project.period);
    processedIds.add(project.slug);

    items.push({
      id: `project-${project.slug}`,
      title: project.name,
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

  // 2. Add experiences NOT already in projects
  experience.forEach(exp => {
    if (!processedIds.has(exp.id)) {
      const { start, end } = parsePeriodString(exp.period);
      items.push({
        id: `exp-${exp.id}`,
        title: exp.role,
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

  // 3. Add extracurriculars as leadership
  extracurriculars.forEach(extra => {
    const { start, end } = parsePeriodString(extra.period);
    items.push({
      id: `extra-${extra.id}`,
      title: extra.role,
      subtitle: extra.organization,
      type: "leadership",
      startDate: start,
      endDate: end,
      hasDetailPage: false,
      accomplishments: extra.accomplishments,
      externalLink: extra.link,
    });
  });

  // 4. Add education milestones
  items.push({
    id: "edu-start",
    title: "Started University",
    subtitle: "Queen's University - Math & Computer Engineering",
    type: "education",
    startDate: new Date(2022, 8, 1), // Sep 2022
    hasDetailPage: true,
    institution: education.institution,
    degree: education.degree,
    gpa: education.gpa,
    courses: education.relevantCourses,
  });

  items.push({
    id: "edu-grad",
    title: "B.ASc. Graduation",
    subtitle: education.institution,
    type: "education",
    startDate: new Date(2027, 4, 1), // May 2027
    hasDetailPage: true,
    institution: education.institution,
    degree: education.degree,
  });

  // Sort by startDate ascending (2022 -> 2027)
  return items.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
}
