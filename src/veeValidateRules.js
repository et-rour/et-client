import {
  ValidationProvider,
  extend,
  configure,
  localeChanged,
} from "vee-validate";
import { email, required, min_value } from "vee-validate/dist/rules";
import i18n from "./i18n";

configure({
  defaultMessage: (field, values) => {
    // override the field name.
    values._field_ = i18n.t(`fields.${field}`);

    return i18n.t(`validation.${values._rule_}`, values);
  },
});
// regular exprecion for external url.
extend("extUrl", {
  validate: value=>{
    let websiteRegEx = new RegExp("(https://www|http://www)\\.[a-zA-Z]*\\.[a-zA-Z].+");

    if (websiteRegEx.test(value)) {
      return true
    }
    return false
  },
  message: (_, values) => i18n.t("validations.messages.required", values),
});
extend("extInstagramUrl", {
  validate: value=>{
    let websiteRegEx = new RegExp("https://www\\.instagram\\.com/.+");

    if (websiteRegEx.test(value)) {
      return true
    }
    return false
  },
  message: (_, values) => i18n.t("validations.messages.required", values),
});
// Install required rule and message.
extend("required", {
  ...required,
  message: (_, values) => i18n.t("validations.messages.required", values),
});

// Install email rule and message.
extend("email", {
  ...email,
  message: (_, values) => i18n.t("validations.messages.email", values),
});

extend("min_value", {
  ...min_value,
  message: (_, values) =>
    i18n.t("validations.messages.minValue", { min: values.min }),
});
localeChanged();
export default ValidationProvider;
