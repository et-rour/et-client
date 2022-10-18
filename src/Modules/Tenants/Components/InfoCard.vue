<template>
  <div class="w-full h-60 lg:h-80 border relative">
    <img
      @click="
        $router.push({ name: 'tenants-detail', params: { id: property.id } })
      "
      :src="property.image"
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
    <img src="@/assets/images/AGOTADA_CUT.png" alt="agotada" class="absolute top-0 left-0" v-if="!property.isActive">
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
  },
};
</script>

<style></style>
