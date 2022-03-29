<template>
  <div class="border h-72 w-full grid grid-rows-2">
    <div class="w-full h-full">
      <img
        :src="property.image"
        alt="location image"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="bg-white p-3">
      <router-link
        :to="{ name: 'tenants-detail', params: { id: property.id } }"
        class="text-gray-400"
      >
        <span class="text-black" v-if="property.value !== '0'"
          >{{ $t("landing.propertyCard.from") }} {{ property.value }}/{{
            $t("landing.propertyCard.montly")
          }}</span
        >
        <span class="text-black" v-else
          >{{ $t("landing.propertyCard.noValue") }} /
        </span>
        {{ property.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    property: {
      type: Object,
      required: true,
    },
  },
};
</script>
