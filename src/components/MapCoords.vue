<template>
  <div class="w-full bg-gray-400 my-4">
    <l-map
      style="height: 300px"
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
export default {
  props: {
    lat: { required: true, default: -13.44 },
    long: { required: true, default: -70.659 },
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    };
  },
  computed: {
    zoom() {
      return 3;
    },
    markerLatLng() {
      return [this.lat, this.long];
    },
  },
  methods: {
    handleMapClick(event) {
      const { latlng } = event;
      this.$emit("changeCoords", latlng);
    },
  },
};
</script>

<style></style>
