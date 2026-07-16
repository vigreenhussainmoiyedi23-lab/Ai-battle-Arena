import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/* ── Types ── */
export interface Judgement {
  solution1Score: number;
  solution2Score: number;
  recommendation: "1" | "2" | "0";
}

export interface ChatMessage {
  id: string;
  role: "user" | "ai";
  content?: string; // for user messages
  solution1?: string; // ai response 1 (Groq)
  solution2?: string; // ai response 2 (Cohere)
  judgement?: Judgement;
}

export interface ChatSession {
  chatId: string; 
  topic: string;
  createdAt: string;
}

interface ChatState {
  sessions: ChatSession[];
  activeChatId: string | null;
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  sessions: [],
  activeChatId: null,
  messages: [],
  isLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    chatStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    chatSuccess: (state) => {
      state.isLoading = false;
    },
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
    chatFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setActiveChatId: (state, action: PayloadAction<string>) => {
      state.activeChatId = action.payload;
    },
    setSessions: (state, action: PayloadAction<ChatSession[]>) => {
      state.sessions = action.payload;
    },
    addSession: (state, action: PayloadAction<ChatSession>) => {
      state.sessions.unshift(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
      state.activeChatId = null;
    },
  },
});

export const {
  chatStart,
  chatSuccess,
  addMessage,
  chatFailure,
  setActiveChatId,
  setSessions,
  addSession,
  clearMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
