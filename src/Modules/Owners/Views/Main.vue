<template>
  <div class="my-container mb-24 md:w-8/12">
    <h1 class="text-center my-title my-4">
      {{ $t("owners.title") }}
    </h1>
    <p>
      {{ $t("owners.subtitle") }}
    </p>
    <div class="w-full my-5 flex flex-col gap-2">
      <div class="flex flex-col md:flex-row justify-between items-center gap-3">
        <div class="w-24 h-24 flex justify-center items-center shrink-0">
          <img
            src="@/assets/icons/thief.png"
            alt="ladron icon"
            class="w-full h-full object-contain"
          />
        </div>
        <p class="text-left flex-grow">
          {{ $t("owners.description_1") }}
        </p>
      </div>
      <div class="flex flex-col md:flex-row justify-between items-center gap-3">
        <div class="w-24 h-24 flex justify-center items-center shrink-0">
          <img
            src="@/assets/icons/house.png"
            alt="ladron icon"
            class="w-full h-full object-contain"
          />
        </div>
        <p class="text-left flex-grow">
          {{ $t("owners.description_2") }}
        </p>
      </div>
      <div class="flex flex-col md:flex-row justify-between items-center gap-3">
        <div class="w-24 h-24 flex justify-center items-center shrink-0">
          <img
            src="@/assets/icons/bed.png"
            alt="ladron icon"
            class="w-full h-full object-contain"
          />
        </div>
        <p class="text-left flex-grow">
          {{ $t("owners.description_3") }}
        </p>
      </div>
    </div>
    <div class="w-full flex justify-center">
      <button
        class="w-11/12 md:w-2/3 bg-blue-700 py-2 rounded-lg border text-white font-bold"
        @click="goToCreateProperty"
      >
        {{ $t("owners.load") }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
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
};
</script>

<style></style>
