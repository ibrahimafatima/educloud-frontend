import React from "react";
import Form from "./reusableComponent/form";
import Joi from "joi-browser";
import { teacherLogin } from "../services/authService";
import FormLandingPage from "./reusableComponent/formLandingPage";
import { NavLink } from "react-router-dom";

class TeacherLogin extends Form {
  state = {
    data: { username: "", teacherID: "", password: "" },
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
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { data: jwt } = await teacherLogin(this.state.data);
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
                  <h2 className="log-title">Login</h2>
                  <p className="subtitle">
                    Don't have an account yet ?{" "}
                    <NavLink to="/teacher-registration">Register</NavLink>
                  </p>
                  <form onSubmit={this.handleSubmit}>
                    {this.renderInput("Username", "username", "text")}
                    {this.renderInput("TeacherId", "teacherID", "text")}
                    {this.renderInput("Password", "password", "password")}

                    <div>
                      <NavLink to="/confirm-teacher" className="forgot-pwd">
                        Forgot Password ?
                      </NavLink>
                    </div>
                    <br />
                    {this.renderButton("Login", "btn btn-primary")}
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

export default TeacherLogin;
