<template>
  <div class="w-full">
    <!-- <nav class="flex justify-center items-center gap-4">
      <router-link :to="{ name: 'tenants-detail' }">details</router-link>
      <router-link :to="{ name: 'tenants-calendar' }">calendar</router-link>
      <router-link :to="{ name: 'tenants-schedule' }">schedule</router-link>
    </nav> -->
    <SpinerVue v-if="isLoadingLocation"></SpinerVue>

    <router-view v-else></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { CustomErrorToast } from "@/sweetAlert";
import SpinerVue from "../../../components/Spiner.vue";

export default {
  components: {
    SpinerVue,
  },
  props: {
    idProperty: {
      requird: true,
    },
  },
  data() {
    return {
      isLoadingLocation: false,
    };
  },
  methods: {
    ...mapActions("propertiesStore", ["fetchPropertyDetails"]),
    async loadPropertyData() {
      this.isLoadingLocation = true;
      try {
        await this.fetchPropertyDetails(this.idProperty);
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
      this.isLoadingLocation = false;
    },
  },
  mounted() {
    this.loadPropertyData();
  },
};
</script>

<style></style>
