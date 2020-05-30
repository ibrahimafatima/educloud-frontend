import React from "react";
import admin1 from "../../images/admin1.png";
import { FaRegComments } from "react-icons/fa";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

const NewsfeedItem = () => {
  return (
    <React.Fragment>
      {" "}
      <div className="central-meta item">
        <div className="user-post">
          <div className="friend-info">
            <figure>
              <img src={admin1} alt="" />
            </figure>
            <div className="friend-name">
              <ins>
                <span>Fatima Kaba</span>
              </ins>
              <span>
                posted on: <i>june 2 2018</i>
              </span>
            </div>
            <div className="post-meta">
              <div className="description">
                <p>
                  World's most beautiful car in Curabitur test drive booking !
                  the most beatuiful car available in america and the saudia
                  arabia, you can book your test drive by our official website
                </p>
              </div>
              <div className="we-video-info">
                <ul>
                  {/* <!-- post comment icon start --> */}
                  <li>
                    <span
                      className="comment"
                      data-toggle="tooltip"
                      title="Comments"
                    >
                      <i>
                        <FaRegComments />
                      </i>
                      <ins>52</ins>
                    </span>
                  </li>
                  {/* <!-- post comment icon end -->
              <!-- post like icon start --> */}
                  <li>
                    <span className="like" data-toggle="tooltip" title="like">
                      <i>
                        <AiFillLike color="#088DCD" />{" "}
                      </i>
                      <ins>2</ins>
                    </span>
                  </li>
                  {/* <!-- post like icon end --> */}
                </ul>
              </div>
            </div>
          </div>
          <div className="coment-area">
            <ul className="we-comet">
              <li>
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
                    we are working for the dance and sing songs. this car is
                    very awesome for the youngster. please vote this car and
                    like our post
                  </p>
                </div>
                <ul></ul>
              </li>
              {/* <li>
                <span>more comments</span>
              </li> */}
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
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewsfeedItem;
