<template>
  <!-- hero -->
  <div class="my-container hero-main mx-auto relative overflow-hidden">
    <SpinerComponent v-if="loadingHomeCoverData" />
    <template v-else-if="getHomeCoverData">
      <img
        v-if="localImage"
        class="w-full h-full object-cover rounded-3xl"
        :src="localImage"
        alt="Local image"
      />
      <img
        v-else
        :src="getHomeCoverData.image"
        alt="Hero image"
        class="w-full h-full object-cover rounded-3xl"
      />

      <!-- MASK -->
      <div
        class="w-full h-full absolute top-0 left-0 flex flex-col justify-end gap-3 py-4 rounded-b-3xl mask"
      ></div>

      <div
        class="w-full h-full absolute top-0 left-0 flex flex-col justify-end items-center pb-16"
      >
        <div class="w-10/12 lg:w-8/12">
          <div class="absolute top-5 left-5">
            <ProgesBarImage
              id="cover_image_home"
              :imageUrl="imageUrl"
              :value="ImageUploadingState"
              class="w-full h-5"
              :showImageLink="false"
            />
          </div>

          <!-- UPJJADTE IMAGE BUTTONS -->
          <div
            v-if="user.user && user.user.isAdmin"
            class="absolute top-5 right-5 gap-4 hidden lg:flex"
          >
            <input
              type="file"
              @change="onSelectedImage"
              ref="imageSelector"
              class="hidden"
            />
            <div
              v-if="!localImage"
              class="my-btn w-auto px-4 text-center cursor-pointer"
              @click="$refs.imageSelector.click()"
            >
              <font-awesome-icon icon="pen" />
            </div>
            <div
              v-else
              class="my-btn w-auto px-4 text-center cursor-pointer"
              @click="localImage = null"
            >
              <font-awesome-icon icon="times" />
            </div>
            <div
              class="my-btn w-auto px-4 text-center cursor-pointer"
              @click="changeCoverImageToDefault"
            >
              <font-awesome-icon icon="arrow-rotate-left" />
            </div>
            <div
              v-if="localImage"
              class="my-btn w-auto px-4 text-center cursor-pointer"
              @click="saveNewCoverImage"
            >
              <font-awesome-icon icon="floppy-disk" />
            </div>
          </div>

          <div class="relative">
            <!-- UPDATE TEXT BUTTONS -->
            <div
              v-if="user.user && user.user.isAdmin"
              class="absolute top-0 -left-16 hidden lg:flex flex-col gap-4"
            >
              <div
                v-if="!editingText"
                class="my-btn w-auto px-4 text-center cursor-pointer"
                @click="editingText = true"
              >
                <font-awesome-icon icon="pen" />
              </div>
              <div
                v-else
                class="my-btn w-auto px-4 text-center cursor-pointer"
                @click="editingText = false"
              >
                <font-awesome-icon icon="times" />
              </div>
              <div
                class="my-btn w-auto px-4 text-center cursor-pointer"
                @click="
                  saveNewCoverText(
                    'BUSCAMOS PROPIEDADES EN DESUSO Y LAS TRANSFORMAMOS EN ESPACIOS DE TRABAJO'
                  )
                "
              >
                <font-awesome-icon icon="arrow-rotate-left" />
              </div>
              <div
                v-if="editingText"
                class="my-btn w-auto px-4 text-center cursor-pointer"
                @click="saveNewCoverText(newText)"
              >
                <font-awesome-icon icon="floppy-disk" />
              </div>
            </div>
            <textarea
              v-if="editingText"
              v-model="newText"
              class="w-full h-40 my-title my-input"
            ></textarea>
            <h1 v-else class="my-title text-white mb-3">
              {{ getHomeCoverData.text }}
            </h1>
          </div>

          <div class="flex gap-8 flex-col sm:flex-row">
            <button
              class="my-btn bg-white w-full md:w-70 text-my-blue-primary"
              @click="$router.push({ name: 'tenants' })"
            >
              {{ $t("landing.hero.searchProperty") }}
            </button>
            <button
              class="my-btn w-full md:w-70 text-white p-2"
              @click="$router.push({ name: 'owner' })"
            >
              {{ $t("landing.hero.openProperty") }}
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { CustomErrorToast, CustomToast } from "@/sweetAlert";
import { mapActions, mapGetters } from "vuex";
import ProgesBarImage from "../../../components/ProgesBarImage.vue";
import SpinerComponent from "../../../components/Spiner.vue";
export default {
  components: {
    ProgesBarImage,
    SpinerComponent,
  },
  data() {
    return {
      file: null,
      localImage: null,
      newText: "",
      editingText: false,

      loadingHomeCoverData: false,
      savingHomeCoverData: false,
    };
  },
  methods: {
    ...mapActions([
      "uploadImageTofirebase",
      "fetchHomeCoverImage",
      "updateHomeCoverImage",
      "updateHomeCoverText",
    ]),
    onSelectedImage(event) {
      // await this.loginInfirebaseStorage(this.user.firebaseToken);
      const image = event.target.files[0];
      if (!image) {
        // this.localImage = null
        this.file = null;
        return;
      }
      this.file = image;
      const fr = new FileReader();
      fr.onload = () => (this.localImage = fr.result);
      fr.readAsDataURL(image);
    },
    async saveNewCoverImage() {
      try {
        this.savingHomeCoverData = true;

        const dateSaved = new Date().getTime();

        const imageUrl = await this.uploadImageTofirebase({
          id: "cover_image_home",
          specificDirectory: `/COVER/home_${dateSaved}`,
          file: this.file,
        });

        await this.updateHomeCoverImage(imageUrl);

        CustomToast.fire({
          title: this.$t("sweetAlertMessages.saved"),
          icon: "success",
        });

        this.file = null;
        this.localImage = null;
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
      this.savingHomeCoverData = false;
    },
    async changeCoverImageToDefault() {
      try {
        await this.updateHomeCoverImage(
          "https://firebasestorage.googleapis.com/v0/b/espacio-temporal-9a372.appspot.com/o/COVER%2Fhome?alt=media&token=bd7582a5-2aae-4087-bfe9-8980a22be593"
        );

        CustomToast.fire({
          title: this.$t("sweetAlertMessages.saved"),
          icon: "success",
        });

        this.file = null;
        this.localImage = null;
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    },
    async saveNewCoverText(text) {
      try {
        await this.updateHomeCoverText(text);

        CustomToast.fire({
          title: this.$t("sweetAlertMessages.saved"),
          icon: "success",
        });
        this.editingText = false;
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
      this.savingHomeCoverData = false;
    },
  },
  computed: {
    ...mapGetters(["getHomeCoverData", "imageUrl", "ImageUploadingState"]),
    ...mapGetters("authStore", ["user"]),
  },
  async mounted() {
    try {
      this.loadingHomeCoverData = true;
      await this.fetchHomeCoverImage();
      this.newText = this.getHomeCoverData.text;
    } catch (error) {
      CustomErrorToast.fire({
        text: error.response.data.message || error,
      });
    }
    this.loadingHomeCoverData = false;
  },
};
</script>

<style></style>
