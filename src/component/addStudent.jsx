import React from "react";
import Joi from "joi-browser";
import Form from "./reusableComponent/form";
import { addStudent, getOneStudent } from "../services/teacherService";
import { getTerms } from "../services/adminService";
import Spinner from "./reusableComponent/spinner";
import { toast } from "react-toastify";

class AddStudent extends Form {
  state = {
    data: { registration_number: "", class_name: "", term: "", name: "" },
    term: [],
    loading: true,
    error: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().min(3).max(25).required().label("Name"),
    registration_number: Joi.string().required().label("Registration number"),
    class_name: Joi.string().max(12).required().label("Class name"),
    term: Joi.string().max(30).required().label("Term"),
  };

  async componentDidMount() {
    const { data: term } = await getTerms();
    this.setState({ term });
    if (this.props.location.pathname === "/add-student/new") {
      this.setState({ loading: false });
      return;
    }
    try {
      const { data: student } = await getOneStudent(this.props.match.params.id);
      const data = {
        _id: student._id,
        registration_number: student.registration_number,
        class_name: student.class_name,
        term: student.term,
        name: student.name,
      };
      this.setState({ data, loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  doSubmit = async () => {
    try {
      this.setState({ loading: true });
      await addStudent(this.state.data);
      this.setState({
        data: { registration_number: "", class_name: "", term: "", name: "" },
      });
      toast.success("Student added successfully...");
      this.setState({ loading: false });
    } catch (ex) {
      this.setState({ loading: true });
      if (ex.response && ex.response.status === 401) {
        toast(`You can only add student in ${this.props.user.className}`);
        const error = { ...this.state.error };
        error.registration_number = ex.response.data;
        this.setState({ error });
      }
      if (ex.response && ex.response.status === 400) {
        toast(ex.response.data);
        const error = { ...this.state.error };
        error.class_name = ex.response.data;
        this.setState({ error });
      }
    }
  };

  render() {
    return this.state.loading ? (
      <Spinner />
    ) : (
      <div className="card height-auto">
        <div className="card-body">
          <div className="heading-layout1">
            <div className="item-title">
              <h3>Add New Student</h3>
            </div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Registration Number *</label>
                {this.renderInput(
                  "",
                  "registration_number",
                  "text",
                  "form-control"
                )}
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Student name *</label>
                {this.renderInput("", "name", "text", "form-control")}
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Class Name *</label>
                {this.renderInput("", "class_name", "text", "form-control")}
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Term *</label>
                {this.renderSelect("term", this.state.term)}
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

export default AddStudent;
