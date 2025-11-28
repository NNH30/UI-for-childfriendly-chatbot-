import React, { useCallback, useMemo, useRef, useState } from "react";
import { useChatContext } from "../context/ChatContext";
import ImagePreview from "./ImagePreview";

const InputBar: React.FC = () => {
  const { sendChildMessage, isSending } = useChatContext();
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const trimmedText = useMemo(() => text.trim(), [text]);
  const canSend = trimmedText.length > 0 && !isSending;

  const handleSend = useCallback(async () => {
    if (!trimmedText) return;
    await sendChildMessage(trimmedText, imageFile);
    setText("");
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [trimmedText, imageFile, sendChildMessage]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!isSending && trimmedText) {
        void handleSend();
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setImageFile(file);
  };

  return (
    <div className="input-bar">
      <div className="input-controls">
        <textarea
          className="message-input"
          aria-label="Type your message"
          placeholder="Write your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSending}
          rows={3}
        />
        <div className="input-actions">
          <label className="attach-button">
            📎 Attach picture
            <input
              type="file"
              accept="image/*"
              aria-label="Attach picture"
              onChange={handleFileChange}
              disabled={isSending}
              ref={fileInputRef}
            />
          </label>
          <button
            type="button"
            className="send-button"
            onClick={() => void handleSend()}
            aria-label="Send message"
            disabled={!canSend}
          >
            ➤ Send
          </button>
        </div>
      </div>
      {imageFile && <ImagePreview file={imageFile} onRemove={() => setImageFile(null)} />}
    </div>
  );
};

export default InputBar;
