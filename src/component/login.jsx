import React from "react";
import Form from "./reusableComponent/form";
import Joi from "joi-browser";
import { authLogin } from "../services/authService";
import FormLandingPage from "./reusableComponent/formLandingPage";
import { NavLink } from "react-router-dom";
import Spinner from "./reusableComponent/spinner";

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    loading: false,
    error: {},
  };

  schema = {
    username: Joi.string().min(3).max(15).required().label("Username"),
    password: Joi.string().min(8).max(20).required().label("Password"),
  };

  doSubmit = async () => {
    try {
      this.setState({ loading: true });
      const { data: jwt } = await authLogin(this.state.data);
      localStorage.setItem("token", jwt);
      localStorage.removeItem("restored");
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
                  <h2 className="log-title">Login</h2>
                  <p>
                    {localStorage.getItem("restored")
                      ? "Now you can login with the restored password"
                      : null}{" "}
                  </p>
                  {localStorage.getItem("restored") ? null : (
                    <p className="subtitle">
                      Don't have an account yet ?{" "}
                      <NavLink to="/registration">Register</NavLink>
                    </p>
                  )}
                  <form onSubmit={this.handleSubmit}>
                    {this.renderInput("Username", "username", "text")}
                    {this.renderInput("Password", "password", "password")}

                    <div>
                      <br />
                      <NavLink to="/confirm-account" className="forgot-pwd">
                        Forgot Password ?
                      </NavLink>
                    </div>
                    <br />
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

export default Login;
