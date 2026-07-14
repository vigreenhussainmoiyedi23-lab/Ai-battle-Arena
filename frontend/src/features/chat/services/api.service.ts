import api from "../../../app/axios";

export const GetChatAPI = async () => {
  const response = await api.get(`/api/get-chats`);
  return response.data;
};

export const GetMessagesAPI = async (chatId: string) => {
  const response = await api.get(`/api/get-messages/${chatId}`);
  return response.data;
};

export const InvokeGraphAPI = async (data: {
  prompt: string;
  chatId?: string;
}) => {
  const response = await api.post(`/api/invoke-graph`, data);
  return response.data;
};
