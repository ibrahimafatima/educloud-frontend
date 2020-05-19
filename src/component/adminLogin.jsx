import React from "react";
import Joi from "joi-browser";
import Form from "./reusableComponent/form";
import { adminLogin } from "../services/authService";
import FormLandingPage from "./reusableComponent/formLandingPage";
import { NavLink } from "react-router-dom";

class AdminLogin extends Form {
  state = {
    data: { username: "", schoolSecretKey: "", password: "" },
    error: {},
  };

  schema = {
    username: Joi.string().label("Username").min(3).max(12).required(),
    schoolSecretKey: Joi.string().required().label("School Secret Key"),
    password: Joi.string().min(8).required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data: jwt } = await adminLogin(this.state.data);
      localStorage.setItem("token", jwt);
      localStorage.removeItem("restored");
      window.location = "dashboard";
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
                  <h2>School Admin Login</h2>
                  <p className="subtitle">
                    {localStorage.getItem("restored")
                      ? "You can now Login with the restored password"
                      : "The Login button will be enabled on valid credentials"}
                  </p>
                  <form onSubmit={this.handleSubmit}>
                    {this.renderInput("Username", "username", "text")}
                    {this.renderInput(
                      "School SecretKey",
                      "schoolSecretKey",
                      "password"
                    )}
                    {this.renderInput("Password", "password", "password")}

                    <div>
                      <NavLink to="/confirm-admin" className="forgot-pwd">
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

export default AdminLogin;
