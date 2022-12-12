<template>
  <div class="mb-24 w-full">
    <h2 class="text-myheader1 font-bold text-center my-8">{{$t('howItWorks.title')}}</h2>
    <div
      class="my-container rounded-3xl overflow-hidden relative object-contain"
    >
      <img
        src="@/assets/images/how-it-works-2.png"
        alt="Hero image"
        class="w-full h-full object-cover"
      />
    </div>

    <div class=" w-full bg-my-blue-primary py-20 my-20 text-center text-white">
      <h3 class="text-myheader1 font-bold mb-6">{{$t('howItWorks.subtitle')}}</h3>
      <p class="text-2xl mb-4">{{$t('howItWorks.pdfDescription')}}</p>
      
      <button class="my-btn font-bold bg-my-green-primary w-auto px-4 tracking-widest">{{$t('howItWorks.button')}}</button>
    </div>

    <h2 class="text-myheader1 font-bold text-center my-8">{{$t('howItWorks.testimonials')}}</h2>
    
    <Spiner v-if="loadTestimoials" />
    <div class="my-container grid grid-cols-1 md:grid-cols-2 gap-6">
      <div 
        class="" 
        v-for="testimonial in testimonials"
        :key="testimonial.id"
      >
        <iframe width="100%" height="315" class=" rounded-3xl"
          :src="testimonial.video_url">
        </iframe>
        <p class="font-bold text-xl my-3">{{testimonial.name}}</p>
        <p>{{testimonial.position}}</p>
        <p>{{testimonial.location}}</p>
      </div>
    </div>

  </div>
</template>

<script>
import EspacioAPI from "@/Api/index.js"
import { CustomErrorToast } from "@/sweetAlert";
import Spiner from '../../components/Spiner.vue';

export default {
  components: { Spiner },
  data() {
    return {
      loadingTestimonials: true,
      testimonials:[],

    };
  },
  methods:{
    async loadTestimoials(){
      try {
        this.loadTestimoials = true;
        const { data } = await EspacioAPI.get("/testimonial/");
        this.testimonials = data
        this.loadTestimoials = false;
      } catch (error) {
        this.loadTestimoials = false;
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }      
    }
  },
  mounted(){
    this.loadTestimoials()
  },
  metaInfo: {
    title: "¿Como Funciona?",
  },
};
</script>

<style></style>
