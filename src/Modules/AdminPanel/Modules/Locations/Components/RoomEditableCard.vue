<template>
  <div class="w-full h-auto flex flex-col bg-gray-200" v-if="!hideDeleted">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 relative p-6">
      <ImageVisibility
        v-for="image in room.imagesRoom"
        :key="image.id"
        :image="image" />
      <div
        @click="showUploadImagesModal = true"
        class="w-10 h-10 rounded-full bg-gray-200 absolute right-0 bottom-0 flex justify-center items-center border-4 border-white cursor-pointer text-my-blue-primary">
        <font-awesome-icon icon="plus" />
      </div>
    </div>

    <div class="flex flex-col gap-2 w-full p-2">
      <input type="text" class="my-input" v-model="room.name" />

      <textarea class="my-input h-28" v-model="room.description"></textarea>

      <div class="flex justify-between">
        <span> {{ $t("adminPanel.locations.roomsList.monthlyValue") }}</span>
        <InputNumberMask
          v-model="room.value"
          @changeValue="updateRoomMonthlyValue" />
      </div>
      <div class="flex justify-between">
        <span> {{ $t("adminPanel.locations.roomsList.dailyValue") }}</span>
        <InputNumberMask
          v-model="room.dailyValue"
          @changeValue="updateRoomDailyValue" />
      </div>
      <div>
        <span>
          mts&sup2;
          <input
            type="number"
            class="my-input w-40"
            v-model="room.squareMeter" />
        </span>
      </div>

      <div class="flex justify-between items-center">
        <label>
          {{ $t("adminPanel.locations.roomsList.isActive") }}
        </label>
        <SwitchComponent
          :value="room.isActive"
          @toogle="changeIsActiveRoom"></SwitchComponent>
      </div>

      <div class="flex justify-between items-center">
        <label>
          {{ $t("adminPanel.locations.roomsList.isDaily") }}
        </label>
        <SwitchComponent
          :value="room.isDaily"
          @toogle="changeIsDailyRoom"></SwitchComponent>
      </div>

      <div class="flex justify-between">
        <!-- <button
          class="my-btn w-auto px-4 py-1 self-end"
          @click="goToBuyLink"
          :disabled="!room.stripePriceId"
          :class="!room.stripePriceId ? 'bg-gray-400' : ''">
          {{ $t("adminPanel.locations.roomsList.buyLink") }}
        </button> -->
        <button
          class="my-btn w-auto px-4 py-1 self-end"
          @click="updateRoomHandler"
          :disabled="isSaving"
          :class="isSaving ? 'bg-gray-400' : ''">
          {{ $t("general.save") }}
        </button>
        <button
          class="my-btn w-auto px-4 py-1 bg-red-600"
          @click="deleteRoomHandler"
          :disabled="isSaving"
          :class="isSaving ? 'bg-red-400' : ''">
          {{ $t("general.delete") }}
        </button>
      </div>
    </div>

    <ModelUploadImages
      :showUploadImagesModal="showUploadImagesModal"
      @toogle="toogleShowUploadImagesModal"
      :id="room.id"
      :route="`/Location_${getLocationDetails.id}/Room_${room.id}/`"
      :table="'room'"
      :buttonText="'Close'">
    </ModelUploadImages>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  CustomErrorToast,
  CustomToast,
  CustomConfirmDialog,
} from "@/sweetAlert";
import SwitchComponent from "../../../../../components/SwitchComponent.vue";
import ModelUploadImages from "../../../../../components/ModelUploadImages.vue";
import ImageVisibility from "../../../../../components/ImageVisibility.vue";
import espacioTemporalApi from "@/Api/index";
import InputNumberMask from "../../../../../components/InputNumberMask.vue";
export default {
  components: {
    SwitchComponent,
    ModelUploadImages,
    ImageVisibility,
    InputNumberMask,
  },
  props: {
    room: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isSaving: false,
      showUploadImagesModal: false,
      hideDeleted: false,
    };
  },
  computed: {
    ...mapGetters(["imageUrl", "ImageUploadingState"]),

    ...mapGetters("authStore", ["user"]),
    ...mapGetters("adminPanelStore/locations", [
      "getLocationDetails",
      "getAllCurrencies",
    ]),
  },
  methods: {
    ...mapActions(["uploadImageTofirebase", "goToRoomCheckoutSession"]),
    ...mapActions("adminPanelStore/locations", [
      "updateRoomImage",
      "updateRoom",
      "updateRoomIsActive",
      "fetchLocationDetails",
    ]),
    async uploadRoomImage(event, idRoom) {
      const image = event.target.files[0];
      if (!image) {
        return;
      }
      console.log("%cRooms.vue line:79 Room", "color: #007acc;", {
        event,
        idRoom,
        eventI: image,
      });

      try {
        const res = await this.uploadImageTofirebase({
          id: `room_${idRoom}`,
          user: this.user.user.email,
          file: image,
          directory: "Rooms",
        });

        await this.updateRoomImage({
          locationId: this.getLocationDetails.id,
          idRoom: idRoom,
          imageUrl: res,
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
    updateRoomHandler() {
      CustomConfirmDialog.fire({
        text: this.$t(
          "adminPanel.locations.roomsList.confiramtionMessages.update"
        ),
      }).then(async (result) => {
        if (!result.isConfirmed) return;
        this.isSaving = true;
        try {
          await this.updateRoom({
            id: this.room.id,
            body: {
              name: this.room.name,
              image: this.room.image,
              value: this.room.value,
              squareMeter: this.room.squareMeter,
              description: this.room.description,
              locationId: this.getLocationDetails.id,
              dailyValue: this.room.dailyValue,
            },
          });

          this.$router.go();
        } catch (error) {
          this.isSaving = false;
          CustomErrorToast.fire({
            text: error.response.data.message,
          });
        }
      });
    },
    deleteRoomHandler() {
      CustomConfirmDialog.fire({
        text: this.$t(
          "adminPanel.locations.roomsList.confiramtionMessages.delete"
        ),
      }).then(async (result) => {
        if (!result.isConfirmed) return;
        this.isSaving = true;
        try {
          await espacioTemporalApi.put(`/admin/room/${this.room.id}`, {
            locationId: this.getLocationDetails.id,
            isDeleted: true,
          });
          this.isSaving = false;
          this.hideDeleted = true;
        } catch (error) {
          this.isSaving = false;
          CustomErrorToast.fire({
            text: error.response.data.message,
          });
        }
      });
    },
    goToBuyLink() {
      this.goToRoomCheckoutSession({
        roomId: this.room.id,
        userId: this.user.user.id,
      });
    },
    async toogleShowUploadImagesModal() {
      this.showUploadImagesModal = !this.showUploadImagesModal;
      try {
        await this.fetchLocationDetails(this.getLocationDetails.id);
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    },
    async changeIsActiveRoom(toogleValue) {
      const changeIsActiveRoomTextAlert = toogleValue
        ? this.$t(
            "adminPanel.locations.roomsList.confiramtionMessages.changeToActive"
          )
        : this.$t(
            "adminPanel.locations.roomsList.confiramtionMessages.changeToInactive"
          );
      const { isConfirmed } = await CustomConfirmDialog.fire({
        text: changeIsActiveRoomTextAlert,
      });
      if (!isConfirmed) return;

      try {
        await this.updateRoomIsActive({
          idRoom: this.room.id,
          locationId: this.getLocationDetails.id,
          isActive: toogleValue,
        });
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    },
    async changeIsDailyRoom(toogleValue) {
      const { isConfirmed } = await CustomConfirmDialog.fire({
        text: this.$t("sweetAlertMessages.confirmSubTitle"),
      });
      if (!isConfirmed) return;

      try {
        await this.updateRoom({
          id: this.room.id,
          body: {
            isDaily: this.room.isDaily,
            locationId: this.getLocationDetails.id,
          },
        });
        this.room.isDaily = toogleValue;
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    },
    updateRoomMonthlyValue(val) {
      this.room.value = val;
    },
    updateRoomDailyValue(val) {
      this.room.dailyValue = val;
    },
  },
};
</script>

<style></style>
