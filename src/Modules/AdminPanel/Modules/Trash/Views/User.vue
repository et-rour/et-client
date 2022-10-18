<template>
  <div v-if="hasDeleted" class="w-2/3 h-full py-4 flex flex-col justify-start">
    <p class="my-title mb-3 text-center">{{ $t("adminPanel.users.title") }}</p>
    <div class="flex flex-col items-center">
      <p class="mr-3 my-2 text-center">{{ $t("sweetAlertMessages.fullDeletedUser") }}</p>
    </div>
  </div>
  <div v-else-if="hasRestored" class="w-2/3 h-full py-4 flex flex-col justify-start">
    <p class="my-title mb-3 text-center">{{ $t("adminPanel.users.title") }}</p>
    <div class="flex flex-col items-center">
      <p class="mr-3 my-2 text-center">{{ $t("sweetAlertMessages.restoredUser") }}</p>
    </div>
  </div>
  <div v-else class="w-2/3 h-full py-4 flex flex-col justify-start">
    <p class="my-title mb-3 text-center">{{ $t("adminPanel.users.title") }}</p>
    <div class="flex flex-col items-start">
      <p class="mr-3 my-2"><b>{{ $t("adminPanel.locations.name") }}:</b> {{user.firstName}} {{user.lastName}}</p>
      <p class="mr-3 my-2"><b>{{ $t("adminPanel.locations.email") }}:</b> {{user.email}} </p>
    </div>
    <div class="w-full flex justify-center mt-4">
        <button
          class="my-btn mx-2 bg-red-600"
          :class="isUploadingUser ? 'bg-gray-500' : ''"
          @click="deleteUser"
        >
          {{ $t("adminPanel.locations.fullDelete") }}
        </button>
        <button
          class="my-btn mx-2"
          :class="isUploadingUser ? 'bg-gray-500' : ''"
          @click="restoreUserFunc"
        >
          {{ $t("adminPanel.locations.restore") }}
        </button>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  CustomConfirmDialog,
} from "@/sweetAlert";

export default {
  computed: {
    ...mapGetters("adminPanelStore/users", ["getUserDetails"]),
    userId() {
      return this.$route.params.id;
    }
  },
  data() {
    return {
      hasDeleted: false,
      hasRestored: false,
      user: null,
      isUploadingUser: false,
    };
  },
  methods: {
    ...mapActions("adminPanelStore/users", [
      "restoreUser",
      "deleteUserPermanent",
      "fetchTrashUserDetails",
    ]),
    async loadUser() {
      await this.fetchTrashUserDetails(this.userId);
      this.user = this.getUserDetails;
    },
    async restoreUserFunc() {
      const { isConfirmed } = await CustomConfirmDialog.fire({
        title: this.$t("sweetAlertMessages.restoreLocationTitleUser"),
        text: this.$t("sweetAlertMessages.restoreLocationTextUser"),
      })

      if (!isConfirmed) return;

      const { id } = this.user

      await this.restoreUser(id);

      this.hasRestored = true;
    },
    async deleteUser() {
      const { isConfirmed } = await CustomConfirmDialog.fire({
        title: this.$t("sweetAlertMessages.sendToTrashPermanent"),
        text: this.$t("sweetAlertMessages.userToTrashPermanent"),
      })

      if (!isConfirmed) return;

      await this.deleteUserPermanent({id: this.user.id});

      this.hasDeleted = true;
    }
  },
  async created() {
    try {
      await this.loadUser();
    } catch (error) {
      console.log(error);
    }
  },
  watch: {
    userId() {
      this.loadUser();
      this.hasRestored = false;
      this.hasDeleted = false;
    },
  },
};
</script>

<style></style>
