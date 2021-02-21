import React, { Component } from "react";
import { FaRegBell, FaPaperPlane } from "react-icons/fa";
import { getAllStudentAssignment } from "../../services/teacherService";
import { toast } from "react-toastify";
import TimeAgo from "react-timeago";
import { GiStopwatch } from "react-icons/gi";

class NavbarNotification extends Component {
  state = {
    notificationToggled: false,
    assignments: [],
    numberToDisplay: [1, 2, 3],
  };
  toggleNotification = () => {
    this.setState({ notificationToggled: !this.state.notificationToggled });
  };

  async componentDidMount() {
    try {
      const { data: assignments } = await getAllStudentAssignment();
      this.setState({ assignments });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data);
      }
    }
  }

  render() {
    const { assignments } = this.state;
    const { notificationToggled } = this.state;

    return (
      <li className="navbar-item dropdown header-notification">
        <span
          className="navbar-nav-link dropdown-toggle cur"
          role="button"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <i>
            <FaRegBell onClick={this.toggleNotification} />
          </i>
          <div
            className="item-title d-md-none text-16 mg-l-10"
            onClick={this.toggleNotification}
          >
            Notification
          </div>
          <span>{assignments.length}</span>
        </span>

        <div className={this.showNotification(notificationToggled)}>
          <div className="item-header">
            <h6 className="item-title">
              {assignments.length}{" "}
              {assignments.length > 1 ? "Notifications" : "Notification"}
            </h6>
          </div>
          <div className="item-content">
            {assignments.map((assignment) => (
              <div key={assignment._id} className="media">
                <div className="item-icon bg-skyblue">
                  <i>
                    <FaPaperPlane size="18" />
                  </i>
                </div>
                <div className="media-body space-sm">
                  <span>
                    <u>Assignment</u>
                  </span>
                  <div className="post-title">{`${assignment.title} given in ${assignment.className} by ${assignment.postedBy}`}</div>
                  <span>
                    {" "}
                    <GiStopwatch size="20" />{" "}
                    <TimeAgo date={assignment.postedOn} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </li>
    );
  }

  showNotification(notificationToggled) {
    const notificationClass = notificationToggled
      ? "dropdown-menu dropdown-menu-right show"
      : "dropdown-menu dropdown-menu-right";
    return notificationClass;
  }
}

export default NavbarNotification;
