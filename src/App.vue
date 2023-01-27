<template>
  <div class="withe-space">
    <Navbar></Navbar>
    <div class="min-h-screen">
      <router-view v-if="!loadingApp"></router-view>
      <a
        target="_blank"
        :href="`https://wa.me/+56921811458/?text=Hola, tengo una consulta...`"
        class="w-16 h-16 fixed bottom-28 right-12 lg:bottom-16 lg:right-16 z-40 cursor-pointer"
      >
        <img
          src="@/assets/images/WhatsApp.png"
          alt="whatsapp fixed"
          class="w-full"
        />
      </a>
    </div>
    <MovileMenu />
    <Footer></Footer>
    <CookiesBanner />
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
  setCurrentScreen,
  logEvent,
} from "./Firebase/index";
import isPWA from "./utils/isPWA";
import { version } from "../package.json";
import CookiesBanner from "./components/CookiesBanner.vue";

export default {
  components: { Navbar, MovileMenu, Footer, CookiesBanner },
  data() {
    return {
      loadingApp: true,
    };
  },
  methods: {
    ...mapActions(["fetchCoversData"]),
    ...mapActions("authStore", ["loadSession", "setSiteCountry"]),
    ...mapActions("propertiesStore", ["loadProperties", "loadZones"]),
    ...mapActions("postsStore", ["loadCurrencies"]),
    ...mapMutations({ loadCustomProperties: "propertiesStore/loadProperties" }),
  },
  computed: {
    ...mapGetters("authStore", ["user"]),
  },
  async mounted() {
    this.loadingApp = true;
    try {
      await this.loadSession();
      console.log('%cApp.vue line:60 this.loadSession()', 'color: white; background-color: #007acc;');
      await this.loadProperties();
      console.log('%cApp.vue line:62 this.loadProperties()', 'color: white; background-color: #007acc;');
      await this.loadCurrencies();
      console.log('%cApp.vue line:64 this.loadCurrencies()', 'color: white; background-color: #007acc;');
      await this.loadZones();
      console.log('%cApp.vue line:66 this.loadZones()', 'color: white; background-color: #007acc;');
      await this.fetchCoversData();
      console.log('%cApp.vue line:68 this.fetchCoversData()', 'color: white; background-color: #007acc;');
    
    } catch (error) {
      CustomErrorToast.fire({
        text: error.response.data.message || error,
      });

      // load empty array properties
      this.loadCustomProperties([]);
    }
    this.loadingApp = false;
  },
  metaInfo: {
    // all titles will be injected into this template
    titleTemplate: "%s - Espacio Temporal",
    htmlAttrs: {
      lang: "en-US",
    },
    meta: [
      {
        name: "Espacio Temporal",
        content: "Administramos todo tipo de inmuebles en desuso.",
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
