<template>
  <div>
    <div
      class="w-full h-48 bg-my-blue-primary flex justify-center items-center relative"
    >
      <h2 class="text-center text-white font-bold my-title-2">
        <font-awesome-icon icon="fa-regular fa-user"></font-awesome-icon>
        {{ $t("admin.title") }}
      </h2>
      <div class="w-full absolute bottom-0 left-0 flex justify-center gap-4">
        <router-link
          :to="{ name: 'locations-list' }"
          class="bg-gray-300 px-1 py-2 rounded-t-lg font-bold"
          ><a> {{ $t("admin.navbar.properties") }} </a></router-link
        >
        <router-link
          :to="{ name: 'reservations-list' }"
          class="bg-gray-300 px-1 py-2 rounded-t-lg font-bold"
          >{{ $t("admin.navbar.reservations") }} </router-link
        >
        <router-link
          :to="{ name: 'locations-payment' }"
          class="bg-gray-300 px-1 py-2 rounded-t-lg font-bold"
          ><a> {{ $t("admin.navbar.payment") }} </a></router-link
        >
      </div>
    </div>
    <div class="my-container mb-40 md:mb-0 mt-3">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { CustomErrorToast } from "@/sweetAlert";
export default {
  methods: {
    ...mapActions("ownerPanelStore", ["ACTION_GET_OWNER_LOCATIONS"]),
  },
  computed: {
    ...mapGetters("authStore", ["user"]),
  },
  async mounted() {
    try {
      await this.ACTION_GET_OWNER_LOCATIONS(this.user.user.id);
    } catch (error) {
      CustomErrorToast.fire({
        text: error.response.data.message,
      });
    }
  },
};
</script>

<style scoped>
.router-link-exact-active {
  background: white;
}
</style>
