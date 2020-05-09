import React from "react";
import Form from "./reusableComponent/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { moveYear } from "../services/teacherService";
import { getClasses, getTerms } from "../services/adminService";

class NewPromotion extends Form {
  state = {
    data: {
      term: "",
      className: "",
      registration_number: this.props.match.params.id,
    },
    classes: [],
    term: [],
    error: {},
  };

  schema = {
    term: Joi.string().required().label("Term"),
    className: Joi.string().required().label("Class name"),
    registration_number: Joi.string().required().label("Registration number"),
  };

  async componentDidMount() {
    const { data: classes } = await getClasses();
    const { data: term } = await getTerms();
    this.setState({ classes, term });
  }

  doSubmit = async () => {
    try {
      await moveYear(this.state.data);
      this.setState({
        data: { term: "", className: "", registration_number: "" },
      });
      toast.success("Student successfully promoted...");
      this.props.history.goBack();
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        const error = { ...this.state.error };
        error.className = ex.response.data;
        this.setState({ error });
        toast.error(ex.response.data);
      }
    }
  };

  render() {
    return (
      <div className="card height-auto">
        <div className="card-body">
          <div className="heading-layout1">
            <div className="item-title">
              <h3>Promote student</h3>
              <br />
              <h4 style={{ color: "red" }}> Be sure before proceeding</h4>
            </div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Registration number *</label>
                {this.renderInput(
                  "",
                  "registration_number",
                  "text",
                  "form-control"
                )}
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Promotion term *</label>
                {this.renderSelect("term", this.state.term)}
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Promotion class name *</label>
                {this.renderSelect("className", this.state.classes)}
              </div>
              <div className="col-12 form-group mg-t-8">
                {this.renderButton(
                  "Promote",
                  "btn btn-ln btn-size bg-blue-dark btn-hover-yellow"
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NewPromotion;
