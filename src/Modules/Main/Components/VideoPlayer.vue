<template>
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
</template>

<script>
import ModelGlobal from '../../../components/ModelGlobal.vue';

export default {
    components: { ModelGlobal },
    data() {
        return {
          showVideoModal: false
        };
    },
    methods: {
        showVideo() {
          console.log('%c Rainbowww!', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113); margin-bottom: 12px; padding: 5%;');
          this.showVideoModal = true,
          this.$refs.myVideo.play();
        },
        toogleShowModal() {
          this.$refs.myVideo.pause();
          this.showVideoModal = !this.showVideoModal;
        }
    },
}
</script>

<style>

</style>