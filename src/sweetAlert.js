import Vue from "vue";

import VueSweetalert2 from "vue-sweetalert2";
import Swal from "sweetalert2";
import i18n from "./i18n.js";

import "sweetalert2/dist/sweetalert2.min.css";
const options = {
  confirmButtonColor: "#2323D5",
};

Vue.use(VueSweetalert2, options);

export const CustomToast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const CustomErrorToast = Swal.mixin({
  title: i18n.t("sweetAlertMessages.error"),
  icon: "info",
  position: "center",
  showCancelButton: true,
  showConfirmButton: false,
  cancelButtonColor: "red",
});
