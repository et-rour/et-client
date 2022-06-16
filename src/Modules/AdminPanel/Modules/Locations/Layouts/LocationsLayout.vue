<template>
  <GeneralLayoutVue>
    <template v-slot:sidebar>
      <router-link
        :to="{
          name: 'admin-locations-new',
          hash: '#details',
        }"
        class="cursor-pointer"
      >
        <div class="px-4 mb-4 mx-4 bg-my-blue-primary rounded">
          <span class="w-full flex justify-between items-center text-white"
            ><span>{{ $t("adminPanel.locations.create") }}</span
            ><font-awesome-icon icon="plus" />
          </span>
        </div>
      </router-link>
      <div class="w-full mt-4 pb-4 border-b-2 border-black">
        <div class="w-full flex justify-center">
          <span class="text-center"
            ><b>{{ $t("adminPanel.users.search") }}</b></span
          >
        </div>
        <div class="w-full flex justify-center">
          <input
            type="text"
            v-model="filterWord"
            class="my-input w-full mx-4 border"
            placeholder="Departamento"
          />
        </div>
        <div class="w-full flex justify-center mt-4">
          <span class="text-center"
            ><b>{{ $t("adminPanel.users.filters") }}</b></span
          >
        </div>
        <div class="w-full flex justify-between px-2">
          <label for="verified">{{
            $t("adminPanel.locations.isVerified")
          }}</label>
          <select name="verified" v-model="isVerified">
            <option selected value="unselect">
              {{ $t("adminPanel.any") }}
            </option>
            <option :value="true">{{ $t("adminPanel.yes") }}</option>
            <option :value="false">{{ $t("adminPanel.no") }}</option>
          </select>
        </div>
        <div class="w-full flex justify-between px-2">
          <label for="active">{{ $t("adminPanel.locations.isActive2") }}</label>
          <select name="active" v-model="isActive">
            <option selected value="unselect">
              {{ $t("adminPanel.any") }}
            </option>
            <option :value="true">{{ $t("adminPanel.yes") }}</option>
            <option :value="false">{{ $t("adminPanel.no") }}</option>
          </select>
        </div>
        <div class="w-full flex justify-between px-2">
          <label for="country">{{ $t("adminPanel.locations.country") }}</label>
          <select name="country" v-model="country">
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
          <label for="city">{{ $t("adminPanel.locations.city") }}</label>
          <select name="city" v-model="city" :disabled="country === 'unselect'">
            <option selected value="unselect">
              {{ $t("adminPanel.any") }}
            </option>
            <option v-for="city in cities" :value="city" :key="city">
              {{ city }}
            </option>
          </select>
        </div>
        <div class="w-full flex justify-between px-2">
          <label for="zone">{{ $t("adminPanel.locations.zone") }}</label>
          <select name="owner" v-model="zone" :disabled="city === 'unselect'">
            <option selected value="unselect">
              {{ $t("adminPanel.any") }}
            </option>
            <option v-for="zone in zones" :value="zone" :key="zone">
              {{ zone }}
            </option>
          </select>
        </div>
      </div>
      <ul class="flex flex-col h-40 md:h-auto relative">
        <router-link
          v-for="location in filteredData"
          :to="{
            name: 'admin-locations-detail-info',
            params: { id: location.id },
            hash: '#details',
          }"
          :key="location.id"
          active-class="active-class-admin "
        >
          <div
            class="cursor-pointer p-1 hover:bg-my-blue-primary hover:text-white"
          >
            <span class="block"
              ><b>{{ location.name }}</b></span
            >
            <span>{{ location.zone.city }} ({{ location.zone.country }})</span>
          </div>
        </router-link>
      </ul>
    </template>
    <template v-slot:main>
      <p
        v-if="$router.currentRoute.path === '/locations'"
        class="my-title text-3xl"
      >
        <font-awesome-icon icon="fa-solid fa-house" id="houseIcon" />
      </p>
      <router-view></router-view>
    </template>
  </GeneralLayoutVue>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { CustomErrorToast } from "@/sweetAlert";
import GeneralLayoutVue from "../../../Layouts/GeneralLayout.vue";

export default {
  components: {
    GeneralLayoutVue,
  },
  data() {
    return {
      filterWord: "",
      isVerified: "unselect",
      isActive: "unselect",
      country: "unselect",
      city: "unselect",
      zone: "unselect",
    };
  },
  methods: {
    ...mapActions("adminPanelStore", [
      "getLocations",
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
    ...mapGetters("adminPanelStore", ["getFilteredLocations", "getAllZones"]),
    filteredData() {
      let filtered = this.getFilteredLocations(this.filterWord);
      if (this.isVerified !== "unselect") {
        if (this.isVerified === true) {
          filtered = filtered.filter((user) => user.isVerified);
        } else if (this.isVerified === false) {
          filtered = filtered.filter((user) => !user.isVerified);
        }
      }
      if (this.isActive !== "unselect") {
        if (this.isActive === true) {
          filtered = filtered.filter((user) => user.isActive);
        } else if (this.isActive === false) {
          filtered = filtered.filter((user) => !user.isActive);
        }
      }
      if (this.country !== "unselect") {
        filtered = filtered.filter(
          (location) => location.zone.country === this.country
        );
      }
      if (this.city !== "unselect") {
        filtered = filtered.filter(
          (location) => location.zone.city === this.city
        );
      }
      if (this.zone !== "unselect") {
        filtered = filtered.filter(
          (location) => location.zone.zone === this.zone
        );
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
    zones() {
      let filtered = this.getAllZones.filter((zone) => zone.city === this.city);
      let mapped = filtered.map((zone) => {
        return zone.zone;
      });
      let final = new Set(mapped);
      return [...final];
    },
  },
  async mounted() {
    try {
      await this.getLocations();
      await this.getZones();
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
        this.zone = "unselect";
      }
    },
    city(newValue) {
      if (newValue === "unselect") {
        this.zone = "unselect";
      }
    },
  },
};
</script>

<style>
#houseIcon {
  font-size: 192px;
  color: #d3d3d3;
}
</style>
