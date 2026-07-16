import api from "../../../app/axios";
type ApiError = {
  response: {
    data: unknown;
  };
};

function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response
  );
}

export const GetChatAPI = async () => {
  try {
    const response = await api.get(`/api/AI/get-chats`);
    return response.data;
  } catch (error) {
    if (isApiError(error)) return error?.response?.data;
  }
};

export const GetMessagesAPI = async (chatId: string) => {
  const response = await api.get(`/api/AI/get-messages/${chatId}`);
  return response.data;
};

export const InvokeGraphAPI = async (data: {
  prompt: string;
  chatId?: string;
}) => {
  try {
    const response = await api.post(`/api/AI/invoke-graph`, data);
    return response.data;
  } catch (error) {
    if (isApiError(error)) return error?.response?.data;
  }
};
