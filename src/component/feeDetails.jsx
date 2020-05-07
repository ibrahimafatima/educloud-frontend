import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { getPayment, getStudent } from "../services/adminService";

class FeeDetails extends Component {
  state = {
    paymentDetails: [],
    student: {},
  };

  style = {
    color: "#FFA701",
  };

  async componentDidMount() {
    const reg = this.props.match.params.id;
    try {
      const { data: paymentDetails } = await getPayment(reg);
      const { data: student } = await getStudent(reg);
      this.setState({ paymentDetails, student });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  render() {
    const { paymentDetails, student } = this.state;
    return (
      <React.Fragment>
        <div>
          <h4>
            Go To <Link to="/students-fee">All Students</Link>
          </h4>
          <h6 style={{ color: "blue" }}>{student.name} fees payment history</h6>
          <h6>
            Total amount paid:{" "}
            <span style={{ color: "green" }}>{student.fee_paid}</span>
          </h6>
        </div>
        {paymentDetails.length === 0 ? (
          <div className="card height-auto">
            <div className="card-body">
              <div className="heading-layout1">
                <div className="item-title">
                  <h3>No Payment has been made by {student.name}</h3>
                </div>
              </div>
            </div>
          </div>
        ) : (
          paymentDetails.map((paymentDetail) => (
            <div key={paymentDetail._id} className="card height-auto">
              <div className="card-body">
                <div className="heading-layout1">
                  <div className="item-title">
                    <h6>
                      {" "}
                      Receipt N^: <i style={this.styleC}>{paymentDetail._id}</i>
                    </h6>
                    <h6>
                      {" "}
                      Registration N^:{" "}
                      <i style={this.styleC}>
                        {paymentDetail.registration_number}
                      </i>
                    </h6>
                    <h6>
                      {" "}
                      Amount paid:{" "}
                      <i style={this.styleC}>{paymentDetail.amountPaid}</i>
                    </h6>
                    <h6>
                      {" "}
                      Operated By:{" "}
                      <i style={this.styleC}>{paymentDetail.operatedBy}</i>
                    </h6>
                    <h6>
                      {" "}
                      Made on:{" "}
                      <i style={this.styleC}>
                        <Moment format="Do MMMM YYYY">
                          {paymentDetail.paymentDate}
                        </Moment>
                      </i>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </React.Fragment>
    );
  }
}

export default FeeDetails;
