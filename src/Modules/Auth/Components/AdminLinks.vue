<template>
  <div class="flex flex-col gap-2 w-full justify-center px-10">
    <button
      class="my-btn w-full font-medium tracking-widest"
      @click="clickedLink('home')"
    >
      {{ $t("login.succesModal.buttonOpcion1Admin") }}
    </button>
    <button
      class="my-btn w-full font-medium tracking-widest"
      @click="clickedLink('admin-users')"
    >
      {{ $t("login.succesModal.buttonOpcion2Admin") }}
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
