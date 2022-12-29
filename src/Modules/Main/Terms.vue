<template>
  <div class="my-container mb-40 md:mb-0">
    <h2 class="my-title-2 text-center md:text-left mb-8">
      {{ $t("terms.title") }}
    </h2>

    <p class="mb-4">{{ $t("terms.gestsTitle") }}</p>
    <p>{{ $t("terms.gestDescription") }}</p>

    <p class="my-4">{{ $t("terms.airbnbTitle") }}</p>
    <p>{{ $t("terms.airbnbDescription") }}</p>

    <p class="my-8">{{ $t("terms.airbnbDescription2") }}</p>

    <p class="my-8">{{ $t("terms.airbnbDescription3") }}</p>

    <p class="my-8">{{ $t("terms.airbnbDescription4") }}</p>
  </div>
</template>

<script>
export default {
  metaInfo: {title: "Términos y condiciones"},
};

</script>

<style></style>
