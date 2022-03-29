import {
  ValidationProvider,
  extend,
  configure,
  localeChanged,
} from "vee-validate";
import { email, required } from "vee-validate/dist/rules";
import i18n from "./i18n";

configure({
  defaultMessage: (field, values) => {
    // override the field name.
    values._field_ = i18n.t(`fields.${field}`);

    return i18n.t(`validation.${values._rule_}`, values);
  },
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
localeChanged();
export default ValidationProvider;
