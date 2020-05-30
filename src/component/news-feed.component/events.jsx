import React, { Component } from "react";
import { getSchoolsEvent } from "../../services/adminService";
import TimeAgo from "react-timeago";

class Events extends Component {
  state = {
    allEvent: [],
  };

  async componentDidMount() {
    const { data: allEvent } = await getSchoolsEvent();
    this.setState({ allEvent });
  }

  render() {
    const { allEvent } = this.state;
    return (
      <ul className="activitiez">
        {/* <!-- Event loop start here --> */}
        {allEvent.length === 0 ? (
          <h4>
            <i>No event yet posted!</i>
          </h4>
        ) : (
          allEvent.map((event) => (
            <li key={event._id}>
              <div className="activity-meta">
                <i>
                  <TimeAgo date={event.post_date} />{" "}
                </i>
                <span>
                  <span>{event.event_message}</span>
                </span>
                <h6>
                  by{" "}
                  <span style={{ color: "#2D9ED4" }}> {event.schoolName}</span>
                </h6>
              </div>
            </li>
          ))
        )}
      </ul>
    );
  }
}

export default Events;
