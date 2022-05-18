<template>
  <div class="withe-space">
    <Navbar></Navbar>
    <router-view></router-view>
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
export default {
  components: { Navbar, MovileMenu, Footer },
  methods: {
    ...mapActions("authStore", ["loadSession", "user", "setSiteCountry"]),
    ...mapActions("propertiesStore", ["loadProperties"]),
    ...mapMutations({ loadCustomProperties: "propertiesStore/loadProperties" }),
  },
  computed: {
    ...mapGetters("authStore", ["user"]),
    userCountry() {
      return this.user.user.country;
    }
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
  watch: {
    userCountry() {
      this.setSiteCountry(this.user.user.country);
    }
  }
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