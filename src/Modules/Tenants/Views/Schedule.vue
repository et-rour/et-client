<template>
  <div class="pb-40 md:pb-6">
    <!-- {{ userData }}
    {{ locationData }} -->
    <div class="my-container text-center">
      <h2 class="my-title font-bold">
        {{ $t("tenants.schedule.title") }}
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
      userData: null,
      locationData: null,
      calendly: null,
    };
  },
  computed: {
    ...mapGetters("authStore", ["user"]),
    ...mapGetters("propertiesStore", ["getPropertyDetails"]),
    completeAddress() {
      return `${this.locationData.address},${this.locationData.zone.zone} - ${this.locationData.zone.city} (${this.locationData.zone.state}), ${this.locationData.zone.country}`;
    },
  },
  methods: {
    initCalenly() {
      this.calendly.initInlineWidget({
        url: `${this.locationData.calendlyLink?this.locationData.calendlyLink:process.env.VUE_APP_VISIT}?hide_event_type_details=1&hide_gdpr_banner=1&utm_campaign=normal`,
        parentElement: document.getElementById("calendly-widget"),
        prefill: {
          name: this.userData
            ? `${this.userData.firstName} ${this.userData.lastName}`
            : "",
          email: this.userData ? `${this.userData.email}` : "",
          customAnswers: {
            a1: `${this.locationData.name}`,
            a2: `${this.completeAddress}`,
            a3: "",
          },
        },
      });
    },
    loadLocationAndUserData() {
      this.userData = this.user.user;
      this.locationData = this.getPropertyDetails;
      this.calendly = null;
      this.calendly = window.Calendly;
      this.initCalenly();
      console.log(
        "%cSchedule.vue line:78 this.calendly",
        "color: #26bfa5;",
        this.calendly
      );
    },
  },
  mounted() {
    this.loadLocationAndUserData();
  },

  metaInfo: {
    title: "Agendar Visita",
  },

  beforeDestroy() {
    // const widgetScript = document.getElementById(WIDGET_ID);
    // window.Calendly.destroyBadgeWidget();
    // widgetScript.remove();
  },
};
</script>

<style></style>
