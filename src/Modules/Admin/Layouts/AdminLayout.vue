<template>
  <div>
    <div
      class="w-full h-48 bg-blue-800 flex justify-center items-center relative"
    >
      <h2 class="text-center text-white font-bold my-subtitle">
        <font-awesome-icon icon="fa-regular fa-user"></font-awesome-icon>
        {{ $t("admin.locations.owner") }}
      </h2>
      <div class="w-full absolute bottom-0 left-0 flex justify-center gap-4">
        <router-link
          :to="{ name: 'locations-list' }"
          class="bg-gray-300 px-1 py-2 rounded-t-lg font-bold"
          >{{ $t("admin.locations.properties") }}</router-link
        >
        <router-link
          :to="{ name: 'locations-payment' }"
          class="bg-gray-300 px-1 py-2 rounded-t-lg font-bold"
          >{{ $t("admin.locations.payment") }}</router-link
        >
      </div>
    </div>
    <div class="my-container mb-40 md:mb-0 mt-3">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.router-link-exact-active {
  background: white;
}
</style>
