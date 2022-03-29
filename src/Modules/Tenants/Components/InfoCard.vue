<template>
  <div class="w-full h-60 lg:h-80 border">
    <img
      :src="property.image"
      alt="location image"
      class="h-32 lg:h-48 w-full object-cover"
    />
    <div class="py-4 px-2">
      <router-link
        :to="{ name: 'tenants-detail', params: { id: property.id } }"
        >{{ property.name }}</router-link
      >
      <p class="text-gray-500">
        <span class="text-black">${{ property.value }}</span
        >/{{ property.address }}
      </p>
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

<style></style>
