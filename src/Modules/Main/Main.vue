<template>
  <div class="w-full mx-auto mb-24 md:mb-2">
    <!-- hero -->
    <div class="my-container hero-main mx-auto relative overflow-hidden">
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
              class="my-btn bg-white w-full md:w-70 text-my-blue-primary"
              @click="$router.push({ name: 'tenants' })"
            >
              {{ $t("landing.hero.searchProperty") }}
            </button>
            <button
              class="my-btn w-full md:w-70 text-white p-2"
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
            class="w-full rounded-md lg:rounded-full bg-white justify-center items-center px-0 lg:px-8 pb-4 lg:py-4"
          >
            <div class="flex flex-col lg:flex-row">
              <!-- search -->
              <div class="flex justify-center items-center gap-2 border">
                <font-awesome-icon
                  icon="search"
                  class="text-2xl text-gray-400 block"
                />
                <input
                  type="text"
                  placeholder="Santiago"
                  class="block w-full h-full py-3"
                  v-model="search"
                />
              </div>
              <!-- select -->
              <div class="">
                <select
                  name="pets"
                  id="pet-select"
                  class="w-full text-center border h-full py-3"
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
                    {{ zone.city }} - {{ zone.zone }}
                  </option>
                </select>
              </div>
              <!-- buttons -->
              <div
                class="flex justify-center items-center gap-2 flex-nowrap py-4 px-2 text-center border flex-shrink-0"
              >
                <button
                  class="px-4 border rounded-full cursor-pointer w-44"
                  @click="toggleType('room')"
                  :class="this.type === 'room' ? 'selectedField' : ''"
                >
                  <p>{{ $t("landing.hero_2.private") }}</p>
                </button>
                <button
                  class="px-4 border rounded-full cursor-pointer w-48"
                  @click="toggleType('entire')"
                  :class="this.type === 'entire' ? 'selectedField' : ''"
                >
                  <p>{{ $t("landing.hero_2.complete") }}</p>
                </button>
              </div>
              <!-- find -->
              <div class="flex justify-center items-center">
                <!-- <button
                  class="my-btn w-12 h-12 rounded-full flex justify-center items-center flex-shrink-0"
                >
                  <font-awesome-icon
                    icon="search"
                    class="text-2xl text-white block"
                  />
                </button>-->
                <button
                  class="my-btn w-12 h-12 rounded-full flex justify-center items-center flex-shrink-0"
                  @click="resetFilters"
                >
                  <font-awesome-icon
                    icon="undo"
                    class="text-2xl text-white block"
                  />
                </button>
              </div>
            </div>
            <!-- <div
              class="my-btn w-24 h-12 flex justify-center items-center absolute right-24 mb-16 rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-none"
              :class="resetVisible ? 'hidden' : ''"
            >
              <p>Reset filters</p>
            </div> -->
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
        <paginate
          ref="paginator"
          name="propertiesData"
          :list="propertiesData"
          :per="9"
          :key="siteCountry"
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
      localSiteCountry: "",
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
    propertiesData() {
      let arr = this.filteredPropertiesList(this.search);

      if (this.type !== "") {
        arr = arr.filter((el) => el.propertyType === this.type);
      }

      if (this.zone !== "") {
        arr = arr.filter((el) => el.zone.id === this.zone);
      }

      if (this.localSiteCountry !== "") {
        arr = arr.filter((el) => el.zone.country === this.localSiteCountry);
      }

      return arr;
    },
    sortedZones() {
      let res = this.sortZones(this.zonesList);
      res = res.filter((zone) => zone.country === this.siteCountry);
      return res;
    },
  },
  methods: {
    ...mapActions("propertiesStore", ["loadProperties", "loadZones"]),
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
    sortArray(x, y) {
      if (x.city < y.city) {
        return -1;
      }
      if (x.city > y.city) {
        return 1;
      }
      return 0;
    },
    sortZones(arr) {
      return arr.sort(this.sortArray);
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
  mounted() {
    if (this.propertiesList.length < 1) {
      this.loadProperties();
      this.loadZones();
    }
    this.localSiteCountry = this.siteCountry;
  },
  watch: {
    siteCountry() {
      this.localSiteCountry = this.siteCountry;
      this.$refs.paginator.goToPage(1);
    },
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
