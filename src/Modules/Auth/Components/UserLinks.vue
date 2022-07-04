<template>
  <div class="flex flex-col gap-2 w-full justify-center px-10">
    <button
      class="my-btn w-full font-medium tracking-widest"
      @click="clickedLink('owner')"
    >
      {{ $t("login.succesModal.buttonOpcion1") }}
    </button>
    <button
      class="my-btn w-full font-medium tracking-widest"
      @click="clickedLink('tenants')"
    >
      {{ $t("login.succesModal.buttonOpcion2") }}
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    clickedLink(link) {
      this.$emit("redirectTo", link);
    },
  },
};
</script>

<style></style>
