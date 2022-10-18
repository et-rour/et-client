<template>
  <div class="w-full h-full overflow-y-scroll bg-gray-100">
    <div class="w-2/3 mx-auto">
    <!-- <div class="w-full flex relative"> -->
      <div class="py-4">
        
        <h2 class="my-title-2 text-center my-2">
          {{ $t("adminPanel.locations.newLocationForm") }}
        </h2>
        <ValidationObserver v-slot="{ handleSubmit, invalid }">
          <form class="flex flex-col gap-3 " @submit.prevent="handleSubmit(submitLocation)">
          
            <!-- owner -->
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="flex items-center justify-between "
            >
              <label for="owner" class="mr-3"
                >{{ $t("adminPanel.locations.owner") }}
              </label>
              <div>
                <select name="owner" v-model="location.owner">
                  <option selected disabled value="unselect">
                    {{ $t("adminPanel.locations.selectOne") }}
                  </option>
                  <option
                    v-for="user in getFilteredUsers('')"
                    :key="`user_${user.id}`"
                    :value="user.id"
                  >
                    {{ user.firstName }} {{ user.lastName }} - {{ user.email }}
                  </option>
                </select>
                <span class="my-error error-form">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
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
                  v-for="(country,index) in countries"
                  :key="`country_${index}`"
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
                <option v-for="(state,index) in states" :key="`state_${index}`" :value="state">
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
                <option v-for="(city,index) in cities" :key="`city_${index}`" :value="city">
                  {{ city }}
                </option>
              </select>
            </div>
    
            <!-- zone -->
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="flex items-center justify-between "
            >
              <label for="zone" class="mr-3"
                >{{ $t("adminPanel.locations.zone") }}
              </label>
              <div>
                <select name="zone" v-model="location.zone" :disabled="city === 'unselect'">
                  <option selected disabled value="unselect">
                    {{ $t("adminPanel.locations.selectOne") }}
                  </option>
                  <option v-for="(zone,index) in zones" :key="`zone_${index}`" :value="zone.id">
                    {{ zone.id }}.- {{ zone.zone }}
                  </option>
                </select>
                <span class="my-error error-form">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
    
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
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="flex items-center justify-between "
            >
              <label for="name" class="mr-3"
                >{{ $t("adminPanel.locations.name") }}
              </label>
              <div>
                <input
                  type="text"
                  class="my-input"
                  v-model="location.name"
                  id="name"
                />
                <span class="my-error error-form">{{ errors[0] }}</span>
              </div>
          </ValidationProvider>
    
            <!-- address -->
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="flex items-center justify-between "
            >
              <label for="address" class="mr-3"
                >{{ $t("adminPanel.locations.address") }}
              </label>
              <div>
                <input
                  type="text"
                  class="my-input "
                  v-model="location.address"
                  id="address"
                />
                <span class="my-error error-form">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
    
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
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|email"
              class="flex items-center justify-between "
            >
              <label for="email" class="mr-3"
                >{{ $t("adminPanel.locations.email") }}
              </label>
              <div class="w-80">
                <input
                  type="text"
                  class="my-input w-full"
                  v-model="location.email"
                  id="email"
                />
                <span class="my-error error-form  text-left">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <!-- phone -->
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|extPhoneNumber"
              class="flex items-center justify-between "
            >
              <label for="phone" class="mr-3"
                >{{ $t("adminPanel.locations.phone") }}
              </label>
              <div>
                <input
                  type="text"
                  class="my-input"
                  v-model="location.phone"
                  id="phone"
                />
                <span class="my-error error-form  text-left">{{ errors[0] }}</span>
              </div>
            </ValidationProvider>


            <!-- description -->
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              class="flex items-center justify-between "
            >
                <label for="description" class="mr-3"
                  >{{ $t("adminPanel.locations.description") }}
                </label>
                <div>
                  <textarea
                    type="text"
                    class="my-input h-24"
                    v-model="location.description"
                    id="description"
                  ></textarea>
                  <span class="my-error error-form  text-left">{{ errors[0] }}</span>
                </div>
            </ValidationProvider>
    
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
    
            <!-- meters -->
            <div class="flex items-center justify-between">
              <label for="garage" class="mr-3">
                <!-- {{ $t("adminPanel.locations.garage") }} -->
                Area (metros cuadrados)
              </label>
              <input
                type="number"
                min="1"
                class="my-input"
                v-model="location.meters"
                id="meters"
              />
            </div>
    
            <!-- vault -->
            <div class="flex items-center justify-between">
              <label for="garage" class="mr-3">
                {{ $t("adminPanel.locations.haveVault") }}
              </label>
              <input
                type="checkbox"
                min="1"
                class="my-input"
                v-model="location.vault"
              />
            </div>
            <!-- cleaning -->
            <div class="flex items-center justify-between">
              <label for="garage" class="mr-3">
                {{ $t("adminPanel.locations.haveCleaning") }}
              </label>
              <input
                type="checkbox"
                min="1"
                class="my-input"
                v-model="location.cleaning"
              />
            </div>
            <!-- wifi -->
            <div class="flex items-center justify-between">
              <label for="garage" class="mr-3">
                {{ $t("adminPanel.locations.haveWifi") }}
              </label>
              <input
                type="checkbox"
                min="1"
                class="my-input"
                v-model="location.wifi"
              />
            </div>
            <!-- security -->
            <div class="flex items-center justify-between">
              <label for="garage" class="mr-3">
                {{ $t("adminPanel.locations.haveSecurity") }}
              </label>
              <input
                type="checkbox"
                min="1"
                class="my-input"
                v-model="location.security"
              />
            </div>
    
            <!-- coords -->
            <MapCoordsVue @result-click="setNewCoords"></MapCoordsVue>
            <div class="flex justify-between">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
              >
                    <input
                      type="text"
                      placeholder="lng"
                      class="my-input"
                      v-model="location.lng"
                      id="description"
                    >
                    <span class="my-error error-form  text-left">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
              >
                    <input
                      type="text"
                      placeholder="lat"
                      class="my-input"
                      v-model="location.lat"
                      id="description"
                    >
                    <span class="my-error error-form  text-left">{{ errors[0] }}</span>
              </ValidationProvider>

            </div>
            <!-- <p>lat:{{ location.lat }} lng:{{ location.lng }}</p> -->
            
            <div class="w-full flex justify-center">
              <button class="my-btn"  :class="invalid&&'text-gray-200'">
                <!-- {{ $t("general.update") }} -->
                Guardar
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
      <!-- <pre class="sticky top-10 left-0">{{JSON.stringify(location,null,"\t")}}</pre> -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MapCoordsVue from "../../../../../components/MapCoords.vue";
