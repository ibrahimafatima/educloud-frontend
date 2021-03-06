import React, { Component } from "react";
import { getFirstNewsfeed } from "../../services/studentService";
import FeedItem from "./feed-item";

class FirstNews extends Component {
  state = {
    newsfeed: [],
  };

  async componentDidMount() {
    const { data: newsfeed } = await getFirstNewsfeed();
    this.setState({ newsfeed });
  }

  render() {
    const { newsfeed } = this.state;
    return <FeedItem newsfeed={newsfeed} />;
  }
}

export default FirstNews;
