<template>
  <ul class="flex flex-col gap-2 h-40 md:h-auto relative">
    <router-link
      v-for="publication in publicationsList"
      :to="{
        name: 'admin-publications-detail',
        params: { id: `${publication.id}` },
        hash: '#details',
      }"
      :key="publication.id"
      active-class="active-class-admin "
      class="cursor-pointer border p-1"
    >
      <span class="block">{{ publication.id }}.-{{ publication.title }}</span>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: {
    publicationsList: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
