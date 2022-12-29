<template>
  <div class="w-full mx-auto mb-24 md:mb-2">
    <!-- hero -->
    <div class="absolute top-0 left-0 text-gray-100">
      version: {{ appVersion }}
    </div>
    
    <CoverImageVue
      :id="1"
      :idProgressBar="'cover_image_home'"
      :specificDirectory="'/COVER'"
      :defaultImageUrl="'https://firebasestorage.googleapis.com/v0/b/espacio-temporal-e37f5.appspot.com/o/COVER%2Fhome.png?alt=media&token=1c2c5620-1904-43b1-9de9-9c3449ad8dd9'"
      :defaultText="'BUSCAMOS PROPIEDADES EN DESUSO Y LAS TRANSFORMAMOS EN ESPACIOS DE TRABAJO'"
    >
      <div class="flex gap-8 flex-col sm:flex-row">
        <button
          class="my-btn font-semibold bg-white w-full md:w-70 text-my-blue-primary"
          @click="$router.push({ name: 'tenants' })"
        >
          {{ $t("landing.hero.searchProperty") }}
        </button>
        <button
          class="my-btn font-semibold w-full md:w-70 text-white p-2"
          @click="$router.push({ name: 'owner' })"
        >
          {{ $t("landing.hero.openProperty") }}
        </button>
      </div>
    </CoverImageVue>

    <VideoComponent />

    <!-- find space -->
    <div
      class="my-container mx-auto h-screen rounded-3xl overflow-hidden relative"
      id="find"
    >
      <img
        src="@/assets/images/womanWorking.png"
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
        <div class="w-10/12 lg:w-11/12 xl:w-10/12">
          <h1 class="my-title text-3xl md:text-myheader1 text-white mb-4">
            <span class="mr-6">{{ $t("landing.hero_2.title") }}</span>
            <button
              class="my-btn bg-white text-my-blue-primary text-xl w-auto px-6 inline-block align-top"
              @click="$router.push({ name: 'tenants' })"
            >
              {{ $t("landing.hero_2.ver") }}
            </button>
          </h1>
          <FilterLocationsComponent @filter="loadPropertiesFiltered" />
        </div>
      </div>
    </div>

    <!-- Spaces -->
    <div class="my-container" id="list-spaces">
      <h2 class="my-title-2 my-16 md:text-center">
        {{ $t("landing.spaces.title") }}
      </h2>
      <!-- spinner -->
      <div class="w-full" v-if="isLoading">
        <Spiner></Spiner>
      </div>
      <!-- paginate -->
      <div v-else-if="propertiesListFiltered.length > 0">
        <paginate
          ref="paginator"
          name="propertiesData"
          :list="propertiesListFiltered"
          :per="8"
          class="w-full gap-8 grid grid-cols-1 md:grid-cols-2"
        >
          <PropertyCard
            v-for="property in paginated('propertiesData')"
            :key="property.id"
            :property="property"
          ></PropertyCard>
        </paginate>
        <paginate-links
          for="propertiesData"
          class="flex justify-center p-2"
          :hide-single-page="true"
          :key="siteCountry"
          :simple="{
            prev: '<<',
            next: '>>',
          }"
          :classes="{
            '.next > a': 'next-link',
            '.prev > a': 'prev-link',
          }"
        ></paginate-links>
        <div class="w-full flex justify-end">
          <router-link
            :to="{ name: 'tenants' }"
            class="text-blue-700 border-b border-blue-700 my-2 ml-1 inline-block"
            ><a> {{ $t("landing.spaces.seeMore") }} </a
            ><font-awesome-icon icon="fa-solid fa-right-long" class="ml-2" />
          </router-link>
        </div>
      </div>
      <!-- NO AVALIBLE -->
      <h3 class="my-title-2 text-center text-gray-400" v-else>
        {{ $t("landing.spaces.notFound") }}
      </h3>
    </div>

  </div>
</template>

<script>
import PropertyCard from "../../components/PropertyCard.vue";
import { mapActions, mapGetters } from "vuex";
import Spiner from "../../components/Spiner.vue";
import VideoComponent from "./Components/VideoComponent.vue";
import CoverImageVue from "./Components/CoverImage.vue";
import FilterLocationsComponent from "../../components/FilterLocationsComponent.vue";
import { version } from "../../../package.json";
export default {
  components: {
    PropertyCard,
    Spiner,
    VideoComponent,
    CoverImageVue,
    FilterLocationsComponent,
  },
  data() {
    return {
      propertiesListFiltered: [],
      resetVisible: true,
      paginate: ["propertiesData"],
      appVersion: version,
    };
  },
  computed: {
    ...mapGetters("propertiesStore", [
      "propertiesList",
      "isLoading",
      "filteredPropertiesList",
      "zonesList",
    ]),
    ...mapGetters("authStore", ["siteCountry"]),
  },
  methods: {
    ...mapActions("propertiesStore", ["loadProperties", "loadZones"]),
    loadPropertiesFiltered({ zone, city, type, siteCountry }) {
      
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

      this.propertiesListFiltered = listProperties;
    },
    showWorkWithUsModal() {
      // Use sweetalert2
      // this.$swal({
      //   title: "<strong>Espacio en construcción</strong>",
      //   icon: "info",
      //   html:
      //     "Puede enviarnos su CV a  " +
      //     '<a style="color: #2323D5; " href = "mailto: info@espaciotemporal.cl">info@espaciotemporal.cl</a> ',
      //   focusConfirm: false,
      // });
      this.$router.push({ name: "workwithus" });
    },
    resetFilters() {
      this.search = "";
      this.zone = "";
      this.type = "";
    },
    setResetVisible() {
      this.resetVisible = !this.resetVisible;
    },
  },
  async mounted() {
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
    zone() {
      this.$refs.paginator.goToPage(1);
    },
  },
  metaInfo: {
    title: "Inicio",
  },
};
</script>

<style>
.selectedField {
  background-color: #2323d5;
  color: #fff;
}

.hero {
  height: calc(100vh - 190px);
}
@media (min-width: 768px) {
  .hero {
    height: calc(100vh);
  }
}
</style>
