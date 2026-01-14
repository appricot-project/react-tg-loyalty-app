import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "../locales/en/translation.json";
import ruTranslation from "../locales/ru/translation.json";

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  resources: {
    en: { translation: enTranslation },
    ru: { translation: ruTranslation },
  },
  lng: "ru",
});

export default i18n;
