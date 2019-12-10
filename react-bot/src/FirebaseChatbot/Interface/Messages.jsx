import React from "react";

const Messages = props => {
  const renderMessage = (message, index) => {
    // const { member, text } = message;
    // const { currentMember } = this.props;
    const messageFromMe = message && message.name !== "Helper Bot";
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

  return (
    <div className="messages-container">
      <ul className="messages-list">
        {props.messages.map((m, index) => renderMessage(m, index))}
      </ul>
    </div>
  );
};

export default Messages;
