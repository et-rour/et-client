<template>
  <div class="w-full flex flex-col">
    <ValidationObserver v-slot="{ invalid }">
      <form @submit.prevent="createNewRoom" class="flex flex-col gap-2">
        <!-- meters -->
        <div class="flex justify-between">
          <label for="meters">{{
            $t("adminPanel.locations.roomsList.create.meters")
          }}</label>
          <ValidationProvider
            rules="required"
            class="text-right"
            v-slot="{ errors }"
          >
            <input
              type="number"
              class="my-input w-28"
              min="0"
              max="200"
              v-model="squareMeter"
            />
            <span class="block text-red-400">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <!-- name -->
        <div class="flex justify-between">
          <label for="meters">{{
            $t("adminPanel.locations.roomsList.create.name")
          }}</label>
          <ValidationProvider
            rules="required"
            class="text-right w-80"
            v-slot="{ errors }"
          >
            <input type="text" class="my-input w-full" v-model="name" />
            <span class="block text-red-400">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <!-- description -->
        <div class="flex justify-between">
          <label for="description">{{
            $t("adminPanel.locations.roomsList.create.description")
          }}</label>
          <textarea
            name="description"
            v-model="description"
            class="my-input w-80 h-40"
          ></textarea>
        </div>

        <!-- value -->
        <!-- <div class="flex justify-between">
          <div>
            <label for="isIncluded">{{
              $t("adminPanel.locations.roomsList.create.isIncluded")
            }}</label>
            <input
              type="checkbox"
              class="ml-2"
              name="isIncluded"
              v-model="isIncluded"
              checked
            />
          </div>

          <span class="ml-2 block">
            $
            <input
              type="number"
              class="my-input w-28"
              v-model="value"
              :disabled="isIncluded"
              :class="isIncluded ? 'bg-gray-300' : ''"
            />
          </span>
        </div> -->
        <button
          class="my-btn w-24 px-1 py-1 self-end"
          :disabled="isSaving || invalid"
          :class="isSaving || invalid ? 'bg-gray-400' : ''"
        >
          {{ $t("general.save") }}
        </button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { CustomErrorToast, CustomToast } from "@/sweetAlert";
import { ValidationObserver } from "vee-validate";
export default {
  components: {
    ValidationObserver,
  },
  data() {
    return {
      name: "",
      description: "",
      image: "",
      value: 0,
      squareMeter: "",
      isIncluded: true,

      isSaving: false,
      showProgresBar: false,

      localImage: null,
      file: null,
    };
  },
  computed: {
    ...mapGetters(["imageUrl", "ImageUploadingState"]),
    ...mapGetters("adminPanelStore/locations", ["getLocationDetails"]),
    ...mapGetters("authStore", ["user"]),
  },
  methods: {
    ...mapActions(["uploadImageTofirebase"]),
    ...mapActions("adminPanelStore/locations", ["createRoom"]),
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
          description: this.description,
          image: uploadedImage,
          value: this.value,
          squareMeter: this.squareMeter,
          locationId: this.getLocationDetails.id,
        });

        CustomToast.fire({
          title: this.$t("sweetAlertMessages.saved"),
          icon: "success",
        });
        this.name = "";
        this.description = "";
        this.image = "";
        this.isIncluded = true;
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
  watch: {
    isIncluded(isIncludedNewValue) {
      if (isIncludedNewValue) {
        this.value = 0;
      }
    },
  },
};
</script>

<style></style>
