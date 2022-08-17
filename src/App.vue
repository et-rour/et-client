<template>
  <div class="withe-space">
    <Navbar></Navbar>
    <router-view v-if="!loadingApp"></router-view>
    <MovileMenu />
    <Footer></Footer>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import Footer from "./components/Footer.vue";
import MovileMenu from "./components/MovileMenu.vue";
import Navbar from "./components/Navbar.vue";
import { CustomErrorToast } from "@/sweetAlert";
import {
  analytics,
  auth,
  setUserProperties,
  setUserId,
  setCurrentScreen,
  logEvent,
  onAuthStateChanged,
} from "./Firebase/index";
import isPWA from "./utils/isPWA";
import { version } from "../package.json";

export default {
  components: { Navbar, MovileMenu, Footer },
  data() {
    return {
      loadingApp: true,
    };
  },
  methods: {
    ...mapActions("authStore", ["loadSession", "setSiteCountry"]),
    ...mapActions("propertiesStore", ["loadProperties", "loadZones"]),
    ...mapActions("postsStore", ["loadCurrencies"]),
    ...mapMutations({ loadCustomProperties: "propertiesStore/loadProperties" }),
  },
  computed: {
    ...mapGetters("authStore", ["user"]),
    userCountry() {
      return this.user.user.country;
    },
  },
  async mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(analytics, user.uid);
        setUserProperties(analytics, {
          account_type: "Basic", // can help you to define audiences
        });
      }
    });
    this.loadingApp = true;
    try {
      await this.loadSession();
      await this.loadProperties();
      await this.loadCurrencies();
      await this.loadZones();
      console.log(
        "%cApp.vue line:48 RUNNINF",
        "color: #007acc;",
        `RUNNING
            this.loadSession()
            this.loadProperties()
            this.loadCurrencies()
            this.loadZones()`
      );
    } catch (error) {
      CustomErrorToast.fire({
        text: error.response.data.message || error,
      });

      // load empty array properties
      this.loadCustomProperties([]);
    }
    this.loadingApp = false;
  },
  watch: {
    userCountry() {
      // this.setSiteCountry(this.user.user.country);
    },
  },
  metaInfo: {
    // all titles will be injected into this template
    titleTemplate: "%s - Espacio Temporal",
    htmlAttrs: {
      lang: "en-US",
    },
    meta: [
      {
        name: "description",
        content: "An example Vue application with vue-meta.",
      },
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    changed(metaInfo) {
      setCurrentScreen(analytics, metaInfo.title);
      logEvent(analytics, "page_view");
      logEvent(analytics, "screen_view", {
        app_name: isPWA() ? "pwa" : "web",
        screen_name: metaInfo.title,
        app_version: version,
      });
    },
  },
};
</script>

<style>
.next-link {
  cursor: pointer !important;
  padding-left: 10px;
}
.prev-link {
  cursor: pointer !important;
  padding-right: 10px;
}
</style>
