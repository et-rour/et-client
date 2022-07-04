<template>
  <div>
    <div
      class="flex flex-col justify-center items-center h-80"
      v-if="!property"
    >
      <h2 class="my-title">{{ $t("tenants.details.title") }}</h2>
      <SpinerVue />
    </div>
    <div class="my-container mb-32 lg:mb-2" v-else>
      <h1 class="my-title">{{ property.name }}</h1>
      <p>
        {{ property.address }}, {{ property.zone.zone }} -
        {{ property.zone.city }} ({{ property.zone.state }}),
        {{ property.zone.country }}.
      </p>
      <p>{{ property.description }}</p>

      <img
        :src="property.image"
        alt="location image detail"
        class="w-full h-44 sm:h-64 md:h-80 lg:h-96 mb-4 object-cover"
      />

      <button
        class="relative border border-my-blue-primary rounded-lg w-full py-5 px-2 flex justify-center items-center mb-4 hover:text-white"
        @click="toggleShowModal"
        :class="
          property.images3D.length === 0
            ? 'hover:bg-gray-400 cursor-not-allowed'
            : 'hover:bg-my-blue-primary'
        "
        :disabled="property.images3D.length === 0"
      >
        <img src="@/assets/images/Vector.svg" alt="icon 3d" class="" />
        {{ $t("tenants.details.3d") }}
      </button>
      <!-- <div id="viewer" class="w-full h-96"></div> -->
      <button
        class="relative border border-my-blue-primary rounded-lg w-full py-9 px-2 flex justify-center items-center mb-4 hover:bg-my-blue-primary hover:text-white"
        @click="showContactModalFunc"
      >
        {{ $t("tenants.details.contacts") }}
      </button>

      <!-- <p>
        {{ $t("tenants.details.description") }}
      </p> -->

      <h3 class="my-title-2 my-4 mt-8">{{ $t("tenants.details.subtitle") }}</h3>
      <hr class="solid my-4" />
      <RoomCard
        v-for="room in property.roomsDetails"
        :key="room.id"
        :room="room"
      ></RoomCard>

      <!-- MAP -->
      <div class="w-full bg-gray-400 my-4">
        <l-map style="height: 300px" :zoom="zoom" :center="markerLatLng">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker :lat-lng="markerLatLng" v-if="validMarker"></l-marker>
        </l-map>
      </div>

      <button
        class="w-full bg-my-blue-primary text-white font-bold my-btn"
        @click="goToSchedule"
      >
        <router-link :to="{ name: 'tenants-schedule' }">{{
          $t("tenants.details.vistit")
        }}</router-link>
      </button>
      <button
        class="w-full bg-green-500 mt-2 text-white font-bold my-btn"
        @click="goToBuyLink"
      >
        <a>{{ $t("tenants.details.pay") }}</a>
      </button>
      <!-- <p>{{ validMarker }}</p> -->
    </div>

    <!-- MODAL 3D PICTURES -->
    <ModelGlobal :showModal="showModal" v-on:toogle="toggleShowModal">
      <div class="w-2/3 h-96 bg-white relative" @click.stop>
        <div id="viewer" class="w-full h-full"></div>
        <button
          class="bg-gray-500 w-10 h-10 absolute top-0 right-0 z-50"
          @click="toggleShowModal"
        >
          <font-awesome-icon icon="times"></font-awesome-icon>
        </button>
      </div>
    </ModelGlobal>
    <ContactModal
      v-if="property"
      :isModalOpen="showContactModal"
      :locationName="property.name"
      :locationAddress="`${property.address}, ${property.zone.zone} - ${property.zone.city} (${property.zone.state}), ${property.zone.country}`"
      v-on:closePopup="closeContactModal"
    ></ContactModal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { Viewer } from "photo-sphere-viewer";
import { MarkersPlugin } from "photo-sphere-viewer/dist/plugins/markers";
import "photo-sphere-viewer/dist/photo-sphere-viewer.css";
import "photo-sphere-viewer/dist/plugins/markers.css";
import RoomCard from "../Components/RoomCard.vue";
import ContactModal from "../Components/ContactModal.vue";
import ModelGlobal from "../../../components/ModelGlobal.vue";
import SpinerVue from "../../../components/Spiner.vue";

export default {
  components: { ModelGlobal, RoomCard, ContactModal, SpinerVue },
  props: {
    idProperty: {
      requird: true,
    },
  },
  data() {
    return {
      // MAP
      property: null,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',

      // 3D IMAGES
      showModal: false,
      viewer: "",
      showContactModal: false,
    };
  },
  methods: {
    ...mapMutations("authStore", ["changeShowLoginModal"]),
    ...mapActions("propertiesStore", ["fetchPropertyDetails"]),
    ...mapActions(["goToCheckoutSession"]),
    goToSchedule(e) {
      e.preventDefault();
      this.$router.push({ name: "tenants-schedule" });
    },
    goToBuyLink() {
      if (!this.isAuth) {
        this.changeShowLoginModal(true);
        return;
      }

      this.goToCheckoutSession({
        locationId: this.idProperty,
        userId: this.user.user.id,
        isLocation: true,
      });
    },
    closeContactModal() {
      this.showContactModal = false;
    },
    showContactModalFunc() {
      this.showContactModal = true;
    },
    show3d() {
      let onlyMarkers = [];
      const markerList = this.property.images3D.map((image, index) => {
        const markerWithImage = {
          marker: {
            id: index + 1,
            tooltip: image.name,
            circle: 30,
            svgStyle: {
              fill: "rgba(255,255,0,0.3)",
              stroke: "yellow",
              strokeWidth: "2px",
            },
            longitude: image.longitude,
            latitude: image.latitude,
            anchor: "center right",
          },
          image: image.image,
        };

        onlyMarkers.push(markerWithImage.marker);
        return markerWithImage;
      });

      console.log({ onlyMarkers });
      if (this.viewer !== "" || onlyMarkers.length === 0) {
        return;
      }
      this.viewer = new Viewer({
        container: document.querySelector("#viewer"),
        panorama: markerList[0].image,
        plugins: [
          [
            MarkersPlugin,
            {
              markers: onlyMarkers,
            },
          ],
        ],
      });
      const markersPlugin = this.viewer.getPlugin(MarkersPlugin);

      markersPlugin.on("select-marker", (e, marker) => {
        console.log(marker.id);
        this.viewer
          .animate({
            longitude: marker.config.longitude,
            latitude: marker.config.latitude,
            zoom: 100,
            speed: "-2rpm",
          })
          .then(() =>
            this.viewer.setPanorama(markerList[marker.id - 1].image).then(
              () =>
                markersPlugin.updateMarker({
                  // id: marker.id,
                  // longitude: -1.8,
                  // latitude: -0.28,
                }),
              this.viewer.animate({
                zoom: 50,
                speed: "2rpm",
              })
            )
          );
      });
    },
    toggleShowModal() {
      this.showModal = !this.showModal;
      setTimeout(() => {
        this.show3d();
      }, 1000);
    },
  },
  computed: {
    ...mapGetters("propertiesStore", ["getPropertyDetails"]),
    ...mapGetters("propertiesStore", ["propertiesById"]),
    ...mapGetters("authStore", ["user", "isAuth"]),
    zoom() {
      return this.property.lat !== "" && this.property.long !== "" ? 15 : 2;
    },
    markerLatLng() {
      return [this.property.lat, this.property.long];
    },
    validMarker() {
      return this.property.lat !== "" && this.property.long !== "";
    },
  },
  async mounted() {
    await this.fetchPropertyDetails(this.idProperty);
    this.property = this.getPropertyDetails;
  },
};
</script>

<style></style>
