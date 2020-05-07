import React, { Component } from "react";
import { Link } from "react-router-dom";

class NotFound extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div>
          <h4>
            Go To <Link to="/">Dashboard</Link>
          </h4>
        </div>
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                <h1>Page not Found</h1>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NotFound;
