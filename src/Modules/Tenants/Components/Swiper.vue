<template>
  <swiper :options="swiperOptions">
    <swiper-slide v-for="image in images" :key="image.id">
      <div class="w-full h-full pb-8">
        <img
          :src="image.image"
          :alt="`image_${image}`"
          class="w-full h-full object-contain rounded-3xl overflow-hidden"
        />
      </div>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>

    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  props: {
    images: {
      required: true,
    },
  },
  components: {
    swiper,
    swiperSlide,
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
            return `<span class="${className} swiper-pagination-bullet-custom"></span>`;
          },
        },
      },
    };
  },
};
</script>

<style>
.swiper-pagination {
  bottom: -5px !important;
}
.swiper-pagination-bullet-custom {
  width: 40px size !important;
  height: 40px size !important;
  text-align: center;
  color: red;
  opacity: 0.7;
  transition: all ease 1s;
  bottom: 2px;
}
</style>
<style scoped>
.swiper-slide {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.swiper-container {
  width: 100%;
}
</style>
