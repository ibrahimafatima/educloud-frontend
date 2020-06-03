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
import { TiNews } from "react-icons/ti";
import { GoDashboard } from "react-icons/go";
import { GiTeacher, GiClosedDoors } from "react-icons/gi";
import SidebarSubModule from "./reusableComponent/sidebarSubModule";
import SidebarModule from "./reusableComponent/sidebarModule";

class AdminSidebar extends Component {
  render() {
    let { iconClass, menuClass } = this.props.onMenuExpand();
    const { onSidebarExpand, isSidebarExpanded, toggleSidebar } = this.props;
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
            <SidebarModule
              expandClass="nav-item"
              toggleSidebar={toggleSidebar}
              logo={TiNews}
              link="/pre-chat/sidebar"
              title="Newsfeed"
            />
            <li className={iconClass} onClick={onSidebarExpand}>
              <span className="nav-link cur">
                <i>
                  <FaUserTie color="#ffa501" />{" "}
                </i>
                <span>Teachers</span>
              </span>
              <ul
                className={menuClass}
                style={{
                  display: isSidebarExpanded ? "block" : "none",
                }}
              >
                <SidebarSubModule
                  link="/all-teacher"
                  title="All Teachers"
                  toggleSidebar={toggleSidebar}
                />
                <SidebarSubModule
                  link="/add-teacher/new"
                  title="Add Teacher"
                  toggleSidebar={toggleSidebar}
                />
              </ul>
            </li>

            <li className={iconClass} onClick={onSidebarExpand}>
              <span className="nav-link cur">
                <i>
                  <FaCalculator color="#ffa501" />{" "}
                </i>
                <span>Finances</span>
              </span>
              <ul
                className={menuClass}
                style={{
                  display: isSidebarExpanded ? "block" : "none",
                }}
              >
                <SidebarSubModule
                  link="/students-fee"
                  title="Fees Collection"
                  toggleSidebar={toggleSidebar}
                />
              </ul>
            </li>
            <li className={iconClass} onClick={onSidebarExpand}>
              <span className="nav-link cur">
                <i>
                  <GiTeacher color="#ffa501" />{" "}
                </i>
                <span>Class</span>
              </span>
              <ul
                className={menuClass}
                style={{
                  display: isSidebarExpanded ? "block" : "none",
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
            <li className={iconClass} onClick={onSidebarExpand}>
              <span className="nav-link cur">
                <i>
                  <FaBuromobelexperte color="#ffa501" />{" "}
                </i>
                <span>Subject</span>
              </span>
              <ul
                className={menuClass}
                style={{
                  display: isSidebarExpanded ? "block" : "none",
                }}
              >
                <SidebarSubModule
                  link="/all-subject"
                  title="All Subject"
                  toggleSidebar={toggleSidebar}
                />
              </ul>
            </li>
            <li className={iconClass} onClick={onSidebarExpand}>
              <span className="nav-link cur">
                <i>
                  <MdInsertInvitation color="#ffa501" />{" "}
                </i>
                <span>Timetable</span>
              </span>
              <ul
                className={menuClass}
                style={{
                  display: isSidebarExpanded ? "block" : "none",
                }}
              >
                <SidebarSubModule
                  link="/my-timetable"
                  title="My Timetable"
                  toggleSidebar={toggleSidebar}
                />
              </ul>
            </li>
            <li className={iconClass} onClick={onSidebarExpand}>
              <span className="nav-link cur">
                <i>
                  <FaEdit color="#ffa501" />{" "}
                </i>
                <span>Exams</span>
              </span>
              <ul
                className={menuClass}
                style={{
                  display: isSidebarExpanded ? "block" : "none",
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
            <li className={iconClass} onClick={onSidebarExpand}>
              <span className="nav-link cur">
                <i>
                  <FaBookReader color="#ffa501" />{" "}
                </i>
                <span>Library</span>
              </span>
              <ul
                className={menuClass}
                style={{
                  display: isSidebarExpanded ? "block" : "none",
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
            <li className={iconClass} onClick={onSidebarExpand}>
              <span className="nav-link cur">
                <i>
                  <FaChalkboardTeacher color="#ffa501" />{" "}
                </i>
                <span>Notice Board</span>
              </span>
              <ul
                className={menuClass}
                style={{
                  display: isSidebarExpanded ? "block" : "none",
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
