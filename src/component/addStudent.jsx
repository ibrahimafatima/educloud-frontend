import React from "react";
import Joi from "joi-browser";
import Form from "./reusableComponent/form";
import { addStudent, getOneStudent } from "../services/teacherService";
import { getTerms } from "../services/adminService";
import Spinner from "./reusableComponent/spinner";
import { toast } from "react-toastify";
import auth from "../services/authService";

class AddStudent extends Form {
  state = {
    data: { registrationID: "", className: "", term: "", username: "" },
    term: [],
    loading: true,
    error: {},
  };

  schema = {
    _id: Joi.string(),
    username: Joi.string().min(3).max(15).required().label("username"),
    registrationID: Joi.string().required().label("Registration ID"),
    className: Joi.string().max(12).required().label("Class name"),
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
        registrationID: student.registrationID,
        className: student.className,
        term: student.term,
        username: student.username,
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
        data: { registrationID: "", className: "", term: "", username: "" },
      });
      toast.success("Student added successfully...");
      this.setState({ loading: false });
    } catch (ex) {
      console.log(this.props)
      this.setState({ loading: false });
      if (ex.response && ex.response.status === 401) {
        toast(`You can only add student in ${auth.getCurrentUser().className}`);
        const error = { ...this.state.error };
        error.registrationID = ex.response.data;
        this.setState({ error });
      }
      if (ex.response && ex.response.status === 400) {
        toast(ex.response.data);
        const error = { ...this.state.error };
        error.className = ex.response.data;
        this.setState({ error });
      }
    }
  };

  render() {
    const {loading, term} = this.state;
    return loading ? (
      <Spinner />
    ) : (
      <React.Fragment>
        
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
                <label>Registration ID *</label>
                {this.renderInput(
                  "",
                  "registrationID",
                  "text",
                  "form-control"
                )}
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Student username *</label>
                {this.renderInput("", "username", "text", "form-control")}
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Class Name *</label>
                {this.renderInput("", "className", "text", "form-control")}
              </div>
              <div className="col-xl-3 col-lg-6 col-12 form-group">
                <label>Term *</label>
                {this.renderSelect("term", ["", ...term])}
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

export default AddStudent;
