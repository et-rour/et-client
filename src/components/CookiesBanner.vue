<template>
  <div>
    <div class="fixed left-6 bottom-28 md:bottom-6 md:w-96 w-72 bg-gray-100 shadow-2xl rounded-lg p-4 z-50" v-show="GETTER_SHOW_COOKIES_BANNER">
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
      class="z-40 fixed left-6 bottom-28 md:bottom-6 text-4xl cursor-pointer"
      @click="onClickShowModal"
    ></font-awesome-icon>
  </div>
</template>

<script>
import {
  analytics,
  setAnalyticsCollectionEnabled,
} from "@/Firebase/index";
import { mapGetters, mapMutations } from 'vuex';
export default {
  methods:{
    ...mapMutations(["MUTATION_CHANGE_SHOW_COOKIES_BANNER"]),
    onClickDeclineCookies(){
      this.MUTATION_CHANGE_SHOW_COOKIES_BANNER(false)
      setAnalyticsCollectionEnabled(analytics,false)
    },
    onClickAcceptCookies(){
      this.MUTATION_CHANGE_SHOW_COOKIES_BANNER(false)
      setAnalyticsCollectionEnabled(analytics,true)
    },
    onClickShowModal(){
      this.MUTATION_CHANGE_SHOW_COOKIES_BANNER(true)
    }
  },
  computed:{
    ...mapGetters(["GETTER_SHOW_COOKIES_BANNER"]),
  }
}
</script>

<style>

</style>