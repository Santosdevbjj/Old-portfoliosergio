import type { Dictionary } from "../i18n";

export const en: Dictionary = {
  meta: {
    title: "Sérgio Santos | Data Science & Mission-Critical Systems",
    description:
      "Data Science Analyst with 15+ years of experience in the banking sector (Bradesco). Specialist in transforming complex data into strategic intelligence.",
  },

  navigation: {
    home: "Home",
    about: "About",
    projects: "Portfolio",
    contact: "Contact",
    language: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  footer: {
    rights: `© ${new Date().getFullYear()} Sérgio Santos. Data Engineering & Systems.`,
  },

  darkMode: {
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
  },

  sections: {
    aboutTitle: "👨‍💻 Professional Profile",
    aboutIntro: "Data Science Analyst | Critical Systems Specialist",
    aboutDetails:
      "Expertise in banking mission-critical systems, now dedicated to Data Science, AI, and Governance to support strategic decision-making.",

    experienceTitle: "💼 Experience & Impact",
    reskillingTitle: "📚 Transition & Specialization",
    differentialTitle: "⭐ Competitive Edge",
    objectiveTitle: "🎯 Strategic Objective",

    stackConsolidated: "Consolidated Stack (Core)",
    stackUpdating: "Evolving Stack (Data & AI)",

    projectsTitle: "🛠 Project Ecosystem",
    articlesTitle: "📝 Technical Publications",
    featuredArticle: "Award-Winning Article",
    featuredProjectTitle: "🚀 High-Impact Project",
    contactTitle: "Get in Touch",

    searchPlaceholder: "Ex: Databricks, Python, Graphs...",
    searchLabel: "Filter by technology",
    filtersTitle: "Technical Categories",
    projectsGridTitle: "Engineering Repository",
    noProjectsFound: "No repositories found for this filter.",
    projectsEmpty: "Syncing data with GitHub API...",
  },

  portfolio: {
    title: "Sérgio Santos",
    description: "Bridging the rigor of banking systems with modern data science agility.",
    buttonLabel: "Explore Projects",
    projects: "Featured Projects",
  },

  cv: {
    url: "/cv-sergio-santos-en.pdf",
    label: "Download Resume (PDF)",
  },

  socialImage: "/og-image-en.png",

  featuredArticle: {
    title: "Low-Code in Healthcare: Building Medical Apps in Weeks",
    description:
      "An analysis of how low-code platforms can modernize the healthcare sector, ensuring compliance, security, and accelerated delivery.",
    award1: "🏆 Winner of the 35th DIO Article Competition",
    award2: "🏆 Best Technical Article – September 2025",
    readOn: "Available on:",
    links: {
      dio: "https://web.dio.me/articles/low-code-na-saude-como-criar-apps-medicos-em-semanas-d77f6760fa5a",
      linkedin: "https://www.linkedin.com/in/santossergioluiz",
      medium: "https://medium.com/@sergioluiz.santos",
    },
  },

  featuredProject: {
    badge: "FLAGSHIP PROJECT",
    title: "Logistics Risk Simulator",
    highlight: "Data Science applied to Construction & Risk Intelligence.",
    stack: ["Python", "Azure Databricks", "Streamlit", "Machine Learning"],
    challengeTitle: "The Problem",
    problem:
      "Logistical bottlenecks in complex construction projects causing recurring fines and delays in 35% of the schedule.",
    baselineLabel: "Legacy Scenario",
    baseline:
      "Management based on static spreadsheets with an average forecast error of 18 days.",
    solutionTitle: "Solution Architecture",
    solution:
      "Data pipeline on Databricks with a Random Forest model, interactive simulator, and automated alerts via Telegram Bot.",
    impactTitle: "Measurable Results",
    result:
      "Reduced forecast error to 7 days and generated an estimated annual savings of approximately $75,000.",
    ctaLabel: "View Repository",
    ctaUrl: "https://github.com/Santosdevbjj/analiseRiscosAtrasoObras",
  },

  experience: {
    item1:
      "Developed automated systems eliminating approximately 2,920 manual work hours per year.",
    item2:
      "Managed corporate network infrastructure for 500+ users with 99.5% SLA availability.",
    item3:
      "Maintained critical legal systems with full traceability and LGPD/GDPR compliance.",

    reskilling:
      "Continuous evolution in Data Science, Machine Learning, and Graph Analysis (Neo4j), applying technical rigor to emerging technologies.",
    differential:
      "Systemic vision combining banking regulatory compliance with artificial intelligence innovation.",
    objective:
      "To contribute to projects involving infrastructure modernization, data governance, or high-complexity regulated systems.",
    
    stackConsolidated: "SQL Server, Windows Server, C#, .NET, IT Governance, IBM Mainframe, Active Directory.",
    stackUpdating: "Python, Azure Databricks, Apache Spark, Neo4j, Machine Learning, Docker, Power BI.",
  },

  projectCategories: {
    dataScience: "Data Science",
    azureDatabricks: "Azure Databricks",
    neo4j: "Graphs (Neo4J)",
    powerBI: "Power BI & Analytics",
    database: "Databases",
    python: "Python",
    dotnet: ".NET & C#",
    java: "Java",
    machineLearning: "Machine Learning",
    aws: "Amazon AWS",
    cybersecurity: "Cybersecurity",
    logic: "Logic & Algorithms",
    html: "Web / Frontend",
    articlesRepo: "Technical Articles",
    unknown: "Others",
  },
};
