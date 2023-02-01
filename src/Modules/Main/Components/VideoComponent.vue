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

      <button class="my-btn bg-white text-my-blue-primary font-bold px-4 py-2 w-auto mx-auto block" @click="onClickShowVideo">
        ▶ {{$t('landing.video.ver')}}
      </button>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-40 gap-y-10 ">
          <div class="">
            <img src="@/assets/icons/comercial.svg" class="w-40 h-40 object-contain mx-auto" alt="comercial alt">
            <p class="text-3xl font-extrabold text-center ">
              {{ $t("landing.video.question_1") }}
            </p>
            <p class="font-extralight text-center">
              {{ $t("landing.video.response_1") }}
            </p>
          </div>
          <div class="">
            <img src="@/assets/icons/emprendedores.svg" class="w-40 h-40 object-contain mx-auto" alt="emprendedores alt">
            <p class="text-3xl font-extrabold text-center">
              {{ $t("landing.video.question_2") }}
            </p>
            <p class="font-extralight text-center">
              {{ $t("landing.video.response_2") }}
            </p>
          </div>  
      </div>
    </div>
    <VideoPlayer ref="VideoPlayer" />
  </div>
</template>

<script>
import VideoPlayer from './VideoPlayer.vue';
export default {
  components: { VideoPlayer },
  methods:{
    onClickShowVideo(){
      this.$refs.VideoPlayer.showVideo()
    }
  }
};
</script>

<style></style>
