<template>
  <div v-if="hasDeleted" class="w-2/3 h-full py-4 flex flex-col justify-start">
    <p class="my-title mb-3 text-center">{{ $t("adminPanel.locations.title") }}</p>
    <div class="flex flex-col items-center">
      <p class="mr-3 my-2 text-center">{{ $t("sweetAlertMessages.fullDeleted") }}</p>
    </div>
  </div>
  <div v-else-if="hasRestored" class="w-2/3 h-full py-4 flex flex-col justify-start">
    <p class="my-title mb-3 text-center">{{ $t("adminPanel.locations.title") }}</p>
    <div class="flex flex-col items-center">
      <p class="mr-3 my-2 text-center">{{ $t("sweetAlertMessages.restored") }}</p>
    </div>
  </div>
  <div v-else class="w-2/3 h-full py-4 flex flex-col justify-start">
    <p class="my-title mb-3 text-center">{{ $t("adminPanel.locations.title") }}</p>
    <div class="flex flex-col items-start">
      <p class="mr-3 my-2"><b>{{ $t("adminPanel.locations.name") }}:</b> {{location.name}}</p>
      <p class="mr-3 my-2"><b>{{ $t("adminPanel.locations.description") }}:</b> {{location.description}}</p>
      <p class="mr-3 my-2"><b>{{ $t("adminPanel.locations.address") }}:</b> {{location.address}}</p>
      <p class="mr-3 my-2"><b>{{ $t("adminPanel.locations.zone") }}:</b> {{location.zone.zone}}, {{location.zone.city}}, {{location.zone.state}} ({{location.zone.country}})</p>
      <p class="mr-3 my-2"><b>{{ $t("adminPanel.locations.user") }}:</b> {{location.owner.email}} ({{location.owner.lastName}}, {{location.owner.firstName}})</p>
    </div>
    <div class="w-full flex justify-center mt-4">
        <button
          class="my-btn mx-2 bg-red-600"
          :class="isUploadingLocation ? 'bg-gray-500' : ''"
          @click="deleteLocation"
        >
          {{ $t("adminPanel.locations.fullDelete") }}
        </button>
        <button
          class="my-btn mx-2"
          :class="isUploadingLocation ? 'bg-gray-500' : ''"
          @click="restoreLocationFunc"
        >
          {{ $t("adminPanel.locations.restore") }}
        </button>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  CustomConfirmDialog,
} from "@/sweetAlert";

export default {
  computed: {
    ...mapGetters("adminPanelStore/locations", ["getLocationDetails"]),
    locationId() {
      return this.$route.params.id;
    }
  },
  data() {
    return {
      hasDeleted: false,
      hasRestored: false,
      location: null,
      isUploadingLocation: false,
    };
  },
  methods: {
    ...mapActions("adminPanelStore/locations", [
      "fetchLocationDetails",
      "permanentDeleteLocation",
      "restoreLocation"
    ]),
    async loadLocation() {
      await this.fetchLocationDetails(this.locationId);
      this.location = this.getLocationDetails;
      console.log(this.location)
    },
    async restoreLocationFunc() {
      const { isConfirmed } = await CustomConfirmDialog.fire({
        title: this.$t("sweetAlertMessages.restoreLocationTitle"),
        text: this.$t("sweetAlertMessages.restoreLocationText"),
      })

      if (!isConfirmed) return;

      const { id } = this.location

      await this.restoreLocation(id);

      this.hasRestored = true;
    },
    async deleteLocation() {
      const { isConfirmed } = await CustomConfirmDialog.fire({
        title: this.$t("sweetAlertMessages.sendToTrashPermanent"),
        text: this.$t("sweetAlertMessages.locationToTrashPermanent"),
      })

      if (!isConfirmed) return;

      const { id } = this.location

      await this.permanentDeleteLocation(id);

      this.hasDeleted = true;
    }
  },
  async created() {
    try {
      await this.loadLocation();
    } catch (error) {
      console.log(error);
    }
  },
  watch: {
    locationId() {
      this.loadLocation();
      this.hasRestored = false;
      this.hasDeleted = false;
    },
  },
};
</script>

<style></style>
