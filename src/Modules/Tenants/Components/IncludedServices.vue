<template>
  <div class="w-full bg-my-celest text-white py-20">
    <div class="my-container grid grid-cols-1 md:grid-cols-6 gap-6">
      <div class=" col-span-2">
        <h4 class="text-5xl font-bold mb-4">
          {{ $t("tenants.details.includedServises") }}
        </h4>
        <p class="text-xl"> {{$t('tenants.details.includedServisesDescription')}} </p>

      </div>

      <div class=" col-span-4 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 md:px-10">
        <div
          v-for="service in data"
          :key="service.id"
          class="flex items-center justify-center md:justify-start "
          v-show="services[service.id] === true"
        >
          <template>
            <p class="inline-block text-left w-36 font-bold">{{ service.text }}</p>
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
