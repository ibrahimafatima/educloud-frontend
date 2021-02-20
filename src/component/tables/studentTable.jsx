import React, { Component } from "react";
import Table from "../reusableComponent/table";
import { Link } from "react-router-dom";
import auth from "../../services/authService";
import { FaUserGraduate } from "react-icons/fa";

class StudentTable extends Component {
  state = {
    user: {},
  };
  columns = [
    { path: "username", title: "Student username" }, //MORE COLUMN WILL COME LIKE: number of class teaching,
    { path: "registrationID", title: "Registration ID" }, // number of student per class, subject teaching,
    {
      path: "details",
      payment: (path) => (
        <Link to={`/student/${path}`}>
          <FaUserGraduate />
        </Link>
      ),
    },
    { path: "term", title: "Term" },
  ];

  payFeeBtn = {
    path: "payment",
    payment: (path) => (
      <Link to={`/payment/${path}`}>
        <button className="btn btn-success">Pay fees</button>
      </Link>
    ),
  };

  feeDetailsBtn = {
    path: "feeBtn",
    payment: (path) => (
      <Link to={`/payment-details/${path}`}>
        <button className="btn btn-primary">Fees Details</button>
      </Link>
    ),
  };

  markDetailsBtn = {
    path: "mark",
    payment: (path) => (
      <Link to={`/view-mark/${path}`}>
        <button className="btn btn-outline-info">View Marks</button>
      </Link>
    ),
  };

  postMark = {
    path: "postMark",
    payment: (path) => (
      <Link to={`/post-mark/${path}`}>
        <button className="btn btn-success">Post Marks</button>
      </Link>
    ),
  };

  constructor() {
    super();
    if (auth.getCurrentUser() && auth.getCurrentUser().isAdmin) {
      this.columns.push(this.payFeeBtn);
      this.columns.push(this.feeDetailsBtn);
      this.columns.push(this.markDetailsBtn);
    }
    if (auth.getCurrentUser() && auth.getCurrentUser().isTeacher) {
      this.columns.push(this.postMark);
      this.columns.push(this.markDetailsBtn);
    }
  }
  render() {
    const { students, path } = this.props;
    return (
      <Table
        columns={this.columns}
        elements={students}
        routePath={path === "/students-fee" ? "fee-details" : "add-teacher"}
      />
    );
  }
}

export default StudentTable;
