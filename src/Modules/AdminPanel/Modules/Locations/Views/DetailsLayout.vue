<template>
  <div v-if="deletedProp" class="w-full h-full overflow-y-scroll bg-gray-100 py-5" id="details">
    <h1 class="my-title mb-3 text-center">
      {{ $t("adminPanel.locations.title") }}
    </h1>
    <p class="mb-3 text-center">
      {{ $t("adminPanel.locations.sentToTrash") }}
    </p>
  </div>
  
  <div v-else class="w-full h-full overflow-y-scroll bg-gray-100 py-5" id="details" style="overscroll-behavior: contain">
    <h1 class="my-title mb-3 text-center">
      {{ $t("adminPanel.locations.title") }}
    </h1>

    <div v-if="getIsLoadingLocationDetails" class="flex justify-center">
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
              name: 'admin-locations-detail-images',
              hash: '#details',
            }"
            active-class="text-my-blue-primary"
            exact
            >{{ $t("adminPanel.locations.images") }}</router-link
          >
          <router-link
            :to="{
              name: 'admin-locations-detail-rooms',
              params: { id: idLocation },
              hash: '#details',
            }"
            active-class="text-my-blue-primary"
            exact
            :is="locationData.propertyType === 'entire' ? 'span' : 'router-link'"
            :class="locationData.propertyType==='entire' && 'my-disabled'"
            >{{ $t("adminPanel.locations.seeRooms") }}</router-link
          >
          <router-link
            :to="{
              name: 'admin-locations-detail-rooms-create',
              params: { id: idLocation },
              hash: '#details',
            }"
            active-class="text-my-blue-primary"
            :is="locationData.propertyType === 'entire' ? 'span' : 'router-link'"
            :class="locationData.propertyType==='entire' && 'my-disabled'"
            >{{ $t("adminPanel.locations.newRoom") }}</router-link
          >
          <!-- <router-link
            :to="{
              name: 'admin-locations-detail-image3d',
              params: { id: idLocation },
              hash: '#details',
            }"
            active-class="text-my-blue-primary"
            >{{ $t("adminPanel.locations.images3d") }}</router-link
          > -->
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
      deletedProp: false,
    };
  },
  methods: {
    ...mapActions("adminPanelStore/locations", ["fetchLocationDetails"]),
    async loadLocationDetails() {
      try {
        await this.fetchLocationDetails(this.idLocation);
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    },
  },
  computed: {
    ...mapGetters("adminPanelStore/locations", [
      "getLocationDetails",
      "getIsLoadingLocationDetails",
      "getAllLocations"
    ]),
    locationData() {
      return this.getLocationDetails;
    },
    locations() {
      return this.getAllLocations.length;
    }
  },
  created() {
    this.loadLocationDetails();
  },
  watch: {
    idLocation() {
      this.loadLocationDetails();
      this.deletedProp = false;
    },
    locations() {
      const idx = this.getAllLocations.findIndex(location => location.id == this.idLocation);
      if (idx === -1) this.deletedProp = true;
    }
  },
};
</script>

<style></style>
