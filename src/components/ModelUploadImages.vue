<template>
  <ModelGlobal
    :showModal="showUploadImagesModal"
    @toogle="toogleShowUploadImagesModal"
  >
    <div class="bg-white w-3/4 h-3/4" @click.stop>
      <h2 class="font-semibold text-center my-title">
        {{ $t("adminPanel.locations.imagesList.select") }}
      </h2>
      <vue-dropzone
        ref="myVueDropzone"
        id="dropzone"
        :options="dropzoneOptions"
        v-on:vdropzone-sending="sendingEvent"
        class="border-2 border-black border-dashed w-5/6 h-3/4 mx-auto overflow-y-auto"
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
    },
    id: {
      required: true,
    },
    table: {
      required: true,
      type: String,
    },
    buttonText: {
      default: "Close",
    },
  },
  data() {
    return {
      dropzoneOptions: {
        url: `${process.env.VUE_APP_API}/admin/image/`,
        thumbnailWidth: 150,
        maxFilesize: 0.5,
      },
    };
  },
  methods: {
    toogleShowUploadImagesModal() {
      this.$emit("toogle");
    },
    sendingEvent(file, xhr, formData) {
      // formData.append("image", file);
      formData.append("token", this.user.firebaseToken);
      formData.append("userEmail", this.user.user.email);
      formData.append("route", this.route); // ej: /Location_1/ , /Location_1/Room_1/,  /Publication_1/,
      formData.append("table", this.table);
      formData.append("id", this.id);
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
};
</script>

<style></style>
