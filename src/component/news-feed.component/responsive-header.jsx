import React, { Component } from "react";
import { BsJustifyRight } from "react-icons/bs";
import logo2 from "../../images/logo2.png";
import { NavLink } from "react-router-dom";

class ResponsiveHeader extends Component {
  state = {
    dropdownToggled: false,
  };

  toggleDropdown = () => {
    this.setState({ dropdownToggled: !this.state.dropdownToggled });
  };

  render() {
    const { dropdownToggled } = this.state;
    return (
      <div className="responsive-header">
        <div
          className="mh-head first"
          style={{ position: "fixed", top: 0, width: "100%", zIndex: 100 }}
        >
          <span className="mh-btns-left">
            <span>
              <i>
                <BsJustifyRight onClick={this.toggleDropdown} />
              </i>
            </span>
          </span>
          <span className="mh-text">
            <span href="newsfeed.html" title="">
              <img src={logo2} alt="" />
            </span>
          </span>
          <nav id="menu" className={this.showDropdown(dropdownToggled)}>
            <ul>
              <li>
                <span>
                  <NavLink to="/dashboard">Dasboard</NavLink>
                </span>
                <hr />
              </li>
              <li>
                <span>
                  <NavLink to="admin-login">Admin</NavLink>
                </span>
                <hr />
              </li>
              <li>
                <span>
                  <NavLink to="teacher-login">Teachers</NavLink>
                </span>
                <hr />
              </li>
              <li>
                <span>
                  <NavLink to="student-login">Students</NavLink>
                </span>
                <hr />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }

  showDropdown(dropdownToggled) {
    return dropdownToggled
      ? "res-menu header-dropdown"
      : "res-menu dropdwn header-dropdown";
  }
}

export default ResponsiveHeader;
