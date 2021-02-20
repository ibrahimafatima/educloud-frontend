import React, { Component } from "react";
import auth from "../../services/authService";
import { MdInsertInvitation } from "react-icons/md";
import {
  FaCalculator,
  FaEdit,
  FaFacebookMessenger,
  FaBook,
  FaBookReader,
  FaUserFriends,
} from "react-icons/fa";
//import { TiNews } from "react-icons/ti";
import { GoDashboard } from "react-icons/go";
import { IoMdChatbubbles } from "react-icons/io";
import SidebarSubModule from "../../component/reusableComponent/sidebarSubModule";
import SidebarModule from "../../component/reusableComponent/sidebarModule";
import { getStudentAssignment } from "../../services/teacherService";
import { toast } from "react-toastify";

class StudentSidebar extends Component {
  state = {
    assignments: [],
  };

  async componentDidMount() {
    try {
      const studentClass = auth.getCurrentUser().className;
      const { data } = await getStudentAssignment(studentClass);
      this.setState({ assignments: data });
    } catch (ex) {
      toast.error(ex.response.data);
    }
  }

  render() {
    const { assignments } = this.state;
    const { className, registrationID } = auth.getCurrentUser();
    const { onSidebarExpand, toggleSidebar } = this.props;
    return (
      <div
        className="sidebar-main sidebar-menu-one sidebar-expand-md sidebar-color"
        style={{ marginTop: "65px" }}
      >
        {/* <div className="mobile-sidebar-header d-md-none">
          <div className="header-logo">
            <NavLink to="/dashboard">
              <img src={sidebarLogo} alt="logo" />
            </NavLink>
          </div>
        </div> */}
        {/* commented because of sticky header */}
        <div className="sidebar-menu-content">
          <ul className="nav nav-sidebar-menu sidebar-toggle-view">
            <SidebarModule
              expandClass="nav-item"
              toggleSidebar={toggleSidebar}
              logo={GoDashboard}
              link="/dashboard"
              title="Dashboard"
            />
            {/* <SidebarModule
              expandClass="nav-item"
              toggleSidebar={toggleSidebar}
              logo={TiNews}
              link="/pre-chat/sidebar"
              title="Newsfeed"
            /> */}
            <li
              className={this.props.onMenuExpand("finances").iconClass}
              onClick={() => onSidebarExpand("finances")}
            >
              <span className="nav-link cur">
                <i>
                  <FaCalculator color="#ffa501" />{" "}
                </i>
                <span>Finances</span>
              </span>
              <ul
                className={this.props.onMenuExpand("finances").menuClass}
                style={{
                  display: this.props.finances ? "block" : "none",
                }}
              >
                <SidebarSubModule
                  link={`/payment-details/${registrationID}`}
                  title="My Fees Details"
                  toggleSidebar={toggleSidebar}
                />
              </ul>
            </li>

            <SidebarModule
              expandClass="nav-item"
              logo={FaUserFriends}
              link={`/all-student/${className}`}
              title="Classmate"
              toggleSidebar={toggleSidebar}
            />

            <li
              className={this.props.onMenuExpand("timetable").iconClass}
              onClick={() => onSidebarExpand("timetable")}
            >
              <span className="nav-link cur">
                <i>
                  <MdInsertInvitation color="#ffa501" />{" "}
                </i>
                <span>Timetable</span>
              </span>
              <ul
                className={this.props.onMenuExpand("timetable").menuClass}
                style={{
                  display: this.props.timetable ? "block" : "none",
                }}
              >
                <SidebarSubModule
                  link="/my-timetable"
                  title="My Timetable"
                  toggleSidebar={toggleSidebar}
                />
              </ul>
            </li>
            <li
              className={this.props.onMenuExpand("assignment").iconClass}
              onClick={() => onSidebarExpand("assignment")}
            >
              <span className="nav-link cur">
                <i>
                  <FaBook color="#ffa501" />{" "}
                </i>
                <span>
                  Assignments{" "}
                  {assignments.length !== 0 && (
                    <span
                      className="badge badge-success"
                      style={{ color: "white" }}
                    >
                      {assignments.length}
                    </span>
                  )}
                </span>
              </span>
              <ul
                className={this.props.onMenuExpand("assignment").menuClass}
                style={{
                  display: this.props.assignment ? "block" : "none",
                }}
              >
                <SidebarSubModule
                  link={`/my-assignment/${className}`}
                  title="My Assignments"
                  toggleSidebar={toggleSidebar}
                />
              </ul>
            </li>
            <li
              className={this.props.onMenuExpand("exams").iconClass}
              onClick={() => onSidebarExpand("exams")}
            >
              <span className="nav-link cur">
                <i>
                  <FaEdit color="#ffa501" />{" "}
                </i>
                <span>Exams</span>
              </span>
              <ul
                className={this.props.onMenuExpand("exams").menuClass}
                style={{
                  display: this.props.exams ? "block" : "none",
                }}
              >
                <SidebarSubModule
                  link="/all-exams"
                  title="Scheduled Exam"
                  toggleSidebar={toggleSidebar}
                />
                <SidebarSubModule
                  link={`/view-mark/${registrationID}`}
                  title="My Marks"
                  toggleSidebar={toggleSidebar}
                />
              </ul>
            </li>
            <SidebarModule
              expandClass="nav-item"
              logo={FaFacebookMessenger}
              link="/pre-chat/chat"
              title="My Chatroom"
              toggleSidebar={toggleSidebar}
            />
            <SidebarModule
              expandClass="nav-item"
              logo={IoMdChatbubbles}
              link={`/discussion/${className}`}
              title="Discussion"
              toggleSidebar={toggleSidebar}
            />
            <li
              className={this.props.onMenuExpand("library").iconClass}
              onClick={() => onSidebarExpand("library")}
            >
              <span className="nav-link cur">
                <i>
                  <FaBookReader color="#ffa501" />{" "}
                </i>
                <span>Library</span>
              </span>
              <ul
                className={this.props.onMenuExpand("library").menuClass}
                style={{
                  display: this.props.library ? "block" : "none",
                }}
              >
                <SidebarSubModule
                  link="/all-books"
                  title="All Books"
                  toggleSidebar={toggleSidebar}
                />
              </ul>
            </li>
            {/* <li className={this.props.onMenuExpand("noticeBoard").iconClass}
             onClick={ () => onSidebarExpand("noticeBoard")}>
              <span className="nav-link cur">
                <i>
                  <FaChalkboardTeacher color="#ffa501" />{" "}
                </i>
                <span>Notice Board</span>
              </span>
              <ul
                className={this.props.onMenuExpand("noticeBoard").menuClass}
                style={{
                  display: this.props.noticeBoard ? "block" : "none",
                }}
              ></ul>
            </li> */}
          </ul>
        </div>
      </div>
    );
  }
}

export default StudentSidebar;
