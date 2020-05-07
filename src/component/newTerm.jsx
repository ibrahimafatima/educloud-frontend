import React from "react";
import Form from "./reusableComponent/form";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import { moveTerm } from "../services/teacherService";
import { getTerms } from "../services/adminService";
import { toast } from "react-toastify";

class NewTerm extends Form {
  state = {
    data: {
      className: "",
      term: "",
    },
    term: [],
    error: {},
  };

  schema = {
    className: Joi.string().min(3).max(12).required().label("Class name"),
    term: Joi.string().required(),
  };

  doSubmit = async () => {
    try {
      await moveTerm(this.state.data);
      toast.success("Class successfully moved to next term");
      this.setState({
        data: {
          className: "",
          term: "",
        },
      });
    } catch (ex) {
      toast.error(ex.response.data);
    }
  };

  async componentDidMount() {
    const { data: term } = await getTerms();
    this.setState({ term, data: { className: this.props.match.params.id } });
  }

  render() {
    const { term } = this.state;
    const classe = auth.getCurrentUser().className;
    return (
      <React.Fragment>
        <div>
          <h4>
            Go To{" "}
            <Link to={`/promote-student/${classe}`}>Student promotion</Link>
          </h4>
        </div>
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                <h3>Move all class to next term</h3>
              </div>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Class Name *</label>
                  {this.renderInput("", "className", "text", "form-control")}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Term *</label>
                  {this.renderSelect("term", term)}
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

export default NewTerm;
