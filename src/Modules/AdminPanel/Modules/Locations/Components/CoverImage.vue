<template>
  <div
    class="col-span-3 flex flex-col items-center gap-4 border-b-2 border-black"
  >
    <div class="flex-grow w-full">
      <img
        v-if="localImage"
        class="w-full h-64 object-contain"
        :src="localImage"
        alt="Local image"
      />
      <img
        v-else
        :src="coverImageUrl"
        alt="front image"
        class="w-full h-64 object-contain"
      />
    </div>
    <!-- buttons  -->
    <div class="w-full flex justify-between">
      <input
        type="file"
        @change="onImageSelectChangeHandler"
        ref="imageSelector"
        class="hidden"
      />
      <button
        class="my-btn my-1 py-1 px-2 rounded-lg w-auto"
        @click="$refs.imageSelector.click()"
      >
        {{ $t("adminPanel.locations.imagesList.change") }}
      </button>
      <button
        class="my-btn my-1 py-1 px-4 rounded-lg w-auto"
        v-if="localImage"
        :disabled="!localImage"
        :class="!localImage && 'bg-opacity-40'"
        @click="uploadCoverImage"
      >
        {{ $t("adminPanel.locations.imagesList.saveCoverImage") }}
      </button>
    </div>
  </div>
</template>

<script>
import Swal, {
  CustomErrorToast,
  CustomConfirmDialog,
  CustomToast,
} from "@/sweetAlert";

import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    coverImageUrl: {
      type: String,
    },
  },
  data() {
    return {
      localImage: null,
      file: null,
    };
  },
  methods: {
    ...mapActions("adminPanelStore/locations", ["changeCoverImage"]),
    ...mapActions(["uploadImageTofirebase"]),
    async onImageSelectChangeHandler(event) {
      const image = event.target.files[0];
      if (!image) {
        this.file = null;
        return;
      }
      this.file = image;
      const fr = new FileReader();
      fr.onload = () => (this.localImage = fr.result);
      fr.readAsDataURL(image);
    },
    async uploadCoverImage() {
      const { isConfirmed } = await CustomConfirmDialog.fire({
        text: this.$t("adminPanel.locations.confiramtionMessages.changeImage"),
      });
      if (!isConfirmed) return;

      new Swal({
        title: this.$t("sweetAlertMessages.wait"),
        allowOutsideClick: false,
      });
      Swal.showLoading();
      try {
        const newImageFirebaseUrl = await this.uploadImageTofirebase({
          user: this.user.user.email,
          file: this.file,
          directory: "/",
        });

        await this.changeCoverImage({
          image: newImageFirebaseUrl,
          idLocation: this.getLocationDetails.id,
        });

        Swal.close();
        CustomToast.fire({
          title: this.$t("sweetAlertMessages.saved"),
          icon: "success",
        });
        this.localImage = null;
        this.file = null;
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    },
  },
  computed: {
    ...mapGetters("adminPanelStore/locations", ["getLocationDetails"]),
    ...mapGetters("authStore", ["user"]),
  },
};
</script>

<style></style>
