<template>
  <div class="w-full h-full bg-gray-100" id="details">
    <div class="h-full w-full overflow-scroll">
      <div class="mx-auto w-2/3 flex flex-col">
        <div class="sticky top-0 left-0 bg-gray-100 z-20">
          <h1 class="my-title mb-6 text-center self-center">
            {{ $t("adminPanel.users.title") }}
          </h1>
          <div v-if="isLoading" class="flex justify-center">
            <SpinerVue />
          </div>

          <div v-else-if="!user">
            <h1>{{ $t("adminPanel.users.select") }}</h1>
          </div>

          <template v-else>
            <div class="flex justify-between mb-5">
              <router-link
                :to="{
                  name: 'admin-users-detail-details',
                  params: { idUser: user.id },
                  hash: '#details',
                }"
                active-class="text-my-blue-primary"
                >{{ $t("adminPanel.users.details") }}</router-link
              >
              <router-link
                :to="{
                  name: 'admin-users-detail-locations',
                  params: { idUser: user.id },
                  hash: '#details',
                }"
                active-class="text-my-blue-primary"
                >{{ $t("adminPanel.users.userLocations") }}</router-link
              >
              <router-link
                :to="{
                  name: 'admin-users-detail-reviews',
                  params: { idUser: user.id, CreatorOrReceiver: true },
                  hash: '#details',
                }"
                active-class="text-my-blue-primary"
                >{{ $t("adminPanel.users.createdReviews") }}</router-link
              >
              <router-link
                :to="{
                  name: 'admin-users-detail-reviews',
                  params: { idUser: user.id, CreatorOrReceiver: false },
                  hash: '#details',
                }"
                active-class="text-my-blue-primary"
                >{{ $t("adminPanel.users.receivedReviews") }}</router-link
              >
              <router-link
                :to="{
                  name: 'admin-users-detail-payments',
                  params: { idUser: user.id },
                  hash: '#details',
                }"
                active-class="text-my-blue-primary"
                >{{ $t("adminPanel.users.payments") }}</router-link
              >
            </div>
          </template>
        </div>
        <router-view class="z-10"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { CustomErrorToast } from "@/sweetAlert.js";
import SpinerVue from "../../../../../components/Spiner.vue";

export default {
  components: {
    SpinerVue,
  },
  props: {
    idUser: {
      type: String,
      requird: true,
    },
  },
  data() {
    return {
      user: null,
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters("adminPanelStore/users", ["getUserDetails"]),
  },
  methods: {
    ...mapActions("adminPanelStore/users", ["fetchUserDetails"]),
    async loadUserDetails() {
      try {
        this.isLoading = true;
        await this.fetchUserDetails(this.idUser);
        this.user = this.getUserDetails;
        // this.$router.push({
        //   name: "admin-users-detail-details",
        //   params: { id: this.idUser },
        //   hash: "#details",
        // });
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
      this.isLoading = false;
    },
  },
  created() {
    this.loadUserDetails();
  },
  watch: {
    idUser() {
      this.loadUserDetails();
    },
  },
};
</script>

<style></style>
