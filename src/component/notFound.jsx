import React, { Component } from "react";
import { Link } from "react-router-dom";
import my404 from "../images/my404.jpg"

class NotFound extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div>
          <h4>
            Go To <Link to="/dashboard">Dashboard</Link>
          </h4>
        </div>
        <img src={my404} alt="logo" style={{ height:"300px" }}/>

      </React.Fragment>
    );
  }
}

export default NotFound;
