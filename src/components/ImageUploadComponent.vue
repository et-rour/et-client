<template>
  <div class="h-full w-full flex flex-col gap-3 ">

    <div v-if="showPreviewComponent" class="imageContainer bg-gray-300 flex-grow h-full">
      <img v-if="localImage" :src="localImage" >
      <img v-else-if="imageUploadedUrl" :src="imageUploadedUrl" >
      <img v-else-if="previewImage" :src="previewImage" >
    </div>

    <div class="flex-shrink-0 ">
      <div class="flex justify-between">
        <input
          type="file"
          @change="onImageSelectChange"
          ref="imageSelector"
          class="hidden"
          accept="image/png, image/gif, image/jpeg, image/heic"
        />
        <button 
          class="px-3 py-1 rounded-md bg-white border border-my-blue-primary font-bold text-my-blue-primary"
          @click="$refs.imageSelector.click()"
        >
          <!-- <font-awesome-icon icon="fa-solid fa-images" class="text-2xl block"/> -->
          <span class="truncate overflow-ellipsis">{{$t('general.newImage')}}</span>
        </button>
  
        <button 
          class="px-3 py-1 rounded-md bg-my-blue-primary font-bold text-white"
          :disabled="!canContinue"
          :class="canContinue?'bg-opacity-100':'bg-opacity-70'"
          @click="onClickSaveImage"
        >
          <!-- <font-awesome-icon icon="fa-solid fa-floppy-disk" class="text-2xl block"/> -->
          <span class="truncate overflow-ellipsis">{{$t('general.save')}}</span>
        </button>
      </div>
  
      <div class="flex items-center">
        <progress max="100" :value="ImageUploadingState" class="progress my-4" v-show="isSaving" />
        <font-awesome-icon icon="check" class="text-green-400 ml-2 text-2xl" v-if="ImageUploadingState === 100" />
        <!-- <p>{{ImageUploadingState}}</p> -->
        <!-- <p class="truncate overflow-ellipsis">{{imageUploadedUrl}}</p> -->
        
      </div>
    </div>
  </div>
</template>

<script>
import { CustomErrorToast } from "@/sweetAlert";

import { mapActions, mapGetters } from 'vuex';
export default {
  props:{
    isRelativeDirectory:{ //isRelativeDirectory or isAbsoluteDirectory
      type:Boolean,
      default:true  
    },
    directory:{
      type:String,
      default:"extras"
    },
    showPreviewComponent:{
      type:Boolean,
      default:true
    },
    previewImage:{
      type:String
    }
  },
  data(){
    return{
      imageUploadedUrl:"",
      isSaving:false,
  
      file:null,
      localImage:null,
    }
  },
  methods: {
    ...mapActions(["uploadImageTofirebase"]),
    openImage() {
      window.open(this.imageUrl, "_blank");
    },
    onImageSelectChange(event) {
      const image = event.target.files[0];
      if (!image) {
        this.localImage = null
        this.file = null;
        return;
      }
      this.file = image;
      const fr = new FileReader();
      fr.onload = () => (this.localImage = fr.result);
      fr.readAsDataURL(image);
    },
    async onClickSaveImage(){
      if (!this.localImage) return
      
      this.isSaving = true;
      const finalDirectory = this.isRelativeDirectory?
      `${this.user.user.email}/${this.directory}`
      :
      `${this.directory}`

      try {
        const imageUrl = await this.uploadImageTofirebase({
          file:this.file ,
          directory:finalDirectory
        })
        this.imageUploadedUrl = imageUrl
        this.isSaving = false;
        this.file = null
        this.localImage = null
        this.sendPreview()
      } catch (error) {
        this.isSaving = false;
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    },
    sendPreview(){
      this.$emit("sendPreview",this.imageUploadedUrl)
    },
  },
  computed:{
    ...mapGetters("authStore",["user"]),
    ...mapGetters(["ImageUploadingState"]),
    canContinue(){
      return this.localImage && !this.isSaving
    },
  }
};
</script>

<style scoped>
.imageContainer{
  height: 70%;
}
.imageContainer > img{
  height: 100%;
  margin: 0 auto;
}
</style>
