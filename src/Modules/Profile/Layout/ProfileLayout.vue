<template>
  <div class="my-container">
    <h1 class="my-title mb-6 border-b">{{ $t("profile.layout.title") }}</h1>
    <div class="flex flex-col md:flex-row md:min-h-screen">
      <div class="w-full md:w-64">
        <div class="hidden md:flex gap-2 flex-col pr-12">
          <router-link
            :to="{ name: 'profile-main' }"
            active-class="text-my-blue-primary"
            ><a> {{ $t("profile.layout.profile") }} </a></router-link
          >
          <!-- <router-link to="#">Password</router-link> -->
          <router-link
            :to="{ name: 'locations-list' }"
            active-class="text-my-blue-primary"
            ><a> {{ $t("profile.layout.properties") }} </a></router-link
          >
          <hr />
          <p @click="logoutApp" class="cursor-pointer">
            {{ $t("profile.layout.logout") }}
          </p>
        </div>
        <select
          class="bg-white border border-gray-400 py-2 md:hidden w-full"
          v-model="movileOption"
          @change="movileSelectOption"
        >
          <option value="profile">{{ $t("profile.layout.profile") }}</option>
          <!-- <option value="password">{{$t("profile.layout.properties")}}</option> -->
          <option value="properties">
            {{ $t("profile.layout.properties") }}
          </option>
          <option value="logout">
            {{ $t("profile.layout.logout") }}
          </option>
        </select>
      </div>
      <div class="flex-1 border-black">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { CustomErrorToast } from "@/sweetAlert";
export default {
  data() {
    return {
      movileOption: "profile",
    };
  },
  methods: {
    ...mapActions("authStore", ["logout"]),
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
    movileSelectOption() {
      if (this.movileOption === "logout") {
        this.logoutApp();
      }
    },
  },
};
</script>

<style></style>
