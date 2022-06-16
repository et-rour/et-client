<template>
  <div class="w-full h-40 my-4 flex gap-4">
    <div class="w-9/12 sm:w-6/12 lg:w-1/3 h-full bg-gray-200 relative">
      <img
        :src="room.image"
        class="w-full h-full object-contain"
        alt="project"
      />
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
    <div class="flex flex-col justify-center relative gap-2">
      <div class="text-gray-400">
        <input type="number" class="my-input w-20" v-model="room.squareMeter" />
        mts&sup2;
      </div>
      <div class="align-middle text-lg font-bold">
        <input type="text" class="my-input" v-model="room.name" />
      </div>
      <div class="align-middle text-lg">
        $ <input type="number" class="my-input w-28" v-model="room.value" />
      </div>
      <button
        class="my-btn w-24 px-1 py-1 self-end"
        @click="updateRoomHandler"
        :disabled="isSaving"
        :class="isSaving ? 'bg-gray-400' : ''"
      >
        {{ $t("general.save") }}
      </button>
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
    ...mapActions(["uploadImageTofirebase"]),
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
  },
};
</script>

<style></style>
