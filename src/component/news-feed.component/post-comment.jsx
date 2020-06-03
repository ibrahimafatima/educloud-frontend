import React from "react";
import admin1 from "../../images/admin1.png";

const PostComment = () => {
  return (
    <ul className="we-comet">
      {/* <li>
      <div className="comet-avatar">
        <img src="images/resources/comet-1.jpg" alt="" />
      </div>
      <div className="we-comment">
        <div className="coment-head">
          <h5>
            <span>Fatima Kaba</span>
          </h5>
          <span>45 min ago</span>
        </div>
        <p>
          we are working for the dance and sing songs. this car
          is very awesome for the youngster. please vote this
          car and like our post
        </p>
      </div>
      <ul></ul>
    </li> */}
      <li>
        <span className="showmore underline">All comments</span>
      </li>
      <li className="post-comment">
        <div className="comet-avatar">
          <img src={admin1} alt="" />
        </div>
        <div className="post-comt-box">
          <form method="post">
            <textarea placeholder="Post your comment"></textarea>
            <button type="submit"></button>
          </form>
        </div>
      </li>
    </ul>
  );
};

export default PostComment;
