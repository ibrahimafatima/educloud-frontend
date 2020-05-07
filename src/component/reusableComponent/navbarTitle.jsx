import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import { FaBars, FaRegArrowAltCircleDown } from "react-icons/fa";

class NavbarTitle extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (ex) {}
  }

  render() {
    const { user } = this.state;
    const { onBarClick, onMenuClick } = this.props;
    return (
      <React.Fragment>
        <div className="nav-bar-header-one">
          <div className="header-logo">
            <span
              id="school_name"
              style={{
                fontSize: "20px",
              }}
            >
              {user ? user.schoolName : "School Name"}
            </span>
          </div>
          <div className="toggle-button sidebar-toggle">
            <button type="button" className="item-link">
              <span className="btn-icon-wrap">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
        <div className="d-md-none mobile-nav-bar">
          <button
            className="navbar-toggler pulse-animation"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-navbar"
            aria-expanded="false"
          >
            <i>
              <FaRegArrowAltCircleDown onClick={onMenuClick} />
            </i>
          </button>
          <button
            type="button"
            className="navbar-toggler sidebar-toggle-mobile"
          >
            <i>
              <FaBars onClick={onBarClick} />
            </i>
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default NavbarTitle;
