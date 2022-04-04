<template>
  <div
    class="my-container w-full h-96 flex flex-col justify-center items-center"
  >
    <font-awesome-icon
      icon="times-circle"
      class="text-red-500 text-9xl mb-3"
    ></font-awesome-icon>
    <h1 class="my-title block">{{ $t("tenants.stripe.error.title") }}</h1>
    <p class="my-subtitle block">{{ $t("tenants.stripe.error.subtitle") }}</p>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
