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

      <button class="px-2 py-1 border border-gray-400 rounded-md mt-5" @click="getAllFiles">{{ $t('admin.reservations.myFiles')}}</button>
      <Spiner v-if="isLoadingFiles" />
      <div class="gap-3 my-4 grid grid-cols-1 lg:grid-cols-3">

        <div class="flex p-4 border border-gray-200 shadow-sm" v-for="(file,index) in files" :key="`file_${index}`">
          
          <div class="w-20 h-14 flex-shrink-0 border border-gray-300">
            <a :href="file.src" class="cursor-pointer" target="_blank" v-if="file.type==='pdf'">
              <div class="w-full h-full flex justify-center items-center text-4xl" ><font-awesome-icon icon="fa-regular fa-file-pdf" /></div>
            </a>
            <a :href="file.src" class="cursor-pointer" target="_blank" v-else>
              <img :src="file.src" :alt="`file_id_${index}`" class="w-full h-full object-cover" >
            </a>
          </div>

          <div class="ml-3 flex-1 w-24">
            <p class="text-sm text-gray-600 truncate">{{ file.name }}</p>
            <button class="my-btn mt-2 py-0 px-2 text-sm rounded-sm w-auto bg-red-500" @click="onClickDeltefile(file)">{{ $t("general.delete") }}</button>
          </div>
        </div>
        
      </div>
      <!-- <pre>{{ JSON.stringify(files,null,'\t') }}</pre> -->
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
import { storage, listAll, ref, getDownloadURL, deleteObject } from '../../../Firebase';
import { CustomErrorToast } from "@/sweetAlert";
import Spiner from '../../../components/Spiner.vue';

export default {
    components: { MomentComponent, ModelUploadFiles, Spiner },
    props: ["reservation"],
    data(){
      return{
        showUploadImagesModal:false,

        isLoadingFiles:false,
        files:[],
      }
    },
    methods:{
      async getAllFiles(){
        const listRef = ref(storage, `Reservations/Reservation_${this.reservation.id}`);
        this.files = [];
        const filesUrls = [];
        this.isLoadingFiles = true;
        try {
          const allItemsRefs = await listAll(listRef)
          allItemsRefs.items.forEach(async (itemRef) => {
            const downloadURL = await getDownloadURL(itemRef);
            const fileName = itemRef._location.path_.split("/").pop()
            const typeFile = fileName.split(".").pop()
            filesUrls.push({
              type:typeFile,
              name:fileName,
              src:downloadURL,
              itemRef
            });
          });
          this.files = filesUrls;
          this.isLoadingFiles = false;       
        } catch (error) {
          this.isLoadingFiles = false;
          CustomErrorToast.fire({
            text: error.response.data.message || error,
          });
        }
      },
      async onClickDeltefile({itemRef}){
        try {
          await deleteObject(itemRef);
          this.getAllFiles()
        } catch (error) {
          CustomErrorToast.fire({
            text: error.response?.data.message || error,
          });
        }
      }
    }
}
</script>

<style>

</style>