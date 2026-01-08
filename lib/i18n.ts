// lib/i18n.ts

/**
 * Idiomas suportados
 */
export type Locale = "pt" | "en";
export const SUPPORTED_LOCALES: Locale[] = ["pt", "en"];
export const DEFAULT_LOCALE: Locale = "pt";

/**
 * Tipagem das traduções
 */
export type Translations = {
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
    // Sobre mim
    aboutTitle: string;
    aboutIntro: string;
    aboutDetails: string;

    // Experiência
    experienceTitle: string;
    reskillingTitle: string;
    differentialTitle: string;
    objectiveTitle: string;

    // Projetos e artigos
    projectsTitle: string;
    articlesTitle: string;

    // Stack
    stackConsolidated: string;
    stackUpdating: string;
  };
};

/**
 * Traduções inline
 */
export const translations: Record<Locale, Translations> = {
  pt: {
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
      // Sobre mim
      aboutTitle: "👨‍💻 Sobre mim",
      aboutIntro:
        "Seja bem-vindo(a). Sou um profissional com mais de 15 anos de experiência em sistemas de missão crítica no setor bancário, agora dedicando minha atuação a transformar dados em inteligência estratégica e suporte à tomada de decisão.",
      aboutDetails:
        "Utilizo Python, Azure Databricks, SQL e Neo4J para desenvolver soluções de dados com rigor técnico, conformidade e foco em impacto direto no negócio.",

      // Experiência
      experienceTitle: "💼 Experiência Técnica",
      reskillingTitle: "📚 Transição e Reskilling",
      differentialTitle: "⭐ Diferencial",
      objectiveTitle: "🎯 Objetivo",

      // Projetos e artigos
      projectsTitle: "🛠 Projetos em Destaque",
      articlesTitle: "📝 Artigos em Destaque",

      // Stack
      stackConsolidado: "Stack consolidado",
      stackUpdating: "Stack em atualização",
    },
  },
  en: {
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
      // About me
      aboutTitle: "👨‍💻 About Me",
      aboutIntro:
        "Welcome! I am a professional with over 15 years of experience in mission-critical banking systems, now dedicated to transforming data into strategic intelligence and supporting decision-making.",
      aboutDetails:
        "I use Python, Azure Databricks, SQL, and Neo4J to develop data solutions with technical rigor, compliance, and a focus on direct business impact.",

      // Experience
      experienceTitle: "💼 Technical Experience",
      reskillingTitle: "📚 Transition & Reskilling",
      differentialTitle: "⭐ Differential",
      objectiveTitle: "🎯 Objective",

      // Projects and articles
      projectsTitle: "🛠 Featured Projects",
      articlesTitle: "📝 Featured Articles",

      // Stack
      stackConsolidated: "Consolidated Stack",
      stackUpdating: "Stack in Evolution",
    },
  },
};

/**
 * Helper para obter traduções com fallback seguro
 */
export function getTranslation(locale: string): Translations {
  const safeLocale: Locale = SUPPORTED_LOCALES.includes(locale as Locale)
    ? (locale as Locale)
    : DEFAULT_LOCALE;

  if (!SUPPORTED_LOCALES.includes(locale as Locale)) {
    console.warn(
      `[i18n] Locale "${locale}" não suportado. Usando fallback "${DEFAULT_LOCALE}".`
    );
  }

  return translations[safeLocale];
}
