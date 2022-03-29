<template>
  <div class="">
    <Navbar></Navbar>
    <router-view></router-view>
    <MovileMenu />
    <Footer></Footer>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Footer from "./components/Footer.vue";
import MovileMenu from "./components/MovileMenu.vue";
import Navbar from "./components/Navbar.vue";

export default {
  components: { Navbar, MovileMenu, Footer },
  computed: {
    ...mapActions("authStore", ["loadSession"]),
    ...mapActions("propertiesStore", ["loadProperties"]),
  },
  created() {
    this.loadSession;
    this.loadProperties;
  },
};
</script>
