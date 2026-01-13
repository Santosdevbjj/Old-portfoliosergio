// lib/i18n.ts

import { pt } from "./locales/pt";
import { en } from "./locales/en";
import { es } from "./locales/es";

/* ================== LOCALES ================== */
export const SUPPORTED_LOCALES = ["pt", "en", "es"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

/* ================= DICTIONARY TYPE ================= */
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
    projectsEmpty?: string; 
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

/**
 * Mapeamento direto dos objetos de tradução.
 * Isso elimina erros de "file not found" que ocorrem com arquivos JSON.
 */
const dictionaries: Record<Locale, Dictionary> = {
  pt,
  en,
  es,
};

/**
 * Obtém o dicionário de forma síncrona.
 * Nota: Como os arquivos .ts já estão importados no topo, 
 * não há necessidade de 'async/await' ou 'fetch'.
 */
export const getDictionary = (locale: Locale): Dictionary => {
  return dictionaries[locale] || dictionaries.pt;
};
