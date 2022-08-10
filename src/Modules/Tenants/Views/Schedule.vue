<template>
  <div class="pb-40 md:pb-6">
    <div class="my-container text-center">
      <h2 class="my-title font-bold">
        {{ $t("tenants.schedule.title") }}
      </h2>
      <p class="text-gray-500 text-xl">
        {{ $t("tenants.schedule.description") }}
      </p>
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
  props: {
    idLocation: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      location: null,
      calendly: null,
    };
  },
  computed: {
    ...mapGetters("authStore", ["user"]),
    ...mapGetters("propertiesStore", ["propertiesById"]),
    completeAddress() {
      return `${this.location.address},${this.location.zone.zone} - ${this.location.zone.city} (${this.location.zone.state}), ${this.location.zone.country}`;
    },
  },
  methods: {
    initCalenly() {
      console.log(
        "%cSchedule.vue line:48 this.calendly",
        "color: #007acc;",
        this.calendly
      );

      this.calendly.initInlineWidget({
        url: `${process.env.VUE_APP_VISIT}?hide_event_type_details=1&utm_campaign=normal`,
        parentElement: document.getElementById("calendly-widget"),
        prefill: {
          name: `${this.user.user.firstName} ${this.user.user.lastName}`,
          email: `${this.user.user.email}`,
          customAnswers: {
            a1: `${this.location.name}`,
            a2: `${this.completeAddress}`,
            a3: "",
          },
        },
      });
    },
  },
  mounted() {
    this.location = this.propertiesById(Number(this.idLocation));
    this.calendly = window.Calendly;
    this.initCalenly();
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
