import React from "react";
import Joi from "joi-browser";
import Form from "./reusableComponent/form";
import { authRegistration } from "../services/authService";
import FormLandingPage from "./reusableComponent/formLandingPage";
import { NavLink } from "react-router-dom";
import Spinner from "./reusableComponent/spinner";

class Registration extends Form {
  state = {
    data: { username: "", registrationID: "", password: "", passwordAgain: "" },
    loading: false,
    error: {},
  };

  schema = {
    username: Joi.string().min(3).max(15).required().label("Username"),
    registrationID: Joi.string().required().label("RegistrationID"),
    password: Joi.string().min(8).max(20).required().label("Password"),
    passwordAgain: Joi.ref("password"),
  };

  doSubmit = async () => {
    try {
      this.setState({ loading: true });
      const { data } = this.state;
      const { data: jwt } = await authRegistration({
        username: data.username,
        registrationID: data.registrationID,
        password: data.passwordAgain,
      });
      localStorage.setItem("token", jwt);
      window.location = "/dashboard";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const error = { ...this.state.error };
        error.username = ex.response.data;
        this.setState({ error, loading: false });
      }
    }
  };

  render() {
    const { loading } = this.state;
    return loading ? (
      <Spinner />
    ) : (
      <div className="theme-layout">
        <div className="pdng0">
          <div className="row merged">
            <FormLandingPage />
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="login-reg-bg">
                <div className="log-reg-area sign">
                  <h2 className="log-title">Registration</h2>
                  <p className="subtitle">
                    Already have an account ? <NavLink to="/">Login</NavLink>
                  </p>
                  <form onSubmit={this.handleSubmit}>
                    {this.renderInput("Username", "username", "text")}
                    {this.renderInput(
                      "RegistrationID",
                      "registrationID",
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

export default Registration;
