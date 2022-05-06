<template>
  <div class="px-2 py-3 pb-40 md:pb-6 my-container">
    <h2 class="my-title text-center font-bold">
      {{ $t("tenants.schedule.title") }}
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
    <!-- <p class="text-center mt-4">{{ $t("tenants.schedule.descriprion") }}:</p>
    <p class="text-center font-bold">Jueves 28 de diciembre</p>
    <div class="w-full flex justify-center my-4 items-center gap-2">
      <label for="horary">{{ $t("tenants.schedule.schedule") }}</label>
      <select name="select" class="py-1 px-2 bg-gray-300 rounded">
        <option value="value1">8:00 AM</option>
        <option value="value2">9:00 AM</option>
        <option value="value3">10:00 AM</option>
        <option value="value4">11:00 AM</option>
        <option value="value5">12:00 AM</option>
        <option value="value6">1:00 PM</option>
        <option value="value7">2:00 PM</option>
        <option value="value8">3:00 PM</option>
        <option value="value9">4:00 PM</option>
        <option value="value10">5:00 PM</option>
        <option value="value11">6:00 PM</option>
        <option value="value12">7:00 PM</option>
        <option value="value13">8:00 PM</option>
        <option value="value14">9:00 PM</option>
        <option value="value15">10:00 PM</option>
      </select>
    </div>
    <div class="w-full flex justify-center">
      <button
        class="bg-my-blue-primary my-btn text-white font-bold"
        @click="submitSchedule"
      >
        <a>{{ $t("tenants.schedule.vistit") }}</a>
      </button>
    </div> -->
  </div>
</template>

<script>
export default {
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
