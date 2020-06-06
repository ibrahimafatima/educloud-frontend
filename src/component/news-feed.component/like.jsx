import React, { Component } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import {
  postLike,
  getPostLike,
  getLikedPost,
} from "../../services/studentService";
import auth from "../../services/authService";
import { toast } from "react-toastify";

class Like extends Component {
  state = {
    likeCount: 0,
    liked: [],
  };

  async componentDidMount() {
    try {
      const { data } = await getPostLike(this.props.id);
      const { data: liked } = await getLikedPost(this.props.id);
      //console.log(liked);
      this.setState({ likeCount: data.length, liked });
    } catch (ex) {
      toast.error(ex.response.data);
    }
  }

  handleDislike = async () => {
    const originalState = this.state.likeCount;
    if (!auth.getCurrentUser()) {
      toast("Kindly login for more privilege");
      return;
    }
    try {
      await postLike(this.props.id);
      this.setState({ likeCount: originalState - 1, liked: [] });
    } catch (ex) {
      this.setState({
        likeCount: originalState,
        liked: [{ user: "optimistic_update" }],
      });
    }
  };

  handleLike = async () => {
    const originalState = this.state.likeCount;
    if (!auth.getCurrentUser()) {
      toast("Kindly login for more privilege");
      return;
    }
    try {
      await postLike(this.props.id);
      this.setState({
        likeCount: originalState + 1,
        liked: [{ user: "optimistic_update" }],
      });
    } catch (ex) {
      this.setState({ likeCount: originalState, liked: [] });
    }
  };

  render() {
    const { likeCount, liked } = this.state;
    return (
      <li>
        <span className="like" data-toggle="tooltip" title="like">
          <i>
            {liked.length > 0 ? (
              <AiFillLike
                color="#088DCD"
                size="22px"
                onClick={this.handleDislike}
              />
            ) : (
              <AiOutlineLike
                color="#088DCD"
                size="22px"
                onClick={this.handleLike}
              />
            )}
          </i>
          <ins>{likeCount}</ins>
        </span>
      </li>
    );
  }
}

export default Like;
