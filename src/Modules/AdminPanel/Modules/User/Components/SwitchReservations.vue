<template>
  <div class="w-80 bg-gray-400 h-10 my-4 grid grid-cols-2 gap-1">
    <div
      class="flex justify-center items-center font-semibold bg-gray-400 cursor-pointer"
      :class="isCreatedReservations && 'bg-green-300 pointer'"
      @click="toogle(true)"
    >
      <span>{{ $t("adminPanel.users.reservations.created") }}</span>
    </div>
    <div
      class="flex justify-center items-center font-semibold bg-gray-400 cursor-pointer"
      :class="!isCreatedReservations && 'bg-green-300 pointer'"
      @click="toogle(false)"
    >
      <span>{{ $t("adminPanel.users.reservations.received") }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isCreatedReservations: {
      required: true,
    },
  },
  methods: {
    toogle(value) {
      this.$emit("toogleValue", value);
    },
  },
};
</script>

<style></style>
