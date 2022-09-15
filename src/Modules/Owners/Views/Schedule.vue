<template>
  <div class="pb-40 md:pb-6">
    <div class="my-container text-center">
      <h2 class="my-title text-center font-bold">
        {{ $t("schedule.title") }}
      </h2>
    </div>
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

export default {
  data() {
    return {
      calendly: null,
    };
  },
  computed: {
    ...mapGetters("authStore", ["user"]),
    ...mapGetters("propertiesStore", ["createdProperty"]),
    completeAddress() {
      const { address, zone, city, state, country } =
        this.$route.params.location;
      return `${address},${zone} - ${city} (${state}), ${country}`;
    },
  },
  methods: {
    initCalenly() {
      console.log(
        "%cSchedule.vue line:48 this.calendly",
        "color: #007acc;",
        this.calendly
      );
      const { name } = this.$route.params.location;

      this.calendly.initInlineWidget({
        url: `${process.env.VUE_APP_VISIT}?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=2323d5&utm_campaign=tecnica`,
        parentElement: document.getElementById("calendly-widget"),
        prefill: {
          name: this.isAuth
            ? `${this.user.user.firstName} ${this.user.user.lastName}`
            : "",
          email: this.isAuth ? `${this.user.user.email}` : "",
          customAnswers: {
            a1: `${name}`,
            a2: `${this.completeAddress}`,
            a3: "",
          },
        },
      });
    },
  },
  mounted() {
    this.calendly = window.Calendly;
    this.initCalenly();
  },

  beforeDestroy() {
    // const widgetScript = document.getElementById(WIDGET_ID);
    // window.Calendly.destroyBadgeWidget();
    // widgetScript.remove();
  },
  metaInfo: {
    title: "Agendar Visita Tecnica",
  },
};
</script>

<style></style>
