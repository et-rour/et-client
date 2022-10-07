<template>
  <div
    class="fixed bottom-0 left-0 w-screen h-24 grid grid-cols-3 md:hidden bg-white z-40"
  >
    <router-link
      :to="{ name: 'owner' }"
      class="flex justify-center flex-col items-center"
    >
      <a>
        <img
          src="@/assets/icons/keys.png"
          alt="Dueños icon"
          class="w-10 h-10 object-contain contain mx-auto"
        />
        <p>Dueños</p>
      </a>
    </router-link>
    <router-link
      :to="{ name: 'tenants' }"
      class="flex justify-center flex-col items-center"
    >
      <a>
        <img
          src="@/assets/icons/user.png"
          alt="Arrendatarios icon"
          class="w-10 h-10 object-contain  mx-auto"
        />
        <p>Arrendatarios</p>
      </a>
    </router-link>
    <router-link
      :to="{ name: 'home' }"
      class="flex justify-center flex-col items-center"
    >
      <a>
        <img
          src="@/assets/icons/aboutUs.png"
          alt="Nosotros icon"
          class="w-10 h-10 object-contain contain mx-auto"
        />
        <p>Comunidad</p>
      </a>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
