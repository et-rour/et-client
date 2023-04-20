<template>
  <div class="w-full mb-32 lg:mb-2">
    <!-- hero -->
    <CoverImage
      :id="2"
      :idProgressBar="'cover_image_tenants'"
      :specificDirectory="'/COVER'"
      :defaultImageUrl="'https://firebasestorage.googleapis.com/v0/b/espacio-temporal-prod.appspot.com/o/COVER%2Fhome%2Fpropietario_min.png?alt=media&token=90573a24-f6bd-48bd-b5bf-d46048e73b06'"
      :defaultText="'ESPACIOS PARA EMPRENDEDORES'">
      <div class="flex gap-2 flex-wrap">
        <button
          class="bg-white w-64 py-2 rounded-md font-bold text-blue-600"
          v-scroll-to="'#spaces'">
          {{ $t("tenants.index.hero.find") }}
        </button>
      </div>
    </CoverImage>

    <!-- details -->
    <div class="bg-my-blue-primary w-full relative pt-24 text-white mt-8">
      <div
        class="my-container mx-auto grid grid-cols-1 gap-5 lg:grid-cols-7 lg:gap-16">
        <div class="lg:col-span-4">
          <h2 class="my-title text-4xl md:text-5xl">
            {{ $t("tenants.index.details.title") }}
          </h2>
          <p class="my-5 font-light">
            {{ $t("tenants.index.details.description_1") }}
          </p>
        </div>

        <div
          class="flex flex-col justify-between h-72 font-extrabold text-xl lg:col-span-3">
          <div class="flex items-center w-full">
            <img
              src="@/assets/icons/white_thief.png"
              alt="calendar icon"
              class="w-16 h-16 object-contain mr-8" />
            <p>{{ $t("tenants.index.details.icon_des_1") }}</p>
          </div>
          <div class="flex items-center w-full">
            <img
              src="@/assets/icons/white_house.png"
              alt="calendar icon"
              class="w-16 h-16 object-contain mr-8" />
            <p>{{ $t("tenants.index.details.icon_des_2") }}</p>
          </div>
          <div class="flex items-center w-full">
            <img
              src="@/assets/icons/white_bed.png"
              alt="calendar icon"
              class="w-16 h-16 object-contain mr-8" />
            <p>{{ $t("tenants.index.details.icon_des_3") }}</p>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-10">
        <button
          class="my-btn bg-white text-my-blue-primary font-bold px-4 py-2 w-auto mx-auto block"
          @click="onClickShowVideo">
          ▶ {{ $t("landing.video.ver") }}
        </button>

        <VideoPlayer ref="VideoPlayer" />
      </div>
      <div class="my-container text-black py-10 grid grid-cols-1 gap-16">
        <FilterLocationsComponent @filter="loadPropertiesFiltered" />
      </div>
    </div>

    <!-- avalible spaces -->
    <div class="my-container mt-6" id="spaces">
      <div class="w-full" v-if="isLoading">
        <Spiner></Spiner>
      </div>

      <div v-else-if="propertiesListFiltered.length > 0">
        <paginate
          ref="paginator"
          name="propertiesListFiltered"
          :list="propertiesListFiltered"
          :per="8"
          class="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <PropertyCardVue
            v-for="property in paginated('propertiesListFiltered')"
            :key="property.id"
            :property="property"></PropertyCardVue>
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
        }"></paginate-links>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FilterLocationsComponent from "../../../components/FilterLocationsComponent.vue";
import PropertyCardVue from "../../../components/PropertyCard.vue";
import Spiner from "../../../components/Spiner.vue";
import CoverImage from "../../Main/Components/CoverImage.vue";
import VideoPlayer from "../../Main/Components/VideoPlayer.vue";

export default {
  components: {
    Spiner,
    FilterLocationsComponent,
    CoverImage,
    PropertyCardVue,
    VideoPlayer,
  },
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

    onClickShowVideo() {
      this.$refs.VideoPlayer.showVideo();
    },

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
      let listProperties = this.propertiesList;

      if (type !== "") {
        if (type === "hours") {
          listProperties = listProperties.filter(
            (property) => property.isDaily
          );
        } else {
          listProperties = listProperties.filter(
            (property) => property.propertyType === type
          );
        }
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
