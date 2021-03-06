<template>
  <div class="mx-auto h-full w-full pt-4 flex flex-col">
    <div class="flex flex-col gap-4 items-start self-center">
      <!-- firstname -->
      <p class="flex items-center gap-3">
        <font-awesome-icon
          class="p-2 border rounded-full border-black"
          icon="fa-regular fa-user"
        />
        {{ $t("adminPanel.users.firstname") }}:
        <span class="text-my-blue-primary"
          >{{ user.firstName }} {{ user.lastName }}</span
        >
      </p>

      <!-- email -->
      <p class="flex items-center gap-3">
        <font-awesome-icon
          class="p-2 border rounded-full border-black"
          icon="fa-regular fa-envelope"
        />
        {{ $t("adminPanel.users.email") }}:
        <span class="text-my-blue-primary">{{ user.email }}</span>
      </p>

      <!-- phone -->
      <p class="flex items-center gap-3">
        <font-awesome-icon
          class="p-2 border rounded-full border-black"
          icon="fa-solid fa-phone"
        />
        {{ $t("adminPanel.users.phone") }}:
        <span class="text-my-blue-primary">{{
          user.phone ? user.phone : $t("adminPanel.users.noPhoneFound")
        }}</span>
      </p>

      <!-- verified -->
      <p class="flex items-center gap-3">
        <label>{{ $t("adminPanel.users.verified") }}</label>
        <span class="text-my-blue-primary">{{
          user.isVerified ? $t("general.yes") : "No"
        }}</span>
      </p>

      <!-- active -->
      <div class="flex items-center">
        <label>{{ $t("adminPanel.users.active") }}:</label>
        <SwitchComponentVue
          :value="user.isActive"
          v-on:toogle="toogleIsActive"
        />
      </div>

      <!-- owner -->
      <div class="flex items-center">
        <label>{{ $t("adminPanel.users.owner") }}</label>
        <SwitchComponentVue :value="user.isOwner" v-on:toogle="toogleIsOwner" />
      </div>

      <!-- client -->
      <div class="flex items-center">
        <label class="mr-2">{{ $t("adminPanel.users.client") }}</label>
        <span class="text-my-blue-primary">{{
          user.isClient ? $t("general.yes") : "No"
        }}</span>
      </div>
      <!-- admin -->
      <div class="flex items-center">
        <label class="mr-2">{{ $t("adminPanel.users.admin") }}</label>
        <span class="text-my-blue-primary">{{
          user.isAdmin ? $t("general.yes") : "No"
        }}</span>
      </div>
      <!-- review -->
      <div class="flex items-center">
        <label class="mr-2">{{ $t("adminPanel.users.review") }}</label>
        <span class="text-my-blue-primary">{{
          user.didReview ? $t("general.yes") : "No"
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SwitchComponentVue from "../../../../../components/SwitchComponent.vue";
import {
  CustomErrorToast,
  CustomToast,
  CustomConfirmDialog,
} from "@/sweetAlert";
export default {
  components: {
    SwitchComponentVue,
  },
  props: {
    idUser: {
      type: String,
      requird: true,
    },
  },
  computed: {
    ...mapGetters("adminPanelStore", ["getUserById"]),
  },
  data() {
    return {
      user: null,
    };
  },
  methods: {
    ...mapActions("adminPanelStore", [
      "changeIsActiveUser",
      "changeIsOwnerStatus",
    ]),
    loadUser() {
      this.user = this.getUserById(this.idUser);
    },
    toogleIsActive(value) {
      const changeActiveUserTextAcction = this.user.isActive
        ? this.$t("adminPanel.users.confiramtionMessages.desactivateUser")
        : this.$t("adminPanel.users.confiramtionMessages.activateUser");

      CustomConfirmDialog.fire({ text: changeActiveUserTextAcction }).then(
        async (result) => {
          try {
            if (result.isConfirmed) {
              await this.changeIsActiveUser({
                id: this.user.id,
                activeStatus: value,
              });
              CustomToast.fire({
                title: this.$t("sweetAlertMessages.saved"),
                icon: "success",
              });
              this.user.isActive = value;
            }
          } catch (error) {
            CustomErrorToast.fire({
              text: error.response.data.message,
            });
          }
        }
      );
    },
    toogleIsOwner(value) {
      const changeOwnerUserTextAcction = this.user.isOwner
        ? this.$t("adminPanel.users.confiramtionMessages.makeOwner")
        : this.$t("adminPanel.users.confiramtionMessages.removeOwner");
      CustomConfirmDialog.fire({ text: changeOwnerUserTextAcction }).then(
        async (result) => {
          try {
            if (result.isConfirmed) {
              await this.changeIsOwnerStatus({
                id: this.user.id,
                isOwnerStatus: value,
              });
              CustomToast.fire({
                title: this.$t("sweetAlertMessages.saved"),
                icon: "success",
              });
              this.user.isOwner = value;
            }
          } catch (error) {
            CustomErrorToast.fire({
              text: error.response.data.message,
            });
          }
        }
      );
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
