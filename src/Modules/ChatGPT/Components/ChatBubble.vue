<template>
  <div class="text-black text-sm flex gap-2">
    <div
      class="w-8 h-8 rounded-full flex-shrink-0 flex justify-center items-center"
      :class="isAssistantMessage ? 'bg-red-500' : 'bg-blue-500'">
      <span class="text-white font-bold">{{
        isAssistantMessage ? "Cl" : "Y"
      }}</span>
    </div>

    <div class="">
      <p>
        <span class="font-semibold">
          {{ isAssistantMessage ? "Clara" : "Yo" }}
        </span>
        <span class="text-sm text-gray-400 font-normal" v-if="message.date">
          · {{ message.date }}
        </span>
      </p>
      <div
        class="rounded-md px-2 py-1 rounded-"
        :class="isAssistantMessage ? 'bg-green-200' : 'bg-blue-200'">
        <span>{{ message.content }}</span>
      </div>
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
  computed: {
    isAssistantMessage() {
      return this.message.role !== "user";
    },
  },
};
</script>
<style></style>
