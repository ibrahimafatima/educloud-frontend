import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./reusableComponent/table";

class StudentPromotionTable extends Component {
  columns = [
    { path: "name", title: "Student name" }, //MORE COLUMN WILL COME LIKE: number of class teaching,
    { path: "registration_number", title: "Registration N^" }, // number of student per class, subject teaching,
    { path: "class_name", title: "Class name" }, // number of student per class, subject teaching,
    { path: "term", title: "Term" }, // number of student per class, subject teaching,
    {
      path: "promotion",
      payment: (path) => (
        <Link to={`/new-promotion/${path}`}>
          <button className="btn btn-outline-info">Promote</button>
        </Link>
      ),
    },
  ];

  render() {
    const { students } = this.props;
    return (
      <Table
        elements={students}
        columns={this.columns}
        routePath="add-student"
      />
    );
  }
}

export default StudentPromotionTable;
