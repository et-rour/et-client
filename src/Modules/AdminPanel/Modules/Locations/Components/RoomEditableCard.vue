<template>
  <div class="w-full h-auto flex flex-col bg-gray-200">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 relative p-6">
      <ImageVisibility
        v-for="image in room.imagesRoom"
        :key="image.id"
        :image="image"
      />
      <div
        @click="showUploadImagesModal = true"
        class="w-10 h-10 rounded-full bg-gray-200 absolute right-0 bottom-0 flex justify-center items-center border-4 border-white cursor-pointer text-my-blue-primary"
      >
        <font-awesome-icon icon="plus" />
      </div>
    </div>

    <div class="flex flex-col gap-2 w-full p-2">
      <input type="text" class="my-input" v-model="room.name" />

      <textarea class="my-input h-28" v-model="room.description"></textarea>

      <div class="flex justify-between">
        <span>
          $<input type="number" class="my-input w-40" v-model="room.value" />
        </span>
        <span>
          mts&sup2;
          <input
            type="number"
            class="my-input w-40"
            v-model="room.squareMeter"
          />
        </span>
      </div>
      <div class="flex justify-between items-center">
        <label>
          {{ $t("adminPanel.locations.roomsList.isActive") }}
        </label>
        <SwitchComponent
          :value="room.isActive"
          @toogle="changeIsActiveRoom"
        ></SwitchComponent>
      </div>
      <div class="flex justify-between">
        <button
          class="my-btn w-auto px-4 py-1 self-end"
          @click="goToBuyLink"
          :disabled="!room.stripePriceId"
          :class="!room.stripePriceId ? 'bg-gray-400' : ''"
        >
          {{ $t("adminPanel.locations.roomsList.buyLink") }}
        </button>
        <button
          class="my-btn w-auto px-4 py-1 self-end"
          @click="updateRoomHandler"
          :disabled="isSaving"
          :class="isSaving ? 'bg-gray-400' : ''"
        >
          {{ $t("general.save") }}
        </button>
      </div>
    </div>

    <ModelUploadImages
      :showUploadImagesModal="showUploadImagesModal"
      @toogle="toogleShowUploadImagesModal"
      :id="room.id"
      :route="`/Location_${getLocationDetails.id}/Room_${room.id}/`"
      :table="'room'"
      :buttonText="'Close'"
    >
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

export default {
  components: {
    SwitchComponent,
    ModelUploadImages,
    ImageVisibility,
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
    };
  },
  computed: {
    ...mapGetters(["imageUrl", "ImageUploadingState"]),
    
    ...mapGetters("authStore", ["user"]),
    ...mapGetters("adminPanelStore/locations", ["getLocationDetails","getAllCurrencies"]),
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
            name: this.room.name,
            image: this.room.image,
            value: this.room.value,
            squareMeter: this.room.squareMeter,
            description: this.room.description,
            locationId: this.getLocationDetails.id,
          });

          this.$router.go()
          
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
      console.log(
        "%cRoomEditableCard.vue line:200 toogleValue",
        "color: #007acc;",
        toogleValue
      );
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
  },
};
</script>

<style></style>
