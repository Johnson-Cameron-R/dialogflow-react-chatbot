import React from "react";

const Messages = props => {
  // let messagesBottom;
  // const scrollToBottom = () => {
  //   messagesBottom.scrollIntoView({ behavior: "smooth" });
  // };

  const renderMessage = (message, index) => {
    // const { member, text } = message;
    // const { currentMember } = this.props;
    const messageFromMe = message && message.name !== "chatbot";
    const className = messageFromMe
      ? "messages-message currentMember"
      : "messages-message";
    return (
      <li key={index} className={className}>
        <span className="avatar" style={{ backgroundColor: "grey" }} />
        <div className="message-content">
          <div className="username">{message.username}</div>
          <div className="text">{message.message}</div>
        </div>
      </li>
    );
  };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [props.messages]);
  const { messages } = props;
  return (
    <div className="messages-container">
      <ul className="messages-list">
        {messages.map((m, index) => renderMessage(m, index))}
      </ul>
    </div>
  );
};

export default Messages;

{
  /* <div
ref={el => {
  messagesBottom = el;
}}
></div> */
}
