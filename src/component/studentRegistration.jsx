import React from "react";
import FormLandingPage from "./reusableComponent/formLandingPage";
import { registerStudent } from "../services/userService";
import Form from "./reusableComponent/form";
import Joi from "joi-browser";
import { NavLink } from "react-router-dom";

class StudentRegistration extends Form {
  state = {
    data: {
      name: "",
      registration_number: "",
      password: "",
      passwordAgain: ""
    },
    error: {}
  };

  schema = {
    name: Joi.string()
      .min(3)
      .max(25)
      .required()
      .label("Name"),
    registration_number: Joi.string()
      .required()
      .label("Registration number"),
    password: Joi.string()
      .min(8)
      .required()
      .label("Password"),
    passwordAgain: Joi.ref("password")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: jwt } = await registerStudent({
        name: data.name,
        registration_number: data.registration_number,
        password: data.password
      });
      localStorage.setItem("token", jwt);
      window.location = "/dashboard";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const error = { ...this.state.error };
        error.name = ex.response.data;
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
                    <NavLink to="/student-login">Login</NavLink>
                  </p>
                  <form onSubmit={this.handleSubmit}>
                    {this.renderInput("Your name", "name", "text")}
                    {this.renderInput(
                      "Registration number",
                      "registration_number",
                      "text"
                    )}
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

export default StudentRegistration;
