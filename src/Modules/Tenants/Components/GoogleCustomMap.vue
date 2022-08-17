<template>
  <div>
    <div id="map"></div>
    <!-- <p>{{ zoom }}</p> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
    };
  },
  props: ["center", "zoom"],
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: this.zoom,
        center: this.center,
      });
      new window.google.maps.Circle({
        strokeColor: "#2323D5",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#4242ed",
        fillOpacity: 0.35,
        map: this.map,
        center: this.center,
        radius: 300,
      });
    },
  },
};
</script>

<style>
#map {
  height: 400px;
  margin-bottom: 2rem;
}
</style>
