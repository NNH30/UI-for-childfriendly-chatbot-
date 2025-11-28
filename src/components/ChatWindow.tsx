import React, { useEffect, useRef } from "react";
import { useChatContext } from "../context/ChatContext";
import MessageBubble from "./MessageBubble";

const ChatWindow: React.FC = () => {
  const { messages } = useChatContext();
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-window" role="log" aria-live="polite">
      {messages.length === 0 ? (
        <div className="empty-state">Say hi to your chatbot!</div>
      ) : (
        messages.map((message) => <MessageBubble key={message.id} message={message} />)
      )}
      <div ref={endRef} />
    </div>
  );
};

export default ChatWindow;
