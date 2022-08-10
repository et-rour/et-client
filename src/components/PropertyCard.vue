import { mapGetters } from 'vuex';
<template>
  <div class="flex flex-col h-80">
    <div class="h-2/3 w-full cursor-pointer">
      <img
        @click="
          $router.push({ name: 'tenants-detail', params: { id: property.id } })
        "
        :src="property.image"
        alt="location_image"
        class="object-cover h-full w-full"
      />
    </div>
    <div class="bg-white p-3 pr-12 h-1/3 w-full border">
      <router-link
        :to="{ name: 'tenants-detail', params: { id: property.id } }"
        class="text-gray-400"
      >
        <a class="text-black" v-if="property.value !== '0'"
          >{{ currency.symbol }}
          {{ (parseInt(property.value) * parseInt(currency.value)).toFixed(0) }}
          / {{ $t("landing.propertyCard.montly") }}
        </a>
        <span class="text-black" v-else
          >{{ $t("landing.propertyCard.noValue") }} /
        </span>
        - {{ property.name }}
        <!-- <p>
          zone:{{ property.zone.zone }} city:{{ property.zone.city }} country:
          {{ property.zone.country }}
        </p> -->
      </router-link>
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
