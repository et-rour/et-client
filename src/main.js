import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import i18n from "./i18n";
import "./veeValidateRules";
import VCalendar from "v-calendar";
import VueScrollTo from "vue-scrollto";
import VuePaginate from "vue-paginate";
import "./sweetAlert";
import JsonExcel from "vue-json-excel";
import "./v-calendar.js";
import VueMeta from "vue-meta";
import moment from "moment";
moment.locale("es");

Vue.use(VueMeta);

Vue.component("downloadExcel", JsonExcel);

Vue.use(VueScrollTo);

Vue.use(VuePaginate);

Vue.use(VCalendar, {
  componentPrefix: "vc", // Use <vc-calendar /> instead of <v-calendar />
});
Vue.config.productionTip = false;
// Fontawesome
import FontAwesomeIcon from "./fontAwesomeIcons";
Vue.component("font-awesome-icon", FontAwesomeIcon);

// vee validate rules
import ValidationProvider from "./veeValidateRules";
Vue.component("ValidationProvider", ValidationProvider);

// leaflet
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);

import { Icon } from "leaflet";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
