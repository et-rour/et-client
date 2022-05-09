<template>
  <div class="withe-space">
    <Navbar></Navbar>
    <router-view></router-view>
    <MovileMenu />
    <Footer></Footer>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import Footer from "./components/Footer.vue";
import MovileMenu from "./components/MovileMenu.vue";
import Navbar from "./components/Navbar.vue";
import { CustomErrorToast } from "@/sweetAlert";
export default {
  components: { Navbar, MovileMenu, Footer },
  methods: {
    ...mapActions("authStore", ["loadSession"]),
    ...mapActions("propertiesStore", ["loadProperties"]),
    ...mapMutations({ loadCustomProperties: "propertiesStore/loadProperties" }),
  },
  async created() {
    try {
      await this.loadSession();
      await this.loadProperties();
    } catch (error) {
      CustomErrorToast.fire({
        text: error.response.data.message || error,
      });

      // load empty array properties
      this.loadCustomProperties([]);
    }
  },
};
</script>
