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


    <div class="bg-my-celest py-20">
      <div class="my-container grid grid-cols-1 lg:grid-cols-2 text-white gap-5">
        <div class="">
          <h1 class="text-4xl font-thin">
            {{ $t("owners.header") }}
          </h1>
          <h2 class="text-5xl font-bold uppercase mb-2">
            {{ $t("owners.title") }}
          </h2>

          <p>
            {{ $t("owners.subtitle") }}
          </p>
        </div>

        <div class="actions flex flex-col justify-around items-center">
          <div class="flex flex-row justify-between items-center gap-6">
            <img
              src="@/assets/images/icono1.svg"
              alt="ladron icon"
              class="w-14 object-contain"
            />
            <p class="text-left w-64 font-bold">
              {{ $t("owners.description_1") }}
            </p>
          </div>
    
          <div class="flex flex-row justify-between items-center gap-6">
            <img
              src="@/assets/images/icono2.svg"
              alt="ladron icon"
              class="w-14 object-contain"
            />
    
            <p class="text-left w-64 font-bold">
              {{ $t("owners.description_2") }}
            </p>
          </div>
          
          <div class="flex flex-row justify-between items-center gap-6">
            <img
              src="@/assets/images/icono3.svg"
              alt="ladron icon"
              class="w-14 object-contain"
            />
    
            <p class="text-left w-64 font-bold">
              {{ $t("owners.description_3") }}
            </p>
          </div>

        </div>
      </div>
    </div>

    <div class="w-full flex justify-center my-5">
      <button
        class="w-11/12 md:w-auto my-btn px-12 text-white font-bold bg-my-celest"
        @click="goToCreateProperty"
      >
        {{ $t("owners.load") }}
      </button>
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
