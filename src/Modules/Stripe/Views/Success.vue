<template>
  <div
    class="my-container w-full h-96 flex flex-col justify-center items-center"
  >
    <font-awesome-icon
      icon="check-circle"
      class="text-green-500 text-9xl mb-3"
    ></font-awesome-icon>
    <h1 class="my-title block">{{ $t("tenants.stripe.success.title") }}</h1>
    <p class="my-title-2 block">{{ $t("tenants.stripe.success.subtitle") }}</p>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
