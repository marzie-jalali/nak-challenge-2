import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "Add New Item": "Add New Item",
        "Name": "Name",
        "User Name": "Username",
        "Email": "Email",
        "Phone": "Phone",
        "Status": "Status",
        "Submit": "Submit",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;