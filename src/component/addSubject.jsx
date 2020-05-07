import React from "react";
import Joi from "joi-browser";
import Form from "./reusableComponent/form";
import { toast } from "react-toastify";
import { getClasses } from "../services/adminService";
import { addCourse, getCourseByID } from "../services/teacherService";

class AddSubject extends Form {
  state = {
    data: { name: "", className: "" },
    classes: [],
    error: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Subject name"),
    className: Joi.string().required().label("Class name"),
  };

  async componentDidMount() {
    const { data } = await getClasses();
    this.setState({ classes: data });

    if (this.props.location.pathname === "/add-subject/new") return;
    try {
      const { data: subject } = await getCourseByID(this.props.match.params.id);

      const data = {
        _id: subject._id,
        name: subject.name,
        className: subject.className,
      };

      this.setState({ data });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        return this.props.history.replace("/not-found");
      }
    }
  }

  doSubmit = async () => {
    try {
      await addCourse(this.state.data);
      this.setState({ data: { name: "", className: "" } });
      toast.success("Subject successfully added...");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const error = { ...this.state.error };
        error.name = ex.response.data;
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
              <h3>Add Subject</h3>
            </div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Subject Name *</label>
                {this.renderInput("", "name", "text", "form-control")}
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Class Name *</label>
                {this.renderSelect("className", this.state.classes)}
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
    );
  }
}

export default AddSubject;
