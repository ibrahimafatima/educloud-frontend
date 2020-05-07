import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  resources: {
    en: {
      translations: {
        Login: "Login"
      }
    },
    fre: {
      translations: {
        Login: "Identifier"
      }
    }
  },
  fallbackLng: "en",
  debug: true,

  react: {
    wait: true
  }
});

export default i18n;
