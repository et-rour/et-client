<template>    
  <div class="bg-my-blue-primary w-full relative px-2 py-20 mt-8 text-white my-container-mobile">
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
</template>

<script>
export default {
  metaInfo: {
    title: "Confian en nosotros",
    // title: this.$t("navbar.usOption4"),
  },
};
</script>

<style></style>
