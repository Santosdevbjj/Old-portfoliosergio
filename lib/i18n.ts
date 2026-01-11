// lib/i18n.ts

/**
 * Idiomas suportados
 */
export type Locale = "pt" | "en" | "es";
export const SUPPORTED_LOCALES: Locale[] = ["pt", "en", "es"];
export const DEFAULT_LOCALE: Locale = "pt";

/**
 * Tipagem das traduções
 */
export type Translations = {
  meta: {
    title: string;
    description: string;
  };
  navigation: {
    home: string;
    about: string;
    projects: string;
    contact: string;
    language: string;
  };
  footer: {
    rights: string;
  };
  darkMode: {
    lightMode: string;
    darkMode: string;
  };
  sections: {
    aboutTitle: string;
    aboutIntro: string;
    aboutDetails: string;
    experienceTitle: string;
    reskillingTitle: string;
    differentialTitle: string;
    objectiveTitle: string;
    stackConsolidated: string;
    stackUpdating: string;
    projectsTitle: string;
    articlesTitle: string;
    featuredArticle: string;
    contactTitle: string;
  };
  portfolio: {
    title: string;
    description: string;
    buttonLabel: string;
    projects: string;
  };
  featuredArticle: {
    title: string;
    description: string;
    award1: string;
    award2: string;
    readOn: string;
    links: {
      dio: string;
      linkedin: string;
      medium: string;
    };
  };
  experience: {
    item1: string;
    item2: string;
    item3: string;
    stackConsolidated: string;
    stackUpdating: string;
    reskilling: string;
    differential: string;
    objective: string;
  };
  projectCategories: {
    dataScience: string;
    azureDatabricks: string;
    neo4j: string;
    powerBI: string;
    database: string;
    python: string;
    dotnet: string;
    java: string;
    machineLearning: string;
    aws: string;
    cybersecurity: string;
    logic: string;
    html: string;
    articlesRepo: string;
  };
};

/**
 * Traduções inline
 */
