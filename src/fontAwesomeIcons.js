import Vue from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  faBars,
  faRightLong,
  faSearch,
  faTimes,
  faCheck,
  faSpinner,
  faTrashCan,
  faFloppyDisk,
  faQuestionCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faUserSecret,
  faBars,
  faRightLong,
  faSearch,
  faTimes,
  faUser,
  faCheck,
  faSpinner,
  faTrashCan,
  faFloppyDisk,
  faQuestionCircle,
  faInfoCircle
);

Vue.config.productionTip = false;

export default FontAwesomeIcon;
