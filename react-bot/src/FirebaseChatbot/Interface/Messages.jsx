import React, { useEffect } from "react";

const Messages = props => {
  let messagesBottom;
  const scrollToBottom = () => {
    messagesBottom.scrollIntoView({ behavior: "smooth" });
  };

  const renderMessage = (message, index) => {
    const messageFromMe = message && message.name !== "chatbot";
    const className = messageFromMe
      ? "messages-message currentMember"
      : "messages-message";
    return (
      <li key={index} className={className}>
        <span className="avatar" style={{ backgroundColor: "blue" }} />
        <div className="message-content">
          <div className="username">{message.name}</div>
          <div className="text">{message.message}</div>
        </div>
      </li>
    );
  };

  useEffect(() => {
    scrollToBottom();
  }, [props.messages]);

  return (
    <div className="messages-container">
      <ul className="messages-list">
        {props.messages.map((m, index) => renderMessage(m, index))}
      </ul>
      <div
        ref={el => {
          messagesBottom = el;
        }}
      ></div>
    </div>
  );
};

export default Messages;
