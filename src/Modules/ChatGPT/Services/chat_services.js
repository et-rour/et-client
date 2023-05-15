import EspacioAPI from "@/Api/index";
export { POST_MESSAGE };

async function POST_MESSAGE(messages) {
  const correctMessagesBody = messages.map((message) => ({
    content: message.content,
    role: message.role,
  }));
  const { data } = await EspacioAPI.post(`/general/chatText`, {
    messages: correctMessagesBody,
  });
  return data;
}
