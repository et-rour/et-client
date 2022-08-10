<template>
  <div class="w-full flex flex-col justify-between">
    <div class="font-semibold mb-4">
      <h3 class="text-xl font-extrabold mb-2">{{ post.title }}</h3>
      <div class="h-48 w-full bg-blue-400 rounded-3xl overflow-hidden">
        <img
          :src="post.image"
          alt="post image"
          class="w-full h-full object-cover"
        />
      </div>
      <p class="mb-5 mt-3 text-sm">{{ post.description }}</p>
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
export default {
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
