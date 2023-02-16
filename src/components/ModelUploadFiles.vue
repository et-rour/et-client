<template>
  <ModelGlobal
    :showModal="showUploadImagesModal"
    @toogle="toogleShowUploadImagesModal"
  >
    <div class="bg-white w-3/4 h-5/6 p-2 flex flex-col" @click.stop>
      <h2 class="font-semibold text-center my-title">
        {{ $t("admin.reservations.uploadFileHeader") }}
      </h2>
      <vue-dropzone
        ref="myVueDropzone"
        id="dropzone-files"
        :options="dropzoneOptions"
        v-on:vdropzone-sending="sendingEvent"
        class="border-2 border-black border-dashed w-5/6 flex-grow mx-auto "
        @vdropzone-error="erroHandler"
      ></vue-dropzone>
      <div class="w-3/4 flex justify-end items-center mt-6 mx-auto">
        <button
          class="my-btn p-1 w-auto px-6"
          @click="toogleShowUploadImagesModal"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </ModelGlobal>
</template>

<script>
import ModelGlobal from "./ModelGlobal.vue";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { CustomErrorToast } from "@/sweetAlert";
import { mapGetters } from "vuex";
export default {
  components: {
    vueDropzone: vue2Dropzone,
    ModelGlobal,
  },
  props: {
    showUploadImagesModal: {
      type: Boolean,
    },
    route: {
      type: String,
      required: true,
      // /Location/Location_1/Images
    },
    reservation: {
      type: Object,
      required: true,
    },
    buttonText: {
      default: "Close",
    },
  },
  data() {
    return {
      dropzoneOptions: {
        url: `${process.env.VUE_APP_API}/reservation/file/${this.reservation.id}`,
        thumbnailWidth: 150,
        // maxFilesize: 0.5,
      },
    };
  },
  methods: {
    toogleShowUploadImagesModal() {
      this.$emit("toogle");
    },
    sendingEvent(file, xhr, formData) {
      formData.append("route", this.route);
      formData.append("reservation", this.reservation);
    },
    erroHandler(file, message) {
      CustomErrorToast.fire({
        text: message.message,
      });
    },
  },
  computed: {
    ...mapGetters("authStore", ["user"]),
    url() {
      return `Bearer ${this.user.token}`;
    },
  },
  created() {
    this.dropzoneOptions.headers = { authorization: this.url };
    this.dropzoneOptions.dictDefaultMessage = this.$t(
      "adminPanel.locations.imagesList.drop"
    );
  },
  watch: {
    showUploadImagesModal() {
      this.$refs.myVueDropzone.removeAllFiles()
    }
  }

};
</script>

<style></style>
