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
      <h2 class="my-subtitle my-4 text-center">
        {{ $t("login.welcome") }}
      </h2>
      <div>
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
      <!-- succes modal -->
      <div
        class="h-full w-full overflow-hidden absolute left-0 top-0 text-center"
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
          <h2 class="my-subtitle text-white m-0 font-normal">
            {{ $t("login.succesModal.title") }}
          </h2>
          <h2 class="my-subtitle text-white m-0 font-normal">
            {{ $t("login.succesModal.subtitle") }}
          </h2>

          <div class="flex gap-2 w-full justify-center" v-if="user">
            <button class="my-btn w-3/4 font-normal" @click="goToOwners">
              <span v-if="!user.user.isOwner">
                {{ $t("login.succesModal.buttonOpcion1") }}
              </span>
              <span v-else>
                {{ $t("login.succesModal.buttonOpcion2") }}
              </span>
            </button>
          </div>
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
    goToOwners() {
      this.changeShowLoginModal(false);
      this.$router.push({ name: "owner" });
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
