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
  faMinus,
  faPlus,
  faPanorama,
  faCircleCheck,
  faTimesCircle,
  faUndo,
  faPhone,
  faUserCheck,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";

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
  faInfoCircle,
  faMinus,
  faPlus,
  faPanorama,
  faCircleCheck,
  faTimesCircle,
  faUndo,
  faEnvelope,
  faPhone,
  faUserCheck,
  faStar
);

Vue.config.productionTip = false;

export default FontAwesomeIcon;
