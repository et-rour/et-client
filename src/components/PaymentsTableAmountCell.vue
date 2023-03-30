<template>
  <span>$ {{ displayValue }}</span>
</template>

<script>
export default {
  data() {
    return {
      displayValue: "",
    };
  },
  beforeMount() {
    this.displayValue = this.params.value
  },
};
</script>

<style>
</style>