import React from "react";
import { ChatProvider, useChatContext } from "./context/ChatContext";
import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";
import InputBar from "./components/InputBar";
import Sidebar from "./components/Sidebar";
import SafetyNotice from "./components/SafetyNotice";

const AppLayout: React.FC = () => {
  const { errorMessage, clearError, highContrast, largeText } = useChatContext();

  return (
    <div className={`app-shell ${highContrast ? "high-contrast" : ""} ${largeText ? "large-text" : ""}`}>
      <Header />
      <SafetyNotice />
      {errorMessage && (
        <div className="error-banner" role="alert" aria-live="assertive">
          <span>{errorMessage}</span>
          <button type="button" onClick={clearError} aria-label="Dismiss error">
            ✕
          </button>
        </div>
      )}
      <main className="content-layout">
        <section className="chat-section" aria-label="Chat window">
          <ChatWindow />
          <InputBar />
        </section>
        <aside className="sidebar-section" aria-label="Helpful tips and settings">
          <Sidebar />
        </aside>
      </main>
    </div>
  );
};

const App: React.FC = () => (
  <ChatProvider>
    <AppLayout />
  </ChatProvider>
);

export default App;
