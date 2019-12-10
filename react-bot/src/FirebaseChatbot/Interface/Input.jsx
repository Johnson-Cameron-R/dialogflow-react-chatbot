import React, { useState } from "react";

const Input = props => {
  const [text, setText] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    props.onSendMessage(text);
    setText("");
  };

  return (
    <div className="input">
      <form onSubmit={e => onSubmit(e)}>
        <input
          onChange={e => setText(e.target.value)}
          value={text}
          type="text"
          placeholder="Send a message!"
          autoFocus={true}
        />
        <button>Send</button>
      </form>
    </div>
  );
};

export default Input;
