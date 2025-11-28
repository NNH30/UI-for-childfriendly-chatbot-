import React from "react";

const SafetyNotice: React.FC = () => (
  <div className="safety-notice" role="note">
    <span className="notice-icon" aria-hidden="true">
      ℹ️
    </span>
    <p className="notice-text">
      This chatbot is here to help you learn. It cannot replace parents, teachers, or doctors.
    </p>
  </div>
);

export default SafetyNotice;
