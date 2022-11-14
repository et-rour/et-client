<template>
  <!-- video -->
  <div class="mt-12 mb-24 bg-my-blue-primary text-white py-12">
    <div class="my-container grid grid-cols-1 lg:grid-cols-12 gap-y-20 lg:gap-x-20 ">
      <div class=" md:col-span-5 ">
        <h2 class="text-4xl font-extralight mb-2 ">
          {{ $t("landing.video.header") }}
        </h2>
        <h3 class="text-5xl font-bold mb-8 uppercase">
          {{ $t("landing.video.title") }}
        </h3>
        
        <video
          class="w-full rounded-3xl "
          playsinline
          controls
        >
          <source
            src="https://firebasestorage.googleapis.com/v0/b/espacio-temporal-9a372.appspot.com/o/Espacios%20Temporales.mp4?alt=media&token=7dda93d1-91b9-4e40-a125-67b7911c1908"
            type="video/mp4"
          />
        </video>

      </div>
      <div class="md:col-span-7 flex justify-center items-center flex-col gap-8">
        <div class=" w-4/5">
          <img src="" class="w-32 h-32 mx-auto">
          <p class="text-sm font-extrabold tracking-wider">
            {{ $t("landing.video.question_1") }}
          </p>
          <p class="text-sm font-extralight">
            {{ $t("landing.video.response_1") }}
          </p>
        </div>
        <div class=" w-4/5">
          <img src="" class="w-32 h-32 mx-auto">
          <p class="text-sm font-extrabold tracking-wider">
            {{ $t("landing.video.question_2") }}
          </p>
          <p class="text-sm font-extralight">
            {{ $t("landing.video.response_2") }}
          </p>
        </div>

      </div>
    </div>

    <!-- <ModelGlobal :showModal="showVideoModal" v-on:toogle="toogleShowModal">
      <div class="w-2/3 h-1/3 md:h-2/3 bg-white relative" @click.stop>
        <iframe
          src="https://www.youtube.com/embed/u31qwQUeGuM"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          ></iframe>
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
    </ModelGlobal> -->
  </div>
</template>

<script>
// import ModelGlobal from "../../../components/ModelGlobal.vue";
export default {
  components: { 
    // ModelGlobal 
  },
  data() {
    return {
      // showVideoModal: false,
    };
  },
  methods: {
    // toogleShowModal() {
    //   this.$refs.myVideo.pause();
    //   this.showVideoModal = !this.showVideoModal;
    // },
  },
};
</script>

<style></style>
