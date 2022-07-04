<template>
  <div class="w-full h-auto flex flex-col bg-gray-200">
    <div class="w-1/3 mx-auto relative">
      <template>
        <img
          v-if="room.image && room.image.length > 0"
          :src="room.image"
          class="w-48 h-full object-contain"
          alt="project"
        />
        <img
          v-else
          src="@/assets/icons/image.png"
          class="w-48 h-full object-contain border-2 border-black"
          alt="project"
        />
      </template>
      <div
        @click="$refs.roomImageSelector.click()"
        class="w-10 h-10 rounded-full bg-gray-200 absolute right-0 bottom-0 flex justify-center items-center border-4 border-white cursor-pointer text-my-blue-primary"
      >
        <font-awesome-icon icon="camera" />
      </div>
      <input
        type="file"
        class="hidden"
        ref="roomImageSelector"
        @change="uploadRoomImage($event, room.id)"
      />
      <ProgesBarImage
        :id="`room_${room.id}`"
        :imageUrl="imageUrl"
        :value="ImageUploadingState"
        class="w-full h-5"
      />
    </div>

    <div class="flex flex-col gap-2 w-full p-2">
      <input type="text" class="my-input" v-model="room.name" />

      <textarea class="my-input h-28" v-model="room.description"></textarea>

      <div class="flex justify-between">
        <span>
          $ <input type="number" class="my-input w-40" v-model="room.value" />
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  CustomErrorToast,
  CustomToast,
  CustomConfirmDialog,
} from "@/sweetAlert";
import ProgesBarImage from "../../../../../components/ProgesBarImage.vue";

export default {
  components: {
    ProgesBarImage,
  },
  props: {
    room: {
      type: Object,
      required: true,
    },
    idLocation: {
      type: String,
      requird: true,
    },
  },
  data() {
    return {
      isSaving: false,
    };
  },
  computed: {
    ...mapGetters(["imageUrl", "ImageUploadingState"]),
    ...mapGetters("authStore", ["user"]),
  },
  methods: {
    ...mapActions(["uploadImageTofirebase", "goToCheckoutSession"]),
    ...mapActions("adminPanelStore", ["updateRoomImage", "updateRoom"]),
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
          locationId: this.idLocation,
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
            locationId: this.idLocation,
            description: this.room.description,
          });

          CustomToast.fire({
            title: this.$t("sweetAlertMessages.saved"),
            icon: "success",
          });
          this.isSaving = false;
        } catch (error) {
          CustomErrorToast.fire({
            text: error.response.data.message,
          });
        }
      });
    },
    goToBuyLink() {
      this.goToCheckoutSession({
        locationId: this.room.id,
        userId: this.user.user.id,
        isLocation: false,
      });
    },
  },
};
</script>

<style></style>
