<template>
  <div class="w-full h-full overflow-y-scroll bg-gray-100 py-5" id="details">
    <div class="w-2/3 mx-auto" v-if="locationData">
      <h1 class="my-title mb-3 text-center">
        {{ $t("adminPanel.locations.title") }}
        <span class="text-gray-400 text-xl">#{{ locationData.id }}</span>
      </h1>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    idLocation: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters("adminPanelStore", [
      "getLocationById",
      "getFilteredUsers",
      "getAllZones",
    ]),
    locationData() {
      return this.getLocationById(this.idLocation);
    },
  },
};
</script>

<style></style>
