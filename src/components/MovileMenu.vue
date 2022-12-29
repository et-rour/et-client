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
        <p class="text-center text-xs font-semibold">{{$t('navbar.owner')}}</p>
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
        <p class="text-center text-xs font-semibold">{{$t('navbar.tenants')}}</p>
        
      </a>
    </router-link>
    <div
      :to="{ name: 'home' }"
      class="flex justify-center flex-col items-center group relative"
    >
      <img
        src="@/assets/icons/aboutUs.png"
        alt="Nosotros icon"
        class="w-10 h-10 object-contain contain mx-auto"
      />
      <p class="text-center text-xs font-semibold">{{$t('navbar.us')}}</p>

      <div class="flex flex-col gap-4 absolute w-48 -top-44 right-2 text-center bg-white md:bg-gray-100 md:text-black shadow-xl invisible group-hover:visible  h-0 group-hover:h-44 overflow-hidden  transition-all ease-in duration-500 ">
        <router-link
          class=" hover:text-my-blue-primary mt-4"
          :to="{ name: 'what-we-do' }"
          ><a> {{ $t("navbar.usOption1") }} </a></router-link
        >
        <router-link
          class=" hover:text-my-blue-primary "
          :to="{ name: 'team' }"
          ><a> {{ $t("navbar.usOption2") }} </a></router-link
        >
        <router-link
          class=" hover:text-my-blue-primary "
          :to="{ name: 'how-it-works' }"
          ><a> {{ $t("navbar.usOption3") }} </a></router-link
        >
        <router-link
          class=" hover:text-my-blue-primary "
          :to="{ name: 'trust-us' }"
          ><a> {{ $t("navbar.usOption4") }} </a></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
