<template>
  <div class="w-full bg-my-blue-primary text-white py-20">
    <div class="my-container">
      <h4 class="text-2xl font-bold mb-10">
        {{ $t("tenants.details.includedServises") }}
      </h4>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        <div
          v-for="service in data"
          :key="service.id"
          class="flex items-center justify-center md:justify-start"
          v-show="services[service.id] === true"
        >
          <template>
            <p class="inline-block text-left w-24">{{ service.text }}</p>
            <img
              :src="require(`@/assets/icons/white_services/${service.image}`)"
              alt="box"
              class="w-12 h-12"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    services: {
      type: Object,
    },
  },
  data() {
    return {
      data: [
        {
          id: "vault",
          image: "Grupo 42.svg",
          text: this.$t("tenants.details.vault"),
        },
        {
          id: "parking",
          image: "Grupo 41.svg",
          text: this.$t("tenants.details.parking"),
        },
        {
          id: "cleaning",
          image: "Grupo 40.svg",
          text: this.$t("tenants.details.cleaning"),
        },
        {
          id: "bathrooms",
          image: "Grupo 39.svg",
          text: this.$t("tenants.details.toilets"),
        },
        {
          id: "wifi",
          image: "Grupo 38.svg",
          text: this.$t("tenants.details.wifi"),
        },
        {
          id: "security",
          image: "Grupo 37.svg",
          text: this.$t("tenants.details.security"),
        },
      ],
    };
  },
};
</script>

<style></style>
