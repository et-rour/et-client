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
    console.log(
      "%cPaymentsTableDateCell.vue line:13 this.params.value",
      "color: white; background-color: #007acc;",
      this.params.value
    );
    this.displayValue = moment
      .unix(this.params.value)
      .format("MMMM DD YYYY, hh:mm A");
  },
};
</script>

<style>
</style>