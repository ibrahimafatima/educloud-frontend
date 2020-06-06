import React, { Component } from "react";
import { getSchoolsEvent } from "../../services/adminService";
import TimeAgo from "react-timeago";
import SpinnerSecond from "./../reusableComponent/spinner-second";

class Events extends Component {
  state = {
    allEvent: [],
    loading: true,
  };

  async componentDidMount() {
    const { data: allEvent } = await getSchoolsEvent();
    this.setState({ allEvent, loading: false });
  }

  render() {
    const { allEvent, loading } = this.state;
    return (
      <React.Fragment>
        {loading ? (
          <SpinnerSecond />
        ) : (
          <ul className="activitiez">
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
                      <span style={{ color: "#2D9ED4" }}>
                        {" "}
                        {event.schoolName}
                      </span>
                    </h6>
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </React.Fragment>
    );
  }
}

export default Events;
