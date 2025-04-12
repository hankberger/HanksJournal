import React from "react";
import "./WelcomeHeader.css";

const WelcomeHeader: React.FC = () => {
  return (
    <div className="welcome-header">
      <h1>🐣 You're already here—why not share your thoughts?</h1>
      <p>
        Welcome to my online journal, a place for reflections, ideas, and
        stories. Anyone is welcome to contribute—go ahead and make a post!
      </p>
    </div>
  );
};

export default WelcomeHeader;
