<template>
  <div>
    <div
      class="bg-white my-container flex justify-center md:justify-between items-center mx-auto pt-6 pb-10"
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
          class="md:w-48 md:h-10 w-28 h-9 object-fill"
          src="@/assets/icons/logoHeader.png"
          alt="logo espacio temporal"
        />
      </div>
      <!-- Links -->
      <div
        class="gap-12 items-center fixed top-0 h-screen w-screen bg-black bg-opacity-80 flex flex-col md:flex-grow md:flex-row md:relative md:h-auto md:top-0 md:justify-end md:bg-opacity-0 md:left-0 z-50 text-white md:text-black transition-all font-medium"
        :class="movileMenuClasses"
        @click="toogleMovileMenuOpen"
      >
        <router-link
          active-class="text-my-blue-primary "
          class="w-full py-2 text-center md:w-auto uppercase font-sans mt-10 md:mt-0"
          :to="{ name: 'owner' }"
          >{{ $t("navbar.owner") }}</router-link
        >
        <router-link
          active-class="text-my-blue-primary "
          class="w-full py-2 text-center md:w-auto uppercase font-sans"
          :to="{ name: 'tenants' }"
          >{{ $t("navbar.tenants") }}</router-link
        >
        <router-link
          class="w-full py-2 text-center md:w-auto uppercase font-sans"
          to="/"
          >{{ $t("navbar.howWorks") }}</router-link
        >
        <router-link
          active-class="text-my-blue-primary "
          class="w-full py-2 text-center md:w-auto uppercase font-sans"
          :to="{ name: 'posts' }"
          >{{ $t("navbar.us") }}</router-link
        >
        <!-- <router-link
          active-class="text-my-blue-primary "
          v-if="user.user && user.user.isOwner"
          class="w-full py-2 text-center md:w-auto uppercase font-sans"
          :to="{ name: 'locations-list' }"
          >{{ $t("navbar.myProperties") }}</router-link
        > -->
        <router-link
          active-class="text-my-blue-primary "
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
        <div
          v-else
          class="w-10 h-10 flex justify-center items-center rounded-full border border-black relative cursor-pointer"
          @mouseenter="showAccoutOptions = true"
          @mouseleave="showAccoutOptions = false"
        >
          <font-awesome-icon
            icon="fa-regular fa-user"
            @click="$router.push({ name: 'profile-main' })"
            class="p-3"
          ></font-awesome-icon>

          <!-- OPTIONS -->
          <div
            class="absolute top-8 -left-52 pt-10 cursor-default invisible md:visible"
            v-if="showAccoutOptions"
          >
            <div
              class="bg-white rounded-4xl options-shadow px-6 py-6 w-64 h-64"
            >
              <router-link :to="{ name: 'profile-main' }" class="my-2 block">{{
                $t("navbar.profile")
              }}</router-link>
              <router-link to="#" class="my-2 mb-4 block">{{
                $t("navbar.editProfile")
              }}</router-link>
              <hr />
              <router-link
                :to="{ name: 'locations-list' }"
                class="my-4 block"
                >{{ $t("navbar.myProperties") }}</router-link
              >
              <hr />
              <select
                v-model="$i18n.locale"
                class="w-auto text-black my-4 uppercase"
              >
                <option
                  v-for="(lang, i) in langs"
                  :key="`Lang${i}`"
                  :value="lang"
                >
                  {{ lang }}
                </option>
              </select>
            </div>
          </div>
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
      showAccoutOptions: false,
      langs: ["es", "en"],
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

<style scoped>
.options-shadow {
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
}
</style>
