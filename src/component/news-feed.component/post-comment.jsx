import React, { Component } from "react";
import { addComment, getComments } from "../../services/studentService";
import admin1 from "../../images/admin1.png";
import admin from "../../images/admin.jpg";
import auth from "../../services/authService";
import { toast } from "react-toastify";
import TimeAgo from "react-timeago";

class PostComment extends Component {
  state = {
    comments: [],
    commentText: "",
  };

  async componentDidMount() {
    const { data: comments } = await getComments(this.props.newsfeed._id);
    this.setState({ comments });
  }

  handleChange = (e) => {
    this.setState({ commentText: e.target.value });
  };

  handleClick = async (e) => {
    e.preventDefault();
    const { commentText } = this.state;
    if (commentText === "") {
      toast("You cannot post empty comment");
      return;
    }
    if (commentText.length > 16) {
      toast("Comment text too long...");
      return;
    }
    if (!auth.getCurrentUser()) {
      toast("To post comment, you have to login first.");
      return;
    }
    try {
      await addComment({
        commentText,
        id: this.props.newsfeed._id,
      });
      this.setState({
        commentText: "",
        comments: [
          ...this.state.comments,
          {
            commentText,
            username: auth.getCurrentUser().username,
            commentedOn: new Date(),
          },
        ],
      });
      toast.success("comment posted with success");
    } catch (ex) {
      toast(ex.response.data);
    }
  };

  render() {
    const { commentText, comments } = this.state;
    return (
      <ul className="we-comet">
        {comments.map((comment) => (
          <li key={comment._id}>
            <div className="comet-avatar">
              <img src={comment.gender === "Female" ? admin1 : admin} alt="" />
            </div>
            <div className="we-comment">
              <div className="coment-head">
                <h5>
                  <span>{comment.username}</span>
                </h5>
                <span>
                  <TimeAgo date={comment.commentedOn} />
                </span>
              </div>
              <p>{comment.commentText}</p>
            </div>
            <ul></ul>
          </li>
        ))}
        <li className="post-comment">
          <div className="comet-avatar">
            <img src={admin1} alt="" />
          </div>
          <div className="post-comt-box">
            <form>
              <textarea
                placeholder="Post your comment"
                onChange={this.handleChange}
                value={this.state.commentText}
              ></textarea>
              <button
                type="submit"
                style={{
                  backgroundColor: "#088DCD",
                  top: 0,
                  margin: "8px 8px",
                }}
                onClick={this.handleClick}
              >
                Post
              </button>
            </form>
          </div>
          {commentText.length > 16 ? (
            <span className="comment-error-text">comment text too long...</span>
          ) : null}
        </li>
      </ul>
    );
  }
}
export default PostComment;
