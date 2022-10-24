<template>
  <div class="w-full h-60 lg:h-80 border relative">
    <img
      @click="
        $router.push({ name: 'tenants-detail', params: { id: property.id } })
      "
      :src="image"
      alt="location image"
      class="h-32 lg:h-48 w-full object-cover"
    />
    <div class="py-4 px-2">
      <router-link :to="{ name: 'tenants-detail', params: { id: property.id } }"
        ><a> {{ property.name }} </a></router-link
      >
      <p class="text-gray-500">
        <span v-if="property.roomsDetails.length" class="text-black">{{ $t("general.privateSpace") }}</span>
        <span v-else class="text-black">{{ currency }}</span>
        / {{ property.zone.city }}, {{ property.zone.zone }}
      </p>
    </div>
    <img :src="availabilityImage" alt="agotada" class="absolute top-0 left-0">
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    property: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters("postsStore", ["currencies"]),
    ...mapGetters("authStore", ["siteCountry"]),
    currency() {
      if (!this.property.isActive) {
        return this.$t("general.agotada")
      }

      if (this.siteCountry === "") {
        const clCurrency = this.currencies.filter( el => el.country === 'Chile');
        // return `$US ${this.property.value} `;
        return `${clCurrency[0].symbol} ${(
            parseInt(this.property.value) * clCurrency[0].value
          ).toFixed(0)} `;
      }

      for (let i = 0; i < this.currencies.length; i++) {
        if (this.currencies[i].country === this.siteCountry) {
          return `${this.currencies[i].symbol} ${(
            parseInt(this.property.value) * this.currencies[i].value
          ).toFixed(0)} `;
        }
      }
      return "";
    },
    image() {
      return this.property.image ?? require('@/assets/images/house_placeholder512.png');
    },
    availabilityImage() {
      return this.property.isActive ? require('@/assets/images/DISPONIBLE_CUT.png'):require('@/assets/images/AGOTADA_CUT.png');
    },
  },
};
</script>

<style></style>
