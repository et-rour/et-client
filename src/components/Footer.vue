<template>
  <div
    class="w-full h-96 bg-gray-900 flex-col justify-center items-center text-white hidden md:flex relative"
  >
    <div class="absolute top-0 left-0 text-gray-900">
      version: {{ appVersion }}
    </div>
    <div class="w-9/12 grid grid-cols-3 grid-rows-2 px-20">
      <img src="@/assets/icons/logoFooter.png" alt="logotipo footer" />
      <ul>
        <li>
          <router-link :to="{ name: 'questions' }"><a> FAQS </a></router-link>
        </li>
        <li>
          <router-link :to="{ name: 'owner' }"
            ><a> {{ $t("footer.nav.owner") }} </a></router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'tenants' }"
            ><a> {{ $t("footer.nav.tenants") }} </a></router-link
          >
        </li>
        <li>
          <router-link to="/"
            ><a> {{ $t("footer.nav.howWorks") }} </a></router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'posts' }"
            ><a> {{ $t("footer.nav.us") }} </a></router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'terms' }">
            <a> {{ $t("footer.nav.terms") }} </a>
          </router-link>
        </li>
      </ul>
      <form
        class="row-start-2 col-start-1 col-end-4 flex flex-col border-b"
        action="https://formsubmit.co/info@espaciotemporal.cl"
        method="POST"
      >
        <p>{{ $t("footer.form.Contact") }}</p>
        <div class="w-full grid grid-cols-3 gap-8">
          <div class="flex gap-2 flex-col">
            <input
              type="hidden"
              name="_next"
              value="https://espaciotemporal.vercel.app/"
            />
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="text"
              name="name"
              class="my-input text-black"
              :placeholder="$t('footer.form.name')"
            />
            <input
              type="email"
              name="email"
              class="my-input text-black"
              :placeholder="$t('footer.form.email')"
            />
          </div>
          <div class="flex gap-2 flex-col">
            <input
              type="text"
              name="message"
              class="my-input text-black h-full p-1"
              :placeholder="$t('footer.form.message')"
              cols="30"
            />
          </div>
          <div class="flex gap-2 flex-col">
            <VueRecaptcha
              ref="recaptcha"
              :sitekey="siteKey"
              :load-recaptcha-script="true"
              @verify="onCaptchaVerified"
              @expired="onCaptchaExpired"
            ></VueRecaptcha>
          </div>
        </div>
        <button
          class="border border-white text-white py-1 px-12 my-2 rounded-md self-center"
          :class="validateSendMessage ? '' : 'bg-gray-400 cursor-not-allowed'"
          type="submit"
          :disabled="status === 'submitting' || !validateSendMessage"
        >
          {{ $t("footer.form.send") }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { VueRecaptcha } from "vue-recaptcha";
import EspacioTemporalAPI from "@/Api/index.js";
import { CustomErrorToast } from "@/sweetAlert";
import { version } from "../../package";

export default {
  components: { VueRecaptcha },
  data() {
    return {
      langs: ["es", "en"],
      validateSendMessage: false,
      status: "",
      sucessfulServerResponse: "",
      serverError: "",
      appVersion: version,
    };
  },
  methods: {
    submit: function () {
      // alert("dfs");
    },
    onCaptchaExpired: function () {
      this.$refs.recaptcha.reset();
    },
    onCaptchaVerified: function (recaptchaToken) {
      const self = this;
      self.status = "submitting";
      self.validateSendMessage = false;
      EspacioTemporalAPI.post("/captcha/", {
        recaptchaToken: recaptchaToken,
      })
        .then((response) => {
          self.sucessfulServerResponse = response.data.message;
          self.validateSendMessage = true;
        })
        .catch((err) => {
          self.serverError = getErrorMessage(err);

          //helper to get a displayable message to the user
          function getErrorMessage(err) {
            let responseBody;
            responseBody = err.response;
            if (!responseBody) {
              responseBody = err;
            } else {
              responseBody = err.response.data || responseBody;
            }
            CustomErrorToast.fire({
              text: responseBody.message || JSON.stringify(responseBody),
            });
            return responseBody.message || JSON.stringify(responseBody);
          }
        })
        .then(() => {
          self.status = "";
        });
    },
  },
  computed: {
    siteKey() {
      return `${process.env.VUE_APP_CAPTCHA_API}`;
    },
  },
};
</script>

<style></style>
