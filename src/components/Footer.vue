<template>
  <div
    class="w-full bg-gray-900 flex-col justify-center items-center text-white flex relative py-10 mb-24 md:mb-0"
  >
    <div class="w-full md:w-9/12 md:grid md:grid-cols-1 lg:grid-cols-3 px-4 md:px-20">
      <div class="flex-col items-center justify-center">
        <div class="flex row items-center justify-center">
          <img class="col-span-3 md:col-span-1 mx-auto md:mx-0" src="@/assets/icons/logoFooter.png" alt="footer_espacio" />
        </div>
        <div class="flex row items-center justify-center mt-4">
          <a href="https://instagram.com/espaciotemporal?igshid=YmMyMTA2M2Y=" target="blank">
            <img src="../assets/icons/instagram-white.png" alt="" class="w-12 h-12 mr-1">  
          </a>
          <a class="ml-1" href="https://instagram.com/espaciotemporal?igshid=YmMyMTA2M2Y=" target="blank">@espaciotemporal</a>
        </div>
      </div>

      <div class="md:hidden">
        <footer-mail-chimp />
      </div>

      <ul class="flex flex-col items-center md:items-start">
        <li>
          <router-link :to="{ name: 'questions' }">FAQS</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'owner' }">{{ $t("footer.nav.owner") }}</router-link
          >
        </li>
        <li><router-link :to="{ name: 'tenants' }">{{ $t("footer.nav.tenants") }}</router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'how-it-works' }">{{ $t("footer.nav.howWorks") }}</router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'posts' }">{{ $t("footer.nav.us") }}</router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'terms' }">{{ $t("footer.nav.terms") }}</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'workwithus' }">{{ $t("footer.nav.workwithus") }}</router-link>
        </li>
      </ul>
      <!-- <form
        class="row-start-2 col-start-1 col-end-4 flex flex-col border-b"
        :action="`https://formsubmit.co/${email}`"
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
            <textarea
              name="message"
              cols="30"
              class="my-input text-black h-full p-1"
              :placeholder="$t('footer.form.message')"
            ></textarea>
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
      </form> -->
      <div class="hidden md:contents">
        <footer-mail-chimp />
      </div>
    </div>
  </div>
</template>

<script>
// import { VueRecaptcha } from "vue-recaptcha";
import EspacioTemporalAPI from "@/Api/index.js";
import { CustomErrorToast } from "@/sweetAlert";
import FooterMailChimp from './FooterMailChimp.vue';
export default {
  components: { 
    // VueRecaptcha, 
    FooterMailChimp 
  },
  data() {
    return {
      langs: ["es", "en"],
      validateSendMessage: false,
      status: "",
      sucessfulServerResponse: "",
      serverError: "",      
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
    email() {
      return process.env.VUE_APP_MAIL_TO;
    },
  },
};
</script>

<style></style>
