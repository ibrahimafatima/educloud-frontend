import React from "react";
import { postAssignment } from "../services/teacherService";
import { getClasses } from "../services/adminService";
import Form from "./reusableComponent/form";
import { toast } from "react-toastify";
import Joi from "joi-browser";

class AddAssignment extends Form {
  state = {
    data: { title: "", className: "", toBeSubmittedOn: "", aMessage: "" },
    classes: [],
    error: {},
  };

  schema = {
    _id: Joi.string(),
    className: Joi.string().required().label("Class name"),
    title: Joi.string().min(3).max(18).required().label("Title"),
    toBeSubmittedOn: Joi.string()
      .min(3)
      .max(20)
      .required()
      .label("Submit date"),
    aMessage: Joi.string().required().label("Assignment text"),
  };

  async componentDidMount() {
    try {
      const { data: classes } = await getClasses();
      this.setState({ classes });
    } catch (ex) {
      toast("Some error occured");
    }
  }

  doSubmit = async () => {
    try {
      await postAssignment(this.state.data);
      this.setState({
        data: { title: "", className: "", toBeSubmittedOn: "", aMessage: "" },
      });
      toast.success("Assignment successfully posted...");
      window.location = "dashboard";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const error = { ...this.state.error };
        error.className = ex.response.data;
        this.setState({ error });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <div></div>
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                <h3>Add New Assignment</h3>
              </div>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Title *</label>
                  {this.renderInput("", "title", "text", "form-control")}
                </div>
                <div className="col-xl-3 col-lg-6 col-12">
                  <label>Assignment text *</label>
                  {this.renderTextArea("", "aMessage", "text", "form-control")}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Class *</label>
                  {this.renderSelect("className", ["", ...this.state.classes])}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Submit Date *</label>
                  {this.renderInput(
                    "mm/dd/yyyy",
                    "toBeSubmittedOn",
                    "text",
                    "form-control"
                  )}
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

export default AddAssignment;
