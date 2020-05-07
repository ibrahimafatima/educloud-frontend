import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import jwtDecode from "jwt-decode";

class Breadcubs extends Component {
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
    const role = user ? user.role : "";
    return (
      <div className="breadcrumbs-area">
        <h3>{role} Dashboard</h3>
        <ul>
          <li>
            <NavLink to="/dashboard">Home</NavLink>
          </li>
          <li>{role}</li>
        </ul>
      </div>
    );
  }
}

export default Breadcubs;
