import React, { Component } from "react";
import Table from "./reusableComponent/table";
import Delete from "./reusableComponent/delete";
import auth from "../services/authService";

class ExamTable extends Component {
  state = {
    columns: [
      { path: "exam_name", title: "Exam name" },
      { path: "subject", title: "Subject" },
      { path: "className", title: "Class name" },
      { path: "schedule_date", title: "Schedule date" },
      { path: "schedule_time", title: "Start Time" },
      { path: "duration", title: "Duration" },
      { path: "state", title: "Exam state" },
    ],
  };

  deleteBtn = {
    path: "exam",
    value: (exam) => <Delete onDoubleClick={() => this.props.onDelete(exam)} />,
  };

  updateBtn = {
    path: "update",
    value: (exam) => (
      <button
        className="btn btn-outline-info"
        onClick={() => this.props.onUpdate(exam)}
      >
        Completed?
      </button>
    ),
  };

  constructor() {
    super();
    if (!auth.getCurrentUser().isStudent) {
      this.state.columns.push(this.updateBtn);
      this.state.columns.push(this.deleteBtn);
    }
  }

  render() {
    const { exams } = this.props;
    const { columns } = this.state;
    return <Table elements={exams} columns={columns} routePath="add-exams" />;
  }
}

export default ExamTable;
