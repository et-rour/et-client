<template>
  <!-- hero -->
  <div class="my-container hero-main mx-auto relative overflow-hidden">
    
    <template v-if="coverData">
      <img
        v-if="localImage"
        class="w-full h-full object-cover rounded-3xl"
        :src="localImage"
        alt="Local image"
      />
      <img
        v-else
        :src="coverData.image"
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
        <div class="w-10/12 lg:w-9/12">
          <div class="absolute top-5 left-5">
            <ProgesBarImage
              :id="idProgressBar"
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
              v-if="localImage && !savingCoverData"
              class="my-btn w-auto px-4 text-center cursor-pointer"
              @click="saveNewCoverImage"
            >
              <font-awesome-icon icon="floppy-disk" />
            </div>
          </div>

          <!-- UPDATE TEXT BUTTONS -->
          <div class="relative">
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
                @click="changeTextToDefault"
              >
                <font-awesome-icon icon="arrow-rotate-left" />
              </div>
              <div
                v-if="editingText && !savingCoverData"
                class="my-btn w-auto px-4 text-center cursor-pointer"
                @click="saveNewCoverText(newText)"
                :disabled="savingCoverData"
                :class="savingCoverData&&'my-disabled'"                
              >
                <font-awesome-icon icon="floppy-disk" />
              </div>
            </div>
            <textarea
              v-if="editingText"
              v-model="newText"
              class="w-full h-40 my-title my-input"
            ></textarea>
          </div>

          <div v-if="!editingText">
            <h1 class="my-title text-2xl md:text-myheader1 text-white mb-3 inline as">
              {{ coverData.text }}
            </h1>
            <slot>
            </slot>
          </div>

        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { CustomErrorToast } from "@/sweetAlert";
import { mapActions, mapGetters } from "vuex";
import ProgesBarImage from "../../../components/ProgesBarImage.vue";
import EspacioTemporalAPI from "@/Api/index";

export default {
  // ids
  // 1 - home page cover 
  // 2 - tenants page cover 
  // 3 - owner page cover 
  props:["id","idProgressBar","specificDirectory","defaultImageUrl","defaultText"],
  components: {
    ProgesBarImage,
  },
  data() {
    return {
      coverData:null,
      
      file: null,
      localImage: null,

      newText: "",
      editingText: false,

      savingCoverData: false,
    };
  },
  methods: {
    ...mapActions([
      "uploadImageTofirebase",
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
      this.savingCoverData = true;

      const dateSaved = new Date().getTime();

      let coverName
      switch (this.id) {
        case 1:
          coverName = "home"
          break;
        case 2:
          coverName = "tenants"
          break;
        default:
          coverName = "owner"
          break;
      }

      try {
        const imageUrl = await this.uploadImageTofirebase({
          id: this.idProgressBar,
          specificDirectory: `${this.specificDirectory}/${coverName}_${dateSaved}`,
          file: this.file,
        });

        await EspacioTemporalAPI.put(`/general/${this.id}/coverImage`,{imageUrl})
        this.$router.go()

      } catch (error) {
        this.savingCoverData = false;
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    },
    
    async changeCoverImageToDefault() {
      try {
        await EspacioTemporalAPI.put(`/general/${this.id}/coverImage`,{ imageUrl: this.defaultImageUrl})
        this.$router.go()

      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    },

    async saveNewCoverText(text) {
      try {
        await EspacioTemporalAPI.put(`/general/${this.id}/text`,{text})
        this.$router.go()

      } catch (error) {
        this.savingCoverData = false;
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    },
    
    async changeTextToDefault() {
      try {
        await EspacioTemporalAPI.put(`/general/${this.id}/text`,{text:this.defaultText})
        this.$router.go()

      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    },
  },
  computed: {
    ...mapGetters(["getHomeCoverData", "imageUrl", "ImageUploadingState"]),
    ...mapGetters("authStore", ["user"]),
  },
  mounted() {
    this.coverData = this.getHomeCoverData(this.id)
  },
};
</script>

<style></style>
