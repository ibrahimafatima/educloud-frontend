import React from "react";
import Joi from "joi-browser";
import Form from "./reusableComponent/form";
import { registerTeacher } from "../services/userService";
import FormLandingPage from "./reusableComponent/formLandingPage";
import { NavLink } from "react-router-dom";

class TeacherRegistration extends Form {
  state = {
    data: { username: "", teacherID: "", password: "", passwordAgain: "" },
    error: {}
  };

  schema = {
    username: Joi.string()
      .min(3)
      .max(12)
      .required()
      .label("Username"),
    teacherID: Joi.string()
      .required()
      .label("TeacherID"),
    password: Joi.string()
      .min(8)
      .required()
      .label("Password"),
    passwordAgain: Joi.ref("password")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: jwt } = await registerTeacher({
        username: data.username,
        teacherID: data.teacherID,
        password: data.passwordAgain
      });
      localStorage.setItem("token", jwt);
      window.location = "/dashboard";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const error = { ...this.state.error };
        error.username = ex.response.data;
        this.setState({ error });
      }
    }
  };

  render() {
    return (
      <div className="theme-layout">
        <div className="pdng0">
          <div className="row merged">
            <FormLandingPage />
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="login-reg-bg">
                <div className="log-reg-area sign">
                  <h2 className="log-title">Registration</h2>
                  <p className="subtitle">
                    Already have an account ?{" "}
                    <NavLink to="/teacher-login">Login</NavLink>
                  </p>
                  <form onSubmit={this.handleSubmit}>
                    {this.renderInput("Username", "username", "text")}
                    {this.renderInput("TeacherId", "teacherID", "text")}
                    {this.renderInput("Password", "password", "password")}
                    {this.renderInput(
                      "Confirm password",
                      "passwordAgain",
                      "password"
                    )}
                    <div></div>
                    <br />
                    {this.renderButton("Register", "btn btn-primary")}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherRegistration;
