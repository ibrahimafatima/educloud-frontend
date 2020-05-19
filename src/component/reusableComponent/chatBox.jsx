import React from "react";

const ChatBox = ({ message, handleTextChange, handleClick }) => {
  return (
    <React.Fragment>
      <input
        style={{
          padding: "10px 20px",
          boxSizing: "border-box",
          border: "0",
          display: "block",
          width: "100%",
          background: "#fff",
          borderBottom: "1px solid #eee",
          fontFamily: "Nunito",
          fontSize: "16px",
        }}
        type="text"
        value={message}
        onChange={handleTextChange}
        onKeyDown={handleTextChange}
        placeholder="Message..."
        autoFocus
      />
      <button
        onClick={handleClick}
        style={{
          background: "#575ed8",
          color: "#fff",
          width: "100%",
          fontSize: "18px",
          border: "0",
          padding: "12px 0",
          paddingBottom: "10px",
          borderRadius: "0 0 2px 2px",
        }}
      >
        Send
      </button>
    </React.Fragment>
  );
};

export default ChatBox;
