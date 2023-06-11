import EspacioAPI from "@/Api/index";
export { POST_MESSAGE };

async function POST_MESSAGE(messages) {
  const correctMessagesBody = messages.map((message) => ({
    content: message.content,
    role: message.role,
  }));
  const request = await EspacioAPI.post(`/general/chatText`, {
    messages: correctMessagesBody,
  });
  console.log("%cchat_services.js line:12 request", "color: #007acc;", request);
  return request.data;
}
