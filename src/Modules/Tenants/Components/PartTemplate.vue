<template>
  <div class="grid grid-cols-1 md:grid-cols-2">
    <div class="grid grid-rows-2">
      <slot class="font-black text-2xl my-5" name="title"></slot>
      <div class="border-t pt-5">
        <slot class="font-black text-2xl my-5" name="button"></slot>
      </div>
    </div>

    <div>
      <slot class="font-black text-2xl my-5" name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
