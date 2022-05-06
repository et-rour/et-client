<template>
  <div class="my-container mb-24">
    <div class="h-screen rounded-3xl overflow-hidden relative mb-8">
      <img
        src="@/assets/images/location.png"
        alt="Hero image"
        class="w-full h-full object-cover"
      />

      <!-- MASK -->
      <div
        class="w-full h-full absolute top-0 left-0 flex flex-col justify-end gap-3 py-4 rounded-b-3xl mask"
      ></div>

      <div
        class="w-full h-full absolute top-0 left-0 flex flex-col justify-end items-center pb-16"
      >
        <div class="w-10/12 lg:w-9/12">
          <h1 class="my-title text-white">
            {{ $t("landing.hero_3.title_1") }}
            <br />
            <span class="mr-4">
              {{ $t("landing.hero_3.title_2") }}
            </span>
            <button
              class="my-btn inline-block bg-white text-my-blue-primary text-xl font-bold"
              @click="goToCreateProperty"
            >
              {{ $t("landing.hero_3.load") }}
            </button>
          </h1>
        </div>
      </div>
    </div>

    <div>
      <h1 class="text-center my-title-2 my-4">
        {{ $t("owners.title") }}
      </h1>
      <p class="md:text-center text-left">
        {{ $t("owners.subtitle") }}
      </p>

      <div class="w-full my-5 flex flex-col gap-2">
        <div class="flex flex-row justify-between items-center gap-6">
          <img
            src="@/assets/icons/thief.png"
            alt="ladron icon"
            class="w-40 h-36 object-contain"
          />
          <p class="text-left flex-1">
            {{ $t("owners.description_1") }}
          </p>
        </div>

        <div class="flex flex-row justify-between items-center gap-6">
          <img
            src="@/assets/icons/house.png"
            alt="ladron icon"
            class="w-40 h-36 object-contain"
          />

          <p class="text-left flex-1">
            {{ $t("owners.description_2") }}
          </p>
        </div>
        <div class="flex flex-row justify-between items-center gap-6">
          <img
            src="@/assets/icons/bed.png"
            alt="ladron icon"
            class="w-40 h-36 object-contain"
          />

          <p class="text-left flex-1">
            {{ $t("owners.description_3") }}
          </p>
        </div>
      </div>

      <div class="w-full flex justify-center">
        <button
          class="w-11/12 md:w-2/3 bg-my-blue-primary py-2 rounded-lg border text-white font-bold"
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
