import React, { Component } from "react";
import Table from "./reusableComponent/table";
import Delete from "./reusableComponent/delete";

class AddedStudentTable extends Component {
  columns = [
    { path: "name", title: "Student name" }, //MORE COLUMN WILL COME LIKE: number of class teaching,
    { path: "registration_number", title: "Registration N^" }, // number of student per class, subject teaching,
    { path: "class_name", title: "Class name" }, // number of student per class, subject teaching,
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
