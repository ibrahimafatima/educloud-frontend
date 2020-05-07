import React from "react";
import Form from "./reusableComponent/form";
import { studentLogin } from "../services/authService";
import Joi from "joi-browser";
import FormLandingPage from "./reusableComponent/formLandingPage";
import { NavLink } from "react-router-dom";

class StudentLogin extends Form {
  state = {
    data: { registration_number: "", password: "" },
    error: {}
  };

  schema = {
    registration_number: Joi.string()
      .required()
      .label("Registration number"),
    password: Joi.string()
      .min(8)
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: jwt } = await studentLogin(
        data.registration_number,
        data.password
      );
      localStorage.setItem("token", jwt);
      window.location = "/dashboard";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const error = { ...this.state.error };
        error.registration_number = ex.response.data;
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
                  <h2 className="log-title">School Student Login</h2>
                  <p className="subtitle">
                    Don't have an account ?{" "}
                    <NavLink to="/student-registration">Register</NavLink>
                  </p>
                  <form onSubmit={this.handleSubmit}>
                    {this.renderInput(
                      "Registration_number",
                      "registration_number",
                      "text"
                    )}
                    {this.renderInput("Password", "password", "password")}

                    <div>
                      <NavLink to="/confirm-student" className="forgot-pwd">
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

export default StudentLogin;
