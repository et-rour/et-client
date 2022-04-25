<template>
  <div class="">
    <!-- <h1 class="my-title">{{ $t("admin.locations.title") }}</h1> -->
    <div class="flex flex-col" v-if="ownersLocations">
      <div v-if="ownersLocations.length < 1">
        <h2 class="my-subtitle">{{ $t("admin.locations.notFound") }}</h2>
      </div>
      <div v-else v-for="location in ownersLocations" :key="location.id">
        <PropertyToogleVue
          :locationNumber="1"
          :location="location"
        ></PropertyToogleVue>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PropertyToogleVue from "../Components/PropertyToogle.vue";
export default {
  components: {
    PropertyToogleVue,
  },
  computed: {
    ...mapGetters("propertiesStore", ["propertiesList", "zonesList"]),
    ...mapGetters("ownerPanelStore", ["ownersLocations"]),
  },
};
</script>

<style></style>
