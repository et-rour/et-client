<template>
  <span>{{ displayValue }}</span>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      displayValue: "",
    };
  },
  beforeMount() {
    this.displayValue = moment(this.params.value)
      .format("MMMM DD YYYY, hh:mm A");
  },
};
</script>

<style>
</style>