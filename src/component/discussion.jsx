import React, { Component } from "react";
import ChatList from "./reusableComponent/chatList";
import ChatBox from "./reusableComponent/chatBox";
import { getDiscussions, saveDiscussions } from "../services/studentService";
import auth from "../services/authService";
import { pusherChannel } from "../reusableFunctions/pusher";
import { toast } from "react-toastify";

class Discussion extends Component {
  state = {
    message: "",
    chats: [],
  };

  async componentDidMount() {
    const { data: chats } = await getDiscussions(this.props.match.params.id);
    this.setState({ chats });
    const user = auth.getCurrentUser();

    pusherChannel().bind("discussion", (data) => {
      if (
        (user.schoolSecretKey === data.schoolSecretKey &&
          user.className === data.classe) ||
        (user.schoolSecretKey === data.schoolSecretKey &&
          user.role === "Teacher")
      ) {
        this.setState({ chats: [...this.state.chats, data] });

        if (user.username !== data.sender && user.role !== "Teacher") {
          Notification.requestPermission();
          new Notification(
            `Educloud - New chat message from Mr. ${data.sender}`
          );
        }
      }
    });
  }

  async post_message() {
    try {
      const payload = {
        message: this.state.message,
      };
      await saveDiscussions(this.props.match.params.id, payload);
    } catch (ex) {
      toast.error(ex.response.data);
    }
  }

  handleTextChange = async (e) => {
    if (e.keyCode === 13) {
      this.post_message();
      this.setState({ message: "" });
    } else {
      this.setState({ message: e.target.value });
    }
  };

  handleClick = async () => {
    this.post_message();
    this.setState({ message: "" });
  };

  render() {
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
          <ChatList chats={this.state.chats} />

          <ChatBox
            message={this.state.message}
            handleTextChange={this.handleTextChange}
            handleClick={this.handleClick}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Discussion;
