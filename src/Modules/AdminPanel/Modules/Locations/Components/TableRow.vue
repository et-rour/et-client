<template>
  <tr
    class="flex flex-col flex-no wrap lg:table-row mb-2 lg:mb-0"
    :class="editing ? 'bg-gray-400 :hover:bg-gray-500' : ''"
  >
    <!-- name -->
    <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">
      <span v-if="!editing">
        {{ image3dData.id }}.- {{ image3dData.name }}
      </span>
      <ValidationProvider
        v-else
        v-slot="{ errors }"
        rules="required"
        class="flex flex-col"
      >
        <input
          v-model="newImage3dData.name"
          type="text"
          class="my-input bg-gray-200 w-24 p-0"
        />
        <span class="my-error relative top-0 left-0">{{ errors[0] }}</span>
      </ValidationProvider>
    </td>
    <!-- image -->
    <td class="border-grey-light border hover:bg-gray-100 p-3 w-full h-20">
      <img
        :src="image3dData.image"
        alt="location image"
        class="w-full h-full object-cover"
        v-if="!editing"
      />
      <div class="flex flex-col items-center" v-else>
        <img
          v-if="localImage"
          class="h-full w-40 object-cover inline-block mr-4 p-0"
          :src="localImage"
          alt="Local image"
        />
        <div>
          <input
            type="file"
            @change="onSelectedImage"
            ref="imageSelector"
            class="hidden"
          />

          <div class="flex flex-col justify-center items-center">
            <button class="my-btn mr-4" @click="$refs.imageSelector.click()">
              {{ $t("createForm.image") }}
            </button>
            <ProgesBarImageVue
              :id="`new_image3d_${newImage3dData.id}`"
              :imageUrl="imageUrl"
              :value="ImageUploadingState"
              class="w-full h-5"
              :showImageLink="false"
            />
          </div>
        </div>
      </div>
    </td>
    <!-- lat -->
    <td class="border-grey-light border hover:bg-gray-100 p-3">
      <span v-if="!editing">
        {{ image3dData.latitude }}
      </span>
      <ValidationProvider v-else v-slot="{ errors }" rules="required" class="">
        <input
          v-model="newCoords.latitude"
          type="number"
          class="my-input bg-gray-200 w-16 p-0"
        />
        <span class="my-error top-0 right-0" v-if="errors[0]">
          <font-awesome-icon
            icon="question-circle"
            class="text-red-600"
          ></font-awesome-icon>
        </span>
      </ValidationProvider>
    </td>
    <!-- lng -->
    <td class="border-grey-light border hover:bg-gray-100 p-3">
      <span v-if="!editing">
        {{ image3dData.longitude }}
      </span>
      <ValidationProvider v-slot="{ errors }" rules="required" class="" v-else>
        <input
          v-model="newCoords.longitude"
          type="number"
          class="my-input bg-gray-200 w-16 p-0"
        />
        <span class="my-error top-0 right-0" v-if="errors[0]">
          <font-awesome-icon
            icon="question-circle"
            class="text-red-600"
          ></font-awesome-icon>
        </span>
      </ValidationProvider>
    </td>

    <!-- options -->
    <td
      class="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer"
    >
      <font-awesome-icon
        icon="pen"
        class="text-xl mr-4"
        v-if="!editing"
        @click="changeEditingEvent(image3dData.id)"
      ></font-awesome-icon>
      <template v-else>
        <font-awesome-icon
          icon="floppy-disk"
          class="text-2xl mr-4"
          @click="updateImage3dHandler"
        ></font-awesome-icon>
        <font-awesome-icon
          icon="times"
          class="text-2xl"
          @click="cancelEditing"
        ></font-awesome-icon>
      </template>
    </td>
  </tr>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  CustomToast,
  CustomErrorToast,
  CustomConfirmDialog,
} from "@/sweetAlert";
import ProgesBarImageVue from "../../../../../components/ProgesBarImage.vue";

export default {
  components: {
    ProgesBarImageVue,
  },
  props: {
    image3dData: {
      type: Object,
    },
    editing: {
      type: Boolean,
      required: true,
    },
    newCoords: {
      type: Object,
    },
  },
  data() {
    return {
      newImage3dData: null,

      file: null,
      localImage: null,
    };
  },
  methods: {
    ...mapActions("adminPanelStore/locations", ["updateImage3d"]),
    ...mapActions(["uploadImageTofirebase"]),
    changeEditingEvent(idRow) {
      this.$emit("changeEditingClick", idRow);
    },
    cancelEditing() {
      this.$emit("changeEditingClick", null);
      this.newImage3dData = this.image3dData;
    },
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
    async updateImage3dHandler() {
      const { isConfirmed } = await CustomConfirmDialog.fire({
        text: this.$t("admin.image3d.confiramtionMessages.update"),
      });
      if (!isConfirmed) return;

      let newImageUrl;
      if (this.localImage) {
        newImageUrl = await this.uploadImageTofirebase({
          id: `new_image3d_${this.newImage3dData.id}`,
          user: this.user.user.email,
          file: this.file,
          directory: "images3d",
        });
      }

      try {
        await this.updateImage3d({
          imageData: {
            ...this.newImage3dData,
            image: this.localImage ? newImageUrl : this.newImage3dData.image,
            latitude: this.newCoords.latitude,
            longitude: this.newCoords.longitude,
          },
          idImage3d: this.newImage3dData.id,
          locationId: this.getLocationDetails.id,
        });

        CustomToast.fire({
          title: this.$t("sweetAlertMessages.saved"),
          icon: "success",
        });

        this.$emit("changeEditingClick", null);

        this.file = null;
        this.localImage = null;
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message,
        });
      }
    },
  },
  computed: {
    ...mapGetters("authStore", ["user"]),
    ...mapGetters("adminPanelStore/locations", ["getLocationDetails"]),
    ...mapGetters(["imageUrl", "ImageUploadingState"]),
  },
  created() {
    console.log("%cEditingTableRow.vue line:100 created", "color: #007acc;");

    this.newImage3dData = { ...this.image3dData };
  },
};
</script>

<style></style>
