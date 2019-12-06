import React from "react";

const Header = props => {
  return (
    <div className="Chat-header">
      {/* <button className="Chat-back" /> */}
      <h1 className="Chat-title">{props.chatroom}</h1>
      {/* <button className="Chat-close" onClick={props.onClick} /> */}
    </div>
  );
};

export default Header;
