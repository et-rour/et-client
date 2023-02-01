<template>
  <div>
    <div
      class="bg-white my-container flex justify-center md:justify-between items-center mx-auto pt-6 pb-10 relative"
    >
      <div class="py-2 flex-grow md:flex-grow-0 flex justify-center cursor-pointer flex-shrink-0"
        @click="$router.push({ name: 'home' })"
      >
        <img
          class="md:w-40 md:h-14 w-28 h-9 object-contain "
          src="@/assets/icons/logoHeader.png"
          alt="logo espacio temporal"
        />
      </div>


      <!-- Links -->
      <div
        class="flex justify-end items-center gap-6 z-50 absolute top-8 right-0 md:relative md:top-0"
      >
        <router-link
          active-class="text-my-blue-primary "
          class="py-2 text-center uppercase font-bold hidden md:block"
          :to="{ name: 'owner' }"
          >{{ $t("navbar.owner") }}</router-link
        >
        <router-link
          active-class="text-my-blue-primary "
          class="py-2 text-center uppercase font-bold hidden md:block"
          :to="{ name: 'tenants' }"
          >{{ $t("navbar.tenants") }}</router-link
        >

        <div class="relative group z-50 hidden md:block">
          <p class="font-bold hover:text-my-blue-primary"> {{ $t("navbar.us") }} </p>
          <div class="flex flex-col gap-4 absolute w-48 top-6 -left-12 text-center bg-black text-white md:bg-gray-100 md:text-black shadow-xl invisible group-hover:visible  h-0 group-hover:h-44 overflow-hidden  transition-all ease-in duration-500 ">
            <router-link
              class=" hover:text-my-blue-primary mt-4"
              :to="{ name: 'what-we-do' }"
              > {{ $t("navbar.usOption1") }}</router-link
            >
            <router-link
              class=" hover:text-my-blue-primary "
              :to="{ name: 'team' }"
              >{{ $t("navbar.usOption2") }}</router-link
            >
            <router-link
              class=" hover:text-my-blue-primary "
              :to="{ name: 'how-it-works' }"
              >{{ $t("navbar.usOption3") }}</router-link
            >
            <router-link
              class=" hover:text-my-blue-primary "
              :to="{ name: 'trust-us' }"
              >{{ $t("navbar.usOption4") }}</router-link
            >
          </div>
        </div>

        <div class="flex flex-col justify-center items-center relative">
          <button
            class="my-btn py-1 w-auto px-2 rounded-lg"
            @click="toogleLoginModalOpen"
            v-if="!isAuth"
          >
            {{ $t("navbar.login") }}
          </button>
          <div
            v-else
            class="mx-5 w-10 h-10 flex justify-center items-center rounded-full border border-black relative cursor-pointer"
            @mouseenter="showAccoutOptions = true"
            @mouseleave="showAccoutOptions = false"
            @focus="showAccoutOptions = true"
            >
            <font-awesome-icon
              icon="fa-regular fa-user"
              class="p-3 md:text-black md:hidden"
              @click="showAccoutOptions = true"
            ></font-awesome-icon>
            
            <font-awesome-icon
              icon="fa-regular fa-user"
              @click="goToProfileDetails"
              class="p-3 text-white md:text-black hidden md:block"
            ></font-awesome-icon>

            <div
              class="absolute top-8 -left-52 pt-10 cursor-default z-30"
              v-show="showAccoutOptions"
            >
              <div
                class="bg-white rounded-4xl options-shadow px-6 py-6 w-64 "
              >
                <p class="font-normal text-center">
                  {{ user.user.firstName }} {{ user.user.lastName }}
                </p>
                <p class="font-normal text-center text-sm">
                  {{ user.user.email }}
                </p>
                <router-link
                  v-if="user.user.isAdmin"
                  :to="{ name: 'admin-locations' }"
                  class="my-2 md:hidden"
                  >{{ $t("navbar.admin") }}</router-link
                >
                <router-link
                  :to="{ name: 'profile-main' }"
                  class="my-2 block"
                  > {{ $t("navbar.profile") }} </router-link
                >
                <router-link to="#" class="my-2  block">{{
                  $t("navbar.editProfile")
                }} </router-link>
                <p @click="logoutApp" class="cursor-pointer mb-4">
                  {{ $t("profile.layout.logout") }}
                </p>
                <hr />
                <router-link
                  :to="{ name: 'locations-list' }"
                  class="my-4 block"
                  >{{ $t("navbar.myProperties") }} </router-link
                >
                <hr />
                <div class="flex justify-between mt-3">
                  <select
                    v-model="$i18n.locale"
                    class="w-auto text-black uppercase"
                  >
                    <option
                      v-for="(lang, i) in langs"
                      :key="`Lang${i}`"
                      :value="lang"
                    >
                      {{ lang }}
                    </option>
                  </select>

                  <div class="flex justify-around items-center w-28 h-10 rounded-md border-gray-200 border-2">
                    <div
                      class="flex justify-around items-center w-full h-full rounded-tl-md rounded-bl-md background-red p-1 hover:bg-gray-200 cursor-pointer"
                      :class="siteCountry === 'Chile' ? 'bg-gray-200' : null"
                      @click="setNewSiteCountry('Chile')"
                    >
                      <img class="w-8 h-6" src="../assets/images/chile-flag-xs.png" alt="cl">
                    </div>
                    <div
                      class="flex justify-around items-center w-full h-full rounded-tr-md rounded-br-md p-1 hover:bg-gray-200 cursor-pointer"
                      :class="siteCountry === 'Perú' ? 'bg-gray-200' : null"
                      @click="setNewSiteCountry('Perú')"
                    >
                      <img class="w-8 h-6" src="../assets/images/peru-flag-xs.png" alt="pe">
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Login></Login>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import Login from "../Modules/Auth/Views/SharedModal.vue";
import { CustomErrorToast } from "@/sweetAlert"
export default {
  components: {
    Login,
  },
  data() {
    return {
      movileMenuOpen: false,
      showAccoutOptions: false,
      showCountryOptions: false,
      langs: ["es", "en"],
    };
  },
  methods: {
    ...mapMutations({
      changeModel: "authStore/changeShowLoginModal",
      changeSiteCountry: "authStore/setSiteCountry",
    }),
    ...mapActions("authStore", ["logout", "setSiteCountry"]),
    toogleLoginModalOpen() {
      this.changeModel(true);
    },
    toogleMovileMenuOpen(e) {
      e.stopPropagation();
      this.movileMenuOpen = !this.movileMenuOpen;
    },
    goToProfileDetails(){
      if (this.user.user.isAdmin) {
        this.$router.push({ name: 'admin-locations' })
      }else{
        this.$router.push({ name: 'profile-main' })
      }
    },
    async logoutApp() {
        try {
          await this.logout();
          this.$router.push({ name: "home" });
        } catch (error) {
          CustomErrorToast.fire({
            text: error.response.data.message,
          });
        }
      },
      setNewSiteCountry(country){
      console.log('%cNavbar.vue line:215 {country}', 'color: #007acc;', {country});
      switch (country) {
        case "Chile":
          if (this.siteCountry==="Chile") {
            this.changeSiteCountry("")
            break;
          }
          this.changeSiteCountry("Chile")
          break;
        case "Perú":
          if (this.siteCountry==="Perú") {
            this.changeSiteCountry("")
            break;
          }
          this.changeSiteCountry("Perú")
          break;
      }
    },
    },
    
  computed: {
    ...mapGetters("authStore", ["isAuth", "user", "siteCountry"]),
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
.isActive {
  background-color: #e1dbdb;
}
</style>

<style>