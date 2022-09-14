<template>
  <input
    type="text"
    :value="value"
    autocomplete="off"
    @input="onInput"
    ref="input"
  />
</template>

<script>
export default {
  props: ["value"],
  methods: {
    onInput(e) {
      const value = e.target.value;
      console.log(
        "%cInputNumber.vue line:11 {value,value2:this.value}",
        "color: #007acc;",
        { value, value2: this.value }
      );
      const regExOnlyNumbers = new RegExp("^[,0-9]+$");

      if (!value.match(regExOnlyNumbers)) {
        console.log(
          "%cerror CreateForm.vue line:735 ",
          "color: red; display: block; width: 100%;"
        );
        this.$refs.input.value = this.value;
        return;
      }
      const newValue = value
        .replaceAll(",", "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.$emit("input", newValue);
    },
  },
};
</script>

<style></style>
