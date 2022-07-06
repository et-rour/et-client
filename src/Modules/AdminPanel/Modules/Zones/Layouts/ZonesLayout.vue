<template>
  <GeneralLayoutVue>
    <template v-slot:sidebar>
      <router-link
        :to="{
          name: 'admin-zones-detail',
          params: { id: 'new' },
          hash: '#details',
        }"
        class="cursor-pointer"
      >
        <div class="px-4 mb-4 mx-4 bg-my-blue-primary rounded">
          <span class="w-full flex justify-between items-center text-white"
            ><span>{{ $t("adminPanel.zones.create") }}</span
            ><font-awesome-icon icon="plus" />
          </span>
        </div>
      </router-link>
      <div class="w-full mt-4 pb-4 border-b-2 border-black">
        <div class="w-full flex justify-center">
          <span class="text-center"
            ><b>{{ $t("adminPanel.users.filters") }}</b></span
          >
        </div>
        <div class="w-full flex justify-between px-2">
          <label for="verified">{{ $t("adminPanel.zones.country") }}</label>
          <select name="verified" v-model="country">
            <option selected value="unselect">
              {{ $t("adminPanel.any") }}
            </option>
            <option
              v-for="country in countries"
              :value="country"
              :key="country"
            >
              {{ country }}
            </option>
          </select>
        </div>
        <div class="w-full flex justify-between px-2">
          <label for="active">{{ $t("adminPanel.zones.city") }}</label>
          <select
            name="active"
            v-model="city"
            :disabled="country === 'unselect'"
          >
            <option selected value="unselect">
              {{ $t("adminPanel.any") }}
            </option>
            <option v-for="city in cities" :value="city" :key="city">
              {{ city }}
            </option>
          </select>
        </div>
      </div>

      <div class="flex justify-center" v-if="isLoading">
        <SpinerVue />
      </div>
      <ul
        class="flex flex-col h-40 md:h-auto relative"
        v-if="getAllZones.length"
      >
        <router-link
          :to="{
            name: 'admin-zones-detail',
            params: { id: user.id },
            hash: '#details',
          }"
          active-class="active-class-admin"
          v-for="user in filteredData"
          :key="user.id"
        >
          <div
            class="cursor-pointer p-1 hover:bg-my-blue-primary hover:text-white"
          >
            <span class="block"
              ><b>{{ user.zone }}</b></span
            >
            <span>{{ user.country }}, {{ user.state }}, {{ user.city }}.</span>
          </div>
        </router-link>
      </ul>
      <div v-else class="flex justify-center">
        <span>{{ $t("adminPanel.zones.empty") }}</span>
      </div>
    </template>
    <template v-slot:main>
      <p
        v-if="$router.currentRoute.path === '/zones'"
        class="my-title text-3xl"
      >
        <font-awesome-icon icon="fa-solid fa-map-location-dot" id="zoneIcon" />
      </p>
      <router-view></router-view>
    </template>
  </GeneralLayoutVue>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { CustomErrorToast } from "@/sweetAlert";
import GeneralLayoutVue from "../../../Layouts/GeneralLayout.vue";
import SpinerVue from "../../../../../components/Spiner.vue";
export default {
  components: {
    GeneralLayoutVue,
    SpinerVue,
  },
  data() {
    return {
      isLoading: true,
      filterWord: "",
      country: "unselect",
      city: "unselect",
    };
  },
  methods: {
    ...mapActions("adminPanelStore/zones", [
      "getZones",
      "changeIsActiveProperty",
    ]),
    async changeIsActive(idUser, activeProperty) {
      try {
        await this.changeIsActiveProperty({ idUser, isActive: activeProperty });
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message,
        });
      }
    },
  },
  computed: {
    ...mapGetters("adminPanelStore/zones", ["getAllZones"]),
    filteredData() {
      let filtered = this.getAllZones;
      if (this.country !== "unselect") {
        filtered = filtered.filter((zone) => zone.country === this.country);
      }
      if (this.city !== "unselect") {
        filtered = filtered.filter((zone) => zone.city === this.city);
      }
      return filtered;
    },
    countries() {
      let countries = [];
      for (let i = 0; i < this.getAllZones.length; i++) {
        if (countries.indexOf(this.getAllZones[i].country) === -1) {
          countries.push(this.getAllZones[i].country);
        }
      }
      return countries;
    },
    cities() {
      let filtered = this.getAllZones.filter(
        (zone) => zone.country === this.country
      );
      let mapped = filtered.map((zone) => {
        return zone.city;
      });
      let final = new Set(mapped);
      return [...final];
    },
  },
  async mounted() {
    try {
      this.isLoading = true;
      await this.getZones();
      this.isLoading = false;
    } catch (error) {
      CustomErrorToast.fire({
        text: error.response.data.message,
      });
    }
  },
  watch: {
    country(newValue) {
      if (newValue === "unselect") {
        this.city = "unselect";
      }
    },
  },
};
</script>

<style>
#zoneIcon {
  font-size: 192px;
  color: #d3d3d3;
}
</style>
