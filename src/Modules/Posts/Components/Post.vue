<template>
  <div class="w-full mb-5">
    <h3 class="my-title font-normal mb-2">{{ post.title }}</h3>
    <img :src="post.image" alt="post image" class="w-full h-72 object-cover" />
    <p class="mb-5 mt-2">“{{ post.description }}”</p>
    <div class="font-medium">
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
