<template>
  <div class="w-full h-full">
    <div class="w-2/3 mx-auto">
      <div class="py-4 flex flex-col gap-3">
        <h2 class="my-title-2 text-center my-2">
          {{ $t("adminPanel.locations.newLocationForm") }}
        </h2>
        <!-- owner -->
        <div class="flex items-center justify-between">
          <label for="owner" class="mr-3"
            >{{ $t("adminPanel.locations.owner") }}
          </label>
          <select name="owner" v-model="owner">
            <option selected disabled value="unselect">
              {{ $t("adminPanel.locations.selectOne") }}
            </option>
            <option
              v-for="user in getFilteredUsers('')"
              :key="user.id"
              :value="user.id"
            >
              {{ user.firstName }} {{ user.lastName }} - {{ user.email }}
            </option>
          </select>
        </div>

        <!-- country -->
        <div class="flex items-center justify-between">
          <label for="country" class="mr-3"
            >{{ $t("adminPanel.locations.country") }}
          </label>
          <select name="country" v-model="country">
            <option selected disabled value="unselect">
              {{ $t("adminPanel.locations.selectOne") }}
            </option>
            <option
              v-for="country in countries"
              :key="country"
              :value="country"
            >
              {{ country }}
            </option>
          </select>
        </div>

        <!-- state -->
        <div class="flex items-center justify-between">
          <label for="state" class="mr-3"
            >{{ $t("adminPanel.locations.state") }}
          </label>
          <select
            name="state"
            v-model="state"
            :disabled="country === 'unselect'"
          >
            <option selected disabled value="unselect">
              {{ $t("adminPanel.locations.selectOne") }}
            </option>
            <option v-for="state in states" :key="state" :value="state">
              {{ state }}
            </option>
          </select>
        </div>

        <!-- city -->
        <div class="flex items-center justify-between">
          <label for="city" class="mr-3"
            >{{ $t("adminPanel.locations.city") }}
          </label>
          <select
            name="propertyType"
            v-model="city"
            :disabled="state === 'unselect'"
          >
            <option selected disabled value="unselect">
              {{ $t("adminPanel.locations.selectOne") }}
            </option>
            <option v-for="city in cities" :key="city" :value="city">
              {{ city }}
            </option>
          </select>
        </div>

        <!-- zone -->
        <div class="flex items-center justify-between">
          <label for="zone" class="mr-3"
            >{{ $t("adminPanel.locations.zone") }}
          </label>
          <select name="zone" v-model="zone" :disabled="city === 'unselect'">
            <option selected disabled value="unselect">
              {{ $t("adminPanel.locations.selectOne") }}
            </option>
            <option v-for="zone in zones" :key="zone" :value="zone">
              {{ zone }}
            </option>
          </select>
        </div>

        <!-- type -->
        <div class="flex items-center justify-between">
          <label for="propertyType" class="mr-3"
            >{{ $t("adminPanel.locations.propertyType") }}
          </label>
          <select name="propertyType" v-model="location.propertyType">
            <option selected value="entire">
              {{ $t("adminPanel.locations.entire") }}
            </option>
            <option value="room">{{ $t("adminPanel.locations.room") }}</option>
          </select>
        </div>

        <!-- name -->
        <div class="flex items-center justify-between">
          <label for="name" class="mr-3"
            >{{ $t("adminPanel.locations.name") }}
          </label>
          <input
            type="text"
            class="my-input w-2/3"
            v-model="location.name"
            id="name"
          />
        </div>

        <!-- address -->
        <div class="flex items-center justify-between">
          <label for="address" class="mr-3"
            >{{ $t("adminPanel.locations.address") }}
          </label>
          <input
            type="text"
            class="my-input w-2/3"
            v-model="location.address"
            id="address"
          />
        </div>

        <!-- rooms -->
        <div class="flex items-center justify-between">
          <label for="rooms" class="mr-3"
            >{{ $t("adminPanel.locations.rooms") }}
          </label>
          <input
            type="number"
            max="5"
            min="0"
            class="my-input"
            v-model="location.rooms"
            id="country"
          />
        </div>

        <!-- bathrooms -->
        <div class="flex items-center justify-between">
          <label for="bathrooms" class="mr-3"
            >{{ $t("adminPanel.locations.bathrooms") }}
          </label>
          <input
            type="number"
            max="5"
            min="0"
            class="my-input"
            v-model="location.bathrooms"
            id="country"
          />
        </div>

        <!-- painting -->
        <div class="flex items-center justify-between">
          <label for="painting" class="mr-3"
            >{{ $t("adminPanel.locations.painting") }}
          </label>
          <input
            type="number"
            max="5"
            min="0"
            class="my-input"
            v-model="location.painting"
            id="country"
          />
        </div>

        <!-- floor -->
        <div class="flex items-center justify-between">
          <label for="floor" class="mr-3"
            >{{ $t("adminPanel.locations.floor") }}
          </label>
          <input
            type="number"
            max="5"
            min="0"
            class="my-input"
            v-model="location.floor"
            id="country"
          />
        </div>

        <!-- email -->
        <div class="flex items-center justify-between">
          <label for="email" class="mr-3"
            >{{ $t("adminPanel.locations.email") }}
          </label>
          <input
            type="text"
            class="my-input w-2/3"
            v-model="location.email"
            id="email"
          />
        </div>

        <!-- phone -->
        <div class="flex items-center justify-between">
          <label for="phone" class="mr-3"
            >{{ $t("adminPanel.locations.phone") }}
          </label>
          <input
            type="text"
            class="my-input w-2/3"
            v-model="location.phone"
            id="phone"
          />
        </div>

        <!-- description -->
        <div class="flex justify-between">
          <label for="description" class="mr-3"
            >{{ $t("adminPanel.locations.description") }}
          </label>
          <textarea
            type="text"
            class="my-input w-2/3 h-24 w"
            v-model="location.description"
            id="description"
          ></textarea>
        </div>

        <!-- garage -->
        <div class="flex items-center justify-between">
          <label for="garage" class="mr-3"
            >{{ $t("adminPanel.locations.garage") }}
          </label>
          <input
            type="number"
            max="5"
            min="0"
            class="my-input"
            v-model="location.garage"
            id="garage"
          />
        </div>

        <!-- isActive -->
        <!-- <div class="flex items-center justify-between">
        <label for="isActive" class="mr-3"
          >{{ $t("adminPanel.locations.isActive") }}
        </label>
        <SwitchComponentVue
          :value="location.isActive"
          v-on:toogle="toogleIsActive"
        />
      </div> -->

        <!-- isverified -->
        <!-- <div class="flex items-center justify-between">
        <label for="isverified" class="mr-3"
          >{{ $t("adminPanel.locations.isverified") }}
        </label>
        <SwitchComponentVue
          :value="location.isVerified"
          v-on:toogle="toogleIsVerified"
        />
      </div> -->

        <!-- value -->
        <!-- <div class="flex items-center justify-between">
        <label for="value" class="mr-3"
          >{{ $t("adminPanel.locations.value") }}
        </label>
        <input
          type="number"
          class="my-input"
          v-model="location.value"
          id="value"
        />
        <button
          class="my-btn w-auto px-4 py-2 ml-4"
          v-if="fistValueLocation != location.value"
          @click="setNewLocationValue"
        >
          <font-awesome-icon icon="fa-solid fa-floppy-disk" />
        </button>
      </div> -->

        <!-- coords -->
        <MapCoordsVue
          :lat="location.lat"
          :long="location.long"
          v-on:changeCoords="setNewCoords"
        ></MapCoordsVue>
        <div class="w-full flex justify-center">
          <button class="my-btn" @click="submitLocation">
            <!-- {{ $t("general.update") }} -->
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MapCoordsVue from "../../../../../components/MapCoords.vue";
import { CustomToast, CustomErrorToast } from "@/sweetAlert";

