<template>
  <ul class="flex flex-col h-40 md:h-auto relative">
    <router-link
      v-for="location in locationsList"
      :to="{
        name: 'admin-trash-location',
        params: { id: location.id },
        hash: `${location.id}`,
      }"
      :key="location.id"
      active-class="active-class-admin "
    >
      <a>
        <div
          class="cursor-pointer p-1 hover:bg-my-blue-primary hover:text-white"
        >
          <span class="block"
            ><b>{{ location.name }}</b></span
          >
          <span>{{ location.zone.city }} ({{ location.zone.country }})</span>
        </div>
      </a>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: {
    locationsList: {
      type: Array,
    },
  },
};
</script>

<style></style>
