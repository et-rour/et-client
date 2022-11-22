<template>
  <ModelGlobal :showModal="showModal" @toogle="toogleShowModal" >
    <div class="w-full h-full bg-white relative flex justify-center items-center " @click.stop>

      <swiper 
        :options="swiperOptions"
        class="w-11/12" 
      >
        <swiper-slide v-for="image in images" :key="image.id" class="w-full h-screen ">
          <div class="swiper-zoom-container">
            <img
              :src="image.image"
              :alt="`image_${image}`"
              class="w-full h-4/5 object-contain"
            />
          </div>
        </swiper-slide>
        
        <!-- controls -->
        <template>
          <div class="swiper-pagination swiper-pagination-modal" slot="pagination"></div>
      
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </template>

      </swiper>
      
      <button
        class=" px-2 h-10 absolute top-0 left-6 z-50 flex items-center gap-2 font-bold"
        @click="toogleShowModal"
      >
        <font-awesome-icon icon="times"></font-awesome-icon> Cerrar
      </button>
    </div>
  </ModelGlobal>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import ModelGlobal from '../../../components/ModelGlobal.vue';
export default {
  props: {
    images: {
      required: true,
    },
    showModal:{
      type: Boolean
    }
  },
  components: {
    swiper,
    swiperSlide,
    ModelGlobal
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          renderBullet(index, className) {
            return `<span class="${className} swiper-pagination-bullet-custom-modal"></span>`;
          },
        },
        zoom: {
          maxRatio: 5,
        },
        // allowTouchMove:false,

      },
    };
  },
  methods:{
    toogleShowModal(){
      this.$emit("toogle")
    }
  }
};
</script>

<style >
.swiper-zoom-container {
  /* background: blue; */
  
}
.swiper-container .swiper-pagination-modal {
  bottom: 35px !important;
}
</style>
