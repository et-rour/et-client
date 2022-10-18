<template>
  <GeneralLayoutVue>
    <template v-slot:sidebar>
      <div class="w-full pb-4 border-b-2 border-black">
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

      <SpinerComponent v-if="isloadingLocationsList" />
      <LocationsListComponent v-else :locationsList="filteredData.locations" />
      <UsersListComponent :usersList="filteredData.users" />


    </template>
    <template v-slot:main>
      <p
        v-if="$router.currentRoute.path === '/trash'"
        class="my-title text-3xl"
      >
        <font-awesome-icon icon="fa-solid fa-trash" id="houseIcon" />
      </p>
      <router-view></router-view>
    </template>
  </GeneralLayoutVue>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import GeneralLayoutVue from "../../../Layouts/GeneralLayout.vue";
import SpinerComponent from "../../../../../components/Spiner.vue";
import LocationsListComponent from "../Components/LocationsList.vue";
import UsersListComponent from "../Components/UsersList.vue";

export default {
    components: {
        GeneralLayoutVue,
        SpinerComponent,
        LocationsListComponent,
        UsersListComponent,
    },
    data() {
        return {
            isloadingLocationsList: true,
            filterWord: "",
            country: "unselect",
            city: "unselect",
            zone: "unselect",
        }
    },
    methods: {
      ...mapActions("adminPanelStore/locations", ["getTrashLocations"]),
      ...mapActions("adminPanelStore/zones", ["getZones"]),
      ...mapActions("adminPanelStore/users", ["getTrashUsers"]),
    },
    computed: {
      ...mapGetters("adminPanelStore/locations", ["getFilteredTrashLocations"]),
      ...mapGetters("adminPanelStore/zones", ["getAllZones"]),
      ...mapGetters("adminPanelStore/users", ["getFilteredTrashUsers"]),
      filteredData() {
        let filteredLocations = this.getFilteredTrashLocations(this.filterWord);
        if (this.country !== "unselect") {
          filteredLocations = filteredLocations.filter(
            (location) => location.zone.country === this.country
          );
        }
        if (this.city !== "unselect") {
          filteredLocations = filteredLocations.filter(
            (location) => location.zone.city === this.city
          );
        }
        if (this.zone !== "unselect") {
          filteredLocations = filteredLocations.filter(
            (location) => location.zone.zone === this.zone
          );
        }
        let filteredUsers = this.getFilteredTrashUsers(this.filterWord);
        return {
          locations: filteredLocations,
          users: filteredUsers,
        }
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
      this.isloadingLocationsList = true;
      await this.getTrashUsers();
      await this.getTrashLocations();
      await this.getZones();
      this.isloadingLocationsList = false;
    } catch (error) {
      this.isloadingLocationsList = false;
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
}
</script>

<style>
#houseIcon {
  font-size: 192px;
  color: #d3d3d3;
}
</style>
