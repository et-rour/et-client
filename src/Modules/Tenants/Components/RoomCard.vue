<template>
  <div>
    <div class="w-full h-40 my-4 flex gap-4">
      <div class="w-9/12 sm:w-6/12 lg:w-1/3 h-full bg-gray-200">
        <img
          :src="room.image"
          class="w-full h-full object-contain"
          alt="project"
        />
      </div>
      <div class="flex flex-col justify-center relative">
        <span class="absolute top-0 left-0 text-gray-400"
          >{{ room.squareMeter }} mts&sup2;</span
        >
        <p class="align-middle text-lg font-bold">{{ room.name }}</p>
        <p class="align-middle text-lg font-bold">{{ price }}</p>
      </div>
    </div>
    <hr class="solid my-4" />
  </div>
</template>

<script>
export default {
  props: {
    room: {
      type: Object,
      required: true,
    },
  },
  computed: {
    price() {
      return this.room.value === 0
        ? `${this.$t("tenants.details.included")}`
        : `${this.$t("tenants.details.notIncluded")} $${this.room.value}`;
    },
  },
};
</script>

<style></style>
