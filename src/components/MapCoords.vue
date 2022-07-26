<template>
  <div class="w-full my-4">
    <div class="w-full relative mb-10">
      <div class="flex justify-center items-center relative">
        <input
          type="text"
          class="border border-black flex-grow my-input"
          v-model="addressSugestion"
          @keypress.enter.prevent="fetchSugestions"
          placeholder="Los condes, Santiago, Chile"
        />
        <div
          class="px-3 py-2 absolute right-0 top-0 cursor-pointer"
          @click="fetchSugestions"
        >
          <font-awesome-icon icon="search" />
        </div>
      </div>

      <div
        class="flex flex-col gap-4 pb-4 absolute top-9 left-0 z-50 bg-gray-100 w-full"
        v-if="showSugestionsMenu"
      >
        <SpinerComponent v-if="loadingSugestions"></SpinerComponent>

        <div
          v-else
          class="w-full bg-gray-200 py-1 px-5 flex justify-between cursor-pointer"
          v-for="sugestion in sugestions"
          :key="sugestion.place_id"
          @click="setSugestedCoords(sugestion.lat, sugestion.lon)"
        >
          <p>{{ sugestion.display_name }}</p>
        </div>
      </div>
    </div>

    <l-map
      style="height: 300px"
      class="z-40 relative"
      :zoom="zoom"
      :center="markerLatLng"
      :options="{ interactive: true }"
      @click="handleMapClick"
    >
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="markerLatLng"></l-marker>
    </l-map>
    <!-- <p>lat:{{ lat }}</p>
    <p>long:{{ long }}</p> -->
  </div>
</template>

<script>
import axios from "axios";
import { CustomErrorToast } from "@/sweetAlert";
import SpinerComponent from "./Spiner.vue";
export default {
  components: {
    SpinerComponent,
  },
  props: {
    lat: { required: true, default: -13.44 },
    long: { required: true, default: -70.659 },
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 3,

      showSugestionsMenu: true,
      loadingSugestions: false,
      addressSugestion: "",
      sugestions: [],
      notSugestionsFound: false,
    };
  },
  computed: {
    markerLatLng() {
      return [this.lat, this.long];
    },
  },
  methods: {
    handleMapClick(event) {
      const { latlng } = event;
      console.log("%cMapCoords.vue line:72 latlng", "color: #007acc;", latlng);
      this.$emit("changeCoords", latlng);
    },
    async fetchSugestions() {
      if (this.addressSugestion.length === 0) return;

      try {
        this.loadingSugestions = true;
        this.notSugestionsFound = false;
        this.showSugestionsMenu = true;
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/?addressdetails=5&q=${this.addressSugestion}&format=json&limit=5`
        );
        this.sugestions = res.data;
        if (this.sugestions.length === 0) {
          this.notSugestionsFound = true;
        }
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
      this.loadingSugestions = false;
    },
    setSugestedCoords(lat, lng) {
      this.showSugestionsMenu = false;
      const coords = {
        lat: Number(lat),
        lng: Number(lng),
      };
      console.log("%cMapCoords.vue line:93 coords", "color: #007acc;", coords);
      this.$emit("changeCoords", coords);
      setTimeout(() => {
        this.zoom = 12;
      }, 500);
    },
  },
};
</script>

<style></style>
