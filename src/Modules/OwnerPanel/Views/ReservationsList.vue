<template>
  <div>
    <spiner v-if="isLoadingReservations"></spiner>

    <div class="flex flex-col" v-else>

      <div v-if="reservationsList.length < 1">
        <h2 class="my-title-2">{{ $t("admin.reservations.notFound") }}</h2>
      </div>

      <template v-else>
        <div class="flex flex-col py-4 gap-4">
          <ReservationCard v-for="reservation in reservationsList" :key="reservation.id" :reservation="reservation"></ReservationCard>
        </div>  
      </template>
    </div>

  </div>
</template>

<script>
import { GET_RESERVATIONS_LIST } from "@/Services/owner_services" 
import { CustomErrorToast } from "@/sweetAlert";
import Spiner from '../../../components/Spiner.vue';
import ReservationCard from '../Components/ReservationCard.vue';
import { mapGetters } from 'vuex';
export default {
  components: { Spiner, ReservationCard },
  data(){
    return {
      isLoadingReservations:false,
      reservationsList:[]
    }
  },
  methods:{
    async fetchReservations(){
      try {

        this.isLoadingReservations = true;
        const reservations = await GET_RESERVATIONS_LIST(this.user.user.id);
        console.log('%cReservationsList.vue line:43 reservations', 'color: white; background-color: #007acc;', reservations);

        const ownerReservations = reservations.ownerReservations.map(reservation => {return {...reservation,isOwnerReservations:true}})
        this.reservationsList = [
          ...reservations.clientReservations,
          ...ownerReservations,
        ];
        this.isLoadingReservations = false

      } catch (error) {
        this.isLoadingReservations = false
        CustomErrorToast.fire({
          text: error.response?.data.message || error,
        });
      }
    }
  },
  computed:{
    ...mapGetters("authStore",["user"])
  },
  mounted(){
    this.fetchReservations()
  }

};
</script>

<style></style>
