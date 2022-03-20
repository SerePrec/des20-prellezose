import { messagesDAO as messagesModel } from "../model/index.js";
import { escapeHtml, normalizeMessages } from "../utils/messageTools.js";

export const getAllMessages = async () => {
  const messages = await messagesModel.getAll();
  const normalizedMessages = normalizeMessages(messages);
  return normalizedMessages;
};

export const createMessage = async message => {
  if (!message.author || !message.text.trim())
    throw new Error("Mensaje inválido");
  message.text = escapeHtml(message.text);
  const newMessage = { ...message };
  const createdMessage = await messagesModel.save(newMessage);
  return createdMessage;
};
