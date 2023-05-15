<template>
  <div class="text-black text-sm flex gap-2">
    <div
      class="w-8 h-8 rounded-full flex-shrink-0 flex justify-center items-center"
      :class="message.role === 'assistant' ? 'bg-red-500' : 'bg-blue-500'">
      <span class="text-white font-bold">{{
        message.role === "assistant" ? "Cl" : "Y"
      }}</span>
    </div>

    <div class="">
      <p>
        <span class="font-semibold">
          {{ message.role === "assistant" ? "Clara" : "YO" }}
        </span>
        <span class="text-sm text-gray-400 font-normal" v-if="date">
          · {{ message.date }}
        </span>
      </p>
      <span>{{ message.content }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style></style>
