<template>
  <div class="pb-40 md:pb-6">
    <div class="my-container text-center">
      <h2 class="my-title text-center font-bold">
        {{ $t("schedule.title") }}
      </h2>
      <p class="text-gray-500 text-xl">
        {{ $t("schedule.description") }}
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
  data() {
    return {};
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
  mounted() {
    if (window.Calendly) {
      const { name } = this.$route.params.location;

      window.Calendly.initInlineWidget({
        url: `${process.env.VUE_APP_VISIT}?hide_event_type_details=1&utm_campaign=tecnica`,
        parentElement: document.getElementById("calendly-widget"),
        prefill: {
          name: `${this.user.user.firstName} ${this.user.user.lastName}`,
          email: `${this.user.user.email}`,
          customAnswers: {
            a1: `${name}`,
            a2: `${this.completeAddress}`,
            a3: "",
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
  metaInfo: {
    title: "Agendar Visita Tecnica",
  },
};
</script>

<style></style>
