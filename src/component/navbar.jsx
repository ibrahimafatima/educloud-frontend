import React, { Component } from "react";
import NavbarTitle from "./reusableComponent/navbarTitle";
import NavbarProfile from "./reusableComponent/navbarProfile";
import NavbarNotification from "./reusableComponent/navbarNotification";

class Navbar extends Component {
  state = {
    headerMenuCollapsed: false
  };

  collapseHeaderMenu = () => {
    this.setState({ headerMenuCollapsed: !this.state.headerMenuCollapsed });
  };

  render() {
    const { onBarClick, user } = this.props;
    const { headerMenuCollapsed } = this.state;

    return (
      <div className="navbar navbar-expand-md header-menu-one bg-light">
        <NavbarTitle
          onBarClick={onBarClick}
          onMenuClick={this.collapseHeaderMenu}
          user={user}
        />
        <div
          className={this.showHeader(headerMenuCollapsed)}
          id="mobile-navbar"
        >
          <ul className="navbar-nav">
            <li className="navbar-item header-search-bar">
              <div className="input-group stylish-input-group">
                <span className="input-group-addon">
                  <button type="submit">
                    <span>Africa's education on a single cloud...</span>
                  </button>
                </span>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav">
            <NavbarProfile user={user} />
            <NavbarNotification />
          </ul>
        </div>
      </div>
    );
  }

  showHeader(headerMenuCollapsed) {
    let headerClass = "header-main-menu collapse navbar-collapse ";
    headerClass += headerMenuCollapsed && "show";
    return headerClass;
  }
}

export default Navbar;
