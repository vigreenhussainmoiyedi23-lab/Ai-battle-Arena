import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/redux/hook";
import { addMessage, chatFailure, chatStart, chatSuccess } from "../chatSlice";
import {
  GetChatAPI,
  GetMessagesAPI,
  InvokeGraphAPI,
} from "../services/api.service";
const dispatch = useAppDispatch();
const navigate = useNavigate();
export const useChat = () => {
  async function InvokeGraph(data: { prompt: string; chatId?: string }) {
    try {
      dispatch(chatStart());
      const { chatId, newMessage } = await InvokeGraphAPI(data);
      navigate(`/chat/${chatId}`);
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
      const responses = await GetMessagesAPI(chatId);
      console.log(responses);
      return responses;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
  async function GetChats() {
    try {
      const responses = await GetChatAPI();
      console.log(responses);
      return responses;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        navigate("/login");
      }
    }
  }
  return { InvokeGraph, GetMessages, GetChats };
};
