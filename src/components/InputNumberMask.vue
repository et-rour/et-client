<template>
  <input
    type="text"
    :value="formatedValue"
    autocomplete="off"
    @input="onInput"
    ref="input"
  />
</template>

<script>

export default {
  emit:["changeValue"],
  props: ["value"],
  methods: {
    onInput(e) {
      const INPUT_NUMBER_MASK_MAX_NUMBER = 999999999
      const inputValue = e.target.value;
      

      if (inputValue === "") {
        console.log('%cerror InputNumberMask.vue line:23 ', 'color: red; display: block; width: 100%;');
        this.$emit("changeValue", "");
        return
      }

      const regExOnlyNumbers = new RegExp("^[,0-9]+$");

      if (!inputValue.match(regExOnlyNumbers)) {
        this.$refs.input.value = this.formatedValue;
        return;
      }

      const cleanValue = inputValue.replaceAll(",", "")

      if (cleanValue > INPUT_NUMBER_MASK_MAX_NUMBER) {
        // console.log('%cerror InputNumberMask.vue line:20 ', 'color: red; display: block; width: 100%;', );
        this.$refs.input.value = this.formatedValue;
        return
      }
      
      // console.log('%cInputNumberMask.vue line:29 cleanValue', 'color: white; background-color: #007acc;', cleanValue);
      this.$emit("changeValue", cleanValue);
    },
  },
  computed:{
    formatedValue(){
      return this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
</script>

<style></style>
