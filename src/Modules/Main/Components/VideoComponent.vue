<template>
  <!-- video -->
  <div class="mt-12 mb-24 bg-my-blue-primary text-white py-24">
    <div class="my-container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0">
      <div>
        <h2 class="my-title mb-8">
          {{ $t("landing.video.title") }}
        </h2>
        <p class="text-sm font-extrabold">
          {{ $t("landing.video.question_1") }}
        </p>
        <p class="text-sm font-extralight mb-4">
          {{ $t("landing.video.response_1") }}
        </p>
        <p class="text-sm font-extrabold inline">
          {{ $t("landing.video.question_2") }}
        </p>
        <p class="text-sm font-extralight inline">
          {{ $t("landing.video.response_2") }}
        </p>
      </div>
      <div class="flex justify-center items-center">
        <button
          class="my-btn w-auto font-bold py-2 bg-white px-12 text-my-blue-primary hover:bg-gray-400"
          @click="toogleShowModal"
        >
          {{ $t("landing.video.ver") }}
        </button>
      </div>
    </div>

    <ModelGlobal :showModal="showVideoModal" v-on:toogle="toogleShowModal">
      <div class="w-2/3 h-1/3 md:h-2/3 bg-white" @click.stop>
        <!-- <iframe
          class="w-full h-full"
          src="https://www.youtube.com/embed/u31qwQUeGuM"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe> -->
        <video
          playsinline
          autoplay
          loop
          controls
          :muted="!showVideoModal"
          ref="myVideo"
        >
          <source
            src="https://firebasestorage.googleapis.com/v0/b/espacio-temporal-9a372.appspot.com/o/Espacios%20Temporales.mp4?alt=media&token=7dda93d1-91b9-4e40-a125-67b7911c1908"
            type="video/mp4"
          />
        </video>
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
      this.$refs.myVideo.pause();
      this.showVideoModal = !this.showVideoModal;
    },
  },
};
</script>

<style></style>
