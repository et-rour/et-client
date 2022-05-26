<template>
  <div class="h-full flex-grow flex flex-col md:flex-row">
    <div class="w-full md:w-64 h-40 md:h-full overflow-y-auto relative py-4">
      <slot name="sidebar"></slot>
    </div>

    <div class="flex-grow flex justify-center items-center">
      <slot name="main"></slot>
    </div>
  </div>
</template>

<style></style>
