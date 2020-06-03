import React from "react";
import admin from "../../images/admin.jpg";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <React.Fragment>
      <div
        className="topbar"
        style={{ position: "fixed", width: "100%", top: 0 }}
      >
        <div className="logo">
          {/* <a title="" href="newsfeed.html">
            <img src="images/logo.png" alt="" />
          </a> */}
          <span>The education we deserve...</span>
        </div>
        <div className="top-area">
          <ul className="">
            <li>
              <NavLink to="/dashboard">Dasboard</NavLink>
            </li>
            <li>
              <NavLink to="admin-login">Admin</NavLink>
            </li>
            <li>
              <NavLink to="teacher-login">Teachers</NavLink>
            </li>
            <li>
              <NavLink to="student-login">Students</NavLink>
            </li>
          </ul>
          <ul className="setting-area">
            {/* <li>
              <span>
                <i>
                  <FaRegBell className="bell-style" />
                </i>
                <span
                  className="badge badge-primary"
                  style={{ color: "white" }}
                >
                  20
                </span>
              </span>
              <div className="dropdowns">
                <span>4 New Notifications</span>
                <ul className="drops-menu">
                  <li>
                    <span>
                      <img src={admin} alt="" />
                      <div className="mesg-meta">
                        <h6>sarah Loren</h6>
                        <span>Hi, how r u dear ...?</span>
                        <i>2 min ago</i>
                      </div>
                    </span>
                    <span className="tag green">New</span>
                  </li>
                </ul>
              </div>
            </li>
            <li></li> */}
            <li>
              <div className="user-img">
                <img src={admin} alt="" />
                {/* <!--<span className="status f-online"></span>--> */}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="fixed-sidebar right">
        <div className="chat-friendz">
          <div className="chat-box"></div>
        </div>
      </div>
      <div className="fixed-sidebar left">
        <div className="menu-left"></div>
      </div>
    </React.Fragment>
  );
};

export default Header;