export default {
  components: {
    MapCoordsVue,
  },
  data() {
    return {
      location: {
        address: "",
        bathrooms: 0,
        description: "",
        email: "",
        // endLease: '',
        // expectedValue: '',
        floor: 3,
        garage: 0,
        isActive: true,
        isVerified: true,
        lat: -13.44,
        long: -70.659,
        name: "",
        // owner: '',
        painting: 3,
        phone: "",
        propertyType: "entire",
        rooms: 0,
        value: 0,
        zone: 0,
        owner: 0,
      },
      country: "unselect",
      state: "unselect",
      city: "unselect",
      zone: "unselect",
      owner: "unselect",
    };
  },
  methods: {
    ...mapActions("adminPanelStore", ["createLocation", "getUsers"]),
    async submitLocation() {
      try {
        const body = {
          name: this.location.name,
          address: this.location.address,
          rooms: this.location.rooms,
          bathrooms: this.location.bathrooms,
          painting: this.location.painting,
          floor: this.location.floor,
          email: this.location.email,
          phone: this.location.phone,
          description: this.location.description,
          garage: this.location.garage,
          owner: this.owner !== "unselect" ? this.owner : 1,
          zone: this.zone !== "unselect" ? this.owner.id : 1,
          propertyType: this.location.propertyType,
          isActive: this.location.isActive,
          isVerified: this.location.isVerified,
          value: this.location.value,
          lat: this.location.lat,
          lng: this.location.long,
        };
        await this.createLocation(body);

        CustomToast.fire({
          title: this.$t("sweetAlertMessages.saved"),
          icon: "success",
        });
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message,
        });
      }
    },
    setNewCoords(event) {
      const { lat, lng } = event;
      this.location.lat = lat.toFixed(5);
      this.location.long = lng.toFixed(5);
    },
  },
  computed: {
    ...mapGetters("adminPanelStore", [
      "getLocationById",
      "getFilteredUsers",
      "getAllZones",
    ]),
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
    states() {
      let filtered = this.getAllZones.filter(
        (zone) => zone.country === this.country
      );
      let mapped = filtered.map((zone) => {
        return zone.state;
      });
      let final = new Set(mapped);
      return [...final];
    },
    cities() {
      let filtered = this.getAllZones.filter(
        (zone) => zone.state === this.state
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
  async created() {
    try {
      await this.getUsers();
      await this.getZones();
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style></style>
