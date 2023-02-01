<template>
  <div class="">
    <!-- <h1 class="my-title">{{ $t("admin.locations.title") }}</h1> -->
    <div class="flex flex-col">
      <div v-if="GETTER_MY_LOCATIONS.length < 1">
        <h2 class="my-title-2">{{ $t("admin.locations.notFound") }}</h2>
      </div>
      <div v-else v-for="location in GETTER_MY_LOCATIONS" :key="location.id">
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
    ...mapGetters("ownerPanelStore", ["GETTER_MY_LOCATIONS"]),
  },
};
</script>

<style></style>
