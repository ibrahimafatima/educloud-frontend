import React from "react";
import { getClasses } from "./../services/adminService";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Form from "./reusableComponent/form";

class FeesReporting extends Form {
  state = {
    data: { className: "" },
    classes: [],
    error: {},
  };

  schema = {
    className: Joi.string().required().label("Class name"),
  };

  async componentDidMount() {
    try {
      const { data } = await getClasses();
      this.setState({ classes: data });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data);
      }
    }
  }

  doSubmit = () => {
    localStorage.setItem("class_report", this.state.data.className);
    this.props.history.push("/print-fees-report");
  };

  render() {
    return (
      <React.Fragment>
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                <h3>Select the class you want to view fees details for.</h3>
              </div>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Class *</label>
                  {this.renderSelect("className", ["", ...this.state.classes])}
                </div>
                <div className="col-12 form-group mg-t-8">
                  {this.renderButton(
                    "View report",
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

export default FeesReporting;
