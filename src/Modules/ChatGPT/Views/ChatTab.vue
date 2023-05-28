<template>
  <div
    class="fixed bottom-0 right-12 w-80 z-50 rounded-t-xl overflow-hidden bg-white shadow-xl border flex flex-col text-gray-500"
    :class="isOpenChatTab">
    <div
      class="w-full flex justify-between px-4 py-3 border items-center flex-grow-0 cursor-pointer"
      @click="isOpen = !isOpen">
      <div class="flex gap-3">
        <div
          class="w-8 h-8 rounded-full flex-shrink-0 flex justify-center items-center bg-red-500">
          <span class="text-white font-bold">Cl</span>
        </div>
        <p
          class="text-lg font-semibold text-black whitespace-nowrap flex-grow w-56 overflow-ellipsis overflow-hidden">
          Clara - Espacio Temporal
        </p>
      </div>

      <font-awesome-icon icon="times" class="text-xl flex-shrink-0" />
    </div>
    <div
      class="w-full overflow-y-scroll flex-grow flex flex-col gap-4 px-4 pt-6 pb-6">
      <ChatBubbleVue
        v-for="(message, index) in messages"
        :key="`message_${index}`"
        :message="message"
        :date="message.date" />

      <div class="text-black text-sm flex gap-2" v-if="isSending">
        <div
          class="w-8 h-8 rounded-full flex-shrink-0 flex justify-center items-center bg-red-500">
          <span class="text-white font-bold">Cl</span>
        </div>

        <div class="">
          <p><span class="font-semibold">Clara</span></p>
          <span>Pensando...</span>
        </div>
      </div>
    </div>
    <div class="w-full flex-grow-0 px-2 pb-3 border-2">
      <div class="overflow-x-scroll flex gap-3 p-2 custom-scrollbar">
        <span
          v-for="(question, index) in [
            '¿Quién eres?',
            '¿Qué puedes hacer?',
            '¿Cuáles son las preguntas frecuentes?',
            'Dame un tour',
          ]"
          :key="`question_${index}`"
          class="px-2 py-1 text-xs inline-block whitespace-nowrap bg-gray-200 rounded-full border-gray-300 text-black cursor-pointer hover:bg-gray-300"
          @click="onClickSugestedMessage(question)"
          >{{ question }}</span
        >
      </div>
      <input
        class="my-input border bg-gray-200 w-full h-16"
        v-model="message"
        @keypress.enter="onSubmitMessage" />
    </div>
  </div>
</template>
<script>
import { CustomErrorToast } from "../../../sweetAlert";
import ChatBubbleVue from "../Components/ChatBubble.vue";
import { POST_MESSAGE } from "../Services/chat_services";
export default {
  components: {
    ChatBubbleVue,
  },
  data() {
    return {
      isOpen: true,
      message: "",
      messages: [
        {
          role: "assistant",
          content:
            "Hola, puedes iniciar la conversación preguntándome quien soy.",
        },
      ],
      isSending: false,
    };
  },
  computed: {
    isOpenChatTab() {
      return this.isOpen ? "h-96" : "h-14";
    },
  },
  methods: {
    onClickSugestedMessage(message) {
      this.message = message;
      this.onSubmitMessage();
    },
    async onSubmitMessage() {
      try {
        this.isSending = true;
        this.messages.push({
          role: "user",
          content: this.message,
          date: this.$moment().format("hh:mm"),
        });
        const { response } = await POST_MESSAGE(this.messages);

        this.messages.push({
          ...response.choices[0].message,
          date: this.$moment().format("hh:mm"),
        });
        this.isSending = false;
        this.message = "";
      } catch (error) {
        this.isSending = false;
        CustomErrorToast.fire({ text: error || error });
      }
    },
  },
};
</script>
<style></style>
