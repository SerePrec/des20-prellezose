import MessagesRepository from "../repositories/MessagesRepository.js";
import { Message } from "../model/entities/Message.js";
import { MessageDTO } from "../model/DTOs/MessageDTO.js";
import { escapeHtml, normalizeMessages } from "../utils/messageTools.js";

const messagesModel = new MessagesRepository();

export const getAllMessages = async () => {
  const messageEntities = await messagesModel.getAll();
  const messages = messageEntities.map(message => new MessageDTO(message));
  const normalizedMessages = normalizeMessages(messages);
  return normalizedMessages;
};

export const createMessage = async message => {
  const validMessage = Message.validate(message, true);
  if (!validMessage) throw new Error("Mensaje inválido");
  message.text = escapeHtml(message.text);
  const newMessageEntitie = new Message(message);
  const createdMessageEntitie = await messagesModel.save(newMessageEntitie);
  return new MessageDTO(createdMessageEntitie);
};
