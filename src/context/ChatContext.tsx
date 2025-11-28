import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { callChatbotModel } from "../api/chatbotApi";

export type Sender = "child" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  sender: Sender;
  text: string;
  imageUrl?: string;
  createdAt: string;
  status?: "pending" | "sent" | "error";
}

interface ChatContextValue {
  messages: ChatMessage[];
  sendChildMessage: (text: string, imageFile?: File | null) => Promise<void>;
  isSending: boolean;
  errorMessage: string | null;
  clearError: () => void;
  highContrast: boolean;
  largeText: boolean;
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

const generateId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `msg-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  const sendChildMessage = useCallback(async (text: string, imageFile?: File | null) => {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    setErrorMessage(null);
    setIsSending(true);

    const imageUrl = imageFile ? URL.createObjectURL(imageFile) : undefined;

    const childMessage: ChatMessage = {
      id: generateId(),
      sender: "child",
      text: trimmed,
      imageUrl,
      createdAt: new Date().toISOString(),
      status: "sent",
    };

    const assistantPlaceholder: ChatMessage = {
      id: generateId(),
      sender: "assistant",
      text: "Thinking…",
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    setMessages((prev) => [...prev, childMessage, assistantPlaceholder]);

    try {
      const response = await callChatbotModel({ text: trimmed, imageFile });
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantPlaceholder.id
            ? {
                ...msg,
                text: response.text,
                status: "sent",
                createdAt: new Date().toISOString(),
              }
            : msg
        )
      );
    } catch (error) {
      console.error("Error contacting chatbot model", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantPlaceholder.id
            ? { ...msg, text: "Oops, I had a problem answering. Can you try again?", status: "error" }
            : msg
        )
      );
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  }, []);

  const clearError = useCallback(() => setErrorMessage(null), []);

  const toggleHighContrast = useCallback(() => setHighContrast((prev) => !prev), []);
  const toggleLargeText = useCallback(() => setLargeText((prev) => !prev), []);

  const value = useMemo(
    () => ({
      messages,
      sendChildMessage,
      isSending,
      errorMessage,
      clearError,
      highContrast,
      largeText,
      toggleHighContrast,
      toggleLargeText,
    }),
    [messages, isSending, errorMessage, highContrast, largeText, sendChildMessage, toggleHighContrast, toggleLargeText, clearError]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = (): ChatContextValue => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
