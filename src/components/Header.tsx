import React from "react";

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="logo" aria-hidden="true">
        🌈
      </div>
      <div>
        <h1 className="app-title">BrightBuddy</h1>
        <p className="app-subtitle">Your friendly learning buddy</p>
      </div>
    </header>
  );
};

export default Header;
