<template>
  <div
    @click="closeModalEvent"
    v-show="showModal"
    class="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeModalEvent() {
      this.$emit("toogle");
    },
  },
};
</script>

<style></style>
