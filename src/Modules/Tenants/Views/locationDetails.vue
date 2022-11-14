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
      <div class="my-container grid grid-cols-12 gap-x-4 mb-12">
        <!-- COVER IMAGE -->
        <div class="col-span-12 md:col-span-7 h-96">
            <img
              :src="image"
              alt="cover property"
              class="h-full w-full rounded-l-3xl"
              :class="!property.image ? 'object-contain' : 'object-cover'"
            />

        </div>

        <div class="col-span-12 md:col-span-5 h-96">
          <div class="grid grid-cols-4 gap-2 md:grid-cols-2 grid-rows-1 md:grid-rows-2 relative h-full">
            <img
              :src="image.image"
              :alt="`image_extra_${image.id}`"
              class="w-full h-full object-cover"
              v-for="image in sidebarImages"
              :key="image.id"
            />

            <button
              class="py-2 px-3 rounded-lg flex items-center absolute right-2 bottom-16 text-xs shadow-xl border bg-white"
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
            
            <button
              class="col-span-4 md:col-span-2 my-btn py-3 rounded-none font-black bg-my-green-primary w-full h-12"
              @click="goToSchedule"
              :disabled="!property.isActive"
              :class="!property.isActive&&'my-disabled'"
            >
              {{ $t("tenants.details.vistit") }}
            </button>
          </div>

        </div>
        
        <p class="col-span-12 md:col-span-7  mt-12">{{ property.description }}</p>
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
          :isActive="property.isActive&&room.isActive"
        ></RoomCard>
      </div>

      <!-- Pay -->
      <div class="my-container mt-10">
        <button
          class="w-full bg-green-500 mt-2 text-white font-bold my-btn"
          @click="goToCalendar"
          v-if="property.propertyType === 'entire'"
          :disabled="!property.isActive"
          :class="!property.isActive&&'my-disabled'"
        >
          {{ $t("tenants.details.pay") }} <span v-if="property.isActive">$ <NumberMaskComponent :number="property.value" /></span>
          <span></span>
        </button>
      </div>

      <!-- MAP -->
      <div class="my-container my-16">
        <Mapa :center="markerLatLng" :zoom="zoom" />
      </div>
    </div>

    <!-- MODAL EXTRA IMAGES -->
    <SwiperImagesComponent
      v-if="carouselModalImages.length>0"
      :showModal="showModalImages"
      v-on:toogle="toggleShowModalImages"
      :images="carouselModalImages"
    />

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
import "photo-sphere-viewer/dist/photo-sphere-viewer.css";
import "photo-sphere-viewer/dist/plugins/markers.css";
import RoomCard from "../Components/RoomCard.vue";
import { CustomErrorToast } from "@/sweetAlert.js";

import Mapa from "../Components/GoogleCustomMap.vue";
import IncludedServices from "../Components/IncludedServices.vue";
import SwiperImagesComponent from "../Components/SwiperImagesComponent.vue";
import NumberMaskComponent from '../../../components/NumberMaskComponent.vue';
export default {
  components: {
    RoomCard,
    SwiperImagesComponent,
    Mapa,
    IncludedServices,
    NumberMaskComponent,
  },
  props: {
    idProperty: {
      requird: true,
    },
  },
  data() {
    return {
      property: null,
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
    ...mapGetters("postsStore", ["currencies"]),
    currency() {
      return this.currencies.filter(currency => currency.country === this.property.zone.country)[0];
    },
    zoom() {
      return this.property.lat !== "" && this.property.long !== "" ? 15 : 2;
    },
    image() {
      return this.property.image ?? require('../../../assets/images/house_placeholder1024.png');
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
