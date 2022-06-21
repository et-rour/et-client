<template>
  <div class="w-full h-full bg-gray-100" id="details">
    <div v-if="!user">
      <h1>{{ $t("adminPanel.users.select") }}</h1>
    </div>

    <div class="h-full w-full overflow-scroll">
      <div class="mx-auto w-2/3 flex flex-col">
        <div class="sticky top-0 left-0 bg-gray-100 z-20">
          <h1 class="my-title mb-6 text-center self-center">
            {{ $t("adminPanel.users.title") }}
          </h1>

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
          </div>
        </div>
        <router-view class="z-10"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    idUser: {
      type: String,
      requird: true,
    },
  },
  data() {
    return {
      user: null,
    };
  },
  computed: {
    ...mapGetters("adminPanelStore", ["getUserById"]),
  },
  methods: {
    loadUser() {
      this.user = this.getUserById(this.idUser);
      this.$router.push({ name: 'admin-users-detail-details', params: { id: this.idUser },})
    },
  },
  created() {
    this.loadUser();
  },
  watch: {
    idUser() {
      this.loadUser();
    },
  },
};
</script>

<style></style>
