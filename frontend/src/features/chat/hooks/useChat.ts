import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/redux/hook";
import {
  addMessage,
  addSession,
  chatFailure,
  chatStart,
  chatSuccess,
  setSessions,
} from "../chatSlice";
import {
  GetChatAPI,
  GetMessagesAPI,
  InvokeGraphAPI,
} from "../services/api.service";
export const useChat = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  async function InvokeGraph(data: { prompt: string; chatId?: string }) {
    try {
      dispatch(chatStart());
      const { chat, newMessage } = await InvokeGraphAPI(data);
      if (!data.chatId)
        dispatch(
          addSession({
            chatId: chat._id,
            topic: chat.topic,
            createdAt: new Date().toISOString(),
          }),
          navigate(`/chat/${chat._id}`),
        );
      dispatch(addMessage(newMessage));
      dispatch(chatSuccess());
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        dispatch(chatFailure(error.message));
      }
    }
  }
  async function GetMessages(chatId: string) {
    try {
      const { messages } = await GetMessagesAPI(chatId);
      messages.map((message: any) => dispatch(addMessage(message)));
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
  async function GetChats() {
    try {
      const { chats } = await GetChatAPI();
      console.log(chats);

      dispatch(
        setSessions(
          chats.map(
            (chat: { _id: string; topic: string; createdAt: string }) => ({
              ...chat,
              chatId: chat._id,
            }),
          ),
        ),
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        navigate("/login");
      }
    }
  }
  return { InvokeGraph, GetMessages, GetChats };
};
