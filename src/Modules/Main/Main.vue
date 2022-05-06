<template>
  <div class="w-full mx-auto mb-24 md:mb-2">
    <!-- hero -->
    <div class="my-container hero mx-auto relative overflow-hidden">
      <img
        src="@/assets/images/homeImage.png"
        alt="Hero image"
        class="w-full h-full object-cover rounded-3xl"
      />
      <!-- MASK -->
      <div
        class="w-full h-full absolute top-0 left-0 flex flex-col justify-end gap-3 py-4 rounded-b-3xl mask"
      ></div>

      <div
        class="w-full h-full absolute top-0 left-0 flex flex-col justify-end items-center pb-16"
      >
        <div class="w-10/12 lg:w-8/12">
          <h1 class="my-title text-white mb-3 hidden lg:block">
            {{ $t("landing.hero.title") }}
          </h1>
          <h1 class="my-title text-white mb-3 lg:hidden">
            {{ $t("landing.hero.titleMovile") }}
          </h1>

          <div class="flex gap-8 flex-col sm:flex-row">
            <button
              class="my-btn bg-white w-full md:w-64 text-my-blue-primary"
              @click="$router.push({ name: 'tenants' })"
            >
              {{ $t("landing.hero.searchProperty") }}
            </button>
            <button
              class="my-btn w-full md:w-64 text-white"
              @click="$router.push({ name: 'owner' })"
            >
              {{ $t("landing.hero.openProperty") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <VideoComponent></VideoComponent>

    <!-- find space -->
    <div
      class="my-container mx-auto hero rounded-3xl overflow-hidden relative"
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
        <div class="w-10/12 lg:w-9/12">
          <h1 class="my-title text-white mb-4">
            <span class="mr-6">{{ $t("landing.hero_2.title") }}</span>
            <button
              class="my-btn bg-white text-my-blue-primary text-xl w-auto px-6 inline-block align-top"
              @click="$router.push({ name: 'tenants' })"
            >
              {{ $t("landing.hero_2.ver") }}
            </button>
          </h1>

          <div
            class="flex flex-col gap-2 w-full rounded-md lg:rounded-full py-3 bg-white justify-center items-center px-8 md:flex-row"
          >
            <div
              class="lg:border lg:border-l-0 lg:border-r-0 w-full lg:border-x-0 flex flex-col gap-2 md:flex-row"
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
                v-model="zone"
              >
                <option value="" selected>
                  {{ $t("landing.hero_2.commune") }}
                </option>
                <option
                  v-for="zone in sortedZones"
                  :key="zone.id"
                  :value="zone.id"
                >
                  {{zone.city}} - {{zone.zone}}
                </option>
              </select>
            </div>
            <div
              class="flex flex-grow justify-center items-center gap-2 flex-nowrap py-2 text-center border md:border-0 px-4 lg:px-0"
            >
              <button class="px-4 border rounded-full cursor-pointer" @click="toggleType('room')" :class="this.type === 'room' ? 'selectedField' : ''">
                <p>{{ $t("landing.hero_2.private") }}</p>
              </button>
              <button class="px-4 border rounded-full cursor-pointer" @click="toggleType('entire')" :class="this.type === 'entire' ? 'selectedField' : ''">
                <p>{{ $t("landing.hero_2.complete") }}</p>
              </button>
            </div>
            <button
              class="my-btn w-12 h-12 rounded-full flex justify-center items-center flex-shrink-0"
            >
              <font-awesome-icon
                icon="search"
                class="text-2xl text-white block"
              />
            </button>
          </div>
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
      <!-- cards -->
      <div v-else-if="propertiesList.length > 0">
        <div class="w-full gap-5 grid grid-cols-2 lg:grid-cols-3">
          <PropertyCard
            v-for="property in propertiesData"
            :key="property.id"
            :property="property"
          ></PropertyCard>
        </div>
        <div class="w-full flex justify-end">
          <router-link
            :to="{ name: 'tenants' }"
            class="text-blue-700 border-b border-blue-700 my-2 ml-1 inline-block"
            >{{ $t("landing.spaces.seeMore")
            }}<font-awesome-icon icon="fa-solid fa-right-long" class="ml-2" />
          </router-link>
        </div>
      </div>
      <!-- see more -->
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
export default {
  components: { PropertyCard, Spiner, VideoComponent },
  data() {
    return {
      search: "",
      zone: "",
      type: "",
    };
  },
  computed: {
    ...mapGetters("propertiesStore", [
      "propertiesList",
      "isLoading",
      "filteredPropertiesList",
      "zonesList",
    ]),
    propertiesData() {
      let arr = this.filteredPropertiesList(this.search)
      if (this.type !== "") {
        arr = arr.filter(el => el.propertyType === this.type);
      }
      if(this.zone !== "") {
        arr = arr.filter(el => el.zone.id === this.zone);
      }
      return arr;
    },
    sortedZones() {
      return this.zonesList
    }
  },
  methods: {
    ...mapActions("propertiesStore", ["loadProperties", "loadZones",]),
    toggleType(option) {
      if(option === "room") {
        if(this.type === "room") {
          this.type = ""
        } else {
          this.type = "room"
        }
      }
      if(option === "entire") {
        if(this.type === "entire") {
          this.type = ""
        } else {
          this.type = "entire"
        }
      }
    },
    sortArray(x, y){
      if (x.city < y.city) {return -1;}
      if (x.city > y.city) {return 1;}
      return 0;
    },
    showWorkWithUsModal() {
      // Use sweetalert2
      this.$swal({
        title: "<strong>Espacio en construcción</strong>",
        icon: "info",
        html:
          "puede enviarnos su cv a  " +
          '<a style="color: #2323D5; " href = "mailto: espacio@rour.dev">espacio@rour.dev</a> ',
        focusConfirm: false,
      });
      return;
    },
  },
  mounted() {
    if (this.propertiesList.length < 1) {
      this.loadProperties();
      this.loadZones();
    }
  }
};
</script>

<style>
  .selectedField {
    background-color: #2463EB;
    color: #FFF;
  }
  .hero {
    height: calc(100vh - 190px);
  }
  @media (min-width: 768px) {
    .hero {
      height: 100vh;
    }
  }
</style>
