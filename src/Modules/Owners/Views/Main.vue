<template>
  <div class="my-container-mobile">
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


    <div class="bg-my-blue-primary py-20">
      <div class="my-container grid grid-cols-1 lg:grid-cols-2 text-white gap-5">
        <div class="">
          <h2 class="text-4xl font-thin">
            {{ $t("owners.header") }}
          </h2>
          <h2 class="text-5xl font-bold uppercase mb-4">
            {{ $t("owners.title") }}
          </h2>

          <p class="font-bold">
            {{ $t("owners.subtitle") }}
          </p>
          <p>
            {{ $t("owners.subtitle_2") }}
          </p>
        </div>

        <div class="actions flex flex-col justify-around items-center">
          <div class="flex flex-row justify-between items-center gap-6">
            <img
              src="@/assets/icons/white_thief.png"
              alt="ladron icon"
              class="w-14 object-contain"
            />
            <p class="text-left w-64 font-bold">
              {{ $t("owners.description_1") }}
            </p>
          </div>
    
          <div class="flex flex-row justify-between items-center gap-6">
            <img
              src="@/assets/icons/white_house.png"
              alt="ladron icon"
              class="w-14 object-contain"
            />
    
            <p class="text-left w-64 font-bold">
              {{ $t("owners.description_2") }}
            </p>
          </div>
          
          <div class="flex flex-row justify-between items-center gap-6">
            <img
              src="@/assets/icons/white_bed.png"
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
        class="w-11/12 md:w-auto my-btn px-12 text-white font-bold bg-my-blue-primary"
        @click="goToCreateProperty"
      >
        {{ $t("owners.load") }}
      </button>
    </div>

    <div class="bg-my-blue-primary w-full relative px-2 py-20 mt-8 text-white">
      <div class="my-container grid grid-cols-12">
        <div class="col-span-12 lg:col-span-6">
          <h2 class="text-3xl md:text-5xl font-bold mb-6 uppercase">{{ $t("landing.details.title") }}</h2>
          <p class="mb-4">
            {{ $t("landing.details.description") }}
          </p>
        </div>

        <div
          class="col-span-12 lg:col-span-6 grid grid-cols-1 md:grid-cols-2"
        >
          <div class="w-full h-full flex justify-center">
            <img
              src="@/assets/images/Grupo.svg"
              alt="icon"
              class="h-24 w-24 object-contain"
            />
          </div>
          <div class="w-full h-full flex justify-center">
            <img
              src="@/assets/images/Idesa.svg"
              alt="icon"
              class="h-24 w-24 object-contain"
            />
          </div>
          <div class="w-full h-full flex justify-center">
            <img
              src="@/assets/images/Indumotora.svg"
              alt="icon"
              class="h-24 w-24 object-contain"
            />
          </div>
          <div class="w-full h-full flex justify-center">
            <img
              src="@/assets/images/Tarragona.svg"
              alt="icon"
              class="h-24 w-24 object-contain"
            />
          </div>
          <div class="w-full h-full flex justify-center">
            <img
              src="@/assets/images/Conquista.svg"
              alt="icon"
              class="h-24 w-24 object-contain"
            />
          </div>
          <div class="w-full h-full flex justify-center">
            <img
              src="@/assets/images/Numancia.svg"
              alt="icon"
              class="h-24 w-24 object-contain"
            />
          </div>
        </div>
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
