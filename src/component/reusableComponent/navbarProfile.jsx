import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Auth from "../../services/authService";
import { getAdminDetails, getATeacher } from "../../services/adminService";
import { getAStudent } from "../../services/studentService";
import { FaRegUserCircle, FaRegSun, FaToggleOff } from "react-icons/fa";

class NavbarProfile extends Component {
  state = {
    profileToggled: false,
    profileURL: "",
    user: {},
  };
  toggleProfile = () => {
    this.setState({ profileToggled: !this.state.profileToggled });
  };

  async componentDidMount() {
    this.setState({ user: Auth.getCurrentUser() });
    const user = Auth.getCurrentUser();
    if (user.isAdmin) {
      const { data } = await getAdminDetails(user._id);
      this.setState({ profileURL: data.profileURL });
    }
    if (user.isTeacher) {
      const { data } = await getATeacher(user._id);
      this.setState({ profileURL: data.profileURL });
    }
    if (user.isStudent) {
      const { data } = await getAStudent(user._id);
      this.setState({ profileURL: data.profileURL });
    }
  }

  render() {
    const { user, profileURL } = this.state;
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
            {profileURL === "" ? (
              <img src={user.profileURL} className="nav-img" alt="Admin"></img>
            ) : (
              <img src={profileURL} className="nav-img" alt="Admin"></img>
            )}
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
                        ? `/teacher/${user.registrationID}`
                        : `/student/${user.registrationID}`
                    }
                  >
                    <i>
                      <FaRegUserCircle />{" "}
                    </i>
                    My Profile
                  </NavLink>
                </li>
              )}
              {user.isAdmin && (
                <li>
                  <NavLink
                    onClick={this.toggleProfile}
                    to={`/admin/${user._id}`}
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
                        ? `/account/${user.registrationID}`
                        : `/student-account/${user.registrationID}`
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
