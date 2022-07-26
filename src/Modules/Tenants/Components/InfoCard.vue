<template>
  <div class="w-full h-60 lg:h-80 border">
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
        <span class="text-black"
          >{{ currency.symbol }}
          {{
            (parseInt(property.value) * parseInt(currency.value)).toFixed(0)
          }}</span
        >
        / {{ property.address }}
      </p>
    </div>
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
      for (let i = 0; i < this.currencies.length; i++) {
        if (this.currencies[i].country === this.siteCountry) {
          return {
            symbol: this.currencies[i].symbol,
            value: this.currencies[i].value,
          };
        }
      }
      return "US$";
    },
  },
};
</script>

<style></style>
