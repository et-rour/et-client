<template>
  <div class="w-full h-36 relative" v-if="!hideDeleted">
    <img
      :src="image.image"
      :alt="`imageLocation_${image.id}`"
      class="w-full h-full object-cover"
    />

    <div class="absolute top-2 right-2 flex gap-2 ">
      <div
        class="w-8 h-8 text-sm bg-black opacity-70 rounded-full flex justify-center items-center cursor-pointer"
        @click="deleteImageHandler"
        :class="isUpdating && 'bg-gray-400'"
        :disabled="isUpdating"
      >
        <font-awesome-icon
          icon="trash-can"
          class="text-white"
        />
      </div>
      
      <div
        class="w-8 h-8 text-sm bg-black opacity-70 rounded-full flex justify-center items-center cursor-pointer"
        @click="changeVisivilityHandler"
        :class="isUpdating && 'bg-gray-400'"
        :disabled="isUpdating"
      >
        <font-awesome-icon
          icon="eye"
          class="text-white"
          v-if="localImageVisibility"
        />
        <font-awesome-icon
          v-else
          icon="fa-solid fa-eye-slash"
          class="text-white"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import EspacioTemporalApi from "@/Api/index"
import {
  CustomErrorToast,
  CustomToast,
  CustomConfirmDialog,
} from "@/sweetAlert";
export default {
  props: {
    image: {
      required: true,
    },
  },
  data() {
    return {
      isUpdating: false,
      localImageVisibility: null,

      hideDeleted:false,
    };
  },
  methods: {
    ...mapActions("adminPanelStore/locations", ["changeIsVisibilityImage"]),
    async changeVisivilityHandler() {
      if (this.isUpdating) return;

      const confirmMessage = this.localImageVisibility
        ? this.$t("adminPanel.locations.imagesList.confiramtionMessages.delete")
        : this.$t("adminPanel.locations.imagesList.confiramtionMessages.show");
      const { isConfirmed } = await CustomConfirmDialog.fire({
        text: confirmMessage,
      });
      if (!isConfirmed) return;

      try {
        this.isUpdating = true;
        const isSavedImage = await this.changeIsVisibilityImage({
          idImage: this.image.id,
          isVisible: !this.localImageVisibility,
        });

        if (isSavedImage.saved) {
          CustomToast.fire({
            title: this.$t("sweetAlertMessages.saved"),
            icon: "success",
          });
          this.localImageVisibility = isSavedImage.isVisible;
        }
        this.isUpdating = false;
      } catch (error) {
        this.isUpdating = false;
        CustomErrorToast.fire({
          text: error,
        });
      }
    },

    async deleteImageHandler() {
      if (this.isUpdating) return;

      const { isConfirmed } = await CustomConfirmDialog.fire({
        text: this.$t("adminPanel.locations.imagesList.confiramtionMessages.delete")
      });
      if (!isConfirmed) return;

      try {
        this.isUpdating = true;
        await EspacioTemporalApi.put(`/images/${this.image.id}/delete`)
        this.hideDeleted = true
        this.isUpdating = false;
      } catch (error) {
        this.isUpdating = false;
        CustomErrorToast.fire({
          text: error,
        });
      }
    },
  },
  mounted() {
    this.localImageVisibility = this.image.isVisible;
  },
};
</script>

<style></style>
