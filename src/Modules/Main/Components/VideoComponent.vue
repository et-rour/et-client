<template>
  <!-- video -->
  <div class="my-container mt-12 mb-24">
    <h2 class="my-title-2 text-center">
      {{ $t("landing.video.title") }}
    </h2>
    <p class="text-center my-4">
      {{ $t("landing.video.description") }}
    </p>
    <div class="w-full flex justify-center">
      <button class="my-btn w-64 mt-6 text-white" @click="toogleShowModal">
        {{ $t("landing.video.ver") }}
      </button>
    </div>

    <ModelGlobal :showModal="showVideoModal" v-on:toogle="toogleShowModal">
      <div class="w-2/3 h-1/3 md:h-2/3 bg-white">
        <iframe
          class="w-full h-full"
          src="https://www.youtube.com/embed/u31qwQUeGuM"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </ModelGlobal>
  </div>
</template>

<script>
import ModelGlobal from "../../../components/ModelGlobal.vue";
export default {
  components: { ModelGlobal },
  data() {
    return {
      showVideoModal: false,
    };
  },
  methods: {
    toogleShowModal() {
      this.showVideoModal = !this.showVideoModal;
    },
  },
};
</script>

<style></style>
