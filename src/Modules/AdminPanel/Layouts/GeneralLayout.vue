<template>
  <div
    class="h-full flex-grow flex flex-col md:flex-row mb-40 md:mb-0 border-t-2 border-black"
  >
    <div
      class="w-full md:w-64 h-40 md:h-full overflow-y-auto relative py-4 border-r-2 border-black"
      v-if="showSidebar"
    >
      <slot name="sidebar"></slot>
    </div>

    <div class="flex-grow flex justify-center items-center">
      <slot name="main"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showSidebar: {
      default: true,
    },
  },
};
</script>
<style></style>
