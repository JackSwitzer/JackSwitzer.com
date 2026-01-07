import { mutation } from "./_generated/server";

// Clear all data before reseeding
export const clearAll = mutation({
  args: {},
  handler: async (ctx) => {
    const tables = ["personal", "education", "experience", "projects", "quantProjects", "extracurriculars", "skills", "future"];
    for (const table of tables) {
      const docs = await ctx.db.query(table as any).collect();
      for (const doc of docs) {
        await ctx.db.delete(doc._id);
      }
    }
    return { success: true, message: "All data cleared" };
  },
});

// Seed function to populate the database
// Run this once via the Convex dashboard or CLI
export const seedFromResume = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing data first
    const tables = ["personal", "education", "experience", "projects", "quantProjects", "extracurriculars", "skills", "future"];
    for (const table of tables) {
      const docs = await ctx.db.query(table as any).collect();
      for (const doc of docs) {
        await ctx.db.delete(doc._id);
      }
    }
    // Personal
    await ctx.db.insert("personal", {
      name: "Jack Switzer",
      email: "jackswitzer3@gmail.com",
      github: "jackswitzer",
      githubSchool: "JackSwitzerSchool",
      linkedin: "https://linkedin.com/in/jackswitzer",
    });

    // Education
    await ctx.db.insert("education", {
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
    });

    // Experience (order: 0 = most recent)
    const experiences = [
      {
        order: 0,
        role: "Software Developer",
        company: "IBM",
        period: "May 2025 - April 2026",
        accomplishments: [
          "Working on translating legacy mainframe languages (COBOL, PL1, REXX) into modern compiled languages (Java, Python) for maintenance and feature development",
          "Developed inference portion of new benchmark pipeline that influenced product model decisions",
          "Orchestrated new VSCode extension for high-quality code explanations with architecture schema visualization",
          "Developed MCP and subagent tooling for code explanation workflows",
          "Built first official feature adding data dictionary of all variables into the main explain pipeline, helping other teams understand functionality",
          "Working on adding A2A (Agent-to-Agent) support with improved intricate subagent loops",
        ],
        technologies: ["Python", "Java", "COBOL", "PL1", "REXX", "VSCode Extensions", "MCP", "LLM", "AI Agents"],
      },
      {
        order: 1,
        role: "Teaching Assistant: Linear Algebra I",
        company: "Queen's University",
        period: "2025",
        accomplishments: [
          "Led 2 weekly tutorials teaching the fundamentals of linear algebra to 60 students at a time in an interactive manner",
          "Fully created and designed a learning platform (linalg.jackswitzer.com) with interactive visualizations, leading to positive student performance outcomes",
        ],
        technologies: ["Next.js", "MDX", "TypeScript", "Tailwind CSS", "KaTeX"],
      },
      {
        order: 2,
        role: "Data Scientist",
        company: "Royal Bank of Canada",
        period: "2024",
        accomplishments: [
          "Implemented time series forecasting models using Meta's Prophet and Recurrent Neural Networks (LSTM) which reduced error by 50% over existing methods",
          "Led a unit of 3 for a 3-week sprint in order to refactor existing code base, bring in standard coding practices and migrate to GitHub",
          "Built an Excel visualization tool for team members to dynamically interact with forecast, bridging the gap between technological efforts and business needs",
        ],
        technologies: ["Python", "Prophet", "LSTM", "PyTorch", "Excel", "Git"],
      },
      {
        order: 3,
        role: "Data Analyst",
        company: "Royal Bank of Canada",
        period: "2023",
        accomplishments: [
          "Automated weekly visualization of key business metrics for executives in Python, saving 8 hours weekly",
          "Conducted time series analysis to forecast call centre volume with SARIMA, with less than 5% error for yearly model",
          "Designed and taught a course on Python with applications to forecasting to a team of twelve",
        ],
        technologies: ["Python", "SARIMA", "Pandas", "Data Visualization"],
      },
      {
        order: 4,
        role: "Group Leader and Instructor",
        company: "Pedalheads Bike Camp",
        period: "2022",
        accomplishments: [
          "Managed and led groups of 5-10 children aged 4-11, developing leadership and communication skills",
        ],
        technologies: [],
      },
      {
        order: 5,
        role: "Shoe Cleaner",
        company: "Saint George's Golf and Country Club",
        period: "2021",
        accomplishments: [
          "Maintained club facilities and provided customer service to members",
        ],
        technologies: [],
      },
    ];

    for (const exp of experiences) {
      await ctx.db.insert("experience", exp);
    }

    // Projects
    const projects = [
      {
        slug: "ibm-software-developer",
        name: "IBM Software Developer - Mainframe Modernization",
        type: "work" as const,
        period: "May 2025 - April 2026",
        featured: true,
        visible: true,
        status: "active" as const,
        summary: "Software Developer at IBM working on mainframe modernization - translating legacy code to modern languages using AI-powered tools.",
        accomplishments: [
          "Working on translating legacy mainframe languages (COBOL, PL1, REXX) into modern compiled languages (Java, Python)",
          "Developed inference portion of new benchmark pipeline that influenced product model decisions",
          "Orchestrated new VSCode extension for high-quality code explanations",
          "Developed MCP and subagent tooling for code explanation workflows",
        ],
        technologies: ["Python", "Java", "COBOL", "VSCode Extensions", "MCP", "LLM", "AI Agents"],
        tags: ["internship", "mainframe", "ai", "modernization", "enterprise"],
      },
      {
        slug: "slay-the-spire-rl",
        name: "StSRLSolver",
        type: "personal" as const,
        period: "2025",
        featured: true,
        visible: true,
        status: "wip" as const,
        summary: "A reinforcement learning agent designed to achieve exceptional performance in Slay the Spire, targeting >96% win rate at the highest difficulty.",
        accomplishments: [
          "Developing a reinforcement learning agent targeting >96% win rate on Slay the Spire Watcher at Ascension 20",
          "Trained behavioral cloning model on 77 million official game runs using self-play training loop",
          "Engineered 44 high-level strategic features including kill probability calculations",
        ],
        technologies: ["Python", "Neural Networks", "Behavioral Cloning", "PyTorch"],
        tags: ["behavioral-cloning", "self-play", "feature-engineering", "game-ai"],
        github: { repo: "StSRLSolver", account: "jackswitzer" },
      },
      {
        slug: "qhacks2025-chrono",
        name: "Chrono - Linguistic Pattern Forecasting",
        type: "hackathon" as const,
        period: "2025",
        featured: true,
        visible: true,
        status: "complete" as const,
        summary: "A hackathon project that forecasts linguistic patterns to predict how language evolves over time.",
        accomplishments: [
          "Built a linguistic pattern forecasting system to predict how language evolves over time",
          "Developed end-to-end ML pipeline including data preprocessing, forecasting models, and voice synthesis",
          "Led team of 4 contributors across 52 commits in a 36-hour hackathon",
        ],
        technologies: ["Python", "NLP", "Machine Learning", "Flask", "AWS Polly"],
        tags: ["nlp", "time-series-forecasting", "voice-synthesis", "hackathon"],
        github: { repo: "QHacks2025", account: "JackSwitzerSchool" },
      },
      {
        slug: "gulf-of-mexico-simulation",
        name: "Gulf of Mexico Trash Collection Simulation",
        type: "school" as const,
        period: "2023",
        featured: true,
        visible: true,
        status: "complete" as const,
        summary: "A multi-agent simulation system for optimizing garbage collection drone operations in the Gulf of Mexico.",
        accomplishments: [
          "Led a team of 4 to develop a Multi-Agent System to model cleaning garbage out of the Gulf of Mexico",
          "Used satellite imagery to simulate the Gulf Stream and model garbage flow in a dynamic density map",
          "Implemented K-Means clustering leading to 20% efficiency improvement",
        ],
        technologies: ["MATLAB", "Multi-Agent Systems", "K-Means Clustering", "Simulation"],
        tags: ["k-means", "lloyds-algorithm", "multi-agent-systems", "optimization"],
        github: { repo: "APSC-200", account: "JackSwitzerSchool" },
      },
      {
        slug: "rbc-data-scientist",
        name: "RBC Data Scientist",
        type: "work" as const,
        period: "2024",
        featured: true,
        visible: true,
        status: "complete" as const,
        summary: "Data Scientist role at Royal Bank of Canada, implementing advanced time series forecasting and leading technical improvements.",
        accomplishments: [
          "Implemented time series forecasting models using Prophet and LSTM reducing error by 50%",
          "Led a unit of 3 for a 3-week sprint to refactor codebase and migrate to GitHub",
          "Built Excel visualization tool for dynamic forecast interaction",
        ],
        technologies: ["Python", "Prophet", "LSTM", "PyTorch", "Excel", "Git"],
        tags: ["lstm", "prophet", "time-series-forecasting", "neural-networks"],
      },
      {
        slug: "rbc-data-analyst",
        name: "RBC Data Analyst",
        type: "work" as const,
        period: "2023",
        featured: false,
        visible: true,
        status: "complete" as const,
        summary: "Data Analyst role at Royal Bank of Canada, focusing on automation, forecasting, and knowledge transfer.",
        accomplishments: [
          "Automated weekly visualization of key business metrics saving 8 hours weekly",
          "Conducted time series analysis with SARIMA achieving less than 5% error",
          "Designed and taught a Python course to a team of twelve",
        ],
        technologies: ["Python", "SARIMA", "Pandas", "Data Visualization"],
        tags: ["sarima", "time-series-forecasting", "automation"],
      },
      {
        slug: "panokeet",
        name: "Panokeet",
        type: "personal" as const,
        period: "2025",
        featured: false,
        visible: true,
        status: "wip" as const,
        summary: "An iOS app that repeats what you say with local fine-tuning on voice-to-text intent recognition.",
        accomplishments: [
          "Building a voice-to-text parakeet app with local fine-tuning on voice to text intent",
          "Implemented in Swift for iOS with local ML model integration",
        ],
        technologies: ["Swift", "iOS", "Machine Learning", "Speech Recognition"],
        tags: ["mobile", "ml", "ios", "speech"],
        github: { repo: "Panokeet", account: "jackswitzer" },
      },
      {
        slug: "sol-smart-bulb",
        name: "Sol - Smart Bulb CLI",
        type: "personal" as const,
        period: "2025",
        featured: false,
        visible: true,
        status: "complete" as const,
        summary: "A CLI tool for managing Kana smart bulbs with sunrise simulation for natural wake-ups.",
        accomplishments: [
          "Built a CLI tool to manage a Kana smart bulb for easy wake-up routines",
          "Implemented sunrise simulation for natural wake-ups",
        ],
        technologies: ["Python", "CLI", "IoT", "Smart Home"],
        tags: ["cli", "iot", "automation", "smart-home"],
        github: { repo: "sol", account: "jackswitzer" },
      },
      {
        slug: "tavla-backgammon",
        name: "Tavla - Backgammon RL",
        type: "personal" as const,
        period: "2025",
        featured: false,
        visible: false,
        status: "wip" as const,
        summary: "An RL-based Backgammon solver designed to provide optimal move recommendations.",
        accomplishments: [
          "Developing an on-the-go RL Backgammon solver for mobile use",
          "Implementing reinforcement learning techniques for optimal play strategy",
        ],
        technologies: ["Python", "Reinforcement Learning", "Game AI"],
        tags: ["rl", "game-ai", "hidden"],
        github: { repo: "Tavla", account: "jackswitzer" },
      },
      {
        slug: "nyt-games",
        name: "NYT Games Solver",
        type: "personal" as const,
        period: "2024-2026",
        featured: true,
        visible: true,
        status: "active" as const,
        summary: "Automated solvers for New York Times word puzzle games with plans for full web UI.",
        accomplishments: [
          "Built puzzle solvers for NYT LetterBoxed and Spelling Bee games",
          "Implemented efficient word search algorithms using trie data structures",
          "Expanding to Wordle, Connections, and Strands with web interface",
        ],
        technologies: ["Python", "Algorithms", "React", "Next.js"],
        tags: ["trie", "graph-search", "constraint-satisfaction", "web-ui"],
        github: { repo: "NYT-Games", account: "jackswitzer" },
      },
      {
        slug: "advent-of-code-2024",
        name: "Advent of Code 2024",
        type: "personal" as const,
        period: "2024",
        featured: false,
        visible: true,
        status: "complete" as const,
        summary: "Advent of Code 2024 solutions implemented across 8 programming languages, earning 29 stars.",
        accomplishments: [
          "Completed challenges in 8 different programming languages",
          "Achieved 29 stars across various algorithmic problems",
        ],
        technologies: ["Python", "Rust", "Go", "Java", "C", "OCaml", "R"],
        tags: ["algorithms", "polyglot", "competitive-programming"],
        github: { repo: "AdventofCode", account: "jackswitzer" },
      },
      {
        slug: "scapcentre-chatbot",
        name: "Scapcentre AI Chatbot",
        type: "consulting" as const,
        period: "2025",
        featured: false,
        visible: false,
        status: "wip" as const,
        summary: "AI-powered chatbot for Scapcentre healthcare website to improve customer experience.",
        accomplishments: [
          "Building AI chatbot for scapcentre.ca to help answer questions about treatment options",
          "Implementing conversational interface to direct users to booking",
        ],
        technologies: ["AI", "Chatbot", "Web Development"],
        tags: ["consulting", "ai", "healthcare", "chatbot", "hidden"],
        link: "https://scapcentre.ca",
      },
      {
        slug: "linear-algebra-website",
        name: "Linear Algebra Learning Platform",
        type: "personal" as const,
        period: "2025",
        featured: true,
        visible: true,
        status: "active" as const,
        summary: "Interactive website for teaching linear algebra fundamentals, created to support TA tutorials at Queen's University.",
        accomplishments: [
          "Built comprehensive learning platform with interactive visualizations for linear algebra concepts",
          "Created custom MDX-based content system for mathematical notation and examples",
          "Positive student feedback leading to improved learning outcomes",
          "Used as primary supplementary resource for 120+ students across 2 tutorial sections",
        ],
        technologies: ["Next.js", "TypeScript", "MDX", "Tailwind CSS", "KaTeX"],
        tags: ["education", "math", "teaching", "web-development"],
        github: { repo: "apsc174", account: "JackSwitzerSchool" },
        link: "https://linalg.jackswitzer.com",
      },
      // Quant projects (integrated into main projects)
      {
        slug: "rit-hackathon",
        name: "RIT Hackathon - Market Making",
        type: "quant" as const,
        period: "2024",
        featured: false,
        visible: true,
        status: "complete" as const,
        summary: "Implemented market making strategies and liability trading algorithms for the Rotman trading competition.",
        accomplishments: [
          "Implemented market making strategies using mean-reversion and risk analysis",
          "Developed liability trading algorithms for competition",
        ],
        technologies: ["Python", "Quantitative Finance", "Market Making"],
        tags: ["mean-reversion", "market-making", "risk-analysis", "trading"],
        github: { repo: "RIT-Hackathon", account: "jackswitzer" },
      },
      {
        slug: "faim-hackathon",
        name: "McGill FAIM Hackathon - Portfolio Optimization",
        type: "quant" as const,
        period: "2024",
        featured: true,
        visible: true,
        status: "complete" as const,
        summary: "Led a team developing trading strategies using neural networks and portfolio optimization techniques.",
        accomplishments: [
          "Led a team of 5 in developing a trading strategy for the McGill FAIM hackathon",
          "Used elastic nets & LSTM neural networks trained on Queen's University compute cluster",
          "Achieved an alpha of 0.00137",
          "Implemented Black-Litterman portfolio management technique",
        ],
        technologies: ["Python", "LSTM", "Elastic Net", "Black-Litterman", "PyTorch", "HPC"],
        tags: ["black-litterman", "elastic-net", "lstm", "portfolio-optimization"],
        github: { repo: "FAIM-Personal", account: "jackswitzer" },
      },
      {
        slug: "quantt-analyst",
        name: "QUANTT - Options Pricing Model",
        type: "quant" as const,
        period: "2023-2024",
        featured: false,
        visible: true,
        status: "complete" as const,
        summary: "Built options pricing models using Monte Carlo simulation and the Heston model as part of QUANTT club.",
        accomplishments: [
          "Participated in a 10-week educational program in quantitative finance",
          "Implemented Monte Carlo simulation and Heston model to price AMD options to ~5% error",
        ],
        technologies: ["Python", "Monte Carlo", "Heston Model", "Options Pricing"],
        tags: ["monte-carlo", "heston-model", "stochastic-volatility", "options-pricing"],
        github: { repo: "Quantt-5", account: "JackSwitzerSchool" },
      },
      {
        slug: "quantt-pm",
        name: "QUANTT - NLP Trading Strategy",
        type: "quant" as const,
        period: "2024-2025",
        featured: false,
        visible: true,
        status: "complete" as const,
        summary: "Project managed teams developing NLP-based algorithmic trading strategies.",
        accomplishments: [
          "Managed a team of 5 developing NLP basis for algorithmic trading",
          "Taught session to 60 club members on data science and ML applied to finance",
          "Project managed 2 teams in third year",
        ],
        technologies: ["NLP", "Python", "Machine Learning", "Project Management"],
        tags: ["nlp", "sentiment-analysis", "algorithmic-trading", "leadership"],
        github: { repo: "Quantt-7", account: "JackSwitzerSchool" },
      },
      {
        slug: "comm420",
        name: "COMM420 - Quantitative Trading Strategy",
        type: "quant" as const,
        period: "2024-2025",
        featured: false,
        visible: true,
        status: "complete" as const,
        summary: "Coursework in quantitative trading strategy as part of Certificate in Business.",
        accomplishments: [
          "Completed coursework in quantitative trading strategy as part of Certificate in Business",
          "Developed and backtested trading strategies",
        ],
        technologies: ["Quantitative Finance", "Trading Strategy", "Python"],
        tags: ["quant", "coursework", "trading"],
      },
    ];

    for (const project of projects) {
      await ctx.db.insert("projects", project);
    }

    // Extracurriculars
    const extracurriculars = [
      {
        order: 0,
        role: "President, Future Blue Intern Council",
        organization: "IBM",
        period: "May 2025 - Present",
        accomplishments: [
          "Led IBM's intern student council (Future Blue) as President from July to January",
          "Organized and ran 3 major networking events including meetings with IBM Canada President and 2 VPs",
          "Planned and executed holiday party and social events for intern community",
          "Transitioned to advisory role for Markham office (January - Present)",
        ],
      },
      {
        order: 1,
        role: "Campus Ambassador",
        organization: "Royal Bank of Canada",
        period: "2024-2025",
        accomplishments: [
          "Worked with the RBC campus recruitment team to engage the student population at Queen's University",
          "Helped run networking events",
          "Selected due to strong manager and team advocacy based on project contributions",
        ],
      },
      {
        order: 2,
        role: "Consulting Analyst",
        organization: "QUBE",
        period: "2023-2024",
        accomplishments: [
          "Developed a US market entrance strategy for Canadian mental health service provider Keel Digital",
          "High customer satisfaction led to further consulting for Keel Digital to implement website changes",
        ],
      },
      {
        order: 3,
        role: "Consulting Analyst",
        organization: "QSC",
        period: "2024-Present",
        accomplishments: [
          "Worked with early-stage startups to develop their marketing strategy, build websites and expand their brand",
        ],
      },
      {
        order: 4,
        role: "Analyst → Project Manager",
        organization: "QUANTT (Queen's Quantitative Trading Team)",
        period: "2023-Present",
        accomplishments: [
          "Progressed from analyst to project manager over 2 years in Queen's premier quantitative finance club",
          "Managed teams of 5 developing quantitative trading strategies using ML and NLP",
          "Taught data science and machine learning sessions to 60+ club members",
        ],
      },
    ];

    for (const extra of extracurriculars) {
      await ctx.db.insert("extracurriculars", extra);
    }

    // Skills
    await ctx.db.insert("skills", {
      languages: ["Python", "Java", "C", "C++", "Assembly (NIOS II)", "R", "OCaml", "Rust", "Swift", "MATLAB", "Go", "PHP"],
      libraries: ["Pandas", "NumPy", "PyTorch", "SARIMA", "SciPy", "Prophet", "Scikit-learn", "spirecomm"],
      tools: ["Git", "GitHub", "Docker", "Excel", "Next.js", "TypeScript", "Tailwind CSS", "VSCode Extensions", "MCP", "Convex", "KaTeX"],
      externalCourses: [
        "Udemy Machine Learning",
        "Andrej Karpathy's ML series",
        "DataCamp R for Finance I & II",
      ],
    });

    // Future plans
    await ctx.db.insert("future", {
      name: "CSSIC - Canadian Semiconductor Conference",
      role: "Co-organizer",
      partner: "Zeni",
      targetDate: "February/March 2027",
      description: "Planning and running a new conference focused on Canadian semiconductors",
    });

    // Quant projects now integrated into main projects array above
    // Keeping empty insert for backward compatibility with schema
    // (quantProjects table still exists but unused)

    return { success: true, message: "Database seeded successfully" };
  },
});
