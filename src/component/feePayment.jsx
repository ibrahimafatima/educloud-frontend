import React from "react";
import { payFee } from "../services/adminService";
import { toast } from "react-toastify";
import Form from "./reusableComponent/form";
import { Link } from "react-router-dom";
import Spinner from "./reusableComponent/spinner";
import Joi from "joi-browser";

class FeePayment extends Form {
  state = {
    data: { registration_number: this.props.match.params.id, amountPaid: "" },
    loading: false,
    error: {},
  };

  schema = {
    _id: Joi.string(),
    registration_number: Joi.string().required().label("Registration number"),
    amountPaid: Joi.number().min(0).required().label("Amount Paid"),
  };

  doSubmit = async () => {
    try {
      this.setState({ loading: true });
      const { data: paymentDetails } = await payFee(this.state.data);
      this.setState({
        data: { registration_number: "", amountPaid: 0 },
        loading: false,
      });
      toast.success("Payment made successfully...");
      localStorage.setItem("receiptID", paymentDetails._id);
      this.props.history.push("/print");
    } catch (ex) {
      this.setState({ loading: false });
      if (ex.response && ex.response.status === 400) {
        const error = { ...this.state.error };
        error.registration_number = ex.response.data;
        this.setState({ error });
      }
    }
  };

  render() {
    return this.state.loading ? (
      <Spinner />
    ) : (
      <React.Fragment>
        <div>
          <h4>
            Go To <Link to="/students-fee">All Students</Link>
          </h4>
        </div>
        <div className="card height-auto">
          <div className="card-body">
            <div className="heading-layout1">
              <div className="item-title">
                <h3>Student Fee payment</h3>
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
                  <label>Amount paid *</label>
                  {this.renderInput("", "amountPaid", "text", "form-control")}
                </div>

                <div className="col-12 form-group mg-t-8">
                  {this.renderButton(
                    "Save Payment",
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

export default FeePayment;
