<template>
  <div class="flex justify-center items-center">
    <font-awesome-icon
      icon="spinner"
      class="animate-spin"
      v-if="value === 100 && imageUrl === null"
    />
    <div
      class="rounded-xl overflow-hidden"
      v-if="value > 0 && imageUrl === null"
    >
      <progress max="100" :value="value" class="progress" />
    </div>
    <div
      class="flex justify-center items-center"
      v-if="value === 100 && imageUrl !== null"
    >
      <a
        @click="openImage"
        target="_blank"
        class="block hover:text-blue-800 relative z-50 cursor-pointer"
        >{{ $t("general.seeImage") }}</a
      >
      <font-awesome-icon icon="check" class="text-green-400 ml-2" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
    },
    imageUrl: {
      type: String,
    },
  },
  methods: {
    openImage() {
      window.open(this.imageUrl, "_blank");
    },
  },
};
</script>

<style scoped>
progress {
  border-radius: 7px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
}
progress::-webkit-progress-bar {
  background-color: rgba(29, 78, 216, 1);
  border-radius: 7px;
}
progress::-webkit-progress-value {
  background-color: rgba(30, 58, 138, 1);
  border-radius: 7px;
}
</style>
