import type { Dictionary } from "../i18n";

export const es: Dictionary = {
  meta: {
    title: "Sérgio Santos | Data Science y Sistemas de Misión Crítica",
    description:
      "Analista de Ciencia de Datos con más de 15 años de experiencia en el sector bancario (Bradesco). Especialista en transformar datos complejos en inteligencia estratégica.",
  },

  navigation: {
    home: "Inicio",
    about: "Sobre mí",
    projects: "Portafolio",
    contact: "Contacto",
    language: "Idioma",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },

  footer: {
    rights: `© ${new Date().getFullYear()} Sérgio Santos. Ingeniería de Datos y Sistemas.`,
  },

  darkMode: {
    lightMode: "Modo Claro",
    darkMode: "Modo Oscuro",
  },

  sections: {
    aboutTitle: "👨‍💻 Perfil Profesional",
    aboutIntro: "Analista de Ciencia de Datos | Especialista en Sistemas Críticos",
    aboutDetails:
      "Trayectoria sólida en sistemas de misión crítica bancaria, enfocado actualmente en Ciencia de Datos, IA y Gobernanza para el soporte de decisiones estratégicas.",

    experienceTitle: "💼 Experiencia e Impacto",
    reskillingTitle: "📚 Transición y Especialización",
    differentialTitle: "⭐ Diferencial Competitivo",
    objectiveTitle: "🎯 Objetivo Estratégico",

    stackConsolidated: "Stack Consolidado (Core)",
    stackUpdating: "Stack en Evolución (Datos e IA)",

    projectsTitle: "🛠 Ecosistema de Proyectos",
    articlesTitle: "📝 Producción Intelectual",
    featuredArticle: "Artículo Premiado",
    featuredProjectTitle: "🚀 Proyecto de Alto Impacto",
    contactTitle: "¿Hablamos?",

    searchPlaceholder: "Ej: Databricks, Python, Grafos...",
    searchLabel: "Filtrar por tecnología",
    filtersTitle: "Categorías Técnicas",
    projectsGridTitle: "Repositorio de Ingeniería",
    noProjectsFound: "No se encontraron repositorios para este filtro.",
    projectsEmpty: "Sincronizando datos con la API de GitHub...",
  },

  portfolio: {
    title: "Sérgio Santos",
    description: "Conectando el rigor de los sistemas bancarios con la agilidad de la ciencia de datos moderna.",
    buttonLabel: "Explorar Proyectos",
    projects: "Projetos Destacados",
  },

  cv: {
    url: "/cv-sergio-santos-es.pdf",
    label: "Descargar Currículum (PDF)",
  },

  socialImage: "/og-image-es.png",

  featuredArticle: {
    title: "Low-Code en Salud: Cómo Crear Apps Médicas en Semanas",
    description:
      "Un análisis sobre cómo la agilidade del low-code puede modernizar el sector salud, garantizando cumplimiento, seguridad y velocidad.",
    award1: "🏆 Ganador de la 35ª Competencia de Artículos DIO",
    award2: "🏆 Mejor Artículo Técnico – Septiembre de 2025",
    readOn: "Disponible en:",
    links: {
      dio: "https://web.dio.me/articles/low-code-na-saude-como-criar-apps-medicos-em-semanas-d77f6760fa5a",
      linkedin: "https://www.linkedin.com/in/santossergioluiz",
      medium: "https://medium.com/@sergioluiz.santos",
    },
  },

  featuredProject: {
    badge: "PROYECTO FLAGSHIP",
    title: "Simulador de Riesgos Logísticos",
    highlight: "Ciencia de Datos aplicada a la Construcción e Inteligencia de Riesgo.",
    stack: ["Python", "Azure Databricks", "Streamlit", "Machine Learning"],
    challengeTitle: "El Problema",
    problem:
      "Cuellos de botella logísticos en obras complejas que generaban multas recurrentes y retrasos en el 35% del cronograma.",
    baselineLabel: "Escenario Heredado",
    baseline:
      "Gestión basada en hojas de cálculo estáticas con un error promedio de predicción de 18 días.",
    solutionTitle: "Arquitectura de la Solución",
    solution:
      "Pipeline de datos en Databricks con modelo Random Forest, simulador interactivo y alertas automatizadas vía Bot de Telegram.",
    impactTitle: "Resultado Medible",
    result:
      "Reducción del error de predicción a 7 días y ahorro operativo estimado en R$ 420.000 anuales.",
    ctaLabel: "Ver Repositorio",
    ctaUrl: "https://github.com/Santosdevbjj/analiseRiscosAtrasoObras",
  },

  experience: {
    item1:
      "Desarrollo de sistemas automatizados que eliminaron 2.920 horas/año de procesamiento manual.",
    item2:
      "Arquitectura de infraestructura de red para más de 500 usuarios con 99,5% de disponibilidad (SLA).",
    item3:
      "Sustentación de ecosistemas jurídicos críticos con cumplimiento total de LGPD y normativas bancarias.",

    reskilling:
      "Evolución continua en Ciencia de Datos, Machine Learning y análisis de grafos (Neo4j), aplicando rigor técnico a nuevas tecnologías.",
    differential:
      "Visión sistémica que une el cumplimiento regulatorio bancario con la innovación en inteligencia artificial.",
    objective:
      "Contribuir en proyectos de modernización de infraestructura, gobernanza de datos o sistemas regulados de alta complejidad.",
    
    stackConsolidated: "SQL Server, Windows Server, C#, .NET, Gobernanza de TI, Mainframe IBM, Active Directory.",
    stackUpdating: "Python, Azure Databricks, Apache Spark, Neo4j, Machine Learning, Docker, Power BI.",
  },

  projectCategories: {
    dataScience: "Ciencia de Datos",
    azureDatabricks: "Azure Databricks",
    neo4j: "Grafos (Neo4J)",
    powerBI: "Power BI y Analytics",
    database: "Bases de Datos",
    python: "Python",
    dotnet: ".NET y C#",
    java: "Java",
    machineLearning: "Machine Learning",
    aws: "Amazon AWS",
    cybersecurity: "Ciberseguridad",
    logic: "Lógica y Algoritmos",
    html: "Web / Frontend",
    articlesRepo: "Artículos Técnicos",
    unknown: "Otros",
  },
};
