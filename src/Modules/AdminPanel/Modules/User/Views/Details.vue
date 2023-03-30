<template>
  <div class="mx-auto h-full w-full pt-4 flex flex-col">
    <div class="flex flex-col gap-4 items-start self-center" v-if="user">
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

      <!-- whatsapp -->
      <p class="flex items-center gap-3">
        <font-awesome-icon
          class="p-2 border rounded-full border-black"
          icon="fa-solid fa-phone"
        />
        Whatsapp:
        <span class="text-my-blue-primary">{{
          user.whatsapp ? user.whatsapp : $t("adminPanel.users.noPhoneFound")
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

      <!-- admin -->
      <div class="flex items-center">
        <label>{{ $t("adminPanel.users.admin") }}</label>
        <SwitchComponentVue :value="user.isAdmin" v-on:toogle="toogleIsAdmin" />
      </div>

      <!-- client -->
      <div class="flex items-center">
        <label class="mr-2">{{ $t("adminPanel.users.client") }}</label>
        <span class="text-my-blue-primary">{{
          user.isClient ? $t("general.yes") : "No"
        }}</span>
      </div>
      <!-- review -->
      <div class="flex items-center">
        <label class="mr-2">{{ $t("adminPanel.users.review") }}</label>
        <span class="text-my-blue-primary">{{
          user.didReview ? $t("general.yes") : "No"
        }}</span>
      </div>

      <hr />
      <ValidationObserver v-slot="{ handleSubmit, invalid }">
        <form @submit.prevent="handleSubmit(submitUserInfo)" class="flex flex-col gap-3">
          <!-- NAME -->
          <ValidationProvider
            v-slot='{ errors }'
            rules='required'
            class='my-input-box'
          >
              <div>
                <label class="mr-2 block">Id del empleado</label>
                <input type="text" class="my-input border" v-model="user.stripeCustomerId">
              </div>
              <span class='error my-error relative top-0 left-0'>{{ errors[0] }}</span>
          </ValidationProvider>

          <div class="w-full flex justify-center">
            <button
              class="my-btn mx-2"
              :disabled="isUpdatingUser"
              :class="isUpdatingUser || invalid ? 'opacity-25' : ''"
            >
              {{ $t("general.update") }}
            </button>
          </div>
        </form>
      </ValidationObserver>

      <!-- stripeId -->
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
import { ValidationObserver } from "vee-validate";
import { PUT_ADMIN_USER } from "@/Services/Admin/admin_users_services"

export default {
  components: {
    SwitchComponentVue,
    ValidationObserver,
  },
  data() {
    return {
      hasDeleted: false,
      isUpdatingUser:false
    };
  },
  computed: {
    ...mapGetters("adminPanelStore/users", ["getUserDetails"]),
    user() {
      return this.getUserDetails;
    },
  },
  methods: {
    ...mapActions("adminPanelStore/users", [
      "changeIsActiveUser",
      "changeIsOwnerStatus",
      "changeIsAdminRol",
      "deleteUser",
    ]),
    async sendUserTrash() {
      const { isConfirmed } = await CustomConfirmDialog.fire({
        title: this.$t("sweetAlertMessages.sendToTrash"),
        text: this.$t("sweetAlertMessages.userToTrash"),
      });

      if (!isConfirmed) return;

      await this.deleteUser({ id: this.user.id });

      this.hasDeleted = true;
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
      const changeOwnerUserTextAcction = !this.user.isOwner
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
    toogleIsAdmin(value) {
      const changeOwnerUserTextAcction = !this.user.isAdmin
        ? this.$t("adminPanel.users.confiramtionMessages.makeAdmin")
        : this.$t("adminPanel.users.confiramtionMessages.removeAdmin");
      CustomConfirmDialog.fire({ text: changeOwnerUserTextAcction }).then(
        async (result) => {
          try {
            if (result.isConfirmed) {
              await this.changeIsAdminRol({
                id: this.user.id,
                isAdminStatus: value,
              });
              CustomToast.fire({
                title: this.$t("sweetAlertMessages.saved"),
                icon: "success",
              });
              this.user.isAdmin = value;
            }
          } catch (error) {
            CustomErrorToast.fire({
              text: error.response.data.message,
            });
          }
        }
      );
    },
    async submitUserInfo(){
      const { isConfirmed } = await CustomConfirmDialog.fire({});
      if (!isConfirmed) return;

      try {
        const updateUserBody = {
          id: this.user.id,
          stripeCustomerId: this.user.stripeCustomerId,

        }
        this.isUpdatingUser = true;
        await PUT_ADMIN_USER(updateUserBody)
        
        CustomToast.fire({
          title: this.$t("sweetAlertMessages.saved"),
          icon: "success",
        });
        this.isUpdatingUser = false;

      } catch (error) {
        this.isUpdatingUser = false;
        CustomErrorToast.fire({
          text: error.response.data.message || error,
        });
      }
    }
  },
  watch: {
    hasDeleted(newValue) {
      if (newValue === true) this.$emit("userDeleted");
    },
  },
};
</script>

<style></style>
