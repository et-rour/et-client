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
          type="password"
          :placeholder="$t('login.password')"
          class="my-input border border-gray-400 w-full py-3 rounded-b-md rounded-t-none"
        />
        <span class="my-error">{{ errors[0] }}</span>
      </ValidationProvider>

      <button
        class="my-btn w-full py-4 my-4"
        type="submit"
        :class="invalid ? 'bg-blue-800 bg-opacity-70' : 'bg-blue-800'"
      >
        {{ $t("login.login") }}
      </button>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { mapActions } from "vuex";
export default {
  components: {
    ValidationObserver,
  },
  data() {
    return {
      loginEmail: "",
      loginPassword: "",
    };
  },
  methods: {
    ...mapActions("authStore", ["login"]),
    onSubmitLogin() {
      const userData = {
        email: this.loginEmail,
        password: this.loginPassword,
      };
      this.login(userData).catch((err) => {
        alert(err);
      });
    },
  },
};
</script>

<style></style>
