<template>
  <div>
    <div
      class="bg-white w-8/12 flex justify-center md:justify-between items-center md:w-8/12 mx-auto h-24"
    >
      <div @click="toogleMovileMenuOpen" class="md:hidden cursor-pointer">
        <font-awesome-icon icon="bars" class="text-3xl" />
      </div>
      <!-- Logo -->
      <div
        class="py-2 flex-grow md:flex-grow-0 flex justify-center cursor-pointer"
        @click="$router.push({ name: 'home' })"
      >
        <img
          class="md:w-48 md:h-10 w-28 h-9"
          src="@/assets/icons/logoHeader.png"
          alt="logo espacio temporal"
        />
      </div>
      <!-- Links -->
      <!-- <div class=" gap-4 items-center font-bold"> -->
      <div
        class="gap-4 items-center font-bold fixed top-0 h-screen w-screen bg-black bg-opacity-80 flex flex-col md:flex-grow md:flex-row md:relative md:h-auto md:top-0 md:justify-end md:bg-opacity-0 md:left-0 z-10 text-white md:text-black transition-all"
        :class="movileMenuClasses"
        @click="toogleMovileMenuOpen"
      >
        <router-link
          class="w-full py-2 text-center md:w-auto uppercase font-sans mt-10 md:mt-0"
          :to="{ name: 'owner' }"
          >{{ $t("navbar.owner") }}</router-link
        >
        <router-link
          class="w-full py-2 text-center md:w-auto uppercase font-sans"
          :to="{ name: 'tenants' }"
          >{{ $t("navbar.tenants") }}</router-link
        >
        <!-- <router-link
          class="w-full py-2 text-center md:w-auto uppercase font-sans"
          to="/"
          >{{ $t("navbar.howWorks") }}</router-link
        > -->
        <router-link
          class="w-full py-2 text-center md:w-auto uppercase font-sans"
          :to="{ name: 'posts' }"
          >{{ $t("navbar.posts") }}</router-link
        >
        <router-link
          v-if="user.user && user.user.isOwner"
          class="w-full py-2 text-center md:w-auto uppercase font-sans"
          :to="{ name: 'locations-list' }"
          >{{ $t("navbar.myProperties") }}</router-link
        >
        <router-link
          v-if="user.user && user.user.isAdmin"
          class="w-full py-2 text-center md:w-auto uppercase font-sans"
          :to="{ name: 'admin' }"
          >{{ $t("navbar.admin") }}</router-link
        >
        <button
          class="my-btn w-20"
          @click="toogleLoginModalOpen"
          v-if="!isAuth"
        >
          {{ $t("navbar.login") }}
        </button>
        <div v-else>
          <font-awesome-icon
            icon="fa-regular fa-user"
            class="cursor-pointer"
            @click="logout"
          ></font-awesome-icon>
        </div>

        <button
          class="my-btn w-20 md:hidden absolute top-2 right-2 bg-gray-400 px-0"
          @click="toogleMovileMenuOpen"
        >
          <font-awesome-icon icon="times" />
        </button>
      </div>
    </div>

    <Login></Login>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import Login from "../Modules/Auth/Views/SharedModal.vue";

export default {
  components: {
    Login,
  },
  data() {
    return {
      movileMenuOpen: false,
    };
  },
  methods: {
    ...mapMutations({
      changeModel: "authStore/changeShowLoginModal",
    }),
    ...mapActions("authStore", ["logout"]),
    toogleLoginModalOpen() {
      this.changeModel(true);
    },
    toogleMovileMenuOpen(e) {
      e.stopPropagation();
      this.movileMenuOpen = !this.movileMenuOpen;
    },
  },
  computed: {
    ...mapGetters("authStore", ["isAuth", "user"]),
    movileMenuClasses() {
      return this.movileMenuOpen ? "left-0" : "right-full";
    },
  },
};
</script>

<style></style>
