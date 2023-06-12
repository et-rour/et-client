<template>
  <div class="text-black text-sm flex gap-2">
    <div
      v-if="!isAssistantMessage"
      class="w-8 h-8 rounded-full flex-shrink-0 flex justify-center items-center bg-blue-500">
      <span class="text-white font-bold">Y</span>
    </div>
    <div
      v-else
      class="w-8 h-8 rounded-full flex-shrink-0 flex justify-center items-center overflow-hidden">
      <img
        src="@/assets/images/elsa_ia.png"
        alt="clara"
        class="w-full h-full object-contain" />
    </div>

    <div class="">
      <p>
        <span class="font-semibold">
          {{ isAssistantMessage ? "Clara" : "Yo" }}
        </span>
        <span class="text-sm text-gray-400 font-normal" v-if="date">
          · {{ date }}
        </span>
      </p>
      <div
        class="rounded-md px-2 py-1"
        :class="isAssistantMessage ? 'bg-green-200' : 'bg-blue-200'">
        <span>{{ message }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
  },
  computed: {
    isAssistantMessage() {
      return this.role !== "user";
    },
  },
};
</script>
<style></style>
