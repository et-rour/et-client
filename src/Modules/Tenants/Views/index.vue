<template>
  <div class="w-full mx-auto mb-32 lg:mb-2">
    <!-- hero -->
    <div class="hero my-container rounded-3xl overflow-hidden relative md:w-8/12">
      <img
        src="@/assets/images/womanStanding.png"
        alt="Hero image"
        class="w-full h-full object-cover"
      />
      <div
        class="bg-black bg-opacity-20 w-full h-full px-4 absolute top-0 left-0 flex flex-col justify-end gap-3 py-4 rounded-3xl overflow-hidden"
      >
        <h1 class="my-title text-white">
          {{ $t("tenants.index.hero.title") }}
        </h1>

        <div class="flex gap-2 flex-wrap">
          <button class="bg-white w-64 py-2 rounded-md font-bold text-blue-600">
            {{ $t("tenants.index.hero.find") }}
          </button>
        </div>
      </div>
    </div>

    <!-- details -->
    <div class="bg-blue-700 w-full relative px-2 py-5 text-white mt-8">
      <div class="w-11/12 md:w-8/12 mx-auto">
        <h2 class="my-title">
          {{ $t("tenants.index.details.title") }}
        </h2>
        <p class="my-5">
          {{ $t("tenants.index.details.description") }}
        </p>

        <div class="w-full pl-8">
          <div class="w-full bg-lime-600 flex items-center my-3">
            <img
              src="@/assets/icons/calendar.png"
              alt="calendar icon"
              class="w-16 h-16 object-contain mr-8"
            />
            <p>{{ $t("tenants.index.details.monthly") }}</p>
          </div>
          <div class="w-full bg-lime-600 flex items-center my-3">
            <img
              src="@/assets/icons/links.png"
              alt="calendar icon"
              class="w-16 h-16 object-contain mr-8"
            />
            <p>{{ $t("tenants.index.details.flexible") }}</p>
          </div>
          <div class="w-full bg-lime-600 flex items-center my-3">
            <img
              src="@/assets/icons/people.png"
              alt="calendar icon"
              class="w-16 h-16 object-contain mr-8"
            />
            <p>{{ $t("tenants.index.details.community") }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- avalible spaces -->
    <div class="my-container md:w-8/12">
      <h2 class="my-title">{{ $t("tenants.index.avalibleSpaces.title") }}</h2>
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
      <div
        class="w-full flex flex-col gap-4"
        v-else-if="filteredPropertiesList(search).length > 0"
      >
        <InfoCard
          v-for="property in filteredPropertiesList(search)"
          :key="property.id"
          :property="property"
        ></InfoCard>
      </div>
      <h3 class="my-subtitle text-center text-gray-400" v-else>
        {{ $t("landing.spaces.notFound") }}
      </h3>
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
    };
  },
  computed: {
    ...mapGetters("propertiesStore", [
      "filteredPropertiesList",
      "isLoading",
      "propertiesList",
    ]),
  },
  methods: {
    ...mapActions("propertiesStore", ["loadProperties"]),
  },
  mounted() {
    if (this.propertiesList.length < 1) {
      this.loadProperties();
    }
  },
};
</script>

<style scoped>
.hero {
  height: calc(100vh - 190px);
}
</style>
