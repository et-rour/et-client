<template>
  <div class="w-full h-full p-8 overflow-y-scroll">
    <h1 class="text-2xl font-bold">{{$t('adminPanel.navbar.testimonials')}}</h1>
    <Spiner v-if="isLoadingTestimonial"/>

    <div class="flex gap-8 flex-col" v-else>
      <iframe height="315" class="w-full rounded-3xl" v-if="!isNewTestimonial && testimonial.video_url"
        :src="testimonial.video_url">
      </iframe>

      <div class="flex justify-between flex-col">
        <p>{{$t('adminPanel.testimonials.urlVideo')}}</p> 
        <details>
          <summary>Ver ejemplo</summary>
          <div class="flex">
            <a
              href="https://firebasestorage.googleapis.com/v0/b/espacio-temporal-prod.appspot.com/o/extras%2FCaptura%20de%20pantalla%202022-12-12%20002650.png?alt=media&token=8c039c1c-33dc-40bb-a2b6-7b3578e03f12"
              target="_blank"
              rel="noreferrer"
            >
              <img 
                class="w-96 h-52 transition-all" 
                src="https://firebasestorage.googleapis.com/v0/b/espacio-temporal-prod.appspot.com/o/extras%2FCaptura%20de%20pantalla%202022-12-12%20002650.png?alt=media&token=8c039c1c-33dc-40bb-a2b6-7b3578e03f12"
                alt="video example1"
              >
            </a>
            <a
              href="https://firebasestorage.googleapis.com/v0/b/espacio-temporal-prod.appspot.com/o/extras%2FCaptura%20de%20pantalla%202022-12-12%20001426.png?alt=media&token=84f0b0a7-5faf-4afe-9e26-3ff7c37db60d"
              target="_blank"
              rel="noreferrer"
            >
              <img 
                class="w-96 h-52 transition-all" 
                src="https://firebasestorage.googleapis.com/v0/b/espacio-temporal-prod.appspot.com/o/extras%2FCaptura%20de%20pantalla%202022-12-12%20001426.png?alt=media&token=84f0b0a7-5faf-4afe-9e26-3ff7c37db60d" 
                alt="video example"
              >
            </a>
          </div>
        </details>
        <input type="text" class="my-input border" v-model="testimonial.video_url">
      </div>

      <div class="flex justify-between flex-col">
        <p>{{$t('adminPanel.testimonials.name')}}</p>
        <input type="text" class="my-input border" v-model="testimonial.name">
      </div>

      <div class="flex justify-between flex-col">
        <p>{{$t('adminPanel.testimonials.position')}}</p>
        <input type="text" class="my-input border" v-model="testimonial.position">
      </div>

      <div class="flex justify-between flex-col">
        <p>{{$t('adminPanel.testimonials.location')}}</p>
        <input type="text" class="my-input border" v-model="testimonial.location">
      </div>

      <div class=" flex justify-end gap-2">
        <button @click="onClickDelteTestimonial" class="my-btn bg-red-400">
          {{$t('general.delete')}}
        </button>

        <button @click="submit" class="my-btn"
          :disabled="isSaving"
          :class="isSaving&&'my-disabled'"
        >
          <span v-if="isNewTestimonial">{{$t('general.save')}}</span>
          <span v-else>{{$t('general.update')}}</span>
        </button>
      </div>
      
    </div>
  </div>
</template>

<script>
import { CustomToast, CustomErrorToast, CustomConfirmDialog } from "@/sweetAlert";
import Spiner from "../../../../../components/Spiner.vue";
import { mapActions } from 'vuex';

export default {
  components: {Spiner  },
  data(){
    return{
      isLoadingTestimonial:false,
      testimonial:null,
      isSaving:false
    }
  },
  methods:{
    ...mapActions("adminPanelStore/testimonials",["ACTION_GET_TESTIMONIAL_BY_ID","ACTION_POST_TESTIMONIAL","ACTION_PUT_TESTIMONIAL","ACTION_DELETE_TESTIMONIAL"]),
    async loadTestimonials(){
      if (this.isNewTestimonial) {
        this.testimonial = {
          video_url:"",
          name:"",
          position:"",
          location:"",
        }
        return
      }
      try {
        this.isLoadingTestimonial=true;
        const data = await this.ACTION_GET_TESTIMONIAL_BY_ID(this.$route.params.id)
        this.testimonial = data
        this.isLoadingTestimonial=false;
      } catch (error) {
        this.isLoadingTestimonial=false;
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    },
    submit(){
      if (this.isNewTestimonial) {
        this.createTestimonial();
        return
      }
      this.updateTestimonial()
    },
    async createTestimonial(){
      try {
        this.isSaving = true
        const newTestomonial = await this.ACTION_POST_TESTIMONIAL(this.testimonial)
        this.isSaving = false
        this.$router.push({name:'admin-testimonial-detail',params:{id:newTestomonial.id}})
      } catch (error) {
        this.isSaving = false
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    },
    async onClickDelteTestimonial(){
      try {
        const { isConfirmed } = await CustomConfirmDialog.fire({
          text: this.$t("sweetAlertMessages.confirmTitle"),
        });
        if (!isConfirmed) return;
        
        this.isSaving = true
        await this.ACTION_DELETE_TESTIMONIAL(this.testimonial.id)
        this.isSaving = false
        this.$router.push({name:'admin-testimonial'})
      } catch (error) {
        this.isSaving = false
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    },
    async updateTestimonial(){
      try {
        this.isSaving = true
        await this.ACTION_PUT_TESTIMONIAL({
          id:this.$route.params.id,
          testimonial:this.testimonial
        })
        this.isSaving = false
        CustomToast.fire({
          title: this.$t("sweetAlertMessages.saved"),
          icon: "success",
        });
      } catch (error) {
        this.isSaving = false
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    }
  },
  created() {
    this.loadTestimonials();
  },
  computed:{
    isNewTestimonial(){
      return this.$route.params.id === "new"
    }
  },
  watch: {
    $route() {
      this.loadTestimonials()
    }
  }

}
</script>

<style>

</style>