<template>
  <div class="w-full h-full overflow-y-scroll bg-gray-100 py-5" id="details">
    <h1 class="my-title mb-3 text-center">
      {{ $t("adminPanel.locations.title") }}
    </h1>

    <div v-if="isLoadingLocationDetails" class="flex justify-center">
      <SpinerComponent />
    </div>

    <div v-else-if="!locationData">
      <h3 class="my-title-2">{{ $t("adminPanel.locations.select") }}</h3>
    </div>

    <template v-else>
      <div class="w-2/3 mx-auto">
        <div class="w-full flex justify-between">
          <router-link
            :to="{
              name: 'admin-locations-detail-info',
              params: { id: idLocation },
              hash: '#details',
            }"
            active-class="text-my-blue-primary"
            exact
            >{{ $t("adminPanel.locations.details") }}</router-link
          >
          <router-link
            :to="{
              name: 'admin-locations-detail-rooms',
              params: { id: idLocation },
              hash: '#details',
            }"
            active-class="text-my-blue-primary"
            exact
            >{{ $t("adminPanel.locations.seeRooms") }}</router-link
          >
          <router-link
            :to="{
              name: 'admin-locations-detail-rooms-create',
              params: { id: idLocation },
              hash: '#details',
            }"
            active-class="text-my-blue-primary"
            >{{ $t("adminPanel.locations.newRoom") }}</router-link
          >
          <router-link
            :to="{
              name: 'admin-locations-detail-image3d',
              params: { id: idLocation },
              hash: '#details',
            }"
            active-class="text-my-blue-primary"
            >{{ $t("adminPanel.locations.images3d") }}</router-link
          >
        </div>
      </div>

      <router-view></router-view>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SpinerComponent from "../../../../../components/Spiner.vue";
import { CustomErrorToast } from "@/sweetAlert";
export default {
  components: {
    SpinerComponent,
  },
  props: {
    idLocation: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isLoadingLocationDetails: true,
    };
  },
  methods: {
    ...mapActions("adminPanelStore/locations", ["fetchLocationDetails"]),
    async loadLocationDetails() {
      try {
        this.isLoadingLocationDetails = true;
        await this.fetchLocationDetails(this.idLocation);
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
      this.isLoadingLocationDetails = false;
    },
  },
  computed: {
    ...mapGetters("adminPanelStore/locations", ["getLocationDetails"]),
    locationData() {
      return this.getLocationDetails;
    },
  },
  created() {
    this.loadLocationDetails();
  },
  watch: {
    idLocation() {
      this.loadLocationDetails();
    },
  },
};
</script>

<style></style>
