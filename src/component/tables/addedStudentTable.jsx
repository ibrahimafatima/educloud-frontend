import React, { Component } from "react";
import Table from "../reusableComponent/table";
import Delete from "../reusableComponent/delete";

class AddedStudentTable extends Component {
  columns = [
    { path: "username", title: "Student username" }, //MORE COLUMN WILL COME LIKE: number of class teaching,
    { path: "registrationID", title: "Registration ID" }, // number of student per class, subject teaching,
    { path: "className", title: "Class name" }, // number of student per class, subject teaching,
    { path: "term", title: "Term" }, // number of student per class, subject teaching,
    {
      path: "delete",
      value: (student) => (
        <Delete onDoubleClick={() => this.props.onDelete(student)} />
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

export default AddedStudentTable;
