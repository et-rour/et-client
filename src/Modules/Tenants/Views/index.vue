<template>
  <div class="w-full mb-32 lg:mb-2">
    <!-- hero -->
    <div class="my-container hero-main rounded-3xl overflow-hidden relative">
      <img
        src="@/assets/images/womanStanding.png"
        alt="Hero image"
        class="w-full h-full object-cover"
      />

      <!-- MASK -->
      <div
        class="w-full h-full absolute top-0 left-0 flex flex-col justify-end gap-3 py-4 rounded-b-3xl mask"
      ></div>

      <div
        class="w-full h-full absolute top-0 left-0 flex flex-col justify-end items-center pb-16"
      >
        <div class="w-10/12 lg:w-9/12">
          <h1 class="my-title text-white">
            {{ $t("tenants.index.hero.title") }}
          </h1>

          <div class="flex gap-2 flex-wrap">
            <button
              class="bg-white w-64 py-2 rounded-md font-bold text-blue-600"
              v-scroll-to="'#spaces'"
            >
              {{ $t("tenants.index.hero.find") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- details -->
    <div class="bg-my-blue-primary w-full relative px-2 py-5 text-white mt-8">
      <div class="my-container mx-auto">
        <h2 class="my-title-2">
          {{ $t("tenants.index.details.title") }}
        </h2>
        <p class="my-5">
          {{ $t("tenants.index.details.description") }}
        </p>

        <div class="w-full pl-8 md:w-2/3">
          <div class="w-full bg-lime-600 flex items-center my-3">
            <img
              src="@/assets/icons/calendar.png"
              alt="calendar icon"
              class="w-10 h-10 object-contain mr-8"
            />
            <p>{{ $t("tenants.index.details.monthly") }}</p>
          </div>
          <div class="w-full bg-lime-600 flex items-center my-3">
            <img
              src="@/assets/icons/links.png"
              alt="calendar icon"
              class="w-10 h-10 object-contain mr-8"
            />
            <p>{{ $t("tenants.index.details.flexible") }}</p>
          </div>
          <div class="w-full bg-lime-600 flex items-center my-3">
            <img
              src="@/assets/icons/people.png"
              alt="calendar icon"
              class="w-10 h-10 object-contain mr-8"
            />
            <p>{{ $t("tenants.index.details.community") }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- avalible spaces -->
    <div class="my-container mt-6" id="spaces">
      <FilterLocationsComponent @filter="loadPropertiesFiltered" />

      <div class="w-full" v-if="isLoading">
        <Spiner></Spiner>
      </div>

      <div v-else-if="propertiesListFiltered.length > 0">
        <paginate
          ref="paginator"
          name="propertiesListFiltered"
          :list="propertiesListFiltered"
          :per="8"
          class="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <InfoCard
            v-for="property in paginated('propertiesListFiltered')"
            :key="property.id"
            :property="property"
          ></InfoCard>
        </paginate>
      </div>

      <h3 class="my-title-2 text-center text-gray-400" v-else>
        {{ $t("landing.spaces.notFound") }}
      </h3>
      <paginate-links
        for="propertiesListFiltered"
        class="flex justify-center p-2"
        :hide-single-page="true"
        v-if="propertiesListFiltered.length > 0"
        :simple="{
          prev: '<<',
          next: '>>',
        }"
        :classes="{
          '.next > a': 'next-link',
          '.prev > a': 'prev-link',
        }"
      ></paginate-links>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FilterLocationsComponent from "../../../components/FilterLocationsComponent.vue";
import Spiner from "../../../components/Spiner.vue";
import InfoCard from "../Components/InfoCard.vue";

export default {
  components: { InfoCard, Spiner, FilterLocationsComponent },
  data() {
    return {
      propertiesListFiltered: [],
      paginate: ["propertiesListFiltered"],
    };
  },
  computed: {
    ...mapGetters("propertiesStore", [
      "filteredPropertiesList",
      "isLoading",
      "propertiesList",
    ]),
    ...mapGetters("authStore", ["siteCountry"]),
  },
  methods: {
    ...mapActions("propertiesStore", ["loadProperties"]),
    goto(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;
      window.scrollTo(0, top);
    },
    toggleType(option) {
      if (option === "room") {
        if (this.type === "room") {
          this.type = "";
        } else {
          this.type = "room";
        }
      }
      if (option === "entire") {
        if (this.type === "entire") {
          this.type = "";
        } else {
          this.type = "entire";
        }
      }
    },
    loadPropertiesFiltered({ zone, city, type, siteCountry }) {
      console.log("%cMain.vue line:260 {object}", "color: #007acc;", {
        zone,
        city,
        type,
      });
      let listProperties = this.propertiesList;

      if (type !== "") {
        listProperties = listProperties.filter(
          (property) => property.propertyType === type
        );
      }

      if (zone !== "") {
        listProperties = listProperties.filter(
          (property) => property.zone.zone === zone
        );
      }

      if (city !== "") {
        listProperties = listProperties.filter(
          (property) => property.zone.city === city
        );
      }
      if (siteCountry !== "") {
        listProperties = listProperties.filter(
          (property) => property.zone.country === siteCountry
        );
      }

      console.log("%cMain.vue line:381 {listProperties}", "color: #007acc;", {
        listProperties,
      });
      this.propertiesListFiltered = listProperties;
    },
  },
  mounted() {
    this.loadPropertiesFiltered({
      zone: "",
      city: "",
      type: "",
      siteCountry: "",
    });
  },
  watch: {
    siteCountry() {
      this.$refs.paginator.goToPage(1);
    },
  },
  metaInfo: {
    title: "Arrendatarios",
  },
};
</script>

<style scoped>
.selectedField {
  background-color: #2323d5;
  color: #fff;
}
</style>
