import { Resource } from "i18next";
import enTranslation from "./locale/en.json";
import ltTranslation from "./locale/lt.json";

interface LanguageData {
  title: Record<typeof supportedLanguages[number], string>;
  translation: Record<string, string>;
}

const supportedLanguages = ["en", "lt"] as const;
export const defaultTimeLocale = supportedLanguages[1];

const languageData: Record<typeof supportedLanguages[number], LanguageData> &
  Resource = {
  en: {
    title: {
      en: "English",
      lt: "Anglų",
    },
    translation: enTranslation,
  },
  lt: {
    title: {
      en: "Lithuanian",
      lt: "Lietuvių",
    },
    translation: ltTranslation,
  },
};

export { languageData };
export default supportedLanguages;
