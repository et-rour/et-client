<template>
  <div class="w-full h-full bg-gray-100 overflow-y-scroll" id="details">
    <div v-if="!location">
      <h1>{{ $t("adminPanel.locations.select") }}</h1>
    </div>

    <div v-else class="flex items-center flex-col">
      <div class="mx-auto h-full w-2/3 py-4 flex flex-col gap-3">
        <h1 class="my-title mb-3">
          {{ $t("adminPanel.locations.title") }}
          <span class="text-gray-400 text-xl">#{{ location.id }}</span>
        </h1>

        <div class="flex items-center">
          <label for="name" class="mr-3"
            >{{ $t("adminPanel.locations.name") }}
          </label>
          <input
            type="text"
            class="my-input w-full"
            v-model="location.name"
            id="name"
          />
        </div>
        <div class="flex items-center">
          <label for="address" class="mr-3"
            >{{ $t("adminPanel.locations.address") }}
          </label>
          <input
            type="text"
            class="my-input w-full"
            v-model="location.address"
            id="address"
          />
        </div>
        <div class="flex items-center">
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
        <div class="flex items-center">
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
        <div class="flex items-center">
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
        <div class="flex items-center">
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
        <div class="flex items-center">
          <label for="email" class="mr-3"
            >{{ $t("adminPanel.locations.email") }}
          </label>
          <input
            type="text"
            class="my-input w-full"
            v-model="location.email"
            id="email"
          />
        </div>
        <div class="flex items-center">
          <label for="phone" class="mr-3"
            >{{ $t("adminPanel.locations.phone") }}
          </label>
          <input
            type="text"
            class="my-input w-full"
            v-model="location.phone"
            id="phone"
          />
        </div>
        <div class="flex">
          <label for="description" class="mr-3"
            >{{ $t("adminPanel.locations.description") }}
          </label>
          <textarea
            type="text"
            class="my-input w-full h-24 w"
            v-model="location.description"
            id="description"
          ></textarea>
        </div>
        <div class="flex items-center">
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
        <!-- <div class="flex items-center">
          <label for="zone" class="mr-3"
            >{{ $t("adminPanel.locations.zone") }}
          </label>
          <input
            type="text"
            class="my-input w-full"
            v-model="location.zone"
            id="zone"
          />
        </div>
        <div class="flex items-center">
          <label for="owner" class="mr-3"
            >{{ $t("adminPanel.locations.owner") }}
          </label>
          <input
            type="text"
            class="my-input w-full"
            v-model="location.owner"
            id="owner"
          />
        </div> -->

        <div class="flex items-center">
          <label for="isActive" class="mr-3"
            >{{ $t("adminPanel.locations.isActive") }}
          </label>
          <SwitchComponentVue
            :value="location.isActive"
            v-on:toogle="toogleIsActive"
          />
        </div>

        <div class="flex items-center">
          <label for="isverified" class="mr-3"
            >{{ $t("adminPanel.locations.isverified") }}
          </label>
          <SwitchComponentVue
            :value="location.isVerified"
            v-on:toogle="toogleIsVerified"
          />
        </div>

        <div class="flex items-center">
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
        </div>

        <div class="w-full flex justify-end">
          <button class="my-btn" @click="submitLocation">
            {{ $t("general.update") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SwitchComponentVue from "../../../../../components/SwitchComponent.vue";
import { CustomErrorToast, CustomToast } from "@/sweetAlert";
export default {
  props: {
    idLocation: {
      type: Number,
      requird: true,
    },
  },
  components: {
    SwitchComponentVue,
  },
  computed: {
    ...mapGetters("adminPanelStore", ["getLocationById"]),
    isNewZone() {
      return this.$route.params.id === "new";
    },
  },
  data() {
    return {
      location: null,
      fistValueLocation: null,
    };
  },
  methods: {
    ...mapActions("adminPanelStore", [
      "modifyLocation",
      "changeIsActiveLocation",
      "changeIsVerifiedLocation",
      "setLocationValue",
    ]),
    loadLocation() {
      this.location = this.getLocationById(this.idLocation);
      this.fistValueLocation = this.location.value;
    },
    async submitLocation() {
      try {
        const updateLocationBody = {
          id: this.location.id,
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
        };
        console.log(
          "%cLocation.vue line:202 updateLocationBody",
          "color: #007acc;",
          updateLocationBody
        );
        await this.modifyLocation(updateLocationBody);

        console.log(this.location);
        CustomToast.fire({
          title: "Done",
          icon: "success",
        });
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message,
        });
      }
    },
    async toogleIsActive(value) {
      try {
        await this.changeIsActiveLocation({
          id: this.location.id,
          activeStatus: value,
        });
        CustomToast.fire({
          title: "Done",
          icon: "success",
        });
        this.location.isActive = value;
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message,
        });
      }
    },
    async toogleIsVerified(value) {
      try {
        await this.changeIsVerifiedLocation({
          id: this.location.id,
          isVerifiedStatus: value,
        });
        CustomToast.fire({
          title: "Done",
          icon: "success",
        });
        this.location.isVerified = value;
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message,
        });
      }
    },
    async setNewLocationValue() {
      try {
        const price = await this.setLocationValue({
          locationId: this.location.id,
          locationValue: this.location.value,
        });
        CustomToast.fire({
          title: "Done",
          icon: "success",
        });
        this.fistValueLocation = price;
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message,
        });
      }
    },
  },
  created() {
    this.loadLocation();
  },
  watch: {
    idLocation() {
      this.loadLocation();
    },
  },
};
</script>

<style></style>
