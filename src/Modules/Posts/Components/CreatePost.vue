<template>
  <ModelGlobal :showModal="showModal" v-on:toogle="closeModal">
    <div
      @click.stop
      v-if="!successCreatingPost"
      class="bg-white w-3/4 md:w-6/12 h-5/6 text-center px-4 py-4 overflow-y-auto relative z-40"
    >
      <h3 class="mb-4 my-title font-normal">
        {{ $t("posts.createPost.title") }}
      </h3>
      <p>{{ $t("posts.createPost.description") }}</p>
      <ValidationObserver v-slot="{ handleSubmit, invalid }">
        <form @submit.prevent="handleSubmit(onSubmitNewPost)">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="relative"
          >
            <input
              v-model="name"
              type="text"
              :placeholder="$t('posts.createPost.name')"
              class="my-input border border-gray-500 w-full py-3 rounded-none border-b-0"
            />
            <span class="my-error">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" class="relative">
            <input
              v-model="site"
              type="text"
              :placeholder="$t('posts.createPost.site')"
              class="my-input border border-gray-500 w-full py-3 rounded-none border-b-0"
            />
            <span class="my-error">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" class="relative">
            <input
              v-model="instagram"
              type="text"
              :placeholder="$t('posts.createPost.social')"
              class="my-input border border-gray-500 w-full py-3 rounded-none border-b-0"
            />
            <span class="my-error">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            class="relative"
          >
            <textarea
              v-model="review"
              type="text"
              :placeholder="$t('posts.createPost.review')"
              class="my-input border border-gray-500 w-full py-3 rounded-none h-24"
            ></textarea>
            <span class="my-error relative top-0 left-0">{{ errors[0] }}</span>
          </ValidationProvider>

          <input
            type="file"
            @change="uploadPostImage"
            class="hidden"
            ref="postImageSelector"
          />
          <div
            @click="$refs.postImageSelector.click()"
            class="my-btn w-full rounded-none py-4 mb-3 bg-red-600 cursor-pointer relative z-40"
          >
            {{ $t("posts.createPost.addImage") }}
            <ProgesBarVue
              :value="postImageUploadingState"
              :imageUrl="postImage"
              class="absolute right-5 top-5"
            />
          </div>
          <button
            :disabled="invalid"
            type="submit"
            class="my-btn w-full rounded-none py-4"
            :class="
              !invalid ? 'bg-my-blue-primary' : 'bg-gray-400 cursor-not-allowed'
            "
          >
            {{ $t("posts.createPost.post") }}
          </button>
        </form>
      </ValidationObserver>

      <!-- Close icon -->
      <div
        class="w-7 h-7 bg-gray-300 absolute top-0 right-0 flex justify-center items-center cursor-pointer"
        @click="closeModal"
      >
        <font-awesome-icon icon="times" class="text-2xl" />
      </div>
    </div>

    <!-- success modal -->
    <div
      v-else
      class="bg-white w-3/4 md:w-6/12 h-5/6 text-center px-4 py-4 overflow-y-auto relative flex justify-center items-center"
    >
      <div>
        <font-awesome-icon
          icon="circle-check"
          class="text-9xl text-green-400 mb-3"
        ></font-awesome-icon>
        <p class="font-bold">{{ $t("posts.createPost.success") }}</p>
      </div>
      <div
        class="w-7 h-7 bg-gray-300 absolute top-0 right-0 flex justify-center items-center cursor-pointer"
        @click="closeModal"
      >
        <font-awesome-icon icon="times" class="text-2xl" />
      </div>
    </div>
  </ModelGlobal>
</template>

<script>
import ModelGlobal from "../../../components/ModelGlobal.vue";
import { ValidationObserver } from "vee-validate";
import { mapActions, mapGetters, mapMutations } from "vuex";
import ProgesBarVue from "../../../components/ProgesBarImage.vue";
import { CustomErrorToast } from "@/sweetAlert";

export default {
  components: {
    ModelGlobal,
    ValidationObserver,
    ProgesBarVue,
  },
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      name: "",
      site: "",
      instagram: "",
      review: "",

      file: null,
      successCreatingPost: false,
    };
  },
  methods: {
    ...mapActions("postsStore", ["createNewPost", "uploadfile"]),
    ...mapMutations("postsStore", ["cleanImageInfo"]),
    closeModal() {
      this.successCreatingPost = false;
      this.name = "";
      this.review = "";
      this.site = "";
      this.instagram = "";
      this.cleanImageInfo();
      this.$root.$emit("close");
    },
    async onSubmitNewPost() {
      const postData = {
        title: this.name,
        description: this.review,
        user: this.user.user.id,
        image: this.postImage,
        webSite: this.site,
        instagram: this.instagram,
      };
      try {
        await this.createNewPost(postData);

        this.successCreatingPost = true;
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message,
        });
      }
    },
    async uploadPostImage(event) {
      const image = event.target.files[0];
      if (!image) {
        return;
      }

      try {
        this.uploadfile({ user: this.user.user.email, file: image });
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message,
        });
      }
    },
  },
  computed: {
    ...mapGetters("authStore", ["user"]),
    ...mapGetters("postsStore", ["postImage", "postImageUploadingState"]),
  },
};
</script>

<style></style>
