import React, { Component } from "react";
import auth from "../../services/authService";

class ChatList extends Component {
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const { chats } = this.props;
    return (
      <div style={{ height: "400px", overflow: "auto" }}>
        <div id="output">
          {chats.map((chat) => (
            <p
              key={chat.timestamp}
              style={{
                textAlign:
                  chat.sender === auth.getCurrentUser().username
                    ? "left"
                    : "right",
                padding: "14px 0px",
                margin: "0px 20px",
                color: "#555",
                borderBottom: "1px solid #e9e9e9",
              }}
            >
              <strong
                style={{
                  color: "#575ed8",
                }}
              >
                {chat.sender} :{" "}
              </strong>
              {chat.message}
            </p>
          ))}
        </div>
        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => {
            this.messagesEnd = el;
          }}
        ></div>
      </div>
    );
  }
}

export default ChatList;
