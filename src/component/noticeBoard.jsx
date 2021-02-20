import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import { TiPin } from "react-icons/ti";
import { GiStopwatch } from "react-icons/gi";
import Moment from "react-moment";
import TimeAgo from "react-timeago";
import { getNoticeBoard } from "../services/adminService";

class NoticeBoard extends Component {
  state = {
    data: [],
    user: {},
  };
  async componentDidMount() {
    try {
      const { data } = await getNoticeBoard();
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user, data });
    } catch (ex) {}
  }
  render() {
    const { data } = this.state;
    return (
      <div className="col-12 col-xl-8 col-6-xxxl">
        <div className="card dashboard-card-six pd-b-20">
          <div className="card-body">
            <div className="heading-layout1 mg-b-17">
              <div className="item-title">
                <h3>{this.state.user.schoolName} Notice Board</h3>
              </div>
            </div>
            <div className="notice-box-wrap">
              {data.length === 0 ? (
                <h3>No information on the notice board yet.</h3>
              ) : (
                data.map((event) => (
                  <div key={event._id} className="notice-list">
                    <div className="post-date bg-skyblue">
                      <TiPin size="20" /> &nbsp;{" "}
                      <Moment format="Do MMMM YYYY">{event.eventDate}</Moment>
                    </div>
                    <h6 className="notice-title">{event.eventMessage}</h6>
                    <div className="entry-meta">
                      Posted By {event.postedBy} -
                      <span>
                        {" "}
                        <GiStopwatch size="20" />{" "}
                        <TimeAgo date={event.postDate} />
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NoticeBoard;
