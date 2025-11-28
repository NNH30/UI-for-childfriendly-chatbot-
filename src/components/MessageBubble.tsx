import React from "react";
import { ChatMessage } from "../context/ChatContext";

interface MessageBubbleProps {
  message: ChatMessage;
}

const formatTime = (iso: string) => {
  const date = new Date(iso);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isChild = message.sender === "child";

  return (
    <div className={`message-row ${isChild ? "from-child" : "from-assistant"}`}>
      {!isChild && <div className="avatar" aria-hidden="true">🤖</div>}
      <div className={`bubble ${message.status === "error" ? "bubble-error" : ""}`}>
        <p className="bubble-text">{message.text}</p>
        {message.imageUrl && (
          <img
            src={message.imageUrl}
            alt="Shared attachment"
            className="bubble-image"
            loading="lazy"
          />
        )}
        <div className="bubble-meta">
          <span className="timestamp">{formatTime(message.createdAt)}</span>
          {message.status === "pending" && <span className="status">Thinking…</span>}
          {message.status === "error" && <span className="status">Tap to try again</span>}
        </div>
      </div>
      {isChild && <div className="avatar" aria-hidden="true">😊</div>}
    </div>
  );
};

export default MessageBubble;
