<template>
  <!-- LOGIN MODAL -->
  <div
    v-if="isModalOpen"
    class="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
    @click="toogleLoginModalOpen"
  >
    <div
      class="bg-white my-container w-2/3 px-4 relative"
      @click="stopPropagation"
    >
      <div
        class="absolute top-3 left-3 p-2 cursor-pointer"
        @click="toogleLoginModalOpen"
      >
        <font-awesome-icon
          icon="fa-solid fa-times"
          class="text-2xl"
        ></font-awesome-icon>
      </div>
      <h2 class="my-title-2 my-4 text-center">
        {{ $t("login.welcome") }}
      </h2>
      <div class="h-5/6">
        <!-- login -->
        <Login v-if="showLogin" />
        <!-- register -->
        <Register v-else />

        <div class="w-full flex justify-center my-5">
          <button
            @click="toogleShowLoginForm"
            v-if="showLogin"
            class="underline text-blue-800"
          >
            Go to register
          </button>
          <button
            @click="toogleShowLoginForm"
            v-else
            class="underline text-blue-800"
          >
            Go to login
          </button>
        </div>
      </div>
    </div>

    <!-- succes modal -->
    <div
      class="w-2/3 h-5/6 overflow-hidden absolute text-center"
      v-if="isWelcomeModalOpen"
    >
      <img
        src="@/assets/images/womanStanding.png"
        alt="Hero image"
        class="w-full h-full object-cover"
      />
      <div
        class="bg-black bg-opacity-40 w-full h-full absolute top-0 left-0 flex flex-col items-center justify-end gap-3 py-8"
      >
        <h2 class="my-title-2 text-white m-0 font-normal">
          {{ $t("login.succesModal.title") }}
        </h2>
        <h2 class="my-title-2 text-white m-0 font-normal">
          {{ $t("login.succesModal.subtitle") }}
        </h2>

        <div class="flex gap-2 w-full justify-center px-10" v-if="user">
          <button
            class="my-btn w-3/4 font-normal"
            @click="redirectTo('tenants')"
          >
            {{ $t("login.succesModal.buttonOpcion1") }}
          </button>
          <button
            class="my-btn w-3/4 font-normal"
            @click="redirectTo('locations-list')"
          >
            {{ $t("login.succesModal.buttonOpcion2") }}
          </button>
          <button class="my-btn w-3/4 font-normal" @click="redirectTo('home')">
            {{ $t("login.succesModal.buttonOpcion3") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Register from "./RegisterForm.vue";
import Login from "./LoginForm.vue";

export default {
  components: {
    Register,
    Login,
  },
  data() {
    return {
      showLogin: true,
    };
  },
  methods: {
    ...mapMutations("authStore", ["changeShowLoginModal"]),
    toogleLoginModalOpen() {
      this.changeShowLoginModal(false);
    },
    stopPropagation(e) {
      e.stopPropagation();
    },
    redirectTo(link) {
      this.changeShowLoginModal(false);
      this.$router.push({ name: link });
    },
    toogleShowLoginForm() {
      this.showLogin = !this.showLogin;
    },
  },
  computed: {
    ...mapGetters("authStore", ["isModalOpen", "isWelcomeModalOpen"]),
    ...mapGetters("authStore", ["user"]),
  },
};
</script>

<style></style>
