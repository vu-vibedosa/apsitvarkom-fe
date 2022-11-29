import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import supportedLanguages, { languageData } from "./languages";

i18n.use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: supportedLanguages[0],
  resources: languageData,
});
