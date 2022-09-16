<template>
  <div class="w-full flex flex-col justify-between">
    <div class="font-semibold mb-4">
      <h3 class="text-xl font-extrabold mb-2">{{ post.title }}</h3>

      <div class="w-full rounded-3xl overflow-hidden">
        <Swiper
          v-if="post.imagesPublication && post.imagesPublication.length > 0"
          :images="post.imagesPublication"
          class="h-52 w-full"
        ></Swiper>

        <div v-else class="h-52 w-full pb-4">
          <div class="w-full h-full rounded-3xl overflow-hidden">
            <img
              src="@/assets/images/OrgEspacioTemporal.jpeg"
              alt="default bussines"
              class="w-full h-full object-cover rounded-3xl overflow-hidden"
            />
          </div>
        </div>
      </div>
      <p class="mb-5 mt-1 text-sm">{{ post.description }}</p>
      <div class="text-sm">
        <p>
          {{ post.user.firstName }}, {{ $t("posts.creator") }} {{ post.title }}
        </p>
        <a class="block" :href="post.webSite" target="_blank">{{
          webSiteFormat
        }}</a>
        <a class="block" :href="post.instagram" target="_blank">{{
          instagramFormat
        }}</a>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import Swiper from "../../Tenants/Components/Swiper.vue";
export default {
  components: { Swiper },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    webSiteFormat() {
      const indexWWW = this.post.webSite.indexOf("www");
      return this.post.webSite.substring(indexWWW, this.post.webSite.lenght);
    },
    instagramFormat() {
      const indexWWW = this.post.instagram.indexOf("www");
      return this.post.instagram.substring(
        indexWWW,
        this.post.instagram.lenght
      );
    },
  },
};
</script>

<style></style>
