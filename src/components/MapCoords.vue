<template>
  <div class="w-full my-4">
    <input
      type="text"
      id="pac-input"
      class="border border-black flex-grow my-input w-full my-5"
      placeholder="Los condes, Santiago, Chile"
    />

    <div id="map" v-show="showMap"></div>
    <!-- resultClick
    <p>lat:{{ resultClick.lat }}</p>
    <p>long:{{ resultClick.lng }}</p>
    resultClick -->
  </div>
</template>

<script>
export default {
  props: {
    lat: {
      type: String,
      default: "-7.92047",
    },
    long: {
      type: String,
      default: "-63.33285",
    },
    editing: {
      type: Boolean,
      default: false,
    },
    showMap: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      map: null,
      autocomplete: null,
      marker: null,
      resultClick: {
        lat: null,
        long: null,
      },
    };
  },
  methods: {
    initMap() {
      const center = { lat: Number(this.lat), lng: Number(this.long) };
      console.log({ center });
      this.map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: this.editing ? 10 : 2,
        center,
        mapTypeControl: false,
      });

      if (this.editing) {
        const svgMarker = {
          path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
          fillColor: "blue",
          fillOpacity: 0.6,
          strokeWeight: 0,
          rotation: 0,
          scale: 2,
          anchor: new window.google.maps.Point(15, 30),
        };

        new window.google.maps.Marker({
          map: this.map,
          icon: svgMarker,
          position: { lat: Number(this.lat), lng: Number(this.long) },
        });
      }

      const defaultBounds = {
        north: center.lat + 0.1,
        south: center.lat - 0.1,
        east: center.lng + 0.1,
        west: center.lng - 0.1,
      };
      const input = document.getElementById("pac-input");
      const options = {
        bounds: defaultBounds,
        fields: ["address_components", "geometry", "icon", "name"],
        strictBounds: false,
        map: this.map,
      };
      this.autocomplete = new window.google.maps.places.Autocomplete(
        input,
        options
      );

      this.marker = new window.google.maps.Marker({
        map: this.map,
        anchorPoint: new window.google.maps.Point(0, -29),
      });

      this.map.addListener("click", (event) => {
        this.clickMap(event.latLng);
      });

      this.autocomplete.addListener("place_changed", this.addMarker);
    },
    addMarker() {
      this.marker.setVisible(false);

      const place = this.autocomplete.getPlace();

      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        this.map.fitBounds(place.geometry.viewport);
      } else {
        this.map.setCenter(place.geometry.location);
        this.map.setZoom(17);
      }

      this.marker.setPosition(place.geometry.location);
      this.marker.setVisible(true);

      this.getMarkerCoords(place.geometry.location);
    },
    clickMap(location) {
      this.marker.setVisible(false);
      this.marker.setPosition(location);
      this.marker.setVisible(true);

      this.getMarkerCoords(location);
    },
    getMarkerCoords(location) {
      const tmpLocation = location.toString();
      // (-15.54, -65.3434)
      const tmpReplace = tmpLocation.replace("(", "").replace(")", "");
      const coord = tmpReplace.split(", ");
      this.resultClick.lat = parseFloat(coord[0]);
      this.resultClick.lng = parseFloat(coord[1]);

      this.$emit("result-click", this.resultClick);
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style>
#map {
  height: 400px;
}
</style>
