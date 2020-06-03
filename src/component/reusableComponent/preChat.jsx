import { Component } from "react";

class PreChat extends Component {
  componentDidMount() {
    if (this.props.match.params.id === "sidebar") window.location = "/";
    if (this.props.match.params.id === "chat") window.location = "/chat";
    console.log(this.props);
  }

  render() {
    return null;
  }
}

export default PreChat;
