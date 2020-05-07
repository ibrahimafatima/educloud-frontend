import React from "react";
import Joi from "joi-browser";
import Form from "./reusableComponent/form";
import FormLandingPage from "./reusableComponent/formLandingPage";
import { NavLink } from "react-router-dom";
import { confirmAccount } from "../services/studentService";

class ConfirmStudent extends Form {
  state = {
    data: { name: "", registration_number: "" },
    error: {}
  };

  schema = {
    name: Joi.string()
      .label("Username")
      .min(3)
      .max(12)
      .required(),
    registration_number: Joi.string()
      .required()
      .label("Registration number")
  };

  doSubmit = async () => {
    try {
      const { data } = await confirmAccount(this.state.data);
      if (data) {
        localStorage.setItem("registration", data.registration_number);
        window.location = "reset-student-password";
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
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
                  <h2>Student Account Confirmation</h2>
                  <p>Provide these information to reset your password.</p>
                  <form onSubmit={this.handleSubmit}>
                    {this.renderInput("Username", "name", "text")}
                    {this.renderInput(
                      "Registration number",
                      "registration_number",
                      "text"
                    )}
                    <div>
                      <NavLink to="/student-login" className="forgot-pwd">
                        Back to Login
                      </NavLink>
                    </div>
                    <br />
                    {this.renderButton("Confirm", "btn btn-primary")}
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

export default ConfirmStudent;
