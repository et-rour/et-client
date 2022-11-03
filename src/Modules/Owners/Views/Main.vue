<template>
  <div class=" mb-24">
    <CoverImage
      :id="3"
      :idProgressBar="'cover_image_owner'"
      :specificDirectory="'/COVER'"
      :defaultImageUrl="'https://firebasestorage.googleapis.com/v0/b/espacio-temporal-e37f5.appspot.com/o/COVER%2Fpropiedad.png?alt=media&token=83bf1a5f-8e02-4f72-b103-efbace00ae3a'"
      :defaultText="'PUBLICA TU PROPIEDAD CON NOSOTROS'"
      class="mb-8"
    >
        <button
          class="my-btn inline-block bg-white text-my-blue-primary text-xl font-bold"
          @click="goToCreateProperty"
        >
          {{ $t("landing.hero_3.load") }}
        </button>
    </CoverImage>


    <div class="my-container">
      <h1 class="text-center my-title-2 my-4">
        {{ $t("owners.title") }}
      </h1>
      <p class="md:text-center text-left w-10/12 mx-auto">
        {{ $t("owners.subtitle") }}
      </p>

      <div class="w-10/12 my-5 flex flex-col gap-10 mx-auto mt-20">
        <div class="flex flex-row justify-between items-center gap-6">
          <img
            src="@/assets/icons/thief.png"
            alt="ladron icon"
            class="w-20 object-contain"
          />
          <p class="text-left flex-1">
            {{ $t("owners.description_1") }}
          </p>
        </div>

        <div class="flex flex-row justify-between items-center gap-6">
          <img
            src="@/assets/icons/house.png"
            alt="ladron icon"
            class="w-20 object-contain"
          />

          <p class="text-left flex-1">
            {{ $t("owners.description_2") }}
          </p>
        </div>
        <div class="flex flex-row justify-between items-center gap-6">
          <img
            src="@/assets/icons/bed.png"
            alt="ladron icon"
            class="w-20 object-contain"
          />

          <p class="text-left flex-1">
            {{ $t("owners.description_3") }}
          </p>
        </div>
      </div>

      <div class="w-full flex justify-center my-10">
        <button
          class="w-11/12 md:w-auto my-btn px-12 text-white font-bold"
          @click="goToCreateProperty"
        >
          {{ $t("owners.load") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import CoverImage from "../../Main/Components/CoverImage.vue";

export default {
  components:{
    CoverImage
  },
  methods: {
    ...mapMutations("authStore", ["changeShowLoginModal"]),
    goToCreateProperty() {
      console.log(this.isAuth);
      if (this.isAuth) {
        this.$router.push({ name: "property" });
      } else {
        this.changeShowLoginModal(true);
      }
    },
  },
  computed: {
    ...mapGetters("authStore", ["user", "isAuth"]),
  },
  metaInfo: {
    title: "Dueños",
  },
};
</script>

<style></style>
