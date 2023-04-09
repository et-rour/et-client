<template>
  <span>{{ maskNumber }}</span>
</template>

<script>
export default {
  props: {
    number: {
      required: true,
      type: String,
    },
  },
  computed: {
    maskNumber() {
      return this.number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style></style>
