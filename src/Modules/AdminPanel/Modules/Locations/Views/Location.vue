<template>
  <div class="w-2/3 mx-auto mb-8">
    <div class="w-full h-full py-4 flex flex-col gap-3">
      <router-link
        :to="{ name: 'tenants-detail', params: { id: location.id } }"
        class="underline text-my-blue-primary text-right"
        >{{ $t("adminPanel.locations.title") }}</router-link
      >
      <div class="flex items-center justify-between">
        <label for="name" class="mr-3"
          >{{ $t("adminPanel.locations.name") }}
          <span class="text-transparent"> {{ location.id }}</span>
        </label>
        <input
          type="text"
          class="my-input w-2/3"
          v-model="location.name"
          id="name"
        />
      </div>
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
      <div class="flex items-center justify-between">
        <label for="garage" class="mr-3">
          <!-- {{ $t("adminPanel.locations.garage") }} -->
          Area (metros cuadrados)
        </label>
        <input
          type="number"
          min="1"
          class="my-input"
          v-model="location.squareMeters"
          id="meters"
        />
      </div>
      <div class="flex items-center justify-between">
        <label for="isActive" class="mr-3"
          >{{ $t("adminPanel.locations.isActive") }}
        </label>
        <SwitchComponentVue
          :value="location.isActive"
          v-on:toogle="toogleIsActive"
        />
      </div>

      <div class="flex items-center justify-between">
        <label for="isverified" class="mr-3"
          >{{ $t("adminPanel.locations.isverified") }}
        </label>
        <SwitchComponentVue
          :value="location.isVerified"
          v-on:toogle="toogleIsVerified"
        />
      </div>

      <div class="flex items-center justify-between">
        <label for="value" class="mr-3"
          >{{ $t("adminPanel.locations.value") }}
        </label>
        <div>
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
        </div>
      </div>

      <!-- NEW VISIT -->
      <div class="flex items-center justify-between">
        <label class="mr-3">{{ $t("adminPanel.locations.newVisit") }} </label>
        <button class="w-auto px-4 py-2 ml-4" @click="goToSchedule">
          {{ $t("adminPanel.locations.goToVisit") }}
        </button>
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
      <!-- created by -->
      <div class="flex justify-between">
        <label class="mr-2">{{
          $t("adminPanel.locations.createdBy")
        }}</label>
        <p>{{location.createdByAdmin ? $t("adminPanel.locations.admin"):$t("adminPanel.locations.user")}}</p>
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

      <!-- coords -->
      <MapCoordsVue
        :lat="location.lat"
        :long="location.long"
        :editing="true"
        @result-click="setNewCoords"
      ></MapCoordsVue>
      <!-- <p>lat:{{ location.lat }} long:{{ location.long }}</p> -->

      <div class="w-full flex justify-center">
        <button
          class="my-btn"
          @click="submitLocation"
          :disabled="isUploadingLocation"
          :class="isUploadingLocation ? 'bg-gray-500' : ''"
        >
          {{ $t("general.update") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SwitchComponentVue from "../../../../../components/SwitchComponent.vue";
import {
  CustomErrorToast,
  CustomToast,
  CustomConfirmDialog,
  CustomConfirmWarningDialog,
} from "@/sweetAlert";
import MapCoordsVue from "../../../../../components/MapCoords.vue";

export default {
  components: {
    SwitchComponentVue,
    MapCoordsVue,
  },
  computed: {
    ...mapGetters("adminPanelStore/locations", ["getLocationDetails"]),
  },
  data() {
    return {
      location: null,
      fistValueLocation: null,

      isUploadingLocation: false,
    };
  },
  methods: {
    ...mapActions("adminPanelStore/locations", [
      "modifyLocation",
      "changeIsActiveLocation",
      "changeIsVerifiedLocation",
      "setLocationValue",
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
          },
        },
      });
    },
    loadLocation() {
      this.location = this.getLocationDetails;
      this.fistValueLocation = this.location.value;
    },
    async submitLocation() {
      const { isConfirmed } = await CustomConfirmDialog.fire();
      if (!isConfirmed) return;

      const {
        id,
        name,
        address,
        rooms,
        bathrooms,
        painting,
        floor,
        email,
        phone,
        description,
        garage,
        lat,
        long,
        squareMeters,
        vault,
        cleaning,
        wifi,
        security,
      } = this.location;
      try {
        const updateLocationBody = {
          id: id,
          name: name,
          address: address,
          rooms: rooms,
          bathrooms: bathrooms,
          painting: painting,
          floor: floor,
          email: email,
          phone: phone,
          description: description,
          garage: garage,
          lat: lat,
          lng: long,
          meters: squareMeters,
          vault,
          cleaning,
          wifi,
          security,
        };

        this.isUploadingLocation = true;
        await this.modifyLocation(updateLocationBody);

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
            locationValue: this.location.value,
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
  },
  async created() {
    try {
      await this.loadLocation();
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

<style></style>
