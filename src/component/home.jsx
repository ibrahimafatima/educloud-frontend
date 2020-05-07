import React, { Component } from "react";
import FormLandingPage from "./reusableComponent/formLandingPage";
import OutlineButton from "./reusableComponent/outlineButton";

class Home extends Component {
  state = {};

  handleClick = (path) => {
    window.location = path;
  };
  render() {
    return (
      <div className="theme-layout">
        <div className="pdng0">
          <div className="row merged">
            <FormLandingPage />
            <div>
              <OutlineButton
                title="I am a school Admin"
                style={{ marginLeft: "40px", marginTop: "100px" }}
                onClick={() => this.handleClick("/admin-login")}
              />
              <OutlineButton
                title="I am a Teacher"
                style={{ marginLeft: "55px", marginTop: "50px" }}
                onClick={() => this.handleClick("/teacher-login")}
              />
              <OutlineButton
                title="I am a student"
                style={{ marginLeft: "50px", marginTop: "50px" }}
                onClick={() => this.handleClick("/student-login")}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
