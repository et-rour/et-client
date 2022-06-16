<template>
  <div class="w-full h-full bg-gray-100" id="details">
    <div v-if="!zone">
      <h1>{{ $t("adminPanel.zones.select") }}</h1>
    </div>

    <div v-else class="flex items-center flex-col">
      <div class="mx-auto h-full w-2/3 py-4 flex flex-col gap-3">
        <h1 class="my-title mb-6 text-center">
          {{ $t("adminPanel.zones.title") }}
        </h1>

        <div class="flex items-center justify-between">
          <label for="country" class="mr-3"
            >{{ $t("adminPanel.zones.country") }}
          </label>
          <input
            type="text"
            class="my-input"
            v-model="zone.country"
            id="country"
          />
        </div>
        <div class="flex items-center justify-between">
          <label for="state" class="mr-3"
            >{{ $t("adminPanel.zones.state") }}
          </label>
          <input type="text" class="my-input" v-model="zone.state" id="state" />
        </div>
        <div class="flex items-center justify-between">
          <label for="city" class="mr-3"
            >{{ $t("adminPanel.zones.city") }}
          </label>
          <input type="text" class="my-input" v-model="zone.city" id="city" />
        </div>
        <div class="flex items-center justify-between">
          <label for="zone" class="mr-3"
            >{{ $t("adminPanel.zones.zone") }}
          </label>
          <input type="text" class="my-input" v-model="zone.zone" id="zone" />
        </div>
        <div class="flex items-center justify-between">
          <label for="centerCoordinates" class="mr-3"
            >{{ $t("adminPanel.zones.centerCoordinates") }}
          </label>
          <input
            type="text"
            class="my-input"
            v-model="zone.centerCoordinates"
            id="centerCoordinates"
          />
        </div>
        <div class="flex items-center justify-between">
          <label for="rate" class="mr-3"
            >{{ $t("adminPanel.zones.rate") }}
          </label>
          <input type="text" class="my-input" v-model="zone.rate" id="rate" />
        </div>
        <div class="flex items-center justify-between">
          <label for="averageValue" class="mr-3"
            >{{ $t("adminPanel.zones.averageValue") }}
          </label>
          <input
            type="text"
            class="my-input"
            v-model="zone.averageValue"
            id="averageValue"
          />
        </div>
        <div class="flex items-center justify-between" v-if="!isNewZone">
          <label for="isActive" class="mr-3"
            >{{ $t("adminPanel.zones.active") }}
          </label>
          <SwitchComponentVue
            :value="zone.isActive"
            v-on:toogle="toogleIsActive"
          />
        </div>
        <div class="w-full flex justify-center">
          <button class="my-btn" @click="submitCreateNewZone" v-if="isNewZone">
            {{ $t("general.save") }}
          </button>
          <button class="my-btn" @click="submitUpdateZone" v-else>
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
import {
  CustomErrorToast,
  CustomToast,
  CustomConfirmDialog,
} from "@/sweetAlert";
export default {
  components: {
    SwitchComponentVue,
  },
  props: {
    idZone: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters("adminPanelStore", ["getZoneById"]),
    isNewZone() {
      return this.$route.params.id === "new";
    },
  },
  data() {
    return {
      zone: null,
    };
  },
  methods: {
    ...mapActions("adminPanelStore", [
      "createZone",
      "modifyZone",
      "changeIsActiveZone",
    ]),
    loadZone() {
      if (this.idZone != "new") {
        this.zone = this.getZoneById(this.idZone);
      } else {
        this.zone = null;
        this.zone = {
          isActive: true,
        };
      }
    },
    async submitCreateNewZone() {
      try {
        const newZoneId = await this.createZone(this.zone);
        this.$router.push({
          name: "admin-zones-detail",
          params: { id: newZoneId },
          hash: "#details",
        });

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
    submitUpdateZone() {
      CustomConfirmDialog.fire({
        text: this.$t("adminPanel.zones.confiramtionMessages.update"),
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await this.modifyZone(this.zone);
            CustomToast.fire({
              title: this.$t("sweetAlertMessages.saved"),
              icon: "success",
            });
          } catch (error) {
            CustomErrorToast.fire({
              text: error.response.data.message,
            });
          }
        }
      });
    },
    toogleIsActive(value) {
      const changeActiveZoneTextAcction = this.zone.isActive
        ? this.$t("adminPanel.zones.confiramtionMessages.activateZone")
        : this.$t("adminPanel.zones.confiramtionMessages.desactivateZone");

      CustomConfirmDialog.fire({ text: changeActiveZoneTextAcction }).then(
        async (result) => {
          try {
            if (result.isConfirmed) {
              await this.changeIsActiveZone({
                id: this.zone.id,
                activeStatus: value,
              });
              CustomToast.fire({
                title: this.$t("sweetAlertMessages.saved"),
                icon: "success",
              });
              this.zone.isActive = value;
            }
          } catch (error) {
            CustomErrorToast.fire({
              text: error.response.data.message,
            });
          }
        }
      );
    },
  },
  created() {
    this.loadZone();
  },
  watch: {
    idZone() {
      this.loadZone();
    },
  },
};
</script>

<style></style>
