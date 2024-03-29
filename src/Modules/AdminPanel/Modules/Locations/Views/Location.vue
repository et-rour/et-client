<template>
  <div class="w-2/3 mx-auto mb-8">
    <div class="w-full h-full py-4 flex flex-col gap-3" v-if="location">
      <router-link
        :to="{ name: 'tenants-detail', params: { id: location.id } }"
        class="underline text-my-blue-primary text-right"
        >{{ $t("adminPanel.locations.title") }}</router-link
      >
      <div class="flex flex-col gap-2">
        <!-- sugested value -->
        <div class="flex items-center justify-between">
          <label class="mr-2">{{
            $t("adminPanel.locations.sugestedValue")
          }}</label>
          <p>
            {{
              location.expectedValue
                ? location.expectedValue
                : $t("general.notAsign")
            }}
          </p>
        </div>
        <!-- created -->
        <div class="flex justify-between">
          <label class="mr-2">{{ $t("adminPanel.locations.created") }}</label>
          <p>{{ new Date(location.created).toLocaleDateString() }}</p>
        </div>
        <!-- stripeProductId -->
        <div class="flex justify-between">
          <label class="mr-2">{{
            $t("adminPanel.locations.stripeProductId")
          }}</label>
          <p>
            {{
              location.stripeProductId
                ? location.stripeProductId
                : $t("general.notAsign")
            }}
          </p>
        </div>
        <!-- stripePriceId -->
        <div class="flex justify-between">
          <label class="mr-2">{{
            $t("adminPanel.locations.stripePriceId")
          }}</label>
          <p>
            {{
              location.stripePriceId
                ? location.stripePriceId
                : $t("general.notAsign")
            }}
          </p>
        </div>
        <!-- NEW VISIT -->
        <div class="flex items-center justify-between">
          <label class="mr-3">{{ $t("adminPanel.locations.newVisit") }} </label>
          <button
            class="w-auto underline text-my-blue-primary"
            @click="goToSchedule">
            {{ $t("adminPanel.locations.goToVisit") }}
          </button>
        </div>
        <!-- expected value -->
        <div class="flex justify-between">
          <label class="mr-2">{{
            $t("adminPanel.locations.expectedValue")
          }}</label>
          <div>
            <p>min: ${{ location.suggestedValue.min }}</p>
            <p>max: ${{ location.suggestedValue.max }}</p>
          </div>
        </div>

        <!-- propertyType -->
        <div class="flex justify-between">
          <label class="mr-2">{{
            $t("adminPanel.locations.propertyType")
          }}</label>
          <p>
            <span>{{ location.propertyType }}</span>
          </p>
        </div>
      </div>
      <hr />
      <ValidationObserver v-slot="{ handleSubmit, invalid }">
        <form
          @submit.prevent="handleSubmit(submitLocation)"
          class="flex flex-col gap-3">
          <!-- name -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="my-input-box">
            <div>
              <label for="name" class="mr-3"
                >{{ $t("adminPanel.locations.name") }}
                <span class="text-transparent"> {{ location.id }}</span>
              </label>
              <input
                type="text"
                class="my-input w-2/3"
                v-model="location.name"
                id="name" />
            </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>

          <!-- address -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="my-input-box">
            <div>
              <label for="address" class="mr-3"
                >{{ $t("adminPanel.locations.address") }}
              </label>
              <input
                type="text"
                class="my-input w-2/3"
                v-model="location.address"
                id="address" />
            </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>

          <!-- rooms -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="my-input-box">
            <div>
              <label for="rooms" class="mr-3"
                >{{ $t("adminPanel.locations.rooms") }}
              </label>
              <input
                type="number"
                max="99"
                min="0"
                class="my-input"
                v-model="location.rooms"
                id="rooms" />
            </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>

          <!-- bathrooms -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="my-input-box">
            <div>
              <label for="bathrooms" class="mr-3"
                >{{ $t("adminPanel.locations.bathrooms") }}
              </label>
              <input
                type="number"
                max="99"
                min="0"
                class="my-input"
                v-model="location.bathrooms"
                id="bathrooms" />
            </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>

          <!-- painting -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="my-input-box">
            <div>
              <label for="painting" class="mr-3"
                >{{ $t("adminPanel.locations.painting") }}
              </label>
              <input
                type="number"
                max="5"
                min="0"
                class="my-input"
                v-model="location.painting"
                id="painting" />
            </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>

          <!-- floor -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="my-input-box">
            <div>
              <label for="floor" class="mr-3"
                >{{ $t("adminPanel.locations.floor") }}
              </label>
              <input
                type="number"
                max="5"
                min="0"
                class="my-input"
                v-model="location.floor"
                id="floor" />
            </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>

          <!-- email -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|email"
            class="my-input-box">
            <div>
              <label for="email" class="mr-3"
                >{{ $t("adminPanel.locations.email") }}
              </label>
              <input
                type="text"
                class="my-input w-2/3"
                v-model="location.email"
                id="email" />
            </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>

          <!-- phone -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|extPhoneNumber"
            class="my-input-box">
            <div>
              <label for="phone" class="mr-3"
                >{{ $t("adminPanel.locations.phone") }}
              </label>
              <input
                type="text"
                class="my-input w-2/3"
                v-model="location.phone"
                id="phone" />
            </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>

          <!-- description -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="my-input-box items-start">
            <div>
              <label for="description" class="mr-3"
                >{{ $t("adminPanel.locations.description") }}
              </label>
              <textarea
                type="text"
                class="my-input w-2/3 h-24"
                v-model="location.description"
                id="description"></textarea>
            </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>

          <!-- garage -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="my-input-box">
            <div>
              <label for="garage" class="mr-3"
                >{{ $t("adminPanel.locations.garage") }}
              </label>
              <input
                type="number"
                max="5"
                min="0"
                class="my-input"
                v-model="location.garage"
                id="garage" />
            </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>

          <!-- area -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="my-input-box">
            <div>
              <label for="area" class="mr-3">
                <!-- {{ $t("adminPanel.locations.garage") }} -->
                Area (metros cuadrados)
              </label>
              <input
                type="number"
                min="1"
                class="my-input"
                v-model="location.squareMeters"
                id="area" />
            </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>

          <!-- vault -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="my-input-box">
            <div>
              <label for="vault" class="mr-3">
                {{ $t("adminPanel.locations.haveVault") }}
              </label>
              <input
                type="checkbox"
                class="my-input"
                name="vault"
                v-model="location.vault" />
            </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>

          <!-- cleaning -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="my-input-box">
            <div>
              <label for="cleaning" class="mr-3">
                {{ $t("adminPanel.locations.haveCleaning") }}
              </label>
              <input
                name="cleaning"
                type="checkbox"
                class="my-input"
                v-model="location.cleaning" />
            </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>

          <!-- wifi -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="my-input-box">
            <div>
              <label for="wifi" class="mr-3">
                {{ $t("adminPanel.locations.haveWifi") }}
              </label>
              <input
                name="wifi"
                type="checkbox"
                min="1"
                class="my-input"
                v-model="location.wifi" />
            </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>

          <!-- security -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="my-input-box">
            <div>
              <label for="security" class="mr-3">
                {{ $t("adminPanel.locations.haveSecurity") }}
              </label>
              <input
                name="security"
                type="checkbox"
                min="1"
                class="my-input"
                v-model="location.security" />
            </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>

          <!-- landUse -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="my-input-box items-start">
            <div>
              <label for="landUse" class="mr-3"
                >{{ $t("adminPanel.locations.landUse") }}
              </label>
              <textarea
                type="text"
                class="my-input w-2/3 h-24"
                v-model="location.landUse"
                id="landUse"></textarea>
            </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>

          <!-- unused -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="my-input-box">
            <div>
              <label for="tiempoUso" class="mr-3"
                >{{ $t("adminPanel.locations.unused") }}
              </label>
              <select
                class="my-input w-2/3"
                name="tiempoUso"
                v-model="location.unused">
                <option disabled selected value="">
                  {{ $t("createForm.opcionDefault") }}
                </option>
                <option
                  v-for="(item, index) in timeUnusedOptions"
                  :value="item.value"
                  :key="index + item.name + 'time'">
                  {{ item.name }}
                </option>
              </select>
            </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>

          <!-- calendly -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="extCalendlyUrl"
            class="my-input-box">
            <div>
              <label for="calendly" class="mr-3"> Calendly </label>
              <input
                type="text"
                class="my-input w-2/3"
                v-model="location.calendlyLink"
                id="calendly" />
            </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>

          <!-- coords -->
          <MapCoordsVue
            :lat="location.lat"
            :long="location.long"
            :editing="true"
            @result-click="setNewCoords"></MapCoordsVue>
          <div class="flex justify-between">
            <ValidationProvider v-slot="{ errors }" rules="required" class="">
              <label class="block">Lat</label>
              <input
                disabled
                type="text"
                class="my-input"
                v-model="location.lat" />
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" rules="required" class="">
              <label class="block">Long</label>
              <input
                disabled
                type="text"
                class="my-input"
                v-model="location.long" />
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <!-- created by -->
          <div class="flex justify-between">
            <label class="mr-2">{{
              $t("adminPanel.locations.createdBy")
            }}</label>
            <div>
              <p>
                <span>{{
                  location.createdByAdmin
                    ? $t("adminPanel.locations.admin")
                    : $t("adminPanel.locations.user")
                }}</span>
              </p>
              <select
                v-model="location.owner.id"
                class="my-input border block"
                @click="fetchListUsers">
                <option
                  v-for="user in allUsersList"
                  :value="user.id"
                  :key="user.id">
                  {{ user.id }}.- {{ user.firstName }} {{ user.lastName }}
                </option>
              </select>
              <font-awesome-icon
                icon="spinner"
                class="animate-spin"
                v-if="isLoadingAllUsersList" />
            </div>
          </div>

          <!-- isDailyValue -->
          <div class="flex items-center justify-between">
            <label for="value" class="mr-3"
              >{{ $t("adminPanel.locations.dailyValue") }} ({{
                currency.symbol
              }}
              {{ currency.apiCode }})
            </label>
            <div>
              <input-number-mask
                class="my-input"
                v-model="location.dailyValue"
                @changeValue="onChangeDailyValue" />
            </div>
          </div>

          <div class="w-full flex justify-center">
            <button
              class="my-btn mx-2 bg-red-600"
              @click="sendToTrash"
              :disabled="isUploadingLocation"
              :class="isUploadingLocation ? 'bg-gray-500' : ''">
              <!-- {{ $t("general.update") }} -->
              Eliminar
            </button>
            <button
              class="my-btn mx-2"
              :disabled="isUploadingLocation"
              :class="isUploadingLocation || invalid ? 'opacity-25' : ''">
              {{ $t("general.update") }}
            </button>
          </div>
        </form>
      </ValidationObserver>
      <hr />
      <div class="flex flex-col gap-4">
        <!-- isActive -->
        <div class="flex items-center justify-between">
          <label for="isActive" class="mr-3"
            >{{ $t("adminPanel.locations.isActive") }}
          </label>
          <SwitchComponentVue
            :value="location.isActive"
            v-on:toogle="toogleIsActive" />
        </div>

        <!-- isVerified -->
        <div class="flex items-center justify-between">
          <label class="mr-3"
            >{{ $t("adminPanel.locations.isverified") }}
          </label>
          <SwitchComponentVue
            :value="location.isVerified"
            v-on:toogle="toogleIsVerified"
            :disabled="isVerifyDisabled" />
        </div>

        <!-- isDaily -->
        <div class="flex items-center justify-between">
          <label class="mr-3">{{ $t("adminPanel.locations.isDaily") }} </label>
          <SwitchComponentVue
            :value="location.isDaily"
            v-on:toogle="toogleIsDaily" />
        </div>

        <!-- value -->
        <div class="flex items-center justify-between">
          <label for="value" class="mr-3"
            >{{ $t("adminPanel.locations.value") }} ({{ currency.symbol }}
            {{ currency.apiCode }})
          </label>
          <div>
            <input-number-mask
              class="my-input"
              v-model="newValueProperty"
              @changeValue="updateNewValue" />
            <!-- {{newValueProperty}} -->
            <button
              class="my-btn w-auto px-4 py-2 ml-4"
              v-if="fistValueLocation != newValueProperty"
              @click="setNewLocationValue">
              <font-awesome-icon icon="fa-solid fa-floppy-disk" />
            </button>
          </div>
        </div>
        <!-- <pre>{{JSON.stringify({fistValueLocation,newValueProperty},null,"\t")}}</pre> -->

        <FilterZonesComponent
          :listZones="getAllZones"
          :selectedZoneId="location.zone.id"
          :idLocation="this.location.id" />
      </div>

      <!-- DEBUGGING -->
      <!-- <DebugModal>
        <pre>{{ JSON.stringify(location, null, "\t") }}</pre>
      </DebugModal> -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SwitchComponentVue from "../../../../../components/SwitchComponent.vue";
