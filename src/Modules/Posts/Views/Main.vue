<template>
  <div class="mb-36 md:mb-5">
    <!-- hero -->
    <div
      class="w-11/12 md:w-10/12 mx-auto h-screen rounded-3xl overflow-hidden relative"
    >
      <img
        src="@/assets/images/Bartalent.jpg"
        alt="Hero image"
        class="w-full h-full object-cover"
      />
      <div
        class="bg-black bg-opacity-20 w-full h-full px-4 absolute top-0 left-0 flex flex-col justify-end gap-3 py-4 rounded-3xl overflow-hidden"
      >
        <h1 class="my-title text-white">
          {{ $t("posts.title") }}
        </h1>
        <div class="flex gap-2 flex-wrap">
          <button
            class="bg-white w-64 py-2 rounded-md font-bold text-blue-600"
            @click="toogleshowCreatePostModal"
          >
            {{ $t("posts.post") }}
          </button>
        </div>
      </div>
    </div>

    <!-- POSTS -->
    <Spiner v-if="isLoading"></Spiner>
    <div class="my-container flex flex-col">
      <Post v-for="post in postList" :key="post.id" :post="post" />
    </div>

    <CreatePost :showModal="showCreatePostModal" />
  </div>
</template>

<script>
import CreatePost from "../Components/CreatePost.vue";
import Post from "../Components/Post.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import Spiner from "../../../components/Spiner.vue";

export default {
  components: { Post, CreatePost, Spiner },
  data() {
    return {
      showCreatePostModal: false,
    };
  },
  methods: {
    ...mapActions("postsStore", ["loadPosts"]),
    ...mapMutations("authStore", ["changeShowLoginModal"]),
    toogleshowCreatePostModal() {
      if (this.isAuth) {
        this.showCreatePostModal = !this.showCreatePostModal;
      } else {
        this.changeShowLoginModal(true);
      }
    },
  },
  computed: {
    ...mapGetters("postsStore", ["postList", "isLoading"]),
    ...mapGetters("authStore", ["isAuth"]),
  },
  created() {
    this.$root.$on("close", () => {
      this.showCreatePostModal = false;
    });
  },
  mounted() {
    this.loadPosts();
  },
};
</script>

<style></style>
