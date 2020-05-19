import React from "react";
import Form from "./reusableComponent/form";
import { addClass, getClass, getCls, getLevel } from "../services/adminService";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Spinner from "./reusableComponent/spinner";

class AddClass extends Form {
  state = {
    data: {
      className: "",
      classe: "",
      amount_to_pay: 0,
      level: "",
      isInCharge: "false",
    },
    classe: [],
    level: [],
    isInCharge: ["false", "true"],
    loading: true,
    error: {},
  };

  schema = {
    _id: Joi.string(),
    className: Joi.string()
      .min(3)
      .max(12)
      .strict()
      .trim()
      .required()
      .label("Class name"),
    classe: Joi.string().required(),
    amount_to_pay: Joi.number().min(0).required().label("School fee"),
    level: Joi.string().required(),
    isInCharge: Joi.bool(),
  };

  async componentDidMount() {
    const { data: classe } = await getCls();
    this.setState({ classe });
    const { data: level } = await getLevel();
    this.setState({ level });
    if (this.props.location.pathname === "/add-class/new") {
      this.setState({ loading: false });
      return;
    }
    try {
      const { data: clas } = await getClass(this.props.match.params.id);
      const data = {
        _id: clas._id,
        className: clas.className,
        classe: clas.classe,
        amount_to_pay: clas.amount_to_pay,
        level: clas.level,
        isInCharge: clas.isInCharge,
      };
      this.setState({ data, loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  doSubmit = async () => {
    try {
      await addClass(this.state.data);
      this.setState({
        data: {
          className: "",
          classe: "",
          amount_to_pay: 0,
          level: "",
          isInCharge: "false",
        },
      });
      toast.success("Class added successfully...");
    } catch (ex) {
      if (
        ex.response &&
        (ex.response.status === 400 || ex.response.status === 404)
      ) {
        const error = { ...this.state.error };
        error.level = ex.response.data;
        this.setState({ error });
        toast.error(ex.response.data);
      }
    }
  };

  render() {
    const { classe, level, isInCharge, loading } = this.state;
    const { location } = this.props;
    return loading ? (
      <Spinner />
    ) : (
      <React.Fragment>
        <div>
          <h4>
            Go To <Link to="/all-class">All Classes</Link>
          </h4>
        </div>
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                {location.pathname === "/add-class/new" ? (
                  <h3>Add New Class</h3>
                ) : (
                  <h3>Update Class Detail</h3>
                )}
              </div>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Name *</label>
                  {this.renderInput("", "className", "text", "form-control")}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Class *</label>
                  {this.renderSelect("classe", classe)}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Amount (School fee) *</label>
                  {this.renderInput(
                    "",
                    "amount_to_pay",
                    "text",
                    "form-control"
                  )}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Level *</label>
                  {this.renderSelect("level", level)}
                </div>
                <div className="col-xl-3 col-lg-6 col-12 form-group">
                  <label>Is In Charge *</label>
                  {this.renderSelect("isInCharge", isInCharge)}
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

export default AddClass;
