// lib/i18n.ts

/* ================== LOCALES ================== */
export const SUPPORTED_LOCALES = ["pt", "en", "es"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

/* ================= DICTIONARY TYPE ================= */
// Definimos a estrutura baseada no que você já criou
export type Dictionary = {
  meta: { title: string; description: string };
  navigation: { 
    home: string; about: string; projects: string; 
    contact: string; language: string; openMenu: string; closeMenu: string; 
  };
  footer: { rights: string };
  darkMode: { lightMode: string; darkMode: string };
  sections: {
    aboutTitle: string; aboutIntro: string; aboutDetails: string;
    experienceTitle: string; reskillingTitle: string; differentialTitle: string;
    objectiveTitle: string; stackConsolidated: string; stackUpdating: string;
    projectsTitle: string; articlesTitle: string; featuredArticle: string;
    contactTitle: string; searchPlaceholder: string; searchLabel: string;
    filtersTitle: string; projectsGridTitle: string; noProjectsFound: string;
    projectsEmpty?: string; // Adicionado para evitar erro no page.tsx
  };
  portfolio: { title: string; description: string; buttonLabel: string; projects: string };
  cv: { url: string; label: string };
  socialImage: string;
  featuredArticle: {
    title: string; description: string; award1: string; award2: string; readOn: string;
    links: { dio: string; linkedin: string; medium: string };
  };
  featuredProject: {
    title: string; problem: string; baseline: string; solution: string; result: string;
  };
  experience: {
    item1: string; item2: string; item3: string;
    reskilling: string; differential: string; objective: string;
    stackConsolidated: string; stackUpdating: string;
  };
  projectCategories: {
    dataScience: string; azureDatabricks: string; neo4j: string; powerBI: string;
    database: string; python: string; dotnet: string; java: string;
    machineLearning: string; aws: string; cybersecurity: string;
    logic: string; html: string; articlesRepo: string; unknown: string;
  };
};

/* ================= LOADER LOGIC ================= */

// Importação dinâmica dos dicionários para performance
const dictionaries = {
  pt: () => import("@/dictionaries/pt.json").then((module) => module.default),
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  es: () => import("@/dictionaries/es.json").then((module) => module.default),
};

/**
 * Função principal para obter as traduções.
 * Usada em Server Components como Page.tsx
 */
export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale] ? dictionaries[locale]() : dictionaries.pt();
};
