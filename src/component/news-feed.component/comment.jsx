import React, { Component } from "react";
import { getComments } from "../../services/studentService";
import { FaRegComments } from "react-icons/fa";

class Comment extends Component {
  state = {
    commentCount: 0,
  };
  async componentDidMount() {
    const { data } = await getComments(this.props.id);
    this.setState({ commentCount: data.length });
  }

  render() {
    return (
      <li>
        <span className="comment" data-toggle="tooltip" title="Comments">
          <i>
            <FaRegComments size="22px" />
          </i>
          <ins>{this.state.commentCount}</ins>
        </span>
      </li>
    );
  }
}

export default Comment;
