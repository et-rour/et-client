<template>
  <div
    :class="isVisibleClass"
    class="bg-gray-300 w-80 h-5/6 fixed top-20 shadow overflow-y-scroll right-0">
    <button
      class="bg-red-300 absolute top-0 -right-10 p-2 px-4"
      @click="isVisible = !isVisible">
      X
    </button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: true,
    };
  },
  computed: {
    isVisibleClass() {
      return "rigth-0";
      // return this.isVisible ? "left-0 bg-blue-400" : "-left-80 bg-red-600";
    },
  },
};
</script>

<style></style>
