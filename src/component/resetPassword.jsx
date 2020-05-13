import React from "react";
import { resetPassword } from "../services/adminService";
import Form from "./reusableComponent/form";
import Joi from "joi-browser";
import FormLandingPage from "./reusableComponent/formLandingPage";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

class ResetPassword extends Form {
  state = {
    data: { password: "", passwordAgain: "" },
    error: {},
  };

  schema = {
    password: Joi.string().min(8).required().label("Password"),
    passwordAgain: Joi.ref("password"),
  };

  componentDidMount() {
    console.log(this.props.history.goBack);
    const username = localStorage.getItem("username");
    if (!username) this.props.history.goBack();
  }

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const username = localStorage.getItem("username");
      const { data: result } = await resetPassword({
        username: username,
        password: data.password,
      });
      if (result === "Ok") {
        toast.success("Password successfully reset, Login now.");
        localStorage.removeItem("username");
        window.location = "admin-login";
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        const error = { ...this.state.error };
        error.password = ex.response.data;
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
                      <NavLink to="/admin-login" className="forgot-pwd">
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
