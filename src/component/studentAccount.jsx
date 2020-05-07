import React from "react";
import Form from "./reusableComponent/form";
import Joi from "joi-browser";
import { completeProfile } from "../services/studentService";
import { getStudent } from "../services/adminService";
import Auth from "../services/authService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class StudentAccount extends Form {
  state = {
    data: {
      father_name: "",
      mother_name: "",
      gender: "",
      dob: "",
      email: "",
      phone: "",
      address: "",
    },
    gender: ["Not Specified", "Male", "Female"],
    error: {},
  };

  schema = {
    father_name: Joi.string().min(3).max(18).label("Father name"),
    mother_name: Joi.string().min(3).max(18).label("Mother name"),
    gender: Joi.string().label("Gender"),
    dob: Joi.string().label("Dob"),
    email: Joi.string().max(40).label("Email"),
    phone: Joi.number().label("Phone number"),
    address: Joi.string().max(100).label("address"),
  };

  doSubmit = async () => {
    try {
      await completeProfile(this.state.data);
      this.setState({
        data: {
          father_name: "",
          mother_name: "",
          gender: "",
          dob: "",
          email: "",
          phone: "",
          address: "",
        },
      });
      toast.success("Profile updated successfully...");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const error = { ...this.state.error };
        error.mother_name = ex.response.data;
        this.setState({ error });
      }
    }
  };

  async componentDidMount() {
    try {
      const { data: student } = await getStudent(this.props.match.params.id);
      this.setState({
        data: {
          father_name: student.father_name,
          mother_name: student.mother_name,
          gender: student.gender,
          dob: student.dob,
          email: student.email,
          phone: student.phone,
          address: student.address,
        },
      });
    } catch (ex) {
      return this.props.history.replace("/not-found");
    }
  }

  render() {
    const { gender } = this.state;
    return (
      <React.Fragment>
        <div>
          <h4>
            Go To{" "}
            <Link to={`/student/${Auth.getCurrentUser().registration_number}`}>
              My Profile
            </Link>
          </h4>
        </div>
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                <h3>Complete your profile</h3>
              </div>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Father's name *</label>
                  {this.renderInput("", "father_name", "text", "form-control")}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Mother's name *</label>
                  {this.renderInput("", "mother_name", "text", "form-control")}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Gender *</label>
                  {this.renderSelect("gender", gender)}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Date of Birth *</label>
                  {this.renderInput(
                    "mm/dd/yyyy",
                    "dob",
                    "text",
                    "form-control"
                  )}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Email *</label>
                  {this.renderInput("", "email", "text", "form-control")}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Phone *</label>
                  {this.renderInput("", "phone", "text", "form-control")}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Address *</label>
                  {this.renderTextArea("", "address", "text", "form-control")}
                </div>
                <div className="col-12 form-group mg-t-8">
                  {this.renderButton(
                    "Save",
                    "btn btn-ln btn-size bg-blue-dark btn-hover-yellow"
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StudentAccount;
