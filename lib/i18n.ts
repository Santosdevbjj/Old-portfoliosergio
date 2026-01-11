// lib/i18n.ts

export type Locale = "pt" | "en" | "es";
export const SUPPORTED_LOCALES: Locale[] = ["pt", "en", "es"];
export const DEFAULT_LOCALE: Locale = "pt";

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

// Importa os dicionários por idioma
import { pt } from "./locales/pt";
import { en } from "./locales/en";
import { es } from "./locales/es";

export const translations: Record<Locale, Translations> = {
  pt,
  en,
  es,
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
