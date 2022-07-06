<template>
  <ul class="flex flex-col gap-2 h-40 md:h-auto relative">
    <router-link
      v-for="review in reviewsList"
      :to="{
        name: 'admin-reviews-detail',
        params: { id: `${review.id}` },
        hash: '#details',
      }"
      :key="review.id"
      active-class="active-class-admin "
      class="cursor-pointer border p-1"
    >
      <span class="block">{{ review.id }}.-{{ review.title }}</span>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: {
    reviewsList: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
