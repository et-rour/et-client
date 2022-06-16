<template>
  <div class="w-full h-40 my-4 flex gap-4">
    <div class="w-9/12 sm:w-6/12 lg:w-1/3 h-full bg-gray-200 relative">
      <img
        v-if="!localImage"
        src="@/assets/icons/image.png"
        class="w-full h-full object-contain"
        alt="project"
      />
      <img
        v-else
        class="w-full h-full object-contain"
        :src="localImage"
        alt="Entry picture"
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
        @change="onSelectedImage($event)"
      />
      <ProgesBarImage
        id="room_new"
        :imageUrl="imageUrl"
        :value="ImageUploadingState"
        class="w-full h-5"
      />
    </div>
    <div class="flex flex-col justify-center relative gap-2">
      <div class="text-gray-400">
        <input type="number" class="my-input w-20" v-model="squareMeter" />
        mts&sup2;
      </div>
      <div class="align-middle text-lg font-bold">
        <input type="text" class="my-input" v-model="name" />
      </div>
      <div class="align-middle text-lg">
        $ <input type="number" class="my-input w-28" v-model="value" />
      </div>
      <button
        class="my-btn w-24 px-1 py-1 self-end"
        @click="createNewRoom"
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
import { CustomErrorToast, CustomToast } from "@/sweetAlert";
import ProgesBarImage from "../../../../../components/ProgesBarImage.vue";
export default {
  components: {
    ProgesBarImage,
  },
  props: {
    idLocation: {
      type: String,
      requird: true,
    },
  },
  data() {
    return {
      name: "",
      image: "",
      value: 0,
      squareMeter: 0,

      isSaving: false,
      showProgresBar: false,

      localImage: null,
      file: null,
    };
  },
  computed: {
    ...mapGetters(["imageUrl", "ImageUploadingState"]),
    ...mapGetters("authStore", ["user"]),
  },
  methods: {
    ...mapActions(["uploadImageTofirebase"]),
    ...mapActions("adminPanelStore", ["updateRoomImage", "createRoom"]),
    onSelectedImage(event) {
      const image = event.target.files[0];
      if (!image) {
        this.localImage = null;
        this.file = null;
        return;
      }
      this.file = image;
      const fr = new FileReader();
      fr.onload = () => (this.localImage = fr.result);
      fr.readAsDataURL(image);
    },
    async createNewRoom() {
      try {
        let uploadedImage = null;
        if (this.file) {
          uploadedImage = await this.uploadImageTofirebase({
            id: "room_new",
            user: this.user.user.email,
            file: this.file,
            directory: "Rooms",
          });
        }

        await this.createRoom({
          name: this.name,
          image: uploadedImage,
          value: this.value,
          squareMeter: this.squareMeter,
          locationId: this.idLocation,
        });

        CustomToast.fire({
          title: this.$t("sweetAlertMessages.saved"),
          icon: "success",
        });
        this.name = "";
        this.image = "";
        this.value = 0;
        this.squareMeter = 0;
        this.isSaving = false;
        this.file = null;
        this.localImage = null;
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message,
        });
      }
    },
  },
};
</script>

<style></style>
