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
      <div class="flex justify-between items-center">
        <h2 class="my-title">{{ $t("tenants.index.avalibleSpaces.title") }}</h2>
        <div class="flex flex-col gap-3">
          <button
            class="px-4 border rounded-full cursor-pointer w-full"
            @click="toggleType('room')"
            :class="this.type === 'room' ? 'selectedField' : ''"
          >
            <p>{{ $t("landing.hero_2.private") }}</p>
          </button>
          <button
            class="px-4 border rounded-full cursor-pointer w-full"
            @click="toggleType('entire')"
            :class="this.type === 'entire' ? 'selectedField' : ''"
          >
            <p>{{ $t("landing.hero_2.complete") }}</p>
          </button>
        </div>
      </div>
      <div class="w-full relative">
        <input
          type="text"
          v-model="search"
          class="my-input w-full border border-gray-400 border-l-0 border-r-0 rounded-none py-4 my-3 pl-12"
        />
        <font-awesome-icon
          icon="search"
          class="text-3xl absolute top-6 left-3 text-gray-400"
        ></font-awesome-icon>
      </div>
      <div class="w-full" v-if="isLoading">
        <Spiner></Spiner>
      </div>
      <paginate
        ref="paginator"
        name="propertiesData"
        :list="propertiesData"
        :per="8"
        class="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
        v-else-if="propertiesData.length > 0"
      >
        <InfoCard
          v-for="property in paginated('propertiesData')"
          :key="property.id"
          :property="property"
        ></InfoCard>
      </paginate>
      <h3 class="my-title-2 text-center text-gray-400" v-else>
        {{ $t("landing.spaces.notFound") }}
      </h3>
      <paginate-links
        for="propertiesData"
        class="flex justify-center p-2"
        :hide-single-page="true"
        v-if="propertiesData.length > 0"
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
import Spiner from "../../../components/Spiner.vue";
import InfoCard from "../Components/InfoCard.vue";

export default {
  components: { InfoCard, Spiner },
  data() {
    return {
      search: "",
      type: "",
      localSiteCountry: "",
      paginate: ["propertiesData"],
    };
  },
  computed: {
    ...mapGetters("propertiesStore", [
      "filteredPropertiesList",
      "isLoading",
      "propertiesList",
    ]),
    ...mapGetters("authStore", ["siteCountry"]),
    propertiesData() {
      let arr = this.filteredPropertiesList(this.search);

      if (this.type !== "") {
        arr = arr.filter((el) => el.propertyType === this.type);
      }

      if (this.localSiteCountry !== "") {
        arr = arr.filter((el) => el.zone.country === this.localSiteCountry);
      }

      return arr;
    },
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
  },
  mounted() {
    this.localSiteCountry = this.siteCountry;
  },
  watch: {
    siteCountry() {
      this.localSiteCountry = this.siteCountry;
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