export const translations: Record<Locale, Translations> = {
  pt: {
    meta: {
      title: "Meu Site Multilíngue",
      description: "Um site moderno com suporte a múltiplos idiomas e dark mode inteligente.",
    },
    navigation: {
      home: "Início",
      about: "Sobre",
      projects: "Projetos",
      contact: "Contato",
      language: "Idioma",
    },
    footer: {
      rights: "Todos os direitos reservados",
    },
    darkMode: {
      lightMode: "Modo Claro",
      darkMode: "Modo Escuro",
    },
    sections: {
      aboutTitle: "👨‍💻 Sobre mim",
      aboutIntro: "Analista de Dados | Python | SQL | Azure Databricks",
      aboutDetails: "Mais de 15 anos de experiência em sistemas críticos...",
      experienceTitle: "💼 Experiência Técnica",
      reskillingTitle: "📚 Recapacitação",
      differentialTitle: "⭐ Diferencial",
      objectiveTitle: "🎯 Objetivo",
      stackConsolidated: "Stack consolidado",
      stackUpdating: "Stack em atualização",
      projectsTitle: "🛠 Projetos",
      articlesTitle: "📝 Artigos",
      featuredArticle: "Artigo em destaque",
      contactTitle: "Contato",
    },
    portfolio: {
      title: "Portfólio Multilíngue",
      description: "Projetos técnicos e artigos em várias áreas.",
      buttonLabel: "Ver projeto →",
      projects: "Projetos em destaque",
    },
    featuredArticle: {
      title: "Low-Code na Saúde",
      description: "Como criar apps médicos em semanas...",
      award1: "🏆 Prêmio DIO",
      award2: "🏆 Melhor Artigo",
      readOn: "Leia em:",
      links: {
        dio: "https://web.dio.me/articles/...",
        linkedin: "https://linkedin.com/...",
        medium: "https://medium.com/...",
      },
    },
    experience: {
      item1: "Sistema automatizado de IPVA...",
      item2: "Infraestrutura corporativa...",
      item3: "Sistemas jurídicos...",
      stackConsolidated: "VB, C, SQL Server...",
      stackUpdating: "Java, .NET, Python...",
      reskilling: "Bootcamps e certificações...",
      differential: "Experiência em ambientes regulados...",
      objective: "Projetos de governança de dados...",
    },
    projectCategories: {
      dataScience: "Ciência de Dados",
      azureDatabricks: "Azure Databricks",
      neo4j: "Neo4J",
      powerBI: "Power BI",
      database: "Banco de Dados",
      python: "Python",
      dotnet: "C#/dotnet .NET",
      java: "Java",
      machineLearning: "Machine Learning",
      aws: "Amazon AWS",
      cybersecurity: "Cibersegurança",
      logic: "Lógica de Programação",
      html: "HTML",
      articlesRepo: "Repositório de Artigos",
    },
  },

  en: {
    meta: {
      title: "My Multilingual Website",
      description: "A modern site with multilingual support and smart dark mode.",
    },
    navigation: {
      home: "Home",
      about: "About",
      projects: "Projects",
      contact: "Contact",
      language: "Language",
    },
    footer: {
      rights: "All rights reserved",
    },
    darkMode: {
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
    },
    sections: {
      aboutTitle: "👨‍💻 About me",
      aboutIntro: "Data Analyst | Python | SQL | Azure Databricks",
      aboutDetails: "Over 15 years of experience in critical systems...",
      experienceTitle: "💼 Technical Experience",
      reskillingTitle: "📚 Reskilling",
      differentialTitle: "⭐ Differential",
      objectiveTitle: "🎯 Objective",
      stackConsolidated: "Consolidated stack",
      stackUpdating: "Updating stack",
      projectsTitle: "🛠 Projects",
      articlesTitle: "📝 Articles",
      featuredArticle: "Featured Article",
      contactTitle: "Direct Contact",
    },
    portfolio: {
      title: "Multilingual Portfolio",
      description: "Technical projects and articles across multiple domains.",
      buttonLabel: "View project →",
      projects: "Featured Projects",
    },
    featuredArticle: {
      title: "Low-Code in Healthcare",
      description: "How to build medical apps in weeks...",
      award1: "🏆 DIO Award",
      award2: "🏆 Best Article",
      readOn: "Read on:",
      links: {
        dio: "https://web.dio.me/articles/...",
        linkedin: "https://linkedin.com/...",
        medium: "https://medium.com/...",
      },
    },
    experience: {
      item1: "Automated IPVA system...",
      item2: "Corporate network infrastructure...",
      item3: "Legal systems...",
      stackConsolidated: "VB, C, SQL Server...",
      stackUpdating: "Java, .NET, Python...",
      reskilling: "Bootcamps and certifications...",
      differential: "Experience in regulated environments...",
      objective: "Data governance projects...",
    },
    projectCategories: {
      dataScience: "Data Science",
      azureDatabricks: "Azure Databricks",
      neo4j: "Neo4J",
      powerBI: "Power BI",
      database: "Database",
      python: "Python",
      dotnet: "C#/dotnet .NET",
      java: "Java",
      machineLearning: "Machine Learning",
      aws: "Amazon AWS",
      cybersecurity: "Cybersecurity",
      logic: "Programming Logic",
      html: "HTML",
      articlesRepo: "Technical Articles Repository",
    },
  },

  es: {
    meta: {
      title: "Mi Sitio Multilingüe",
      description: "Un sitio moderno con soporte multilingüe y modo oscuro inteligente.",
    },
    navigation: {
      home: "Inicio",
      about: "Acerca de",
      projects: "Proyectos",
      contact: "Contacto",
      language: "Idioma",
    },
    footer: {
      rights: "Todos los derechos reservados",
    },
    darkMode: {
      lightMode: "Modo Claro",
      darkMode: "Modo Oscuro",
    },
    sections: {
      aboutTitle: "👨‍💻 Sobre mí",
      aboutIntro: "Analista de Datos | Python | SQL | Azure Databricks",
      aboutDetails: "Más de 15 años de experiencia en sistemas críticos...",
      experienceTitle: "💼 Experiencia Técnica",
      reskillingTitle: "📚 Recapacitación",
      differentialTitle: "⭐ Diferencial",
      objectiveTitle: "🎯 Objetivo",
      stackConsolidated: "Stack consolidado",
      stackUpdating: "Stack en actualización",
      projectsTitle: "🛠 Proyectos",
      articlesTitle: "📝 Artículos",
      featuredArticle: "Artículo destacado",
      contactTitle: "Contacto directo",
    },
    portfolio: {
      title: "Portafolio Multilingüe",
      description: "Proyectos técnicos y artículos en varias áreas.",
      buttonLabel: "Ver proyecto →",
      projects: "Proyectos destacados",
    },
    featuredArticle: {
      title: "Low-Code en Salud",
      description: "Cómo crear aplicaciones médicas en semanas...",
      award1: "🏆 Premio DIO",
      award2: "🏆 Mejor Artículo",
      readOn: "Leer en:",
      links: {
        dio: "https://web.dio.me/articles/...",
        linkedin: "https://linkedin.com/...",
        medium: "https://medium.com/...",
      },
    },
    experience: {
      item1: "Sistema automatizado de IPVA...",
      item2: "Infraestructura de red corporativa...",
      item3: "Sistemas jurídicos...",
      stackConsolidated: "VB, C, SQL Server...",
      stackUpdating: "Java, .NET, Python...",
      reskilling: "Bootcamps y certificaciones...",
      differential: "Experiencia en entornos regulados...",
      objective: "Proyectos de gobernanza de datos...",
    },
    projectCategories: {
      dataScience: "Ciencia de Datos",
      azureDatabricks: "Azure Databricks",
      neo4j: "Neo4J",
      powerBI: "Power BI",
      database: "Base de Datos",
      python: "Python",
      dotnet: "C#/dotnet .NET",
      java: "Java",
      machineLearning: "Aprendizaje Automático",
      aws: "Amazon AWS",
      cybersecurity: "Ciberseguridad",
      logic: "Lógica de Programación",
      html: "HTML",
      articlesRepo: "Repositorio de Artículos",
    },
  },
};

/**
 * Helper para obter traduções com fallback seguro
 */
export function getTranslation(locale: string): Translations {
  const normalized = locale.toLowerCase() as Locale;
  const safeLocale: Locale = SUPPORTED_LOCALES.includes(normalized)
    ? normalized
    : DEFAULT_LOCALE;

  if (!SUPPORTED_LOCALES.includes(normalized)) {
    console.warn(
      `[i18n] Locale "${locale}" não suportado. Usando fallback "${DEFAULT_LOCALE}".`
    );
  }

  return translations[safeLocale];
}

/**
 * Helper seguro para obter dicionário já validado
 */
export const getDictionary = (lang: Locale): Translations =>
  translations[lang] ?? translations[DEFAULT_LOCALE];
