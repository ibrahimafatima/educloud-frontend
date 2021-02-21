import React, { Component } from "react";
import { MdInsertInvitation } from "react-icons/md";
import {
  FaCalculator,
  FaEdit,
  FaUserTie,
  FaBuromobelexperte,
  FaBookReader,
  FaRegNewspaper,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";
import { GoDashboard } from "react-icons/go";
import { GiTeacher, GiClosedDoors } from "react-icons/gi";
import SidebarSubModule from "../../component/reusableComponent/sidebarSubModule";
import SidebarModule from "../../component/reusableComponent/sidebarModule";

class AdminSidebar extends Component {
  render() {
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
              className={this.props.onMenuExpand("teachers").iconClass}
              onClick={() => onSidebarExpand("teachers")}
            >
              <span className="nav-link cur">
                <i>
                  <FaUserTie color="#ffa501" />{" "}
                </i>
                <span>Teachers</span>
                <span className="float-icon" style={{ float: "right" }}>
                  <RiArrowRightSLine />{" "}
                </span>
              </span>
              <ul
                className={this.props.onMenuExpand("teachers").menuClass}
                style={{
                  display: this.props.teachers ? "block" : "none",
                }}
              >
                <SidebarSubModule link="/all-teacher" title="All Teachers" />
                <SidebarSubModule link="/add-teacher/new" title="Add Teacher" />
              </ul>
            </li>

            <li
              className={this.props.onMenuExpand("finances").iconClass}
              onClick={() => onSidebarExpand("finances")}
            >
              <span className="nav-link cur">
                <i>
                  <FaCalculator color="#ffa501" />{" "}
                </i>
                <span>Finances</span>
                <span className="float-icon" style={{ float: "right" }}>
                  <RiArrowRightSLine />{" "}
                </span>
              </span>
              <ul
                className={this.props.onMenuExpand("finances").menuClass}
                style={{
                  display: this.props.finances ? "block" : "none",
                }}
              >
                <SidebarSubModule
                  link="/students-fee"
                  title="Fees Collection"
                  toggleSidebar={toggleSidebar}
                />
              </ul>
            </li>
            <li
              className={this.props.onMenuExpand("class").iconClass}
              onClick={() => onSidebarExpand("class")}
            >
              <span className="nav-link cur">
                <i>
                  <GiTeacher color="#ffa501" />{" "}
                </i>
                <span>Class</span>
                <span className="float-icon" style={{ float: "right" }}>
                  <RiArrowRightSLine />{" "}
                </span>
              </span>
              <ul
                className={this.props.onMenuExpand("class").menuClass}
                style={{
                  display: this.props.class ? "block" : "none",
                }}
              >
                <SidebarSubModule
                  link="/all-class"
                  title="All Classes"
                  toggleSidebar={toggleSidebar}
                />
                <SidebarSubModule
                  link="/add-class/new"
                  title="Add New Class"
                  toggleSidebar={toggleSidebar}
                />
              </ul>
            </li>
            <li
              className={this.props.onMenuExpand("subject").iconClass}
              onClick={() => onSidebarExpand("subject")}
            >
              <span className="nav-link cur">
                <i>
                  <FaBuromobelexperte color="#ffa501" />{" "}
                </i>
                <span>Subject</span>
                <span className="float-icon" style={{ float: "right" }}>
                  <RiArrowRightSLine />{" "}
                </span>
              </span>
              <ul
                className={this.props.onMenuExpand("subject").menuClass}
                style={{
                  display: this.props.subject ? "block" : "none",
                }}
              >
                <SidebarSubModule
                  link="/all-subject"
                  title="All Subject"
                  toggleSidebar={toggleSidebar}
                />
              </ul>
            </li>
            <li
              className={this.props.onMenuExpand("timetable").iconClass}
              onClick={() => onSidebarExpand("timetable")}
            >
              <span className="nav-link cur">
                <i>
                  <MdInsertInvitation color="#ffa501" />{" "}
                </i>
                <span>Timetable</span>
                <span className="float-icon" style={{ float: "right" }}>
                  <RiArrowRightSLine />{" "}
                </span>
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
              className={this.props.onMenuExpand("exams").iconClass}
              onClick={() => onSidebarExpand("exams")}
            >
              <span className="nav-link cur">
                <i>
                  <FaEdit color="#ffa501" />{" "}
                </i>
                <span>Exams</span>
                <span className="float-icon" style={{ float: "right" }}>
                  <RiArrowRightSLine />{" "}
                </span>
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
              </ul>
            </li>
            <SidebarModule
              expandClass="nav-item"
              logo={FaRegNewspaper}
              link="/fees-reporting"
              title="Fees Reporting"
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
                <span className="float-icon" style={{ float: "right" }}>
                  <RiArrowRightSLine />{" "}
                </span>
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
                <SidebarSubModule
                  link="/add-book/new"
                  title="Add New Book"
                  toggleSidebar={toggleSidebar}
                />
              </ul>
            </li>
            <li
              className={this.props.onMenuExpand("noticeBoard").iconClass}
              onClick={() => onSidebarExpand("noticeBoard")}
            >
              <span className="nav-link cur">
                <i>
                  <FaChalkboardTeacher color="#ffa501" />{" "}
                </i>
                <span>Notice Board</span>
                <span className="float-icon" style={{ float: "right" }}>
                  <RiArrowRightSLine />{" "}
                </span>
              </span>
              <ul
                className={this.props.onMenuExpand("noticeBoard").menuClass}
                style={{
                  display: this.props.noticeBoard ? "block" : "none",
                }}
              >
                <SidebarSubModule
                  link="/notice-board/new"
                  title="Pin to Notice Board"
                  toggleSidebar={toggleSidebar}
                />
                <SidebarSubModule
                  link="/all-notice"
                  title="All Notice"
                  toggleSidebar={toggleSidebar}
                />
              </ul>
            </li>
            <SidebarModule
              expandClass="nav-item"
              logo={GiClosedDoors}
              link="/admin-end-year"
              title="End of year"
              toggleSidebar={toggleSidebar}
            />
          </ul>
        </div>
      </div>
    );
  }
}

export default AdminSidebar;
