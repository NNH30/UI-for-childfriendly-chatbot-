import React from "react";
import { useChatContext } from "../context/ChatContext";

const Sidebar: React.FC = () => {
  const { highContrast, largeText, toggleHighContrast, toggleLargeText } = useChatContext();

  return (
    <div className="sidebar">
      <section className="card profile-card" aria-label="Your profile">
        <div className="profile-avatar" aria-hidden="true">
          😊
        </div>
        <div>
          <p className="profile-label">You</p>
          <p className="profile-name">Explorer</p>
        </div>
      </section>

      <section className="card" aria-label="Safety and guidance">
        <h3>Safety & Guidance</h3>
        <ul className="friendly-list">
          <li>If something feels weird, ask a trusted adult.</li>
          <li>Keep your full name and address private.</li>
          <li>Be kind and respectful.</li>
        </ul>
      </section>

      <section className="card" aria-label="Tips">
        <h3>Quick tips</h3>
        <ul className="friendly-list">
          <li>Ask for help with homework or new words.</li>
          <li>Share pictures of drawings or crafts.</li>
          <li>Try saying "Tell me a riddle!"</li>
        </ul>
      </section>

      <section className="card" aria-label="Settings">
        <h3>Settings</h3>
        <div className="toggle-row">
          <span>High contrast</span>
          <button type="button" className="toggle" onClick={toggleHighContrast} aria-pressed={highContrast}>
            {highContrast ? "On" : "Off"}
          </button>
        </div>
        <div className="toggle-row">
          <span>Larger text</span>
          <button type="button" className="toggle" onClick={toggleLargeText} aria-pressed={largeText}>
            {largeText ? "On" : "Off"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
