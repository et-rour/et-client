<template>
  <div class="flex flex-col h-80 relative">
    <div class="h-2/3 w-full cursor-pointer">
      <img
        @click="
          $router.push({ name: 'tenants-detail', params: { id: property.id } })
        "
        :src="image"
        alt="location_image"
        :class="!property.image ? 'object-contain h-full w-full' : 'object-cover h-full w-full'"
      />
    </div>
    <div class="bg-white p-3 pr-12 h-1/3 w-full border">
      <router-link
        :to="{ name: 'tenants-detail', params: { id: property.id } }"
        class="text-gray-400"
      >
        <span class="text-black" v-if="property.roomsDetails.length">{{ $t("general.privateSpace") }}</span>
        <a class="text-black" v-else-if="property.value !== '0'"
          >{{ currency }} / {{ $t("landing.propertyCard.montly") }}
        </a>
        <span class="text-black" v-else
          >{{ $t("landing.propertyCard.noValue") }} /
        </span>
        - {{ property.zone.city }}, {{ property.zone.zone }}
        <!-- <p>
          zone:{{ property.zone.zone }} city:{{ property.zone.city }} country:
          {{ property.zone.country }}
        </p> -->
      </router-link>
    </div>
    <img :src="availabilityImage" alt="agotada" class="absolute top-0 left-0">

  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import HousePlaceholder from "../assets/images/house_placeholder.png"

export default {
  props: {
    property: {
      type: Object,
      required: true,
    },
  },
  components: {
    // HousePlaceholder,
  },
  computed: {
    ...mapGetters("postsStore", ["currencies"]),
    ...mapGetters("authStore", ["siteCountry"]),
    image() {
      return this.property.image ?? require('../assets/images/house_placeholder512.png');
    },
    availabilityImage() {
      return this.property.isActive ? require('../assets/images/DISPONIBLE_CUT.png'):require('../assets/images/AGOTADA_CUT.png');
    },
    currency() {
      if (!this.property.isActive) {
        return this.$t("general.agotada")
      }
      if (this.siteCountry === "") {
        const clCurrency = this.currencies.filter( el => el.country === 'Chile');
        // return `$US ${this.property.value} `;
        return `${clCurrency[0].symbol} ${(
            parseFloat(this.property.value) * clCurrency[0].value
          ).toFixed(0)} `;
      }

      for (let i = 0; i < this.currencies.length; i++) {
        if (this.currencies[i].country === this.siteCountry) {
          return `${this.currencies[i].symbol} ${(
            parseFloat(this.property.value) * this.currencies[i].value
          ).toFixed(0)} `;
        }
      }
      return "";
    },
  },
  mounted() {
    console.log("PROPERTY DATA", this.property);
  },
};
</script>
