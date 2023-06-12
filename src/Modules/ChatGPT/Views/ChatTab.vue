<template>
  <div
    class="fixed bottom-0 right-12 w-80 z-50 rounded-t-xl overflow-hidden bg-white shadow-xl border flex flex-col text-gray-500"
    :class="isOpenChatTab">
    <div
      class="w-full flex justify-between pr-2 pl-4 py-3 border items-center flex-grow-0 cursor-pointer"
      @click="isOpen = !isOpen">
      <div class="flex gap-3">
        <div
          class="w-8 h-8 flex-shrink-0 flex justify-center items-center overflow-hidden relative">
          <img
            src="@/assets/images/elsa_ia.png"
            alt="clara"
            class="w-full h-full object-contain rounded-full" />
          <div
            class="w-3 h-3 rounded-full mr-1 flex-shrink-0 absolute -right-1 bottom-0"
            :class="
              isValidsocketConection ? 'bg-green-500' : 'bg-red-500'
            "></div>
        </div>
        <p
          class="text-lg font-semibold text-black whitespace-nowrap flex-grow w-56 overflow-ellipsis overflow-hidden">
          <!-- {{ user.token }} -->
          Clara - Espacio Temporal
        </p>
      </div>
      <font-awesome-icon icon="times" class="text-xl flex-shrink-0" />
    </div>
    <div class="w-full overflow-y-scroll flex-grow flex flex-col gap-4">
      <div class="w-full flex border-b-2 p-3">
        <img
          src="@/assets/images/elsa_ia.png"
          alt="clara"
          class="w-20 h-20 object-contain rounded-full border" />
        <div class="flex flex-col justify-center text-sm">
          <p>
            <span class="font-bold">Elsa</span> ·&nbsp;
            <span class="text-gray-400 font-normal">IA</span>
          </p>
          <p>Inteligencia Artificial</p>
        </div>
      </div>
      <ChatBubbleVue
        v-for="(message, index) in messages"
        :key="`message_${index}`"
        :message="message.content"
        :role="message.role"
        class="mx-2"
        :date="message.date" />

      <ChatBubbleVue
        v-if="response"
        :message="response"
        class="mx-2"
        :role="'assistant'"
        id="messageContainer" />
      <div class="w-0 h-0" id="bottomAnchor"></div>
    </div>
    <div class="w-full flex-grow-0 px-2 pb-3 border-2">
      <div class="overflow-x-scroll flex gap-3 p-2 custom-scrollbar">
        <button
          v-for="(question, index) in [
            '¿Quién eres?',
            '¿Qué puedes hacer?',
            '¿Cuáles son las preguntas frecuentes?',
            'Dame un tour',
          ]"
          :key="`question_${index}`"
          class="px-2 py-1 text-xs inline-block whitespace-nowrap bg-gray-200 rounded-full border-gray-300 text-black cursor-pointer hover:bg-gray-300"
          :class="isTinking && 'my-disabled'"
          :disabled="isTinking"
          @click="onClickSugestedMessage(question)">
          {{ question }}
        </button>
      </div>
      <input
        class="my-input border bg-gray-200 w-full h-16"
        v-model="message"
        :disabled="isTinking"
        @keypress.enter="onSubmitMessage" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ChatBubbleVue from "../Components/ChatBubble.vue";
export default {
  components: {
    ChatBubbleVue,
  },
  data() {
    return {
      isOpen: false,
      isValidsocketConection: null,
      socketConection: null,
      message: "",
      response: "",
      isTinking: false,
      messages: [
        {
          role: "assistant",
          content:
            "Hola, puedes iniciar la conversación preguntándome quien soy.",
        },
      ],
    };
  },
  computed: {
    isOpenChatTab() {
      return this.isOpen ? "h-96" : "h-14";
    },
    ...mapGetters("authStore", ["isAuth", "user"]),
  },
  methods: {
    onClickSugestedMessage(message) {
      this.message = message;
      this.onSubmitMessage();
    },
    onSubmitMessage() {
      this.messages.push({
        role: "user",
        content: this.message,
        date: this.$moment().format("hh:mm"),
      });
      this.message = "";
      this.isTinking = true;
      this.socketConection.send(
        JSON.stringify({ messages: this.messages, token: this.user.token })
      );
      document.getElementById("bottomAnchor").scrollIntoView();
    },
  },
  watch: {
    isOpen(newValue) {
      let context = this;

      if (newValue) {
        this.socketConection = new WebSocket(process.env.VUE_APP_WEB_SOCKETS);
        this.socketConection.addEventListener("open", () => {
          context.isValidsocketConection = true;
        });

        this.socketConection.addEventListener("message", function (event) {
          const message = JSON.parse(event.data);
          switch (message.status) {
            case "thinking":
              context.response += message.content;
              document.getElementById("bottomAnchor").scrollIntoView();
              break;
            case "done":
              context.messages.push({
                role: "assistant",
                content: context.response,
                date: context.$moment().format("hh:mm"),
              });
              context.response = "";
              document.getElementById("bottomAnchor").scrollIntoView();
              context.isTinking = false;
              break;
            case "error":
              context.messages.push({
                role: "assistant",
                content: message.content,
                date: context.$moment().format("hh:mm"),
              });
              context.response = "";
              document.getElementById("bottomAnchor").scrollIntoView();
              context.isTinking = false;
              break;
          }
        });
        this.socketConection.addEventListener("close", function () {
          // context.messages.push({
          //   role: "assistant",
          //   content: "Se cerro la conexión con el servidor",
          //   date: context.$moment().format("hh:mm"),
          // });
          context.isValidsocketConection = false;
          context.response = "";
        });
      } else {
        this.socketConection.close();
      }
    },
  },
};
</script>
<style></style>
