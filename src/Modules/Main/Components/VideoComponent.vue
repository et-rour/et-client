<template>
  <!-- video -->
  <div class="mt-12 mb-24 bg-my-blue-primary text-white py-20">
    <div class="my-container">
      <h2 class="text-4xl text-center font-extralight mb-2">
        {{ $t("landing.video.header") }}
      </h2>
      <h3 class="text-5xl text-center font-bold mb-8 uppercase">
        {{ $t("landing.video.title") }}
      </h3>  

      <button class="my-btn bg-white text-my-blue-primary font-bold px-4 py-2 w-auto mx-auto block" @click="(showVideoModal=true)">
        ▶ {{$t('landing.video.ver')}}
      </button>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-40 gap-y-10">
          <div class="">
            <img src="@/assets/icons/comercial.svg" class="w-40 h-40 object-contain mx-auto">
            <p class="text-3xl font-extrabold ">
              {{ $t("landing.video.question_1") }}
            </p>
            <p class="font-extralight">
              {{ $t("landing.video.response_1") }}
            </p>
          </div>
          <div class="">
            <img src="@/assets/icons/emprendedores.svg" class="w-40 h-40 object-contain mx-auto">
            <p class="text-3xl font-extrabold ">
              {{ $t("landing.video.question_2") }}
            </p>
            <p class="font-extralight">
              {{ $t("landing.video.response_2") }}
            </p>
          </div>  
      </div>
    </div>

    <ModelGlobal :showModal="showVideoModal" v-on:toogle="toogleShowModal">
      <div class="w-2/3 h-1/3 md:h-2/3 bg-white relative" @click.stop>
        <video
          class="w-full h-full"
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
        <div
          class="w-10 h-10 bg-gray-300 shadow-2xl absolute top-0 -right-14 flex justify-center items-center cursor-pointer my-btn rounded-sm"
          @click="showVideoModal = false"
        >
          <font-awesome-icon icon="times" class="text-black text-4xl" />
        </div>
      </div>
    </ModelGlobal>
  </div>
</template>

<script>
import ModelGlobal from "../../../components/ModelGlobal.vue";
export default {
  components: { 
    ModelGlobal 
  },
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
