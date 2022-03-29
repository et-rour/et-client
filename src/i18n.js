import Vue from "vue";
import VueI18n from "vue-i18n";
import es from "./locales/es.json";
import en from "./locales/en.json";

import esValidationMessages from "vee-validate/dist/locale/es.json";
import enValidationMessages from "vee-validate/dist/locale/en.json";
Vue.use(VueI18n);

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || "en",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  messages: {
    es: {
      ...es,
      validation: esValidationMessages.messages,
    },
    en: {
      ...en,
      validation: enValidationMessages.messages,
    },
  },
});
