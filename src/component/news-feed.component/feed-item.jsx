import React from "react";
import Like from "./like";
import Comment from "./comment";
import Moment from "react-moment";
import PostComment from "./post-comment";
import admin1 from "../../images/admin1.png";

const FeedItem = ({ newsfeed }) => {
  return (
    <React.Fragment>
      {" "}
      {newsfeed.length === 0 ? (
        <div className="central-meta item">
          <div className="user-post">No post yet added...</div>
        </div>
      ) : (
        newsfeed.map((singleNews) => (
          <div className="central-meta item" key={singleNews._id}>
            <div className="user-post">
              <div className="friend-info">
                <figure>
                  <img src={admin1} alt="" />
                </figure>
                <div className="friend-name">
                  <ins>
                    <span>{singleNews.username}</span>
                  </ins>
                  <span>
                    posted on:{" "}
                    <Moment format="Do MMMM YYYY" style={{ color: "#042751" }}>
                      {singleNews.post_date}
                    </Moment>
                  </span>
                </div>
                <div className="post-meta">
                  <div className="description">
                    <p>{singleNews.post_text}</p>
                    <hr />
                    <div className="description">
                      <p>
                        From:{" "}
                        <span style={{ color: "#FF9D01" }}>
                          {singleNews.schoolName}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="we-video-info">
                    <ul>
                      {/* <!-- post comment icon start --> */}
                      <Comment id={singleNews._id} />
                      <Like id={singleNews._id} />
                    </ul>
                  </div>
                </div>
              </div>
              <div className="coment-area">
                <PostComment newsfeed={singleNews} />
              </div>
            </div>
          </div>
        ))
      )}
    </React.Fragment>
  );
};

export default FeedItem;
