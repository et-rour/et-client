<template>
  <div class="w-full h-full bg-gray-100" id="details">
    <div v-if="!user">
      <h1>{{ $t("adminPanel.users.select") }}</h1>
    </div>

    <div v-else class="flex items-center flex-col">
      <div class="mx-auto h-full w-2/3 py-4">
        <h1 class="my-title mb-6">{{ $t("adminPanel.users.title") }}</h1>
        <div class="flex flex-col gap-4">
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
            <SwitchComponentVue
              :value="user.isOwner"
              v-on:toogle="toogleIsOwner"
            />
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
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SwitchComponentVue from "../../../../../components/SwitchComponent.vue";
import { CustomErrorToast, CustomToast } from "@/sweetAlert";
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
    async toogleIsActive(value) {
      try {
        await this.changeIsActiveUser({
          id: this.user.id,
          activeStatus: value,
        });
        CustomToast.fire({
          title: "Done",
          icon: "success",
        });
        this.user.isActive = value;
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message,
        });
      }
    },
    async toogleIsOwner(value) {
      try {
        await this.changeIsOwnerStatus({
          id: this.user.id,
          isOwnerStatus: value,
        });
        CustomToast.fire({
          title: "Done",
          icon: "success",
        });
        this.user.isOwner = value;
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message,
        });
      }
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
