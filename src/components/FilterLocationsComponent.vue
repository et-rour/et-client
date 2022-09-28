<template>
  <div
    class="w-full rounded-md lg:rounded-full bg-white justify-center items-center px-0 pb-4 lg:py-4 overflow-hidden"
  >
    <div class="flex flex-col lg:flex-row w-full px-8">
      <div class="w-full lg:flex-grow">
        <select class="w-full text-center border lg:border-l-0 h-full py-3" v-model="city">
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
        <select class="w-full text-center border h-full py-3" v-model="zone">
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
      <!-- buttons -->
      <div
        class="flex flex-col lg:flex-row justify-evenly fitems-center gap-2 py-4 px-2 text-center border lg:border-r-0 text-sm flex-shrink-0"
      >
        <button
          class="border rounded-full cursor-pointer w-auto px-2 py-2"
          @click="toggleType('room')"
          :class="this.type === 'room' ? 'selectedField' : ''"
        >
          <p>{{ $t("landing.hero_2.private") }}</p>
        </button>
        <button
          class="border rounded-full cursor-pointer w-auto px-2 py-2"
          @click="toggleType('entire')"
          :class="this.type === 'entire' ? 'selectedField' : ''"
        >
          <p>{{ $t("landing.hero_2.complete") }}</p>
        </button>
        <button
          class="border rounded-full cursor-pointer w-auto px-2 py-2"
          @click="toggleType('hours')"
          :class="this.type === 'hours' ? 'selectedField' : ''"
        >
          <p>{{ $t("landing.hero_2.hours") }}</p>
        </button>
        <button
          class="border cursor-pointer w-auto px-3 py-2 bg-my-blue-primary text-white rounded-lg"
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
    };
  },
  methods: {
    toggleType(option) {
      switch (option) {
        case "room":
          if (this.type === "room") {
            this.type = "";
            break;
          }
          this.type = "room";
          break;

        case "entire":
          if (this.type === "entire") {
            this.type = "";
            break;
          }
          this.type = "entire";
          break;
        case "hours":
          if (this.type === "hours") {
            this.type = "";
            break;
          }
          this.type = "hours";
          break;

        default:
          this.type = "";
          break;
      }
    },
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
