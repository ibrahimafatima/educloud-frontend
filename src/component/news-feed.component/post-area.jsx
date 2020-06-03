import React, { Component } from "react";
import admin from "../../images/admin.jpg";
import { toast } from "react-toastify";
import { addNews } from "../../services/studentService";
import auth from "../../services/authService";

class PostArea extends Component {
  state = {
    postText: "",
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ postText: event.target.value });
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { postText } = this.state;
    if (postText === "") {
      toast("Your post cannot be empty.");
      return;
    }
    if (postText.length > 100) {
      toast("Your post exceeded total number of words");
      return;
    }
    if (!auth.getCurrentUser()) {
      toast("To post, you have to login first.");
      return;
    }
    try {
      await addNews({ post_text: postText });
      window.location = "/";
      this.setState({ postText: "" });
      toast.success("Posted with success");
    } catch (ex) {
      toast.error(ex.response.data);
    }
  };

  render() {
    const { postText } = this.state;
    return (
      <div className="central-meta new-pst">
        <div className="new-postbox">
          {/* <!-- user profile in text side start --> */}
          <figure>
            <img src={admin} alt="" />
          </figure>
          {/* <!-- user profile in text side end --> */}
          <div className="newpst-input">
            <form>
              <textarea
                rows="2"
                placeholder="What is in your mind ?"
                onChange={this.handleChange}
              ></textarea>
              <div className="attachments">
                <ul>
                  <li>
                    <button type="submit" onClick={this.handleClick}>
                      Post
                    </button>
                  </li>
                </ul>
              </div>
              {postText.length > 100 ? (
                <span>
                  <i style={{ color: "red", fontSize: "12px" }}>
                    You exceed the number of word.
                  </i>
                </span>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PostArea;
