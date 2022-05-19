<template>
  <div class="px-2 py-3 pb-40 md:pb-6">
    <h2 class="my-title text-center font-bold">
      {{ $t("tenants.schedule.title") }}
    </h2>
    <div class="w-full text-center">
      <div
        id="calendly-widget"
        className="calendly-inline-widget min-h-full"
        style="min-width: 320px; height: 750px"
        data-auto-load="true"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

const WIDGET_ID = "calendy_external_widget_script";

export default {
  props: {
    idLocation: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      location: null,
    };
  },
  computed: {
    ...mapGetters("authStore", ["user"]),
    ...mapGetters("propertiesStore", ["propertiesById"]),
    completeAddress() {
      return `${this.location.address},${this.location.zone.zone} - ${this.location.zone.city} (${this.location.zone.state}), ${this.location.zone.country}`;
    },
  },
  mounted() {
    this.location = this.propertiesById(Number(this.idLocation));

    const recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "https://assets.calendly.com/assets/external/widget.js"
    );
    recaptchaScript.setAttribute("id", WIDGET_ID);

    document.head.appendChild(recaptchaScript);

    if (window.Calendly) {
      window.Calendly.initInlineWidget({
        url: `${process.env.VUE_APP_VISIT}/?primary_color=1d4ed8`,
        parentElement: document.getElementById("calendly-widget"),
        prefill: {
          name: `${this.user.user.firstName} ${this.user.user.lastName}`,
          email: `${this.user.user.email}`,
          customAnswers: {
            a1: `${this.location.name}`,
            a2: `${this.completeAddress}`,
            a3: "",
            a4: 1,
          },
        },
      });
    }
  },

  beforeDestroy() {
    // const widgetScript = document.getElementById(WIDGET_ID);
    // window.Calendly.destroyBadgeWidget();
    // widgetScript.remove();
  },
};
</script>

<style></style>
