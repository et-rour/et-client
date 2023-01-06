<template>
  <div class="w-full">
    <!-- <nav class="flex justify-center items-center gap-4">
      <router-link :to="{ name: 'tenants-detail' }">details</router-link>
      <router-link :to="{ name: 'tenants-calendar' }">calendar</router-link>
      <router-link :to="{ name: 'tenants-schedule' }">schedule</router-link>
    </nav> -->
    <SpinerVue v-if="isLoadingLocation"></SpinerVue>
    <div v-else-if="getPropertyDetails">
      <router-view></router-view>
      <a
        target="_blank"
        :href="`https://wa.me/+56921811458/?text=Hola, tengo una consulta sobre la propiedad: ${propertyName}`"
        class="w-16 h-16 fixed bottom-28 right-12 lg:bottom-16 lg:right-16 z-50 cursor-pointer"
      >
        <img
          src="@/assets/images/WhatsApp.png"
          alt="whatsapp fixed"
          class="w-full"
        />
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
  computed: {
    ...mapGetters("propertiesStore", ["getPropertyDetails"]),
    propertyName() {
      return `${this.getPropertyDetails.name}, ${this.getPropertyDetails.zone.zone} - ${this.getPropertyDetails.zone.city}`;
    },
  },
  mounted() {
    this.loadPropertyData();
  },
};
</script>

<style></style>
