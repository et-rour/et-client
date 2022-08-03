<template>
  <ModelGlobal :showModal="isModalOpen" v-on:toogle="toogleLoginModalOpen">
    <!-- succes modal -->
    <div
      v-if="isWelcomeModalOpen"
      class="w-10/12 md:w-5/12 lg:w-4/12 h-5/6 overflow-hidden absolute text-center"
      @click.stop
    >
      <img
        src="@/assets/images/womanStanding.png"
        alt="Hero image"
        class="w-full h-full object-cover"
      />
      <div
        class="w-full h-full absolute top-0 left-0 flex flex-col justify-end gap-3 py-4 rounded-b-3xl mask"
      ></div>

      <div
        class="w-full h-full absolute top-0 left-0 flex flex-col justify-end items-center pb-16"
      >
        <font-awesome-icon
          icon="fa-solid fa-circle-check"
          class="text-6xl text-my-green-primary bg-white rounded-full"
        />
        <h2 class="text-2xl text-white m-0 font-medium">
          {{ $t("login.succesModal.title") }}
        </h2>
        <h2 class="text-2xl text-white m-0 font-medium mb-4">
          {{ $t("login.succesModal.subtitle") }}
        </h2>

        <template v-if="user.user">
          <AdminLinksVue
            v-if="user.user.isAdmin"
            v-on:redirectTo="redirectTo"
          />
          <UserLinksVue v-else v-on:redirectTo="redirectTo" />
        </template>
      </div>
    </div>
    <!-- LOGIN MODAL -->
    <div class="bg-white my-container w-2/3 px-4 relative" v-else @click.stop>
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
            {{ $t("login.goRegister") }}
          </button>
          <button
            @click="toogleShowLoginForm"
            v-else
            class="underline text-blue-800"
          >
            {{ $t("login.goLogin") }}
          </button>
        </div>
      </div>
    </div>
  </ModelGlobal>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Register from "./RegisterForm.vue";
import Login from "./LoginForm.vue";
import ModelGlobal from "../../../components/ModelGlobal.vue";
import AdminLinksVue from "../Components/AdminLinks.vue";
import UserLinksVue from "../Components/UserLinks.vue";

export default {
  components: {
    Register,
    Login,
    ModelGlobal,
    UserLinksVue,
    AdminLinksVue,
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
    ...mapGetters("authStore", ["isModalOpen", "isWelcomeModalOpen", "user"]),
  },
};
</script>

<style scoped>
div {
  z-index: 1000;
}
</style>
