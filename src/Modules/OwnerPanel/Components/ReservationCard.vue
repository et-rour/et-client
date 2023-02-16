<template>
<article class="rounded-xl border-2 border-gray-100 bg-white">
  <div class="flex items-start p-6">
    
    <div class="ml-4">
      <h3 class="font-medium sm:text-lg">
        {{ reservation.location.name }}
      </h3>

      <p class="text-sm text-gray-700 line-clamp-2">
        {{ reservation.location.description }}
      </p>

      <div class="mt-2 sm:flex sm:items-center sm:gap-2">
        <div class="flex items-center text-gray-500">
          <font-awesome-icon icon="fa-solid fa-dollar-sign" class="" />
          <p class="ml-1 text-xs">{{ reservation.price }}</p>
        </div>

        <span class="hidden sm:block" aria-hidden="true">&middot;</span>

        <p class="hidden sm:block sm:text-xs sm:text-gray-500">
          Dueño
          <span href="#" class="font-medium underline hover:text-gray-700">
            {{ reservation.owner.firstName }} {{ reservation.owner.lastName }}
          </span>
        </p>
      </div>
    </div>
  </div>

  <div class="flex justify-between">
    <button
      class="inline-flex items-center gap-2 rounded-tr-xl rounded-bl-xl bg-my-blue-primary py-1.5 px-3 text-white"
      @click="showUploadImagesModal=true"
    >
      <font-awesome-icon icon="fa-regular fa-file" />
      <p class="font-medium sm:text-xs">
        {{ $t('general.uploadFile') }}
      </p>
    </button>
    
    <strong
      class="inline-flex items-center gap-1 rounded-tl-xl rounded-br-xl bg-green-600 py-1.5 px-3 text-white"
    >

      <font-awesome-icon icon="fa-regular fa-calendar-days" />
      <p class="font-medium sm:text-xs">
        <MomentComponent :date="reservation.start" />
        <span aria-hidden="true">&middot;</span>
        <MomentComponent :date="reservation.end" />
      </p>
    </strong>
    
    <ModelUploadFiles 
      :showUploadImagesModal="showUploadImagesModal"
      @toogle="showUploadImagesModal = !showUploadImagesModal"
      :route="`Reservations/Reservation_${reservation.id}/`"
      :reservation="reservation"
    />
  </div>
</article>

</template>

<script>
import ModelUploadFiles from '../../../components/ModelUploadFiles.vue';
import MomentComponent from '../../../components/MomentComponent.vue';

export default {
    components: { MomentComponent, ModelUploadFiles },
    props: ["reservation"],
    data(){
      return{
        showUploadImagesModal:false,
        
      }
    },
}
</script>

<style>

</style>