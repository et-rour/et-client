<template>
  <div class="relative">
    <div class="flex flex-col justify-center items-center" v-if="!property">
      <h2 class="my-title">{{ $t("tenants.details.title") }}</h2>
    </div>
    <div class="mb-32 lg:mb-2" v-else>
      <!-- header -->

      <div class="my-container">
        <h1 class="my-title">{{ property.name }}</h1>
        <div
          class="w-full flex flex-col md:flex-row md:gap-4 justify-between mb-6 text-center xl::text-left"
        >
          <p>
            {{ property.zone.city }} -
            {{ property.zone.state }}
          </p>

          <!-- <div
            class="flex flex-col md:flex-row gap-4 md:gap-14 justify-between"
          >
            <div class="flex items-center">
              <font-awesome-icon class="text-2xl mr-4" icon="restroom" />
              <p class="inline-block">
                {{
                  $tc("tenants.details.bathroom", property.bathrooms, {
                    count: property.bathrooms,
                  })
                }}
              </p>
            </div>

            <div class="flex items-center">
              <font-awesome-icon class="text-2xl mr-4" icon="door-open" />
              <p class="inline-block">
                {{
                  $tc("tenants.details.room", property.rooms, {
                    count: property.rooms,
                  })
                }}
              </p>
            </div>

            <div class="flex items-center">
              <font-awesome-icon class="text-2xl mr-4" icon="train-subway" />
              <p class="inline-block">Metro Irrazanabal</p>
            </div>
          </div> -->
        </div>
      </div>

      <!-- images -->
      <div class="grid grid-cols-12 gap-x-4 p-2 my-container mb-8">
        <!-- <SwiperVue
          :images="getPropertyDetailsImages"
          class="col-span-12"
        ></SwiperVue> -->

        <!-- COVER IMAGE -->
        <div class="col-span-12 md:col-span-7">
          <img
            :src="property.image"
            alt="cover property"
            class="w-full h-44 sm:h-64 md:h-80 object-cover mb-8"
          />
        </div>

        <div class="col-span-12 md:col-span-5">
          <div class="grid grid-cols-4 gap-2 md:grid-cols-2 relative">
            <img
              :src="image.image"
              :alt="`image_extra_${image.id}`"
              class="w-full h-40 object-cover"
              v-for="image in sidebarImages"
              :key="image.id"
            />

            <button
              class="py-2 px-3 rounded-lg flex items-center absolute right-2 bottom-2 text-xs shadow-xl border bg-white"
              @click="toggleShowModalImages"
              v-if="sidebarImages.length > 0"
            >
              <img
                src="@/assets/icons/menupoints.png"
                class="w-3 h-3 mr-1"
                alt="menu"
              />
              {{ $t("tenants.details.pictures") }}
            </button>
          </div>

          <button
            class="my-btn py-3 mt-3 rounded-none bg-green-400 w-full"
            @click="goToSchedule"
          >
            {{ $t("tenants.details.vistit") }}
          </button>
        </div>
        <p class="col-span-12">{{ property.description }}</p>
      </div>

      <!-- INCLUDED SERVICES -->
      <IncludedServices
        :services="{
          vault: property.vault,
          parking: property.garage > 0,
          cleaning: property.cleaning,
          bathrooms: property.bathrooms > 0,
          wifi: property.wifi,
          security: property.security,
        }"
      />

      <!-- MAP -->
      <div class="my-container my-16">
        <Mapa :center="markerLatLng" :zoom="zoom" />
      </div>

      <!-- buttons -->
      <!-- <template>
        <button
          class="relative border border-my-blue-primary rounded-lg w-full py-5 px-2 flex justify-center items-center my-5 hover:text-white"
          @click="toggleShowModalImages3d"
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
        <button
          class="relative border border-my-blue-primary rounded-lg w-full py-9 px-2 flex justify-center items-center mb-4 hover:bg-my-blue-primary hover:text-white"
          @click="showContactModalFunc"
        >
          {{ $t("tenants.details.contacts") }}
        </button>
      </template> -->

      <!-- ROOMS -->
      <div class="my-container mb-20" v-if="property.propertyType !== 'entire'">
        <h3 class="my-title-2 my-4 mt-8">
          {{ $t("tenants.details.subtitle") }}
        </h3>
        <RoomCard
          v-for="room in property.roomsDetails"
          :key="room.id"
          :room="room"
          :locationLeaseRange="{
            start: property.startLease,
            end: property.endLease,
          }"
        ></RoomCard>
      </div>

      <!-- Pay -->
      <div class="my-container">
        <button
          class="w-full bg-green-500 mt-2 text-white font-bold my-btn"
          @click="goToCalendar"
          v-if="property.propertyType === 'entire'"
        >
          <a>{{ $t("tenants.details.pay") }}</a>
        </button>
      </div>
    </div>

    <!-- MODAL EXTRA IMAGES -->
    <ModelGlobal
      v-if="showModalImages"
      :showModal="showModalImages"
      v-on:toogle="toggleShowModalImages"
    >
      <div class="w-2/3 h-96 bg-white relative" @click.stop>
        <SwiperVue :images="carouselModalImages" class="h-full"></SwiperVue>
        <button
          class="bg-gray-100 w-10 h-10 absolute top-0 right-0 z-50"
          @click="toggleShowModalImages"
        >
          <font-awesome-icon icon="times"></font-awesome-icon>
        </button>
      </div>
    </ModelGlobal>

    <!-- MODAL 3D PICTURES -->
    <!-- <ModelGlobal
      :showModal="showModalImages3d"
      v-on:toogle="toggleShowModalImages3d"
    >
      <div class="w-2/3 h-96 bg-white relative" @click.stop>
        <div id="viewer" class="w-full h-full"></div>
        <button
          class="bg-gray-500 w-10 h-10 absolute top-0 right-0 z-50"
          @click="toggleShowModalImages3d"
        >
          <font-awesome-icon icon="times"></font-awesome-icon>
        </button>
      </div>
    </ModelGlobal> -->

    <!-- <ContactModal
      v-if="property"
      :isModalOpen="showContactModal"
      :locationName="property.name"
      :locationAddress="`${property.address}, ${property.zone.zone} - ${property.zone.city} (${property.zone.state}), ${property.zone.country}`"
      v-on:closePopup="closeContactModal"
    ></ContactModal> -->
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
// import { Viewer } from "photo-sphere-viewer";
// import { MarkersPlugin } from "photo-sphere-viewer/dist/plugins/markers";
import "photo-sphere-viewer/dist/photo-sphere-viewer.css";
import "photo-sphere-viewer/dist/plugins/markers.css";
import RoomCard from "../Components/RoomCard.vue";
// import ContactModal from "../Components/ContactModal.vue";
import ModelGlobal from "../../../components/ModelGlobal.vue";
import { CustomErrorToast } from "@/sweetAlert.js";
import SwiperVue from "../Components/Swiper.vue";
import Mapa from "../Components/GoogleCustomMap.vue";
import IncludedServices from "../Components/IncludedServices.vue";
export default {
  components: {
    ModelGlobal,
    RoomCard,
    // ContactModal,
    SwiperVue,
    Mapa,
    IncludedServices,
  },
  props: {
    idProperty: {
      requird: true,
    },
  },
  data() {
    return {
      property: null,

      // EXTRA IMAGES
      showModalImages: false,
    };
  },
  methods: {
    ...mapMutations("authStore", ["changeShowLoginModal"]),
    ...mapActions(["goToLocationCheckoutSession"]),
    goToSchedule(e) {
      e.preventDefault();
      if (!this.isAuth) {
        this.changeShowLoginModal(true);
        return;
      }
      this.$router.push({ name: "tenants-schedule" });
    },
    async goToCalendar() {
      this.$router.push({
        name: "tenants-calendar",
        params: { idRoom: "entire" },
      });
    },
    closeContactModal() {
      this.showContactModal = false;
    },
    // showContactModalFunc() {
    //   this.showContactModal = true;
    // },
    // show3d() {
    //   let onlyMarkers = [];
    //   const markerList = this.property.images3D.map((image, index) => {
    //     const markerWithImage = {
    //       marker: {
    //         id: index + 1,
    //         tooltip: image.name,
    //         circle: 30,
    //         svgStyle: {
    //           fill: "rgba(255,255,0,0.3)",
    //           stroke: "yellow",
    //           strokeWidth: "2px",
    //         },
    //         longitude: image.longitude,
    //         latitude: image.latitude,
    //         anchor: "center right",
    //       },
    //       image: image.image,
    //     };

    //     onlyMarkers.push(markerWithImage.marker);
    //     return markerWithImage;
    //   });

    //   console.log({ onlyMarkers });
    //   if (this.viewer !== "" || onlyMarkers.length === 0) {
    //     return;
    //   }
    //   this.viewer = new Viewer({
    //     container: document.querySelector("#viewer"),
    //     panorama: markerList[0].image,
    //     plugins: [
    //       [
    //         MarkersPlugin,
    //         {
    //           markers: onlyMarkers,
    //         },
    //       ],
    //     ],
    //   });
    //   const markersPlugin = this.viewer.getPlugin(MarkersPlugin);

    //   markersPlugin.on("select-marker", (e, marker) => {
    //     console.log(marker.id);
    //     this.viewer
    //       .animate({
    //         longitude: marker.config.longitude,
    //         latitude: marker.config.latitude,
    //         zoom: 100,
    //         speed: "-2rpm",
    //       })
    //       .then(() =>
    //         this.viewer.setPanorama(markerList[marker.id - 1].image).then(
    //           () =>
    //             markersPlugin.updateMarker({
    //               // id: marker.id,
    //               // longitude: -1.8,
    //               // latitude: -0.28,
    //             }),
    //           this.viewer.animate({
    //             zoom: 50,
    //             speed: "2rpm",
    //           })
    //         )
    //       );
    //   });
    // },
    // toggleShowModalImages3d() {
    //   this.showModalImages3d = !this.showModalImages3d;
    //   setTimeout(() => {
    //     this.show3d();
    //   }, 1000);
    // },
    toggleShowModalImages() {
      this.showModalImages = !this.showModalImages;
    },
    scrollToAnchor() {
      this.$nextTick(() => {
        if (this.$route.hash) {
          const $el = document.querySelector(this.$route.hash);
          $el && window.scrollTo(0, $el.offsetTop);
        }
      });
    },
  },
  computed: {
    ...mapGetters("propertiesStore", [
      "getPropertyDetails",
      "getPropertyImages",
    ]),
    ...mapGetters("propertiesStore", ["propertiesById"]),
    ...mapGetters("authStore", ["user", "isAuth"]),
    zoom() {
      return this.property.lat !== "" && this.property.long !== "" ? 15 : 2;
    },
    markerLatLng() {
      // RANDOM DEVIATION
      const latDeviation = (
        Math.random() * (0.0009 - -0.0009) +
        -0.0009
      ).toFixed(4);
      const lngDeviation = (
        Math.random() * (0.0009 - -0.0009) +
        -0.0009
      ).toFixed(4);
      return {
        lat: Number(this.property.lat) + Number(latDeviation),
        lng: Number(this.property.long) + Number(lngDeviation),
      };
    },
    sidebarImages() {
      return this.getPropertyImages(
        this.getPropertyDetails.propertyType
      ).filter((image, index) => {
        if (index < 4) {
          return image;
        }
      });
    },
    carouselModalImages() {
      return this.getPropertyImages(this.getPropertyDetails.propertyType);
    },
  },
  async mounted() {
    try {
      this.property = this.getPropertyDetails;
      this.scrollToAnchor();
    } catch (error) {
      CustomErrorToast.fire({
        text: error.response.data.message || error,
      });
    }
  },
  metaInfo: {
    title: "Detalles Propiedad",
  },
};
</script>

<style></style>
