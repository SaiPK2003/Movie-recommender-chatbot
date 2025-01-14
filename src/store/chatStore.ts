import { create } from 'zustand';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatState {
  messages: Message[];
  addMessage: (content: string, isBot: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (content: string, isBot: boolean) => 
    set((state) => ({
      messages: [...state.messages, {
        id: Math.random().toString(36).substring(7),
        content,
        isBot,
        timestamp: new Date()
      }]
    })),
  clearMessages: () => set({ messages: [] })
}));