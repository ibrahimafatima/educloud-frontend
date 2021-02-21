import React, { Component } from "react";
import {
  FaUserGraduate,
  FaEdit,
  FaGraduationCap,
  FaBuromobelexperte,
  FaBook,
  FaBookReader,
} from "react-icons/fa";
import { GiClosedDoors } from "react-icons/gi";
//import { TiNews } from "react-icons/ti";
import { MdInsertInvitation } from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";
import { GoDashboard } from "react-icons/go";
import { GiTeacher } from "react-icons/gi";
import SidebarSubModule from "../../component/reusableComponent/sidebarSubModule";
import SidebarModule from "../../component/reusableComponent/sidebarModule";
import auth from "../../services/authService";

class TeacherSidebar extends Component {
  render() {
    //let { iconClass, menuClass } = this.props.onMenuExpand("student");
    const { onSidebarExpand, toggleSidebar } = this.props;
    return (
      <div
        className="sidebar-main sidebar-menu-one sidebar-expand-md sidebar-color"
        style={{ marginTop: "65px" }}
      >
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
              className={this.props.onMenuExpand("student").iconClass}
              onClick={() => onSidebarExpand("student")}
            >
              <span className="nav-link cur">
                <i>
                  <FaUserGraduate color="#ffa501" />{" "}
                </i>
                <span>Students</span>
                <span className="float-icon" style={{ float: "right" }}>
                  <RiArrowRightSLine />{" "}
                </span>
              </span>
              <ul
                className={this.props.onMenuExpand("student").menuClass}
                style={{
                  display: this.props.student ? "block" : "none",
                }}
              >
                <SidebarSubModule
                  link="/add-student/new"
                  title="Add New Students"
                  toggleSidebar={toggleSidebar}
                />
                <SidebarSubModule
                  link={`/added-student/${auth.getCurrentUser().className}`}
                  title="Added Students"
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
                  link="/all-subject"
                  title="My Classes"
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
                <SidebarSubModule
                  link="/add-subject/new"
                  title="Add Subject"
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
                  link="/add-timetable/new"
                  title="Update Timetable"
                  toggleSidebar={toggleSidebar}
                />
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
                <SidebarSubModule
                  link="/add-exams/new"
                  title="Add Exams"
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
                <span>Assignment</span>
                <span className="float-icon" style={{ float: "right" }}>
                  <RiArrowRightSLine />{" "}
                </span>
              </span>
              <ul
                className={this.props.onMenuExpand("assignment").menuClass}
                style={{
                  display: this.props.assignment ? "block" : "none",
                }}
              >
                <SidebarSubModule
                  link={`/all-assignment`}
                  title="All Assignment"
                  toggleSidebar={toggleSidebar}
                />
                <SidebarSubModule
                  link="/add-assignment"
                  title="Add new Assignment"
                  toggleSidebar={toggleSidebar}
                />
              </ul>
            </li>
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
              </ul>
            </li>

            {auth.getCurrentUser().className !== "None" && (
              <SidebarModule
                expandClass="nav-item"
                toggleSidebar={toggleSidebar}
                logo={FaGraduationCap}
                link={`/promote-student/${auth.getCurrentUser().className}`}
                title="Promote Student"
              />
            )}
            {auth.getCurrentUser().className !== "None" && (
              <SidebarModule
                expandClass="nav-item"
                toggleSidebar={toggleSidebar}
                logo={GiClosedDoors}
                link="/teacher-end-year"
                title="End of Year"
              />
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default TeacherSidebar;
