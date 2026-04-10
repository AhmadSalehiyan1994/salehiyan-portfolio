export type SupportedLanguage = "en";

const dictionary = {
  en: {
    nav: {
      projects: "Projects",
      blog: "Insights",
      polls: "Polls",
      contact: "Contact",
      admin: "Admin",
    },
    footer: {
      rights: "All rights reserved.",
      privacy: "Privacy",
    },
  },
} as const;

export function getCurrentLanguage(): SupportedLanguage {
  return "en";
}

export function getDictionary(language: SupportedLanguage) {
  return dictionary[language];
}
