<template>
  <div
    class="fixed bottom-0 left-0 w-screen h-24 grid grid-cols-3 md:hidden bg-white"
  >
    <div class="flex justify-center flex-col items-center">
      <img
        src="@/assets/icons/keys.png"
        alt="Dueños icon"
        class="w-10 h-10 object-contain"
      />
      <router-link to="#">Dueños</router-link>
    </div>
    <div class="flex justify-center flex-col items-center">
      <img
        src="@/assets/icons/user.png"
        alt="Arrendatarios icon"
        class="w-10 h-10 object-contain"
      />
      <router-link :to="{ name: 'tenants' }">Arrendatarios</router-link>
    </div>
    <div class="flex justify-center flex-col items-center">
      <img
        src="@/assets/icons/aboutUs.png"
        alt="Nosotros icon"
        class="w-10 h-10 object-contain"
      />
      <router-link to="#">Nosotros</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
