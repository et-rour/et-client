<template>
  <div class="w-full mx-auto mb-24 md:mb-2">
    <!-- hero -->
    <div
      class="w-11/12 md:w-8/12 h-screen mx-auto relative overflow-hidden"
    >
      <img
        src="@/assets/images/homeImage.png"
        alt="Hero image"
        class="w-full h-full
         object-cover rounded-3xl"
      />
      <div
        class="w-full h-full px-4 absolute top-0 left-0 flex flex-col justify-end gap-3 py-4 rounded-b-3xl overflow-hidden bg-gradient-to-b from-white via-gray-999 to-black opacity-25"
      >
      </div>
      <div
        class="w-full h-full px-4 absolute top-0 left-0 flex flex-col justify-end gap-3 py-4 rounded-3xl overflow-hidden bg-transparent"
      >
        <h1 class="my-title text-white md:px-36 w-8/12 md:w-8/12">
          {{ $t("landing.hero.title") }}
        </h1>

        <div class="flex gap-2 flex-wrap md:px-36 mb-24">
          <button class="bg-white w-64 py-2 rounded-md font-bold text-blue-600">
            {{ $t("landing.hero.searchProperty") }}
          </button>
          <button class="bg-blue-600 w-64 py-2 rounded-md font-bold text-white">
            {{ $t("landing.hero.openProperty") }}
          </button>
        </div>
      </div>
    </div>

    <!-- video -->
    <div class="my-container mt-12 mb-12 w-11/12 md:w-8/12">
      <h2 class="my-title text-center">
        {{ $t("landing.video.title") }}
      </h2>
      <p class="text-center my-4">
        {{ $t("landing.video.description") }}
      </p>
      <div class="w-full flex justify-center">
        <button class="bg-blue-600 w-64 py-2 rounded-md font-bold text-white">
          {{ $t("landing.video.ver") }}
        </button>
      </div>
    </div>

    <!-- hero_2 -->
    <div
      class="w-11/12 md:w-8/12 mx-auto h-screen rounded-3xl overflow-hidden relative"
    >
      <img
        src="@/assets/images/womanWorking.png"
        alt="Hero image"
        class="w-full h-full object-cover"
      />
      <div
        class="bg-black bg-opacity-20 w-full h-full px-4 md:px-20 absolute top-0 left-0 flex flex-col justify-end gap-3 py-4 rounded-3xl overflow-hidden"
      >
        <h1 class="my-title text-white">
          {{ $t("landing.hero_2.title") }}
          <button
            class="my-btn w-auto inline-block px-4 bg-white text-blue-600 font-normal text-xl"
          >
            {{ $t("landing.hero_2.ver") }}
          </button>
        </h1>

        <div
          class="flex flex-col gap-2 w-full rounded-md lg:rounded-full py-4 bg-white justify-center items-center px-8 lg:flex-row"
        >
          <div
            class="lg:border w-full lg:border-x-0 flex flex-col gap-2 md:flex-row"
          >
            <div
              class="flex justify-center items-center border-r gap-1 w-full md:w-40 py-1 border md:border-0 md:border-r px-4 lg:px-0"
            >
              <font-awesome-icon
                icon="search"
                class="text-2xl text-gray-400 block"
              />
              <input
                type="text"
                placeholder="Santiago"
                class="block w-full py-4"
                v-model="search"
              />
            </div>
            <div
              class="flex justify-center items-center border-r gap-1 w-full md:w-40 py-1 border md:border-0 md:border-r px-4 lg:px-0"
            >
              <select
                name="pets"
                id="pet-select"
                class="w-full text-center py-4"
              >
                <option value="" selected>
                  {{ $t("landing.hero_2.commune") }}
                </option>
                <option value="Opcion 1">Opcion 1</option>
                <option value="Opcion 2">Opcion 2</option>
              </select>
            </div>
            <div
              class="flex flex-grow justify-center items-center gap-2 flex-nowrap py-2 text-center border md:border-0 px-4 lg:px-0"
            >
              <div class="px-4 border rounded-full cursor-pointer">
                <p>{{ $t("landing.hero_2.private") }}</p>
              </div>
              <div class="px-4 border rounded-full cursor-pointer">
                <p>{{ $t("landing.hero_2.complete") }}</p>
              </div>
            </div>
          </div>
          <button
            class="bg-blue-700 w-12 h-12 rounded-full flex justify-center items-center flex-shrink-0"
          >
            <font-awesome-icon
              icon="search"
              class="text-2xl text-white block"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Spaces -->
    <div class="w-11/12 md:w-8/12 mx-auto">
      <h2 class="my-title my-8 mt-12 text-center">
        {{ $t("landing.spaces.title") }}
      </h2>
      <div class="w-full" v-if="isLoading">
        <Spiner></Spiner>
      </div>
      <div v-else-if="propertiesList.length > 0">
        <div
          class="w-full grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3"
        >
          <PropertyCard
            v-for="property in filteredPropertiesList(search)"
            :key="property.id"
            :property="property"
          ></PropertyCard>
        </div>
        <div class="w-full flex justify-end">
          <router-link
            to="/"
            class="text-blue-700 border-b border-blue-700 my-2 ml-1 inline-block font-bold"
            >{{ $t("landing.spaces.seeMore")
            }}<font-awesome-icon icon="fa-solid fa-right-long" class="ml-2" />
          </router-link>
        </div>
      </div>
      <h3 class="my-subtitle text-center text-gray-400" v-else>
        {{ $t("landing.spaces.notFound") }}
      </h3>
    </div>

    <!-- hero_3 -->
    <div
      class="w-11/12 md:w-8/12 mx-auto h-screen rounded-3xl overflow-hidden relative my-8"
    >
      <img
        src="@/assets/images/location.png"
        alt="Hero image"
        class="w-full h-full object-cover"
      />
      <div
        class="bg-black bg-opacity-20 w-full h-full px-4 md:px-20 absolute top-0 left-0 flex flex-col justify-end gap-3 py-4 rounded-3xl overflow-hidden"
      >
        <h1 class="my-title text-white">
          {{ $t("landing.hero_3.title_1") }}
          <span class="block">
            {{ $t("landing.hero_3.title_2") }}
            <button
              class="my-btn w-auto inline-block px-4 bg-white text-blue-600 font-normal text-xl"
            >
              {{ $t("landing.hero_3.load") }}
            </button>
          </span>
        </h1>
      </div>
    </div>

    <!-- details -->
    <div class="bg-blue-700 w-full relative px-2 py-5 text-white text-center">
      <div class="w-11/12 md:w-8/12 mx-auto">
        <h2 class="my-subtitle">{{ $t("landing.details.title") }}</h2>
        <p>
          {{ $t("landing.details.description") }}
        </p>
        <div class="w-full h-full grid grid-cols-2">
          <div class="w-full h-full flex justify-center">
            <img
              src="@/assets/images/Grupo.svg"
              alt="icon"
              class="h-28 w-28 object-contain"
            />
          </div>
          <div class="w-full h-full flex justify-center">
            <img
              src="@/assets/images/Idesa.svg"
              alt="icon"
              class="h-28 w-28 object-contain"
            />
          </div>
          <div class="w-full h-full flex justify-center">
            <img
              src="@/assets/images/Indumotora.svg"
              alt="icon"
              class="h-28 w-28 object-contain"
            />
          </div>
          <div class="w-full h-full flex justify-center">
            <img
              src="@/assets/images/Tarragona.svg"
              alt="icon"
              class="h-28 w-28 object-contain"
            />
          </div>
          <div class="w-full h-full flex justify-center">
            <img
              src="@/assets/images/Conquista.svg"
              alt="icon"
              class="h-28 w-28 object-contain"
            />
          </div>
          <div class="w-full h-full flex justify-center">
            <img
              src="@/assets/images/Numancia.svg"
              alt="icon"
              class="h-28 w-28 object-contain"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- hero -->
    <div
      class="w-11/12 md:w-8/12 mx-auto h-screen rounded-3xl overflow-hidden relative mt-6"
    >
      <img
        src="@/assets/images/workWithUsImage.png"
        alt="Hero image"
        class="w-full h-full object-cover"
      />
      <div
        class="bg-black bg-opacity-20 w-full h-full px-4 md:px-20 absolute top-0 left-0 flex flex-col justify-end gap-3 py-4 rounded-3xl overflow-hidden"
      >
        <div class="flex justify-evenly flex-wrap">
          <h1 class="my-title text-white">
            {{ $t("landing.hero_4.title_1") }} <br />
            {{ $t("landing.hero_4.title_2") }}
          </h1>
          <button
            class="bg-white w-64 py-2 rounded-md font-bold text-blue-600 self-end"
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
export default {
  components: { PropertyCard, Spiner },
  data() {
    return {
      search: "",
    };
  },
  computed: {
    ...mapGetters("propertiesStore", [
      "propertiesList",
      "isLoading",
      "filteredPropertiesList",
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

<style></style>
