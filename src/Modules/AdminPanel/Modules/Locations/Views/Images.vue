<template>
  <div class="w-2/3 mx-auto mt-4" id="details">
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">

      <div class="col-span-2 md:col-span-3 h-96 ">
        <!-- portada -->
        <image-upload-component 
          :directory="`Location_${getLocationDetails.id}`" 
          @sendPreview="uploadCoverImage"
          :previewImage="getLocationDetailsImages.frontImage"
        />
        
      </div>
      
      <!-- images -->
      <div class="w-full h-36 relative p-4" @click="showUploadImages = true">
        <img
          src="@/assets/icons/image.png"
          class="w-full h-full object-contain"
          alt="project"
        />
        <div
          class="w-10 h-10 rounded-full bg-gray-200 absolute right-0 bottom-0 flex justify-center items-center border-4 border-white cursor-pointer text-my-blue-primary"
        >
          <font-awesome-icon icon="camera" />
        </div>
      </div>

      <ImageVisibility
        class="w-full h-36"
        v-for="image in getLocationDetailsImages.images"
        :key="image.id"
        :image="image"
      />
    </div>

    <ModelUploadImagesComponent
      :showUploadImagesModal="showUploadImages"
      @toogle="toogleShowUploadImagesModal"
      :id="getLocationDetails.id"
      :route="`/Location_${getLocationDetails.id}/`"
      :table="'location'"
    >
    </ModelUploadImagesComponent>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ModelUploadImagesComponent from "../../../../../components/ModelUploadImages.vue";
import ImageVisibility from "../../../../../components/ImageVisibility.vue";
import { CustomErrorToast, CustomToast } from "@/sweetAlert";
import ImageUploadComponent from '../../../../../components/ImageUploadComponent.vue';

export default {
  components: {
    ImageVisibility,
    ModelUploadImagesComponent,
    ImageUploadComponent,
  },
  computed: {
    ...mapGetters("adminPanelStore/locations", [
      "getLocationDetailsImages",
      "getLocationDetails",
    ]),
  },
  data() {
    return {
      showUploadImages: false,
    };
  },
  methods: {
    ...mapActions("adminPanelStore/locations", ["fetchLocationDetails","changeCoverImage"]),
    async toogleShowUploadImagesModal() {
      this.showUploadImages = !this.showUploadImages;
      try {
        await this.fetchLocationDetails(this.getLocationDetails.id);
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    },

    async uploadCoverImage(newImageFirebaseUrl) {
      try {
        await this.changeCoverImage({
          image: newImageFirebaseUrl,
          idLocation: this.getLocationDetails.id,
        });

        CustomToast.fire({
          title: this.$t("sweetAlertMessages.saved"),
          icon: "success",
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
