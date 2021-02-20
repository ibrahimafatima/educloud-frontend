import React from "react";
import Joi from "joi-browser";
import Form from "./reusableComponent/form";
import FormLandingPage from "./reusableComponent/formLandingPage";
import { NavLink } from "react-router-dom";
import { authConfirmAccount } from "../services/authService";
import Spinner from './reusableComponent/spinner';


class ConfirmAccount extends Form {
  state = {
    data: { username: "", registrationID: "" },
    loading: false,
    error: {}
  };

  schema = {
    username: Joi.string()
      .label("Username")
      .min(3)
      .max(15)
      .required(),
    registrationID: Joi.string()
      .max(30)
      .required()
      .label("Registration ID")
  };

  doSubmit = async () => {
    try {
      this.setState({ loading: true })
      const { data } = await authConfirmAccount(this.state.data);
      if (data) {
        localStorage.setItem("username", data.username);
        window.location = "reset-password";
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        const error = { ...this.state.error };
        error.username = ex.response.data;
        this.setState({ error, loading: false });
      }
    }
  };

  render() {
    const { loading } = this.state;
    
    return loading ? <Spinner/> : (
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
                    {this.renderInput("Registration ID", "registrationID", "text")}
                    <div>
                      <NavLink to="/" className="forgot-pwd">
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

export default ConfirmAccount;
