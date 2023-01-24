<template>
  <div>
    <div class="fixed left-6 bottom-6 w-96 h-40 bg-gray-100 shadow-2xl rounded-lg p-4 z-50" v-show="showCookiesModal">
      <p>
        {{ $t("cookies.banner.text") }}
        <router-link class="text-my-blue-primary underline" :to="{ name:'privacy' }">{{ $t("cookies.banner.link") }}</router-link>
      </p>
      <div class=" flex gap-3 mt-4 justify-end ">
        <button @click="onClickDeclineCookies" class="py-1 px-3 rounded-md font-bold">{{ $t("cookies.banner.decline") }}</button>
        <button @click="onClickAcceptCookies" class="bg-my-blue-primary py-1 px-3 rounded-md font-bold text-white ">{{ $t("cookies.banner.acept") }}</button>
      </div>
    </div>
    
    <font-awesome-icon
      icon="fa-solid fa-gear"
      class="z-40 fixed left-6 bottom-6 text-5xl cursor-pointer"
      @click="showCookiesModal=true"
    ></font-awesome-icon>
  </div>
</template>

<script>
import {
  analytics,
  setAnalyticsCollectionEnabled,
} from "@/Firebase/index";
export default {
  data(){
    return {
      showCookiesModal:true
    }
  },
  methods:{
    onClickDeclineCookies(){
      setAnalyticsCollectionEnabled(analytics,false)
      this.showCookiesModal = false
    },
    onClickAcceptCookies(){
      setAnalyticsCollectionEnabled(analytics,true)
      this.showCookiesModal = false
    }
  }
}
</script>

<style>

</style>