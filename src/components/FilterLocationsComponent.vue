<template>
  <div
    class="w-full rounded-md lg:rounded-full bg-white justify-center items-center px-0 pb-4 lg:py-2 overflow-hidden"
  >
    <div class="flex flex-col lg:flex-row md:items-center w-full px-8">
      <!-- CITY -->
      <div class="w-full lg:flex-grow">
        <select class="w-full text-center border lg:border-l-0 h-12" v-model="city">
          <option value="" selected>
            {{ $t("landing.hero_2.city") }}
          </option>
          <option
            v-for="zoneDetail in filteredCities"
            :key="zoneDetail.id"
            :value="zoneDetail.city"
          >
            {{ zoneDetail.city }}
          </option>
        </select>
      </div>
      <!-- COMUNA -->
      <div class="w-full lg:flex-grow">
        <select class="w-full text-center border h-12" v-model="zone">
          <option value="" selected>
            {{ $t("landing.hero_2.commune") }}
          </option>
          <option
            v-for="zoneDetail in filteredZones"
            :key="zoneDetail.id"
            :value="zoneDetail.zone"
          >
            {{ zoneDetail.zone }}
          </option>
        </select>
      </div>
      <!-- TYPE -->
      <div class="w-full lg:flex-grow">
        <select class="w-full text-center border h-12" v-model="type">
          <option value="" selected>
            {{ $t("landing.hero_2.type") }}
          </option>
          <option
            v-for="(option,index) in timeOptions"
            :key="`time_${index}`"
            :value="option.value"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
      <!-- buttons -->
      <div
        class="flex justify-center items-center px-2 h-12 border lg:border-r-0 flex-shrink-0"
      >
        <button
          class="border cursor-pointer w-auto px-3 py-1 bg-my-blue-primary text-white rounded-lg"
          @click="sendFilters"
        >
          <p>{{ $t("landing.hero_2.seeResult") }}</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      zone: "",
      city: "",
      type: "",
      timeOptions:[
         {
          text:this.$t("landing.hero_2.private"),
          value:"room",
         },
         {
          text:this.$t("landing.hero_2.complete"),
          value:"entire",
         },
         {
          text:this.$t("landing.hero_2.hours"),
          value:"hours",
         },
         {
          text:this.$t("landing.hero_2.galpon"),
          value:"galpon",
         },
         {
          text:this.$t("landing.hero_2.terreno"),
          value:"terreno",
         },
      ]
    };
  },
  methods: {
    sendFilters() {
      this.$emit("filter", {
        zone: this.zone,
        city: this.city,
        type: this.type,
        siteCountry: this.siteCountry,
      });
    },
  },
  computed: {
    ...mapGetters("propertiesStore", [
      "getZonesOrderedByCity",
      "getZonesOrderedByComuna",
    ]),
    ...mapGetters("authStore", ["siteCountry"]),
    filteredCities() {
      return this.getZonesOrderedByCity(this.siteCountry);
    },
    filteredZones() {
      return this.getZonesOrderedByComuna(this.city);
    },
  },
  mounted() {},
  watch: {
    siteCountry(value) {
      this.$emit("filter", {
        zone: this.zone,
        city: this.city,
        type: this.type,
        siteCountry: value,
      });
    },
  },
};
</script>

<style></style>
