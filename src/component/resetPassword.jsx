import React from "react";
import { authPasswordReset } from "../services/authService";
import Form from "./reusableComponent/form";
import Joi from "joi-browser";
import FormLandingPage from "./reusableComponent/formLandingPage";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from './reusableComponent/spinner';


class ResetPassword extends Form {
  state = {
    data: { password: "", passwordAgain: "" },
    loading: false,
    error: {},
  };

  schema = {
    password: Joi.string().min(8).max(20).required().label("Password"),
    passwordAgain: Joi.ref("password"),
  };

  componentDidMount() {
    const username = localStorage.getItem("username");
    if (!username) this.props.history.goBack();
  }

  doSubmit = async () => {
    try {
      this.setState({ loading: true });
      const { data } = this.state;
      const username = localStorage.getItem("username");
      const { data: result } = await authPasswordReset({
        username: username,
        password: data.password,
      });
      if (result === "Ok") {
        this.setState({ loading: false });
        toast.success("Password successfully reset, Login now.");
        localStorage.removeItem("username");
        localStorage.setItem("restored", "true");
        window.location = "login";
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        const error = { ...this.state.error };
        error.password = ex.response.data;
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
                  <h2>Reset your Password</h2>
                  <p className="subtitle">Reset your password to login</p>
                  <form onSubmit={this.handleSubmit}>
                    {this.renderInput("Password", "password", "password")}
                    {this.renderInput(
                      "Confirm Password",
                      "passwordAgain",
                      "password"
                    )}

                    <div>
                      <NavLink to="/" className="forgot-pwd">
                        Back to Login
                      </NavLink>
                    </div>
                    <br />
                    {this.renderButton("Reset", "btn btn-primary")}
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

export default ResetPassword;