import createPropertyOptions from "@/utils/createFormOptions.js";
import { PUT_ADMIN_LOCATION } from "@/Services/Admin/admin_location_services.js";
import { GET_ADMIN_USERS } from "@/Services/Admin/admin_users_services.js";
import {
  CustomErrorToast,
  CustomToast,
  CustomConfirmDialog,
  CustomConfirmWarningDialog,
} from "@/sweetAlert";
import MapCoordsVue from "../../../../../components/MapCoords.vue";
import { ValidationObserver } from "vee-validate";
import FilterZonesComponent from "../Components/FilterZonesComponent.vue";
import InputNumberMask from "../../../../../components/InputNumberMask.vue";
// import DebugModal from "../../../../../components/DebugModal.vue";

export default {
  components: {
    SwitchComponentVue,
    MapCoordsVue,
    ValidationObserver,
    FilterZonesComponent,
    InputNumberMask,
    // DebugModal,
  },
  computed: {
    ...mapGetters("adminPanelStore/locations", [
      "getLocationDetails",
      "getAllCurrencies",
    ]),
    ...mapGetters("adminPanelStore/zones", ["getAllZones"]),
    isVerifyDisabled() {
      if (this.location.isVerified) return false;
      if (
        !this.location.name ||
        !this.location.address ||
        !this.location.description ||
        !this.location.email ||
        !this.location.phone ||
        !this.location.rooms ||
        !this.location.bathrooms ||
        !this.location.floor ||
        !this.location.painting ||
        !this.location.garage ||
        !this.location.squareMeters
      )
        return true;
      return false;
    },
    currency() {
      if (this.getAllCurrencies.length)
        return this.getAllCurrencies.filter(
          (el) => el.country === this.location.zone.country
        )[0];
      else
        return this.getAllCurrencies.filter((el) => el.country === "Chile")[0];
    },
  },
  data() {
    return {
      location: null,
      isUploadingLocation: false,
      hasDeleted: false,

      fistValueLocation: null,
      newValueProperty: null,

      timeUnusedOptions: createPropertyOptions.timeUnused,

      isLoadingAllUsersList: false,
      allUsersList: [],
    };
  },
  methods: {
    ...mapActions("adminPanelStore/locations", [
      "modifyLocation",
      "deleteLocation",
      "changeIsActiveLocation",
      "changeIsVerifiedLocation",
      "setLocationValue",
      "getCurrenciesList",
    ]),
    goToSchedule() {
      this.$router.push({
        name: "schedule",
        params: {
          location: {
            name: this.location.name,
            address: this.location.address,
            zone: this.location.zone.zone,
            city: this.location.zone.city,
            country: this.location.zone.country,
            state: this.location.zone.state,
            calendlyLink: this.location.calendlyLink,
          },
        },
      });
    },
    loadLocation() {
      this.location = this.getLocationDetails;
      this.fistValueLocation = this.location.value;
      this.newValueProperty = this.location.value;
    },
    async sendToTrash() {
      const { isConfirmed } = await CustomConfirmDialog.fire({
        title: this.$t("sweetAlertMessages.sendToTrash"),
        text: this.$t("sweetAlertMessages.locationToTrash"),
      });

      if (!isConfirmed) return;

      const { id } = this.location;

      await this.deleteLocation(id);

      this.hasDeleted = true;
    },

    async submitLocation() {
      const { isConfirmed } = await CustomConfirmDialog.fire();
      if (!isConfirmed) return;

      if (!this.location) return;
      try {
        this.isUploadingLocation = true;

        const updateLocationBody = {
          id: this.location.id,
          isVerified: this.location.isVerified,
          isActive: this.location.isActive,
          name: this.location.name,
          address: this.location.address,
          propertyType: this.location.propertyType,
          landUse: this.location.landUse,
          lat: this.location.lat,
          long: this.location.long,
          rooms: this.location.rooms,
          bathrooms: this.location.bathrooms,
          calendlyLink: this.location.calendlyLink,
          vault: this.location.vault,
          cleaning: this.location.cleaning,
          wifi: this.location.wifi,
          security: this.location.security,
          painting: this.location.painting,
          floor: this.location.floor,
          garage: this.location.garage,
          email: this.location.email,
          phone: this.location.phone,
          description: this.location.description,
          unused: this.location.unused,
          zone: this.location.zone.id,
          owner: this.location.owner.id,
          squareMeters: this.location.squareMeters,
          stripePriceId: this.location.stripePriceId,
          stripeProductId: this.location.stripeProductId,
          startLease: this.location.startLease,
          endLease: this.location.endLease,
          createdByAdmin: this.location.createdByAdmin,
          isDaily: this.location.isDaily,
          dailyValue: this.location.dailyValue,
        };
        await PUT_ADMIN_LOCATION(updateLocationBody);

        this.isUploadingLocation = false;
        CustomToast.fire({
          title: this.$t("sweetAlertMessages.saved"),
          icon: "success",
        });
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message,
        });
      }
      this.isUploadingLocation = false;
    },
    toogleIsActive(value) {
      const changeIsActiveLocationTextAcction = !this.location.isActive
        ? this.$t("adminPanel.locations.confiramtionMessages.activateLocation")
        : this.$t(
            "adminPanel.locations.confiramtionMessages.desactivateLocation"
          );

      CustomConfirmDialog.fire({
        text: changeIsActiveLocationTextAcction,
      }).then(async (result) => {
        if (!result.isConfirmed) return;

        try {
          await this.changeIsActiveLocation({
            id: this.location.id,
            activeStatus: value,
          });
          CustomToast.fire({
            title: this.$t("sweetAlertMessages.saved"),
            icon: "success",
          });
          this.location.isActive = value;
        } catch (error) {
          CustomErrorToast.fire({
            text: error.response.data.message,
          });
        }
      });
    },
    async toogleIsDaily(value) {
      const { isConfirmed } = await CustomConfirmDialog.fire({
        text: this.$t("sweetAlertMessages.confirmTitle"),
      });
      if (!isConfirmed) return;
      console.log("%cLocation.vue line:800 value", "color: #26bfa5;", value);

      try {
        this.isUploadingLocation = true;
        await PUT_ADMIN_LOCATION({
          id: this.location.id,
          isDaily: value,
        });

        CustomToast.fire({
          title: this.$t("sweetAlertMessages.saved"),
          icon: "success",
        });
        this.location.isDaily = value;
        this.isUploadingLocation = false;
      } catch (error) {
        this.isUploadingLocation = false;
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    },
    toogleIsVerified(value) {
      const changeIsVerifyLocationTextAcction = !this.location.isVerified
        ? this.$t("adminPanel.locations.confiramtionMessages.verifyLocation")
        : this.$t("adminPanel.locations.confiramtionMessages.unverifyLocation");

      if (this.location.value == 0) {
        CustomConfirmWarningDialog.fire({
          text: this.$t(
            "adminPanel.locations.confiramtionMessages.verifyValue"
          ),
        });
        return;
      }

      CustomConfirmDialog.fire({
        text: changeIsVerifyLocationTextAcction,
      }).then(async (result) => {
        if (!result.isConfirmed) return;
        try {
          await this.changeIsVerifiedLocation({
            id: this.location.id,
            isVerifiedStatus: value,
          });
          CustomToast.fire({
            title: this.$t("sweetAlertMessages.saved"),
            icon: "success",
          });
          this.location.isVerified = value;
        } catch (error) {
          CustomErrorToast.fire({
            text: error.response.data.message,
          });
        }
      });
    },
    setNewLocationValue() {
      CustomConfirmDialog.fire({
        text: this.$t("adminPanel.locations.confiramtionMessages.updatePrice"),
      }).then(async (result) => {
        if (!result.isConfirmed) return;
        try {
          const price = await this.setLocationValue({
            locationId: this.location.id,
            locationValue: this.newValueProperty,
          });
          CustomToast.fire({
            title: this.$t("sweetAlertMessages.saved"),
            icon: "success",
          });
          this.fistValueLocation = price;
        } catch (error) {
          CustomErrorToast.fire({
            text: error.response.data.message,
          });
        }
      });
    },
    setNewCoords(event) {
      const { lat, lng } = event;
      this.location.lat = lat.toFixed(5);
      this.location.long = lng.toFixed(5);
    },
    async getZoneAndAdmin() {},
    updateNewValue(val) {
      this.newValueProperty = val;
    },
    onChangeDailyValue(val) {
      this.location.dailyValue = val;
    },
    async fetchListUsers() {
      try {
        this.isLoadingAllUsersList = true;
        const response = await GET_ADMIN_USERS();
        this.allUsersList = response;
        this.isLoadingAllUsersList = false;
      } catch (error) {
        this.isLoadingAllUsersList = false;
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    },
  },
  async created() {
    try {
      await this.getCurrenciesList();
      await this.loadLocation();
      await this.fetchListUsers();
    } catch (error) {
      console.log(error);
    }
  },
  watch: {
    idLocation() {
      this.loadLocation();
    },
  },
};
</script>

<style scoped>
.my-input-box {
  width: 100%;
  /* background: rgba(241, 12, 12, 0.1); */
}
.my-input-box div {
  /* background: rgba(12, 12, 240,0.8); */

  display: flex;
  justify-content: space-between;
  align-items: center;
}
.error {
  display: block;
  text-align: right;
  color: red;
}
</style>