import { CustomToast, CustomErrorToast } from "@/sweetAlert";
import { ValidationObserver } from "vee-validate";
export default {
  components: {
    MapCoordsVue,
    ValidationObserver,
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
        // isActive: false,
        // isVerified: false,
        lat: "",
        lng: "",
        name: "",
        // owner: '',
        painting: 3,
        phone: "",
        propertyType: "entire",
        rooms: 0,
        // value: 0,
        zone: "",
        owner: "",
        meters: 0,
        // services
        vault: false,
        cleaning: false,
        wifi: false,
        security: false,
      },
      country: "unselect",
      state: "unselect",
      city: "unselect",
      zone: "unselect",
      owner: "unselect",
    };
  },
  methods: {
    ...mapActions("adminPanelStore/locations", ["createLocation"]),
    ...mapActions("adminPanelStore/users", ["getUsers"]),
    async submitLocation() {
      try {
        await this.createLocation(this.location);

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
      this.location.lng = lng.toFixed(5);
    },
  },
  computed: {
    ...mapGetters("adminPanelStore/locations", ["getLocationById"]),
    ...mapGetters("adminPanelStore/zones", ["getAllZones"]),
    ...mapGetters("adminPanelStore/users", ["getFilteredUsers"]),
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
        return zone;
      });
      let final = new Set(mapped);
      return [...final];
    },
  },
  async created() {
    try {
      await this.getUsers();
      // await this.getZones();
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.error-form{
  position: relative;
  display: block;
  top: 0;
  left: 0;
  text-align: right;
}
</style>
