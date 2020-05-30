import React, { Component } from "react";
import admin from "../../images/admin.jpg";
import { toast } from "react-toastify";

class PostArea extends Component {
  state = {
    postText: "",
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ postText: event.target.value });
  };

  handleClick = (event) => {
    event.preventDefault();
    if (this.state.postText === "") {
      toast("Your post cannot be empty.");
      return;
    }
    if (this.state.postText.length > 80) {
      toast("Your post exceeded total number of words");
      return;
    }
    //send post to db
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
              {postText.length > 80 ? (
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
