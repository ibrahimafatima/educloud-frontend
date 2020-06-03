import React, { Component } from "react";
import { getAllNewsfeed } from "../../services/studentService";
import FeedItem from "./feed-item";

class AllFeed extends Component {
  state = {
    newsfeed: [],
  };

  async componentDidMount() {
    const { data: newsfeed } = await getAllNewsfeed();
    this.setState({ newsfeed });
  }

  render() {
    const { newsfeed } = this.state;
    return <FeedItem newsfeed={newsfeed} />;
  }
}

export default AllFeed;
