<template>
  <GeneralLayoutVue >
    <template v-slot:sidebar>
      <p class="font-bold text-xl text-center">{{$t('adminPanel.navbar.testimonials')}}</p>
      <Spiner v-if="isLoadingTestimonials" />

      <router-link
        :to="{
          name: 'admin-testimonial-detail',
          params: { id: 'new' },
          hash: '#details',
        }"
        class="my-4 block px-4 py-1"
      >
        <div class="cursor-pointer p-1 bg-my-blue-primary text-white ">
          <span>  {{$t('adminPanel.testimonials.newTestimonial')}} </span> <font-awesome-icon icon="plus" />
        </div>
      </router-link>

      <router-link
        v-for="testimonial in GETTER_GET_TESTIMONIALS"
        :key="testimonial.id"
        :to="{
          name: 'admin-testimonial-detail',
          params: { id: testimonial.id },
          hash: '#details',
        }"
        active-class="active-class-admin py-2 "
      >
        <div class="cursor-pointer p-1 hover:bg-my-blue-primary hover:text-white border-t border-b">
          <span> <span class="font-black">{{testimonial.id}}.- </span> {{ testimonial.name }}</span>
        </div>
      </router-link>
      
    </template>

    <template v-slot:main>
      <p
        v-if="$router.currentRoute.path === '/testimonials'"
        class="my-title text-3xl"
      >
        <font-awesome-icon icon="fa-solid fa-map-location-dot" id="zoneIcon" />
      </p>
      <router-view></router-view>
    </template>
  </GeneralLayoutVue>
</template>

<script>
import GeneralLayoutVue from "../../../Layouts/GeneralLayout.vue";
import { CustomErrorToast } from "@/sweetAlert";
import Spiner from "../../../../../components/Spiner.vue";
import { mapActions, mapGetters } from 'vuex';
export default {
  components: {
    GeneralLayoutVue,
    Spiner
},
  data(){
    return{
      isLoadingTestimonials:false,
    }
  },
  methods:{
    ...mapActions("adminPanelStore/testimonials",["ACTION_GET_TESTIMONIALS"]),
    async loadTestimonials(){
      try {
        this.isLoadingTestimonials = true;
        await this.ACTION_GET_TESTIMONIALS()
        this.isLoadingTestimonials = false;
      } catch (error) {
        this.isLoadingTestimonials = false;
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    }
  },
  computed:{
    ...mapGetters("adminPanelStore/testimonials",["GETTER_GET_TESTIMONIALS"]),
  },
  mounted(){
    this.loadTestimonials();
  }
};
</script>

<style>
#zoneIcon {
  font-size: 192px;
  color: #d3d3d3;
}
</style>
