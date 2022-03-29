<template>
  <div class="px-2 py-3 pb-40 md:pb-6 my-container">
    <h2 class="my-title text-center font-bold">
      {{ $t("schedule.title") }}
    </h2>
    <div class="w-full h-screen text-center">
      <!-- Calendly inline widget begin -->
      <div
        class="calendly-inline-widget"
        :data-url="urlCalendly"
        style="min-width: 320px; height: 650px"
      ></div>
      <!-- Calendly inline widget end -->
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    submitSchedule(e) {
      e.preventDefault();
      this.$router.push({ name: "scheduleResult" });
    },
  },
  computed: {
    urlCalendly() {
      return `${process.env.VUE_APP_VISIT}?primary_color=1d4ed8`;
    },
  },
  mounted() {
    const recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "https://assets.calendly.com/assets/external/widget.js"
    );
    document.head.appendChild(recaptchaScript);
  },
};
</script>

<style></style>
