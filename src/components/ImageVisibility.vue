<template>
  <div class="w-full h-36 relative">
    <img
      :src="image.image"
      :alt="`imageLocation_${image.id}`"
      class="w-full h-full object-cover"
    />
    <div
      class="w-8 h-8 text-sm bg-black opacity-70 absolute top-2 right-2 rounded-full flex justify-center items-center cursor-pointer"
      @click="changeVisivilityHandler"
      :class="isSaving && 'bg-gray-400'"
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
</template>

<script>
import { mapActions } from "vuex";
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
      isSaving: false,
      localImageVisibility: null,
    };
  },
  methods: {
    ...mapActions("adminPanelStore/locations", ["changeIsVisibilityImage"]),
    async changeVisivilityHandler() {
      if (this.isSaving) return;

      const confirmMessage = this.localImageVisibility
        ? this.$t("adminPanel.locations.imagesList.confiramtionMessages.hide")
        : this.$t("adminPanel.locations.imagesList.confiramtionMessages.show");
      const { isConfirmed } = await CustomConfirmDialog.fire({
        text: confirmMessage,
      });
      if (!isConfirmed) return;

      try {
        this.isSaving = true;
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
        this.isSaving = false;
      } catch (error) {
        this.isSaving = false;
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
