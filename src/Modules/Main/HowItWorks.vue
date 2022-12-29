<template>
  <div class="w-full my-container-mobile">
    <div class=" w-full bg-my-blue-primary py-20 text-center text-white">
      <h3 class="text-myheader1 font-bold mb-6">{{$t('howItWorks.subtitle')}}</h3>
      <p class="text-2xl mb-4">{{$t('howItWorks.pdfDescription')}}</p>
      
      <a class="my-btn font-bold bg-my-green-primary w-auto px-4 mt-4 tracking-widest inline-block" 
        href="https://firebasestorage.googleapis.com/v0/b/espacio-temporal-prod.appspot.com/o/extras%2FCasos%20de%20Exito%20-%20Espacio%20Temporal.pdf?alt=media&token=45c6f541-4d4e-41d7-a630-0e9d296ffdea"
        target="_blank"
      >{{$t('howItWorks.button')}}</a>
    </div>

    <h2 class="text-myheader1 font-bold text-center my-8">{{$t('howItWorks.testimonials')}}</h2>
    
    <Spiner v-if="isLoadingTestimonials" />
    <div class="my-container grid grid-cols-1 md:grid-cols-2 gap-6">
      <div  
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
      isLoadingTestimonials: true,
      testimonials:[],

    };
  },
  methods:{
    async loadTestimoials(){
      try {
        this.isLoadingTestimonials = true;
        const { data } = await EspacioAPI.get("/testimonial/");
        this.testimonials = data
        this.isLoadingTestimonials = false;
      } catch (error) {
        this.isLoadingTestimonials = false;
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
    title: "Casos de exito",
  },
};
</script>

<style></style>
