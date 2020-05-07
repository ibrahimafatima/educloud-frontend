import React, { Component } from "react";
import ChatList from "./reusableComponent/chatList";
import ChatBox from "./reusableComponent/chatBox";
import { Offline, Online } from "react-detect-offline";

class Chat extends Component {
  render() {
    const { onTextChange, onClick, message, chats } = this.props;
    return (
      <React.Fragment>
        <div
          style={{
            boxShadow: "2px 5px 7px rgba(0, 0, 0, 0.05)",
            border: "1px solid #ddd",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              color: "#575ed8",
              padding: "20px 20px",
              background: "#fff",
            }}
          >
            Educloud Chat - {this.props.match.params.id} Group
          </h2>
          <ChatList chats={chats} />
          <Online>
            <ChatBox
              message={message}
              handleTextChange={onTextChange}
              handleClick={onClick}
            />
          </Online>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Offline>
            <i style={{ color: "red" }}>Turn on your Internet connection ...</i>
          </Offline>
        </div>
      </React.Fragment>
    );
  }
}

export default Chat;
