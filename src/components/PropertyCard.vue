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
  mounted() {
    console.log("currency", this.siteCountry);
  },
};
</script>
