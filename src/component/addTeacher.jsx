import React from "react";
import Form from "./reusableComponent/form";
import { getClasses, addTeacher, getATeacher } from "../services/adminService";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "./reusableComponent/spinner";

class AddTeacher extends Form {
  state = {
    data: { registrationID: "", username: "", className: "" },
    classInCharge: [], //CLASSNAME HERE IS CLASS IN CHARGE
    loading: true,
    error: {},
  };

  schema = {
    _id: Joi.string(),
    registrationID: Joi.string().required(),
    username: Joi.string().min(3).required(),
    className: Joi.string(),
  };

  async componentDidMount() {
    const { data } = await getClasses();
    this.setState({ classInCharge: data });

    if (this.props.location.pathname === "/add-teacher/new") {
      this.setState({ loading: false });
      return;
    }
    try {
      const { data: teacher } = await getATeacher(this.props.match.params.id);
      const data = {
        _id: teacher._id,
        username: teacher.username,
        registrationID: teacher.registrationID,
        className: teacher.className,
      };

      this.setState({ data, loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        return this.props.history.replace("/not-found");
      }
    }
  }

  doSubmit = async () => {
    try {
      this.setState({ loading: true });
      await addTeacher(this.state.data);
      this.setState({
        data: { registrationID: "", username: "", className: "" },
      });
      toast.success("Teacher successfully added...");
      this.setState({ loading: false });
    } catch (ex) {
      this.setState({ loading: false });
      if (
        ex.response &&
        (ex.response.status === 400 || ex.response.status === 403)
      ) {
        const error = { ...this.state.error };
        error.username = ex.response.data;
        this.setState({ error });
        toast(ex.response.data);
      }
    }
  };

  render() {
    const { location } = this.props;
    return this.state.loading ? (
      <Spinner />
    ) : (
      <React.Fragment>
        <div>
          <h4>
            Go To <Link to="/all-teacher">All Teachers</Link>
          </h4>
        </div>
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                {location.pathname === "/add-teacher/new" ? (
                  <h3>Add New Teacher</h3>
                ) : (
                  <h3>Update Teacher Detail</h3>
                )}
              </div>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Registration ID *</label>
                  {this.renderInput("", "registrationID", "text", "form-control")}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Username *</label>
                  {this.renderInput("", "username", "text", "form-control")}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Class in Charge *</label>
                  {this.renderSelect("className", [
                    "",
                    ...this.state.classInCharge,
                  ])}
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

export default AddTeacher;
