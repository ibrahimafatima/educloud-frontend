import React, { Component } from "react";
import admin from "../../images/admin.jpg";
import admin1 from "../../images/admin1.png";
import { NavLink } from "react-router-dom";
import Auth from "../../services/authService";
import { FaRegUserCircle, FaRegSun, FaToggleOff } from "react-icons/fa";

class NavbarProfile extends Component {
  state = {
    profileToggled: false,
    user: {},
  };
  toggleProfile = () => {
    this.setState({ profileToggled: !this.state.profileToggled });
  };

  async componentDidMount() {
    this.setState({ user: Auth.getCurrentUser() });
  }

  render() {
    const { user } = this.state;
    const username = user ? user.username : "username";
    const { profileToggled } = this.state;
    return (
      <li className="navbar-item dropdown header-admin">
        <span
          className="navbar-nav-link dropdown-toggle cur"
          role="button"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <div className="admin-title" onClick={this.toggleProfile}>
            <h5 className="item-title">{username}</h5>
            <span>{user ? user.role : "Role"}</span>
          </div>
          <div className="admin-img">
            <img
              src={user.gender === "Female" ? admin1 : admin}
              alt="Admin"
            ></img>
          </div>
        </span>
        <div className={this.showProfile(profileToggled)}>
          <div className="item-header">
            <h6 className="item-title">{username}</h6>
          </div>
          <div className="item-content">
            <ul className="settings-list">
              {user.isAdmin ?? (
                <li>
                  <NavLink
                    onClick={this.toggleProfile}
                    to={
                      user.isTeacher
                        ? `/teacher/${user.teacherID}`
                        : `/student/${user.registration_number}`
                    }
                  >
                    <i>
                      <FaRegUserCircle />{" "}
                    </i>
                    My Profile
                  </NavLink>
                </li>
              )}
              {user.isAdmin ?? (
                <li>
                  <NavLink
                    onClick={this.toggleProfile}
                    to={
                      user.isTeacher
                        ? `/account/${user.teacherID}`
                        : `/student-account/${user.registration_number}`
                    }
                  >
                    <i>
                      <FaRegSun />{" "}
                    </i>
                    Account Settings
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink to="/logout" onClick={this.toggleProfile}>
                  <i>
                    <FaToggleOff />{" "}
                  </i>
                  Log Out
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </li>
    );
  }
  showProfile(profileToggled) {
    let profileClass = "dropdown-menu dropdown-menu-right ";
    profileClass += profileToggled && "show";
    return profileClass;
  }
}

export default NavbarProfile;
