import React, { Component } from "react";
import FeedItem from "./feed-item";
import { getMiddleNewsfeed } from "../../services/studentService";

class MiddleFeed extends Component {
  state = {
    newsfeed: [],
  };

  async componentDidMount() {
    const { data: newsfeed } = await getMiddleNewsfeed();
    this.setState({ newsfeed });
  }

  render() {
    const { newsfeed } = this.state;
    return <FeedItem newsfeed={newsfeed} />;
  }
}

export default MiddleFeed;
