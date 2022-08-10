<template>
  <div class="w-full mx-auto mb-24 md:mb-2">
    <!-- hero -->
    <CoverImageVue />

    <VideoComponent></VideoComponent>

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
        <div class="w-10/12 lg:w-10/12">
          <h1 class="my-title text-white mb-4">
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
          :per="9"
          class="w-full gap-5 grid grid-cols-2 lg:grid-cols-3"
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

    <!-- load space -->
    <div class="my-container hero rounded-3xl overflow-hidden relative my-24">
      <img
        src="@/assets/images/location.png"
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
        <div class="w-10/12 lg:w-8/12">
          <h1 class="my-title text-white">
            {{ $t("landing.hero_3.title_1") }}
            <br />
            <span class="mr-4">
              {{ $t("landing.hero_3.title_2") }}
            </span>
            <button
              class="my-btn inline-block bg-white text-my-blue-primary font-normal text-xl"
              @click="$router.push({ name: 'property' })"
            >
              {{ $t("landing.hero_3.load") }}
            </button>
          </h1>
        </div>
      </div>
    </div>

    <!-- details brands -->
    <div
      class="bg-my-blue-primary w-full relative px-2 py-10 text-white text-center"
    >
      <div class="w-7/12 mx-auto">
        <h2 class="my-title-2 mb-4">{{ $t("landing.details.title") }}</h2>
        <p class="text-[#E3E3E3] mb-4">
          {{ $t("landing.details.description") }}
        </p>
        <div
          class="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          <div class="w-full h-full flex justify-center">
            <img
              src="@/assets/images/Grupo.svg"
              alt="icon"
              class="h-36 w-36 object-contain"
            />
          </div>
          <div class="w-full h-full flex justify-center">
            <img
              src="@/assets/images/Idesa.svg"
              alt="icon"
              class="h-36 w-36 object-contain"
            />
          </div>
          <div class="w-full h-full flex justify-center">
            <img
              src="@/assets/images/Indumotora.svg"
              alt="icon"
              class="h-36 w-36 object-contain"
            />
          </div>
          <div class="w-full h-full flex justify-center">
            <img
              src="@/assets/images/Tarragona.svg"
              alt="icon"
              class="h-36 w-36 object-contain"
            />
          </div>
          <div class="w-full h-full flex justify-center">
            <img
              src="@/assets/images/Conquista.svg"
              alt="icon"
              class="h-36 w-36 object-contain"
            />
          </div>
          <div class="w-full h-full flex justify-center">
            <img
              src="@/assets/images/Numancia.svg"
              alt="icon"
              class="h-36 w-36 object-contain"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- work with us -->
    <div
      class="my-container hero rounded-3xl overflow-hidden relative mt-12 mb-20"
    >
      <img
        src="@/assets/images/workWithUsImage.png"
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
        <div class="flex justify-evenly flex-wrap w-full">
          <h1 class="my-title text-white">
            {{ $t("landing.hero_4.title_1") }} <br />
            {{ $t("landing.hero_4.title_2") }}
          </h1>
          <button
            class="my-btn bg-white w-64 py-2 rounded-md text-my-blue-primary self-end"
            @click="showWorkWithUsModal"
          >
            {{ $t("landing.hero_4.see") }}
          </button>
        </div>
      </div>
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
    console.log("%cMain.vue line:313 counted", "color: #007acc;");
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
.hero-main {
  height: calc(100vh - 190px);
}
@media (min-width: 768px) {
  .hero-main {
    height: calc(100vh - 100px);
  }
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
