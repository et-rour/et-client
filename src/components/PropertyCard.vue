<template>
  <div class="flex flex-col h-80">
    <div class="h-2/3 w-full">
      <img
        @click="
          $router.push({ name: 'tenants-detail', params: { id: property.id } })
        "
        :src="property.image"
        alt="location_image"
        class="object-cover h-full w-full cursor-pointer"
      />
    </div>
    <div class="bg-white p-3 pr-12 h-1/3 w-full border">
      <router-link
        :to="{ name: 'tenants-detail', params: { id: property.id } }"
        class="text-gray-400"
      >
        <span class="text-black" v-if="property.value !== '0'"
          >{{ property.value }}/{{
        }}</span>
        <span class="text-black" v-else
          >{{ $t("landing.propertyCard.noValue") }} /
        </span>
        {{ $t("landing.propertyCard.montly") }}
        {{ property.name }}
        10 mts²
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
