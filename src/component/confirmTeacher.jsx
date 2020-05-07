import React from "react";
import Joi from "joi-browser";
import Form from "./reusableComponent/form";
import FormLandingPage from "./reusableComponent/formLandingPage";
import { NavLink } from "react-router-dom";
import { confirmAccount } from "../services/teacherService";

class ConfirmTeacher extends Form {
  state = {
    data: { username: "", teacherID: "" },
    error: {}
  };

  schema = {
    username: Joi.string()
      .label("Username")
      .min(3)
      .max(12)
      .required(),
    teacherID: Joi.string()
      .max(30)
      .required()
      .label("Teacher ID")
  };

  doSubmit = async () => {
    try {
      const { data } = await confirmAccount(this.state.data);
      if (data) {
        localStorage.setItem("username", data.username);
        window.location = "reset-teacher-password";
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
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
                  <h2>Teacher Account Confirmation</h2>
                  <p>Provide these information to reset your password.</p>
                  <form onSubmit={this.handleSubmit}>
                    {this.renderInput("Username", "username", "text")}
                    {this.renderInput("Teacher ID", "teacherID", "text")}
                    <div>
                      <NavLink to="/teacher-login" className="forgot-pwd">
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

export default ConfirmTeacher;
