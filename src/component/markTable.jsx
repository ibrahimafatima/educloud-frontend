import React, { Component } from "react";
import Delete from "./reusableComponent/delete";
import Table from "./reusableComponent/table";
import auth from "../services/authService";

class MarkTable extends Component {
  columns = [
    { path: "student_name", title: "Student name" },
    { path: "name", title: "Subject" },
    { path: "exam_name", title: "Exam" },
    { path: "mark", title: "Score" },
    { path: "grade", title: "Grade" },
    { path: "remark", title: "Remark" }
  ];

  deleteBtn = {
    path: "delete",
    value: mark => <Delete onClick={() => this.props.onDelete(mark)} />
  };

  constructor() {
    super();
    if (!auth.getCurrentUser().isStudent) this.columns.push(this.deleteBtn);
  }

  render() {
    const { marks } = this.props;
    return (
      <Table elements={marks} columns={this.columns} routePath="post-mark" />
    );
  }
}

export default MarkTable;
