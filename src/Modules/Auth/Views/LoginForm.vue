<template>
  <ValidationObserver v-slot="{ handleSubmit, invalid }">
    <form @submit.prevent="handleSubmit(onSubmitLogin)">
      <ValidationProvider
        v-slot="{ errors }"
        rules="required|email"
        class="relative"
      >
        <input
          v-model="loginEmail"
          type="text"
          :placeholder="$t('login.email')"
          class="my-input border border-gray-400 w-full py-3 rounded-t-md rounded-b-none border-b-0"
        />
        <span class="my-error">{{ errors[0] }}</span>
      </ValidationProvider>

      <ValidationProvider v-slot="{ errors }" rules="required" class="relative">
        <input
          v-model="loginPassword"
          :type="showPassword ? 'text' : 'password'"
          :placeholder="$t('login.password')"
          class="my-input border border-gray-400 w-full py-3 rounded-b-md rounded-t-none"
        />
        <font-awesome-icon
          v-if="!showPassword"
          icon="eye"
          class="absolute top-0.5 right-5 cursor-pointer"
          @click="showPassword = !showPassword"
        />
        <font-awesome-icon
          v-else
          icon="eye-slash"
          class="absolute top-0.5 right-5 cursor-pointer"
          @click="showPassword = !showPassword"
        />

        <span class="my-error">{{ errors[0] }}</span>
      </ValidationProvider>

      <div class="flex justify-end">
        <span class="mt-3 px-2 py-1 text-my-blue-primary cursor-pointer" @click="sendRestoreEmail">{{$t('login.restorePassword')}}</span>
      </div>

      <button
        class="my-btn w-full py-4 my-4"
        type="submit"
        :class="
          invalid ? 'bg-my-blue-primary bg-opacity-70' : 'bg-my-blue-primary'
        "
      >
        {{ $t("login.login") }}
      </button>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { mapActions, mapGetters } from "vuex";
import { CustomErrorToast } from "@/sweetAlert";
import { isValidToRedirect } from "../utils/redirect";
import espacioTemporalApi from "@/Api/index"
import Swal from 'sweetalert2';
export default {
  components: {
    ValidationObserver,
  },
  data() {
    return {
      loginEmail: "",
      loginPassword: "",
      showPassword: false,
    };
  },
  computed: {
    ...mapGetters("authStore", ["user"]),
  },
  methods: {
    ...mapActions("authStore", ["login", "changeShowLoginModal"]),
    async onSubmitLogin() {
      const userData = {
        email: this.loginEmail.toLowerCase(),
        password: this.loginPassword,
      };
      try {
        await this.login(userData);

        this.changeShowLoginModal(false);

        if (!isValidToRedirect(this.$route.name)) return;

        if (this.user.user.isAdmin) {
          this.$router.push({ name: "admin-locations", hash: "#details" });
        } else if (this.user.user.isOwner) {
          this.$router.push({ name: "locations-list" });
        } else {
          this.$router.push({ name: "profile-main" });
        }
      } catch (error) {
        CustomErrorToast.fire({
          text: error.response.data.message,
        });
      }
    },
    async sendRestoreEmail(){

      Swal.fire({
        title: 'Email',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: this.$t("general.send"),
        showLoaderOnConfirm: true,
        preConfirm: (email) => {
          if (email.trim().length === 0) {
            Swal.showValidationMessage(
              this.$t("validations.messages.emailRequired")
            )
            return
          }

          return espacioTemporalApi.post("/auth/restore",{email})
            .then(response => {
              return response.data
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Error: ${error.response.data.message}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        console.log('%cLoginForm.vue line:133 result', 'color: #26bfa5;', result);
        if (result.isConfirmed) {
          Swal.fire({
            title: this.$t("login.sended"),
            text: result.value
          })
        }
      })

    }
  },
};
</script>

<style></style>
